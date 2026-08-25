-- ═══════════════════════════════════════════════════════════════════════════
-- Der wichtigste Ablauf: neuer Rekord (§12)
--
-- "Er muss in unter 60 Sekunden erledigt sein." Damit das gilt, darf die
-- Redaktion nicht selbst entscheiden muessen, ob eine Leistung den Rekord
-- schlaegt, ob der alte archiviert werden muss und ob die NEI-Markierung
-- greift. Das entscheidet die Datenbank in einem Aufruf.
--
-- Die Funktion liegt hier und nicht in der Anwendung, weil sie mehrere
-- Tabellen konsistent aendert. In der Anwendung waere sie eine Folge von
-- Abfragen, die zwischendrin abbrechen kann — und dann stuende ein Rekord in
-- der Chronik, der nie ersetzt wurde.
-- ═══════════════════════════════════════════════════════════════════════════

/** Zeiten: kleiner ist besser. Sprung, Wurf, Mehrkampf: groesser. */
create or replace function public.is_better(
  candidate numeric,
  incumbent numeric,
  kind public.discipline_kind
)
returns boolean
language sql
immutable
as $$
  select case when kind = 'time' then candidate < incumbent
              else candidate > incumbent end;
$$;

create or replace function public.submit_record(
  p_discipline_key text,
  p_surface public.record_surface,
  p_gender public.gender,
  p_performance_raw text,
  p_performance_numeric numeric,
  p_category text,
  p_year integer,
  p_holders jsonb,
  p_date date default null,
  p_is_national_record boolean default false,
  p_is_espoirs_best boolean default false,
  p_show_on_home boolean default false
)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_kind public.discipline_kind;
  v_current public.records%rowtype;
  v_holders jsonb;
  v_new_id uuid;
  v_holder jsonb;
  v_position integer := 1;
begin
  select kind into v_kind
  from public.disciplines
  where key = p_discipline_key;

  if v_kind is null then
    raise exception 'Onbekannt Disziplin: %', p_discipline_key
      using errcode = 'no_data_found';
  end if;

  select * into v_current
  from public.records
  where discipline_key = p_discipline_key
    and surface = p_surface
    and gender is not distinct from p_gender
    and is_current;

  -- Die neue Leistung ist schlechter. Es wird nichts geschrieben, und die
  -- Antwort sagt, was der Fall ist — nicht nur, dass etwas nicht ging.
  -- Genau daraus baut der Admin die Meldung aus §12: "4'12"30 ist langsamer
  -- als der aktuelle Rekord 4'05"58. Als Bestleistung eintragen statt als
  -- Rekord?"
  if v_current.id is not null
     and not public.is_better(p_performance_numeric, v_current.performance_numeric, v_kind)
  then
    return jsonb_build_object(
      'status', 'not_better',
      'kind', v_kind,
      'current', jsonb_build_object(
        'id', v_current.id,
        'performance_raw', v_current.performance_raw,
        'performance_numeric', v_current.performance_numeric,
        'year', v_current.year
      )
    );
  end if;

  -- Der alte Rekord wandert mit Zeitstempel in die Chronik. Das ist die
  -- Voraussetzung fuer den Rekordverlauf aus §10 — und es kostet nichts,
  -- weil es ohnehin an dieser Stelle passieren muss.
  if v_current.id is not null then
    select coalesce(
             jsonb_agg(
               jsonb_build_object('lastName', last_name, 'firstName', first_name)
               order by position
             ),
             '[]'::jsonb
           )
      into v_holders
      from public.record_holders
     where record_id = v_current.id;

    update public.records set is_current = false where id = v_current.id;

    insert into public.record_history (
      discipline_key, surface, gender, performance_raw, performance_numeric,
      holders, category, year
    )
    values (
      v_current.discipline_key, v_current.surface, v_current.gender,
      v_current.performance_raw, v_current.performance_numeric,
      v_holders, v_current.category, v_current.year
    );
  end if;

  insert into public.records (
    discipline_key, surface, gender, performance_raw, performance_numeric,
    category, category_raw, year, year_raw, date,
    is_national_record, is_espoirs_best, is_current, show_on_home
  )
  values (
    p_discipline_key, p_surface, p_gender, p_performance_raw, p_performance_numeric,
    p_category, p_category, p_year, p_year::text, p_date,
    p_is_national_record, p_is_espoirs_best, true, p_show_on_home
  )
  returning id into v_new_id;

  for v_holder in select * from jsonb_array_elements(coalesce(p_holders, '[]'::jsonb))
  loop
    insert into public.record_holders (record_id, last_name, first_name, position)
    values (
      v_new_id,
      v_holder ->> 'lastName',
      nullif(v_holder ->> 'firstName', ''),
      v_position
    );
    v_position := v_position + 1;
  end loop;

  -- Die Chronik zeigt jetzt, wodurch der alte Rekord ersetzt wurde.
  if v_current.id is not null then
    update public.record_history
       set superseded_by_record_id = v_new_id
     where discipline_key = p_discipline_key
       and surface = p_surface
       and gender is not distinct from p_gender
       and superseded_by_record_id is null;
  end if;

  return jsonb_build_object(
    'status', case when v_current.id is null then 'created' else 'superseded' end,
    'record_id', v_new_id,
    'previous', case
      when v_current.id is null then null
      else jsonb_build_object(
        'performance_raw', v_current.performance_raw,
        'year', v_current.year
      )
    end
  );
end;
$$;

-- ═══════════════════════════════════════════════════════════════════════════
-- Protokoll (§12)
-- Jede Aenderung an einer Inhaltstabelle wird festgehalten. Bei einem
-- Vorstand, der die Seite zu mehreren pflegt, ist die Frage "wer hat das
-- geaendert" frueher oder spaeter unvermeidlich.
-- ═══════════════════════════════════════════════════════════════════════════
create or replace function public.write_audit_log()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_diff jsonb;
  v_id uuid;
begin
  if tg_op = 'DELETE' then
    v_diff := jsonb_build_object('old', to_jsonb(old));
    v_id := old.id;
  elsif tg_op = 'INSERT' then
    v_diff := jsonb_build_object('new', to_jsonb(new));
    v_id := new.id;
  else
    -- Nur die Felder, die sich wirklich geaendert haben. Ein Protokoll, das
    -- bei jedem Speichern die ganze Zeile doppelt ablegt, liest niemand.
    v_diff := jsonb_build_object(
      'old', (select jsonb_object_agg(key, value)
                from jsonb_each(to_jsonb(old))
               where to_jsonb(new) -> key is distinct from value),
      'new', (select jsonb_object_agg(key, value)
                from jsonb_each(to_jsonb(new))
               where to_jsonb(old) -> key is distinct from value)
    );
    v_id := new.id;
  end if;

  insert into public.audit_log (user_id, table_name, record_id, action, diff)
  values (auth.uid(), tg_table_name, v_id, lower(tg_op), v_diff);

  return coalesce(new, old);
end;
$$;

do $$
declare
  t text;
begin
  foreach t in array array[
    'news', 'events', 'records', 'best_performances',
    'athletes', 'coaches', 'committee', 'sponsors', 'pages', 'profiles'
  ]
  loop
    execute format(
      'create trigger %I_audit after insert or update or delete on public.%I
         for each row execute function public.write_audit_log()',
      t, t
    );
  end loop;
end;
$$;
