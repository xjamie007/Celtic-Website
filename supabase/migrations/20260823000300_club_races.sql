-- ═══════════════════════════════════════════════════════════════════════════
-- Eigene Läufe kennzeichnen
--
-- Der Kalender führt zwei Sorten Termine: die Wettkämpfe, die der Verein
-- selbst veranstaltet — Nordstadsemi, Eurocross, Tri-Celtic, Wämper Lof —
-- und alles, wo seine Athlet:innen hinfahren. Auf der Seite sind die eigenen
-- das Wichtigste, und sie müssen sich auf den ersten Blick unterscheiden.
--
-- Eine Kennzeichnung und keine getrennte Tabelle: es ist derselbe Datensatz
-- mit derselben Pflege, nur mit anderer Gewichtung in der Anzeige.
-- ═══════════════════════════════════════════════════════════════════════════

alter table public.events
  add column is_club_race boolean not null default false;

create index events_club_race_idx on public.events (starts_at)
  where is_club_race;

comment on column public.events.is_club_race is
  'Veranstaltung des Vereins selbst, nicht nur ein Termin im Kalender.';
