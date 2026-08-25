-- ═══════════════════════════════════════════════════════════════════════════
-- Tabellenrechte
--
-- RLS filtert Zeilen. Ob eine Rolle die Tabelle ueberhaupt anfassen darf,
-- entscheidet davor das Tabellenrecht — und ohne dieses Recht antwortet die
-- API auf jede Abfrage mit "permission denied for table", egal wie richtig
-- die Policies sind. Supabase setzt fuer neu angelegte Tabellen keine
-- Rechte, auf die man sich verlassen sollte; deshalb stehen sie hier
-- ausdruecklich.
--
-- Die Aufteilung ist die aus §12: anon liest, authenticated darf schreiben,
-- und welche Zeilen es wirklich sein duerfen, sagen die Policies.
-- ═══════════════════════════════════════════════════════════════════════════

grant usage on schema public to anon, authenticated;

-- Oeffentlich lesbare Inhalte. Welche Zeilen sichtbar sind, regelt RLS —
-- Entwuerfe und abgelaufene Sponsoren bleiben damit unsichtbar.
do $$
declare
  t text;
begin
  foreach t in array array[
    'news', 'events', 'disciplines', 'records', 'record_holders',
    'record_history', 'best_performances', 'athletes', 'coaches',
    'committee', 'sponsors', 'pages', 'media'
  ]
  loop
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format(
      'grant insert, update, delete on public.%I to authenticated', t
    );
  end loop;
end;
$$;

grant select on public.active_sponsors to anon, authenticated;

-- profiles und audit_log sind nichts fuer die Oeffentlichkeit. Die Policies
-- lassen ohnehin nur die eigene Zeile beziehungsweise admin durch; ohne
-- Grant fuer anon kommt eine Abfrage aber gar nicht erst so weit.
grant select on public.profiles to authenticated;
grant insert, update, delete on public.profiles to authenticated;
grant select on public.audit_log to authenticated;

-- Die Hilfsfunktionen werden waehrend der Policy-Auswertung aufgerufen, also
-- unter der Rolle des Aufrufers. Ohne Ausfuehrungsrecht schluege jede
-- Policy fehl, die sie benutzt.
grant execute on function public.current_role() to anon, authenticated;
grant execute on function public.current_profile_id() to anon, authenticated;
grant execute on function public.is_staff() to anon, authenticated;
grant execute on function public.is_editor() to anon, authenticated;
grant execute on function public.is_admin() to anon, authenticated;
grant execute on function public.is_localized(jsonb) to anon, authenticated;
grant execute on function public.is_better(numeric, numeric, public.discipline_kind)
  to authenticated;

-- Der Rekord-Ablauf aus §12 laeuft mit den Rechten der aufrufenden Person:
-- die Policies auf records entscheiden, ob sie ihn ueberhaupt ausfuehren darf.
grant execute on function public.submit_record(
  text, public.record_surface, public.gender, text, numeric, text, integer,
  jsonb, date, boolean, boolean, boolean
) to authenticated;
