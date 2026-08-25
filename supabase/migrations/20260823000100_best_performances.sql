-- ═══════════════════════════════════════════════════════════════════════════
-- Bestleistungen: das Modell aus §12 reicht nicht
--
-- Der Auftrag sieht vor:
--   best_performances  id, category, discipline, performance_raw, athlete,
--                      year, gender
--
-- Der importierte Bestand zeigt, dass drei Dinge fehlen:
--
-- 1. Der Belag. Piste und Indoor fuehren getrennte Listen, und 60 m gibt es
--    nur in der Halle. Ohne surface stuenden beide Werte als Dubletten
--    nebeneinander, ohne dass man sie unterscheiden koennte.
-- 2. Mehrere Namen. Die Listen enthalten Staffeln — 4 x 75 m mit vier
--    Athletinnen. Ein einzelnes Feld "athlete" kann das nicht.
-- 3. Die Klasse, in der die Leistung erzielt wurde. Eine U20-Bestleistung
--    kann von jemandem stammen, der damals U18 war. Genau das steht auf der
--    alten Seite in einer eigenen Spalte, und es ist keine Nebensache: es
--    sagt, wie frueh jemand so weit war.
-- ═══════════════════════════════════════════════════════════════════════════

alter table public.best_performances
  add column surface public.record_surface not null default 'piste',
  add column discipline_raw text not null default '',
  add column achieved_in text,
  add column holders jsonb not null default '[]'::jsonb,
  add column is_national_record boolean not null default false,
  add column is_espoirs_best boolean not null default false;

-- athlete wird durch holders ersetzt: ein Textfeld kann keine Staffel fuehren.
alter table public.best_performances drop column athlete;

-- Der natuerliche Schluessel enthaelt die Schreibweise, nicht nur die
-- Grunddisziplin: Javelot 500 g und Javelot 600 g sind in derselben
-- Altersklasse zwei Wettbewerbe mit zwei Bestleistungen. Gruppiert wird nach
-- discipline_key, eindeutig ist discipline_raw.
create unique index best_performances_unique_idx
  on public.best_performances (category, surface, gender, discipline_raw);

create index best_performances_category_idx
  on public.best_performances (category, surface, gender);
