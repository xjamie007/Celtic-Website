-- ═══════════════════════════════════════════════════════════════════════════
-- Row Level Security (§12)
--
-- "Rollen in profiles.role, durchgesetzt ueber Row Level Security — nicht nur
-- im UI versteckt." Jede Tabelle bekommt RLS, und die Rechte stehen genau
-- einmal: hier. Ein Formular, das eine Schaltflaeche ausblendet, ist eine
-- Bequemlichkeit; die Regel steht in der Datenbank.
-- ═══════════════════════════════════════════════════════════════════════════

-- Die Rolle der angemeldeten Person.
--
-- security definer ist hier kein Abkuerzen, sondern noetig: die Funktion
-- liest profiles, und profiles hat selbst RLS. Ohne definer riefe die
-- Policy sich selbst auf.
create or replace function public.current_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where user_id = auth.uid();
$$;

create or replace function public.current_profile_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from public.profiles where user_id = auth.uid();
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
as $$
  select public.current_role() is not null;
$$;

/** Darf Inhalte ausser Benutzern und Sponsoren pflegen. */
create or replace function public.is_editor()
returns boolean
language sql
stable
as $$
  select public.current_role() in ('admin', 'editor');
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select public.current_role() = 'admin';
$$;

alter table public.profiles         enable row level security;
alter table public.news             enable row level security;
alter table public.events           enable row level security;
alter table public.disciplines      enable row level security;
alter table public.records          enable row level security;
alter table public.record_holders   enable row level security;
alter table public.record_history   enable row level security;
alter table public.best_performances enable row level security;
alter table public.athletes         enable row level security;
alter table public.coaches          enable row level security;
alter table public.committee        enable row level security;
alter table public.sponsors         enable row level security;
alter table public.pages            enable row level security;
alter table public.media            enable row level security;
alter table public.audit_log        enable row level security;

-- ── profiles ──────────────────────────────────────────────────────────────
create policy profiles_self_read on public.profiles
  for select using (user_id = auth.uid() or public.is_admin());
create policy profiles_admin_write on public.profiles
  for all using (public.is_admin()) with check (public.is_admin());

-- ── news ──────────────────────────────────────────────────────────────────
-- Oeffentlich sichtbar ist, was veroeffentlicht ist und dessen Datum erreicht
-- ist. Ein Beitrag mit Datum in der Zukunft bleibt liegen, bis es soweit ist.
create policy news_public_read on public.news
  for select using (
    (status = 'published' and published_at <= now()) or public.is_staff()
  );
create policy news_author_insert on public.news
  for insert with check (
    public.is_editor() or author_id = public.current_profile_id()
  );
create policy news_author_update on public.news
  for update using (
    public.is_editor() or author_id = public.current_profile_id()
  ) with check (
    public.is_editor() or author_id = public.current_profile_id()
  );
create policy news_author_delete on public.news
  for delete using (
    public.is_editor() or author_id = public.current_profile_id()
  );

-- ── events ────────────────────────────────────────────────────────────────
create policy events_public_read on public.events for select using (true);
create policy events_author_insert on public.events
  for insert with check (
    public.is_editor() or author_id = public.current_profile_id()
  );
create policy events_author_update on public.events
  for update using (
    public.is_editor() or author_id = public.current_profile_id()
  ) with check (
    public.is_editor() or author_id = public.current_profile_id()
  );
create policy events_author_delete on public.events
  for delete using (
    public.is_editor() or author_id = public.current_profile_id()
  );

-- ── Leistungsdaten: oeffentlich lesbar, von Redaktion gepflegt ────────────
do $$
declare
  t text;
begin
  foreach t in array array[
    'disciplines', 'records', 'record_holders', 'record_history',
    'best_performances', 'athletes', 'coaches', 'committee', 'pages', 'media'
  ]
  loop
    execute format(
      'create policy %I_public_read on public.%I for select using (true)', t, t
    );
    execute format(
      'create policy %I_editor_write on public.%I for all
         using (public.is_editor()) with check (public.is_editor())', t, t
    );
  end loop;
end;
$$;

-- ── sponsors: nur admin (§12) ─────────────────────────────────────────────
-- Oeffentlich sichtbar ist nur, wessen Laufzeit laeuft. Die Regel steht in
-- der Policy und nicht nur in der Sicht: sonst laege der abgelaufene Bestand
-- ueber die API offen, waehrend die Seite ihn korrekt verbirgt.
create policy sponsors_public_read on public.sponsors
  for select using (
    (
      (active_from is null or active_from <= current_date)
      and (active_until is null or active_until >= current_date)
    )
    or public.is_staff()
  );
create policy sponsors_admin_write on public.sponsors
  for all using (public.is_admin()) with check (public.is_admin());

-- ── audit_log: nur admin liest, geschrieben wird per Trigger ─────────────
create policy audit_log_admin_read on public.audit_log
  for select using (public.is_admin());

-- ── Neue Anmeldung bekommt ein Profil ────────────────────────────────────
-- Ohne Profil hat eine angemeldete Person keine Rolle und damit keine
-- Schreibrechte — die Standardrolle ist author, das schwaechste Recht.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    'author'
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
