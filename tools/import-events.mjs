#!/usr/bin/env node
/**
 * Wettkampfkalender von fla.lu (§9: /next).
 *
 * Der Verband fuehrt den Kalender fuer die ganze Leichtathletik in Luxemburg.
 * Dieses Skript liest ihn und schreibt data/events.json als Seed fuer die
 * Terminseite.
 *
 * Rechtlicher Hinweis fuer den Verein: Datum, Ort und Name einer oeffentlichen
 * Sportveranstaltung sind Tatsachen und als solche nicht geschuetzt. Den
 * kompletten Verbandskalender dauerhaft zu spiegeln, ist trotzdem eine Frage
 * an die FLA — jeder Eintrag verlinkt deshalb auf die Quelle zurueck, und ab
 * Phase 5 pflegt der Vorstand ohnehin die eigenen Termine im Admin.
 *
 *   node tools/import-events.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";

const SOURCE = "https://www.fla.lu/calendrier-80552v4";

/**
 * Wie viele Monate im Voraus.
 *
 * Die Seite rendert serverseitig nur den Monat, nach dem gefragt wird —
 * ohne Parameter den laufenden. Ein Kalender, der am 24. August genau einen
 * Termin zeigt, ist keiner; deshalb wird Monat fuer Monat abgefragt.
 */
const MONTHS_AHEAD = 12;

/**
 * Eigene Veranstaltungen im Verbandskalender erkennen.
 *
 * Der Kalender der FLA führt die Läufe des CELTIC ohnehin — der Nordstadlaf
 * steht dort unter seinem offiziellen Namen und mit dem Stade Municipal als
 * Ort. Sie ein zweites Mal von Hand einzutragen hiesse, sie an zwei Stellen
 * pflegen zu müssen und irgendwann zwei verschiedene Uhrzeiten zu haben.
 *
 * Das hier ist eine Vermutung, keine Zuordnung: der Vorstand kann sie im
 * Redaktionssystem für jeden Termin überstimmen.
 */
const OWN_RACE = /nordstad|eurocross|tri-?celtic|wämper|waemper|stade municipal.*diekirch/i;
const ORIGIN = "https://www.fla.lu";

const MONTHS = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

const clean = (s) =>
  s
    .replace(/<!--.*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;| /g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)))
    .replace(/\s+/g, " ")
    .trim();

/** Letztes Vorkommen eines Musters in einem Abschnitt. */
function last(pattern, text) {
  let match = null;
  for (const m of text.matchAll(pattern)) match = m;
  return match;
}

/** Monatsanfänge ab heute. */
function monthStarts(count) {
  const out = [];
  const now = new Date();
  for (let i = 0; i < count; i += 1) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + i, 1));
    out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

const events = [];
const skipped = [];

for (const month of monthStarts(MONTHS_AHEAD)) {
  const url = `${SOURCE}?date=${month}`;
  const response = await fetch(url, { headers: { "User-Agent": "celtic-import" } });
  if (!response.ok) throw new Error(`${url} -> ${response.status}`);
  const html = await response.text();

  const blocks = html.split(/href="\/events\/(\d+)"/);
  const before_count = events.length;

/* split() liefert abwechselnd Text und ID: Text[0], ID[1], Text[2], ID[3] ... */
for (let i = 1; i < blocks.length; i += 2) {
  const id = blocks[i];
  const before = blocks[i - 1] ?? "";

  const dateMatch = last(/<h3[^>]*>([^<]*\d{4})<\/h3>/g, before);
  const timeMatch = last(/<p[^>]*>([A-Za-z]+day\s*\|\s*\d{1,2}:\d{2})<\/p>/g, before);
  const titleMatch = last(/<strong>((?:(?!<\/strong>).)*)<\/strong>/gs, before);
  const tagMatch = last(/__tagName"[^>]*>((?:(?!<\/span>).)*)<\/span>/gs, before);

  if (!dateMatch || !titleMatch) {
    skipped.push({ id, reason: "Datum oder Titel fehlt" });
    continue;
  }

  /*
    Die FLA schreibt mehrtaegige Veranstaltungen als "4 - 6 September 2026".
    Ohne eigene Behandlung wurde daraus der Tag "4-6", Number() ergab NaN und
    im Datenbestand stand "2026-09-NaN" — was erst auf der Seite auffiel, und
    zwar als Absturz.
  */
  const rawDate = clean(dateMatch[1]);
  const days = [...rawDate.matchAll(/\b(\d{1,2})\b(?!\d)/g)].map((m) => Number(m[1]));
  const monthMatch = /\b([A-Za-z]+)\b/.exec(rawDate);
  const yearMatch = /\b(\d{4})\b/.exec(rawDate);
  const month = MONTHS[(monthMatch?.[1] ?? "").toLowerCase()];
  const year = yearMatch?.[1];
  const day = days[0];
  const endDay = days.length > 1 ? days[days.length - 1] : null;

  if (!month || day === undefined || !year) {
    skipped.push({ id, reason: `Datum unlesbar: ${rawDate}` });
    continue;
  }

  const time = timeMatch ? clean(timeMatch[1]).split("|")[1]?.trim() : null;
  const title = clean(titleMatch[1]);

  /* "Plus d'informations" ist der Knopftext, kein Veranstaltungstitel. */
  if (title === "" || /^Plus d'inform/i.test(title) || title === "Événement") {
    skipped.push({ id, reason: `Titel unbrauchbar: ${title}` });
    continue;
  }

  /* Der Ort steht im Absatz nach der Uhrzeit und ist oft leer. */
  const locationMatch = timeMatch
    ? /<p[^>]*>((?:(?!<\/p>).)*)<\/p>/s.exec(before.slice(timeMatch.index + timeMatch[0].length))
    : null;
  const location = locationMatch ? clean(locationMatch[1]) : "";

  const pad = (n) => String(n).padStart(2, "0");
  const date = `${year}-${pad(month)}-${pad(day)}`;
  const endDate =
    endDay !== null && endDay !== day ? `${year}-${pad(month)}-${pad(endDay)}` : null;

  events.push({
    id: `fla-${id}`,
    title,
    date,
    endDate,
    time: time ?? null,
    location: location || null,
    category: tagMatch ? clean(tagMatch[1]) : null,
    sourceUrl: `${ORIGIN}/events/${id}`,
    isClubRace: OWN_RACE.test(`${title} ${location}`),
  });
}

  console.log(`${month.slice(0, 7)}  ${String(events.length - before_count).padStart(3)}`);
}

/* Doppelte Karten (Mobil- und Desktopfassung derselben Veranstaltung). */
const unique = [...new Map(events.map((e) => [e.id, e])).values()].sort((a, b) =>
  a.date.localeCompare(b.date),
);

/* Kein ungueltiges Datum darf in die Datei. Was hier auffaellt, ist ein
   Fehler im Import und keine Eigenheit der Quelle. */
const invalid = unique.filter((e) => Number.isNaN(new Date(e.date).getTime()));
if (invalid.length > 0) {
  console.log(`\n${invalid.length} Termin(e) mit ungueltigem Datum — nicht geschrieben:`);
  for (const e of invalid) console.log(`  ${e.date}  ${e.title}`);
}
const clean_events = unique.filter((e) => !Number.isNaN(new Date(e.date).getTime()));

mkdirSync("data", { recursive: true });
writeFileSync(
  "data/events.json",
  JSON.stringify(
    {
      source: SOURCE,
      monthsAhead: MONTHS_AHEAD,
      importedAt: new Date().toISOString().slice(0, 10),
      events: clean_events,
    },
    null,
    1,
  ) + "\n",
);

const own = clean_events.filter((e) => e.isClubRace);
console.log(
  `${clean_events.length} Termin(e) importiert, davon ${own.length} als eigene erkannt`,
);
for (const e of unique) {
  console.log(`  ${e.date} ${e.time ?? "     "}  ${e.title}${e.location ? " — " + e.location : ""}`);
}
if (skipped.length > 0) {
  console.log(`\n${skipped.length} uebersprungen:`);
  for (const s of skipped) console.log(`  ${s.id}: ${s.reason}`);
}
