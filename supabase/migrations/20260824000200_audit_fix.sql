-- ═══════════════════════════════════════════════════════════════════════════
-- Protokoll: Tabellen ohne id-Spalte
--
-- write_audit_log() griff fest auf new.id zu. Das gilt für alle
-- Inhaltstabellen — aber nicht für settings, die key als Schlüssel führt.
-- Folge: jedes Speichern der Feature-Schalter brach ab mit
-- „record new has no field id". Der Admin hätte die Schalter angezeigt und
-- beim Umlegen nichts getan.
--
-- Die Funktion liest die id jetzt über to_jsonb und lässt sie weg, wenn es
-- keine gibt. Ein Protokolleintrag ohne record_id ist immer noch ein
-- Protokolleintrag; ein Trigger, der das Schreiben verhindert, ist ein Fehler.
-- ═══════════════════════════════════════════════════════════════════════════

create or replace function public.write_audit_log()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_diff jsonb;
  v_row jsonb;
  v_id uuid;
begin
  if tg_op = 'DELETE' then
    v_row := to_jsonb(old);
    v_diff := jsonb_build_object('old', v_row);
  elsif tg_op = 'INSERT' then
    v_row := to_jsonb(new);
    v_diff := jsonb_build_object('new', v_row);
  else
    v_row := to_jsonb(new);
    -- Nur die Felder, die sich wirklich geändert haben.
    v_diff := jsonb_build_object(
      'old', (select jsonb_object_agg(key, value)
                from jsonb_each(to_jsonb(old))
               where to_jsonb(new) -> key is distinct from value),
      'new', (select jsonb_object_agg(key, value)
                from jsonb_each(to_jsonb(new))
               where to_jsonb(old) -> key is distinct from value)
    );
  end if;

  -- Tabellen ohne uuid-Schlüssel tragen keine record_id. Der Eintrag bleibt
  -- trotzdem stehen: table_name, action und diff sagen, was passiert ist.
  begin
    v_id := (v_row ->> 'id')::uuid;
  exception when others then
    v_id := null;
  end;

  insert into public.audit_log (user_id, table_name, record_id, action, diff)
  values (auth.uid(), tg_table_name, v_id, lower(tg_op), v_diff);

  return coalesce(new, old);
end;
$$;
