#!/usr/bin/env node
/**
 * Erzeugt supabase/seed.sql aus den importierten Bestandsdaten.
 *
 * Der Seed ist kein Demomaterial, sondern der echte Bestand des Vereins:
 * 109 Rekorde, 50 Stade-Rekorde, die Trainer:innen, der Vorstand, die
 * Sponsoren und die Vereinstexte. Wer die Datei einspielt, hat die Seite
 * mit Inhalt vor sich und nicht ein leeres Geruest.
 *
 *   node tools/generate-seed.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";

const records = JSON.parse(readFileSync("data/records.json", "utf8"));
const best = JSON.parse(readFileSync("data/best-performances.json", "utf8"));
const pages = JSON.parse(readFileSync("data/pages.json", "utf8"));

/** Postgres-Literal. null bleibt null, Zeichenketten werden verdoppelt. */
const q = (value) =>
  value === null || value === undefined
    ? "NULL"
    : `'${String(value).replace(/'/g, "''")}'`;

const json = (value) =>
  value === null || value === undefined
    ? "NULL"
    : `'${JSON.stringify(value).replace(/'/g, "''")}'::jsonb`;

const bool = (value) => (value ? "true" : "false");
const num = (value) => (value === null || value === undefined ? "NULL" : String(value));

const out = [];
const say = (line = "") => out.push(line);

say("-- Erzeugt von tools/generate-seed.mjs — nicht von Hand aendern.");
say(`-- Quelle: ${records.source}, Import ${records.importedAt}`);
say("");
say("begin;");
say("");

/* ── Disziplinen ─────────────────────────────────────────────────────── */
say("insert into public.disciplines (key, name, sort_order, kind) values");
say(
  records.disciplines
    .map((d) => `  (${q(d.key)}, ${q(d.name)}, ${d.order}, ${q(d.kind)})`)
    .join(",\n") + "\non conflict (key) do nothing;",
);
say("");

/* ── Rekorde ─────────────────────────────────────────────────────────── */
say("-- Vereinsrekorde. Die IDs sind deterministisch aus dem Import-Schluessel");
say("-- abgeleitet, damit ein zweiter Lauf keine Dubletten erzeugt.");
for (const r of records.records) {
  const id = `md5(${q(r.id)})::uuid`;
  say(
    `insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, is_current)
values (${id}, ${q(r.disciplineKey)}, ${q(r.surface)}, ${q(r.gender)}, ${q(r.performanceRaw)}, ${num(r.performanceNumeric)}, ${q(r.category)}, ${q(r.categoryRaw)}, ${r.year}, ${q(r.yearRaw)}, ${q(r.date)}, ${bool(r.isNationalRecord)}, ${bool(r.isEspoirsBest)}, true)
on conflict (id) do nothing;`,
  );
  r.holders.forEach((h, index) => {
    say(
      `insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5(${q(r.id + ":" + index)})::uuid, ${id}, ${q(h.lastName)}, ${q(h.firstName)}, ${index + 1}) on conflict (id) do nothing;`,
    );
  });
}
say("");

/* ── Stade ───────────────────────────────────────────────────────────── */
say("-- Stade: Leistungen, die im Stadion aufgestellt wurden. Kein Geschlecht,");
say("-- dafuer eine Nation — deshalb erlaubt das Schema hier gender NULL.");
for (const r of records.venue) {
  const id = `md5(${q(r.id)})::uuid`;
  say(
    `insert into public.records (id, discipline_key, surface, gender, performance_raw, performance_numeric, category, year, nation, is_national_record, is_current)
values (${id}, ${q(r.disciplineKey)}, 'stade', NULL, ${q(r.performanceRaw)}, ${num(r.performanceNumeric)}, '', ${num(r.year ?? 0)}, ${q(r.nation)}, ${bool(r.isNationalRecord)}, true)
on conflict (id) do nothing;`,
  );
  r.holders.forEach((h, index) => {
    say(
      `insert into public.record_holders (id, record_id, last_name, first_name, position) values (md5(${q(r.id + ":" + index)})::uuid, ${id}, ${q(h.lastName)}, ${q(h.firstName)}, ${index + 1}) on conflict (id) do nothing;`,
    );
  });
}
say("");

/* ── Bestleistungen ──────────────────────────────────────────────────── */
say("-- Bestleistungen nach Kategorie (§9).");
for (const b of best.performances) {
  say(
    `insert into public.best_performances (id, category, surface, gender, discipline_key, discipline_raw, achieved_in, performance_raw, performance_numeric, holders, year, is_national_record, is_espoirs_best)
values (md5(${q("bp:" + b.id)})::uuid, ${q(b.category)}, ${q(b.surface)}, ${q(b.gender)}, ${q(b.disciplineKey)}, ${q(b.disciplineRaw)}, ${q(b.achievedIn)}, ${q(b.performanceRaw)}, ${num(b.performanceNumeric)}, ${json(b.holders)}, ${b.year}, ${bool(b.isNationalRecord)}, ${bool(b.isEspoirsBest)})
on conflict (id) do nothing;`,
  );
}
say("");

/* ── Personen, Sponsoren, Termine, Seiten ────────────────────────────── */
const people = readFileSync("lib/data/people.ts", "utf8");
const coachRows = [...people.matchAll(/coach\("([^"]+)",\s*"([^"]+)",\s*"(athletics|triathlon)"\)/g)];
say("insert into public.coaches (id, first_name, last_name, section, sort_order) values");
say(
  coachRows
    .map(
      ([, first, last, section], index) =>
        `  (md5(${q(`coach:${first}:${last}`)})::uuid, ${q(first)}, ${q(last)}, ${q(section)}, ${index * 10})`,
    )
    .join(",\n") + "\non conflict (id) do nothing;",
);
say("");

/* Die Zeilen tragen inzwischen auch photo und bio — deshalb wird bis zum
   sortOrder gelesen und der Rest offen gelassen. Eine Regex, die auf die
   schliessende Klammer besteht, faellt bei jedem neuen Feld stumm aus, und
   dann steht ploetzlich kein Vorstand mehr im Seed. */
const committeeRows = [
  ...people.matchAll(
    /\{ id: "([^"]+)", name: "([^"]+)", roleKey: "([^"]+)", sortOrder: (\d+)/g,
  ),
];
if (committeeRows.length === 0) {
  throw new Error("Kein Vorstand gefunden — Muster in people.ts geaendert?");
}
say("insert into public.committee (id, name, role_key, sort_order) values");
say(
  committeeRows
    .map(
      ([, id, name, roleKey, sortOrder]) =>
        `  (md5(${q(`committee:${id}`)})::uuid, ${q(name)}, ${q(roleKey)}, ${sortOrder})`,
    )
    .join(",\n") + "\non conflict (id) do nothing;",
);
say("");

const sponsorsFile = readFileSync("lib/data/sponsors.ts", "utf8");
const sponsorRows = [
  ...sponsorsFile.matchAll(
    /\{ id: "([^"]+)", name: "([^"]+)", logoUrl: (null|"[^"]*"), websiteUrl: (null|"[^"]*"), tier: "([^"]+)", sortOrder: (\d+), jerseyPosition: (null|\{ x: \d+, y: \d+ \})/g,
  ),
];
say("insert into public.sponsors (id, name, logo_url, website_url, tier, sort_order, jersey_position) values");
say(
  sponsorRows
    .map(([, id, name, logo, site, tier, sort, jersey]) => {
      const position =
        jersey === "null"
          ? "NULL"
          : json(JSON.parse(jersey.replace(/(\w+):/g, '"$1":')));
      return `  (md5(${q(`sponsor:${id}`)})::uuid, ${q(name)}, ${logo === "null" ? "NULL" : q(logo.slice(1, -1))}, ${site === "null" ? "NULL" : q(site.slice(1, -1))}, ${q(tier)}, ${sort}, ${position})`;
    })
    .join(",\n") + "\non conflict (id) do nothing;",
);
say("");

say("-- Termine des Vereins (von der alten Seite).");
say(
  `insert into public.events (id, slug, title, body, starts_at, ends_at, location)
values (md5('event:waemper-2026')::uuid, 'waemper-triathlon-lof-2026', ${json({ lb: "Wämper Triathlon + Wämper Lof" })}, ${json({ lb: "Den 22. an 23. August zu Weiswampech." })}, '2026-08-22', '2026-08-23', 'Weiswampach')
on conflict (id) do nothing;`,
);
say("");

say("-- Langtexte. body traegt die Bloecke je Sprache; lb ist gefuellt, de und");
say("-- fr folgen, sobald der Verein uebersetzt (§11: stiller Rueckfall).");
for (const [slug, page] of Object.entries(pages.pages)) {
  if (page.blocks.length === 0) continue;
  const heading = page.blocks.find((b) => b.type === "heading");
  const title = { lb: heading?.text ?? slug };
  say(
    `insert into public.pages (id, slug, title, body)
values (md5(${q(`page:${slug}`)})::uuid, ${q(slug)}, ${json(title)}, ${json({ lb: page.blocks })})
on conflict (id) do nothing;`,
  );
}
say("");
say("commit;");

writeFileSync("supabase/seed.sql", out.join("\n") + "\n");

console.log(`supabase/seed.sql geschrieben`);
console.log(`  ${records.disciplines.length} Disziplinen`);
console.log(`  ${records.records.length} Rekorde + ${records.venue.length} Stade`);
console.log(`  ${best.performances.length} Bestleistungen`);
console.log(`  ${coachRows.length} Trainer:innen, ${committeeRows.length} Vorstand`);
console.log(`  ${sponsorRows.length} Sponsoren`);
console.log(`  ${Object.values(pages.pages).filter((p) => p.blocks.length > 0).length} Textseiten`);
