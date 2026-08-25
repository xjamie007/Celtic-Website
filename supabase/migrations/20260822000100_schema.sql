-- ═══════════════════════════════════════════════════════════════════════════
-- CELTIC Diekirch — Schema (§12)
--
-- Alle mehrsprachigen Textfelder als jsonb mit den Schluesseln lb, de, fr.
-- Luxemburgisch ist Pflicht, die Uebersetzungen sind optional: §11 sieht den
-- stillen Rueckfall auf lb ausdruecklich vor, und ein Verein, der eine
-- Meldung auf Lëtzebuergesch schreibt, soll sie veroeffentlichen koennen,
-- ohne vorher zweimal zu uebersetzen.
-- ═══════════════════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ── Rollen ────────────────────────────────────────────────────────────────
create type public.user_role as enum ('admin', 'editor', 'author');
create type public.publish_status as enum ('draft', 'published');
create type public.record_surface as enum ('piste', 'indoor', 'route', 'stade');
create type public.gender as enum ('f', 'm');
create type public.discipline_kind as enum ('time', 'distance', 'points');
create type public.sponsor_tier as enum ('haaptsponsor', 'partner', 'supporter');
create type public.coach_section as enum ('athletics', 'triathlon');

-- Ein mehrsprachiges Feld muss mindestens die Standardsprache tragen.
create or replace function public.is_localized(value jsonb)
returns boolean
language sql
immutable
as $$
  select value is null
      or (jsonb_typeof(value) = 'object'
          and value ? 'lb'
          and jsonb_typeof(value -> 'lb') = 'string'
          and length(btrim(value ->> 'lb')) > 0);
$$;

-- ── profiles ──────────────────────────────────────────────────────────────
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  name text not null,
  role public.user_role not null default 'author',
  created_at timestamptz not null default now()
);

-- ── Inhalte ───────────────────────────────────────────────────────────────
create table public.news (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null check (public.is_localized(title)),
  excerpt jsonb check (public.is_localized(excerpt)),
  body jsonb not null check (public.is_localized(body)),
  cover_image text,
  published_at timestamptz,
  author_id uuid references public.profiles (id) on delete set null,
  status public.publish_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Veroeffentlicht ohne Datum gibt es nicht: sonst waere unklar, ob eine
  -- Meldung schon sichtbar ist oder nur vergessen wurde.
  constraint news_published_needs_date
    check (status = 'draft' or published_at is not null)
);
create index news_published_idx on public.news (published_at desc)
  where status = 'published';

create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null check (public.is_localized(title)),
  body jsonb check (public.is_localized(body)),
  starts_at date not null,
  ends_at date,
  location text,
  category text,
  external_url text,
  cover_image text,
  -- Steht nicht im Datenmodell des Auftrags, ist aber noetig: die Rolle
  -- author darf laut §12 "nur eigene Beitraege" bearbeiten, und das gilt
  -- auch fuer Termine. Ohne Urheber liesse sich die Regel nicht durchsetzen,
  -- sondern nur im Formular verstecken.
  author_id uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint events_end_after_start check (ends_at is null or ends_at >= starts_at)
);
create index events_starts_idx on public.events (starts_at);

-- ── Rekorde ───────────────────────────────────────────────────────────────
-- Der Auftrag legt discipline und discipline_order direkt auf records. Eine
-- eigene Tabelle ist besser: die Art der Disziplin (Zeit, Weite, Punkte)
-- entscheidet, ob kleiner oder groesser besser ist, und diese Information
-- darf nicht in jeder Rekordzeile neu und moeglicherweise widerspruechlich
-- stehen. Sie ist die Grundlage des Ablaufs aus §12.
create table public.disciplines (
  key text primary key,
  name text not null,
  sort_order integer not null,
  kind public.discipline_kind not null
);

create table public.records (
  id uuid primary key default gen_random_uuid(),
  discipline_key text not null references public.disciplines (key),
  surface public.record_surface not null,
  gender public.gender,
  performance_raw text not null,
  performance_numeric numeric(10, 3) not null,
  category text not null default '',
  category_raw text not null default '',
  year integer not null,
  year_raw text not null default '',
  date date,
  is_national_record boolean not null default false,
  is_espoirs_best boolean not null default false,
  is_current boolean not null default true,
  -- Stade fuehrt Leistungen fremder Athlet:innen, deshalb dort eine Nation
  -- statt einer Kategorie und kein Geschlecht.
  nation text,
  show_on_home boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint records_gender_required
    check (surface = 'stade' or gender is not null)
);

-- Pro Disziplin, Belag und Geschlecht gibt es genau einen aktuellen Rekord.
-- Diese Bedingung ist der eigentliche Schutz des Ablaufs aus §12: sie macht
-- es unmoeglich, versehentlich zwei gueltige Rekorde nebeneinander zu haben.
create unique index records_one_current_idx
  on public.records (discipline_key, surface, gender)
  where is_current and surface <> 'stade';

create index records_discipline_idx on public.records (discipline_key);

create table public.record_holders (
  id uuid primary key default gen_random_uuid(),
  record_id uuid not null references public.records (id) on delete cascade,
  last_name text not null,
  first_name text,
  position integer not null default 1
);
create index record_holders_record_idx on public.record_holders (record_id);

create table public.record_history (
  id uuid primary key default gen_random_uuid(),
  discipline_key text not null references public.disciplines (key),
  surface public.record_surface not null,
  gender public.gender,
  performance_raw text not null,
  performance_numeric numeric(10, 3) not null,
  holders jsonb not null default '[]'::jsonb,
  category text,
  year integer not null,
  superseded_at timestamptz not null default now(),
  superseded_by_record_id uuid references public.records (id) on delete set null
);
create index record_history_lookup_idx
  on public.record_history (discipline_key, surface, gender, year desc);

create table public.best_performances (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  discipline_key text not null references public.disciplines (key),
  gender public.gender not null,
  performance_raw text not null,
  performance_numeric numeric(10, 3),
  athlete text not null,
  year integer not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── Personen ──────────────────────────────────────────────────────────────
create table public.athletes (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  category text,
  gender public.gender,
  photo text,
  bio jsonb check (public.is_localized(bio)),
  active boolean not null default true,
  -- §13: Athletenfotos brauchen eine Einwilligung, besonders bei
  -- Minderjaehrigen. Ein Foto ohne bestaetigte Einwilligung darf gar nicht
  -- erst in der Datenbank stehen — deshalb eine Bedingung und keine
  -- Checkbox, die man im Formular uebersehen kann.
  consent_on_file boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint athletes_photo_needs_consent
    check (photo is null or consent_on_file)
);

create table public.coaches (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  section public.coach_section not null,
  brevet text,
  bio jsonb check (public.is_localized(bio)),
  photo text,
  sort_order integer not null default 0
);

create table public.committee (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role_key text not null,
  sort_order integer not null default 0
);

-- ── Sponsoren ─────────────────────────────────────────────────────────────
create table public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  website_url text,
  tier public.sponsor_tier not null default 'partner',
  jersey_position jsonb,
  active_from date,
  active_until date,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sponsors_period check (active_until is null
    or active_from is null
    or active_until >= active_from),
  constraint sponsors_jersey_shape check (
    jersey_position is null
    or (jersey_position ? 'x' and jersey_position ? 'y')
  )
);

-- §12: Sponsoren mit abgelaufener Laufzeit verschwinden von der Seite,
-- bleiben aber im Datenbestand. Die Regel steht als Sicht in der Datenbank
-- und nicht in der Anwendung, damit sie fuer jeden Zugriff gilt.
create view public.active_sponsors
with (security_invoker = true) as
  select *
  from public.sponsors
  where (active_from is null or active_from <= current_date)
    and (active_until is null or active_until >= current_date);

-- ── Statische Seiten und Medien ───────────────────────────────────────────
create table public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null check (public.is_localized(title)),
  body jsonb not null,
  updated_by uuid references public.profiles (id) on delete set null,
  updated_at timestamptz not null default now()
);

create table public.media (
  id uuid primary key default gen_random_uuid(),
  path text not null unique,
  alt jsonb check (public.is_localized(alt)),
  uploaded_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.audit_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  table_name text not null,
  record_id uuid,
  action text not null,
  diff jsonb,
  created_at timestamptz not null default now()
);
create index audit_log_created_idx on public.audit_log (created_at desc);

-- ── updated_at ────────────────────────────────────────────────────────────
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  t text;
begin
  foreach t in array array[
    'news', 'events', 'records', 'best_performances',
    'athletes', 'sponsors', 'pages'
  ]
  loop
    execute format(
      'create trigger %I_touch before update on public.%I
         for each row execute function public.touch_updated_at()',
      t, t
    );
  end loop;
end;
$$;
