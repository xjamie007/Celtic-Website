-- ═══════════════════════════════════════════════════════════════════════════
-- Einstellungen (§2)
--
-- Bereiche, für die es noch keine Inhalte gibt, sollen gar nicht erscheinen —
-- nicht als leere Sektion, nicht als „Coming soon". Und der Verein soll sie
-- später selbst zuschalten können, ohne dass jemand Code ausliefern muss.
--
-- Deshalb liegen die Schalter in der Datenbank und nicht nur in config/site.ts.
-- Die Config bleibt die Vorgabe: was hier nicht steht, gilt wie dort gesetzt.
-- ═══════════════════════════════════════════════════════════════════════════

create table public.settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references public.profiles (id) on delete set null,
  updated_at timestamptz not null default now()
);

alter table public.settings enable row level security;

-- Die Schalter entscheiden, was auf der öffentlichen Seite steht — jeder
-- muss sie lesen können, sonst wüsste die Seite nicht, was sie zeigen darf.
create policy settings_public_read on public.settings for select using (true);
create policy settings_admin_write on public.settings for all
  using (public.is_admin()) with check (public.is_admin());

grant select on public.settings to anon, authenticated;
grant insert, update, delete on public.settings to authenticated;

create trigger settings_touch before update on public.settings
  for each row execute function public.touch_updated_at();
create trigger settings_audit after insert or update or delete on public.settings
  for each row execute function public.write_audit_log();
