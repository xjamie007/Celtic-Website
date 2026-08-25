-- ═══════════════════════════════════════════════════════════════════════════
-- Bilder: Speicher, Alben, Portraits, Logos
--
-- Der Verein will Fotos von seinen Läufen zeigen, Trainer:innen und Vorstand
-- mit Portrait vorstellen und jeden Sponsor mit seinem Logo führen. Alle drei
-- laufen über denselben Speicher und dieselbe Medientabelle — ein zweiter
-- Weg für Logos wäre ein zweiter Weg, auf dem Alternativtexte vergessen
-- werden.
-- ═══════════════════════════════════════════════════════════════════════════

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  10485760, -- 10 MB; Grösseres kommt ohnehin verkleinert an
  array['image/webp', 'image/jpeg', 'image/png', 'image/avif']
)
on conflict (id) do nothing;

-- Lesen darf jeder — die Bilder stehen auf einer öffentlichen Seite.
-- Schreiben und Löschen nur die Redaktion.
create policy "media_public_read" on storage.objects
  for select using (bucket_id = 'media');

create policy "media_editor_write" on storage.objects
  for insert with check (bucket_id = 'media' and public.is_editor());

create policy "media_editor_update" on storage.objects
  for update using (bucket_id = 'media' and public.is_editor());

create policy "media_editor_delete" on storage.objects
  for delete using (bucket_id = 'media' and public.is_editor());

-- ── Alben ────────────────────────────────────────────────────────────────
-- §9: /fotoen. Fotos ohne Anlass sind ein Haufen; ein Album hat ein Datum
-- und einen Namen, und danach sucht man ("Eurocross 2025").
create table public.albums (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null check (public.is_localized(title)),
  description jsonb check (public.is_localized(description)),
  taken_on date,
  cover_media_id uuid,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index albums_date_idx on public.albums (taken_on desc);

-- ── media erweitern ──────────────────────────────────────────────────────
alter table public.media
  add column album_id uuid references public.albums (id) on delete set null,
  add column width integer,
  add column height integer,
  add column sort_order integer not null default 0,
  -- §13: Einwilligung, besonders bei Minderjährigen. Ein Wettkampffoto zeigt
  -- fast immer erkennbare Personen — die Frage stellt sich hier genauso wie
  -- beim Athletenportrait und darf nicht nur an der Athletentabelle hängen.
  add column consent_on_file boolean not null default false;

alter table public.albums
  add constraint albums_cover_fk
  foreign key (cover_media_id) references public.media (id) on delete set null;

create index media_album_idx on public.media (album_id, sort_order);

-- Ein Alternativtext ist Pflicht, sobald das Bild öffentlich steht (§8).
-- Die Bedingung steht in der Datenbank, damit sie nicht im Formular
-- vergessen werden kann.
alter table public.media
  add constraint media_alt_required
  check (album_id is null or public.is_localized(alt));

-- ── Portraits ────────────────────────────────────────────────────────────
alter table public.coaches
  add column consent_on_file boolean not null default false,
  add constraint coaches_photo_needs_consent
    check (photo is null or consent_on_file);

alter table public.committee
  add column photo text,
  add column bio jsonb check (public.is_localized(bio)),
  add column consent_on_file boolean not null default false,
  add constraint committee_photo_needs_consent
    check (photo is null or consent_on_file);

-- ── Rechte ───────────────────────────────────────────────────────────────
grant select on public.albums to anon, authenticated;
grant insert, update, delete on public.albums to authenticated;

alter table public.albums enable row level security;
create policy albums_public_read on public.albums for select using (true);
create policy albums_editor_write on public.albums for all
  using (public.is_editor()) with check (public.is_editor());

create trigger albums_touch before update on public.albums
  for each row execute function public.touch_updated_at();
create trigger albums_audit after insert or update or delete on public.albums
  for each row execute function public.write_audit_log();
create trigger media_audit after insert or update or delete on public.media
  for each row execute function public.write_audit_log();
