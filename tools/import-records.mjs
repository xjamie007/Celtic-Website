#!/usr/bin/env node
/**
 * Migration der Rekorde von der alten Seite (§9, §12).
 *
 * Die alte Seite laeuft auf einem CMS, das Word-Tabellen ausgibt. Die Daten
 * darin sind inhaltlich richtig, in der Schreibweise aber uneinheitlich
 * gewachsen: dieselbe Staffel steht einmal als 47"18 und einmal als 44,56,
 * eine Zeit als 34'04 10 ohne Anfuehrungszeichen, Disziplinen mal als
 * "1 Mile", mal als "1 mile", mal als "1 Meile".
 *
 * Dieses Skript liest die sieben Tabellen, normalisiert Schreibweisen auf die
 * Wettkampfnotation und schreibt data/records.json.
 *
 * Grundregel: Es raet nie. Was nicht sicher gelesen werden kann, landet in
 * "unparsed" und wird beim Lauf ausgegeben — eine falsch importierte
 * Rekordzeit faellt niemandem auf, und genau das macht sie gefaehrlich.
 *
 *   node tools/import-records.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";

import {
  BASE,
  catalogue,
  holdersOf,
  parsePerformance,
  resolveDiscipline,
  rowsOf,
  yearOf,
} from "./lib/athletics.mjs";

/** Die sieben Tabs aus §9. "stade" hat eine andere Spaltenreihenfolge. */
const PAGES = [
  { id: "400", surface: "piste", gender: "f" },
  { id: "401", surface: "piste", gender: "m" },
  { id: "403", surface: "indoor", gender: "f" },
  { id: "404", surface: "indoor", gender: "m" },
  { id: "17446", surface: "route", gender: "f" },
  { id: "17464", surface: "route", gender: "m" },
  { id: "402", surface: "stade", gender: null, venue: true },
];

/* ── Lauf ──────────────────────────────────────────────────────────────── */

const records = [];
const venue = [];
const unparsed = [];
const unknownDisciplines = [];

/** Sieht die Zeile ueberhaupt nach einem Rekord aus? Kopf- und Fusszeilen
 *  sollen nicht als Fehler gemeldet werden, echte Zeilen aber schon. */
const looksLikeRecordRow = (cells) =>
  cells.length >= 5 && cells.some((c) => /^\d{4}$/.test(c));

for (const page of PAGES) {
  const url = BASE.replace("{path}", `386/${page.id}`);
  const response = await fetch(url, { headers: { "User-Agent": "celtic-import" } });
  if (!response.ok) throw new Error(`${url} -> ${response.status}`);
  const html = await response.text();

  let taken = 0;
  for (const cells of rowsOf(html)) {
    const [c0, c1, c2, c3, c4, c5] = cells;
    const disciplineRaw = c0 ?? "";
    const discipline = resolveDiscipline(disciplineRaw);
    if (!discipline) {
      /* Eine unbekannte Disziplin ist kein Grund zum Weitergehen, sondern
         eine Meldung. Still uebersprungene Zeilen sind der einzige Weg, auf
         dem eine Rekordliste unvollstaendig wird, ohne dass es auffaellt. */
      if (looksLikeRecordRow(cells)) {
        unknownDisciplines.push({
          page: `${page.surface}/${page.gender ?? "all"}`,
          cells,
        });
      }
      continue;
    }

    /* Die Marker stehen mal an der Disziplin, mal an der Leistung. */
    const markerSource = `${disciplineRaw} ${page.venue ? c5 : c1}`;
    const national = /\*\*/.test(markerSource);
    const espoirs = !national && /\*/.test(markerSource);

    const performanceRaw = page.venue ? (c5 ?? "") : (c1 ?? "");
    const performance = parsePerformance(performanceRaw, discipline.kind);
    if (!performance) {
      unparsed.push({ page: `${page.surface}/${page.gender ?? "all"}`, cells });
      continue;
    }

    if (page.venue) {
      /* Stade: Rekorde, die im Stadion aufgestellt wurden — von wem auch
         immer. Andere Spaltenreihenfolge und eine Nation statt Kategorie. */
      venue.push({
        id: `stade-${discipline.key}-${venue.length}`,
        disciplineKey: discipline.key,
        performanceRaw: performance.display,
        performanceNumeric: performance.numeric,
        holders: [{ lastName: c2 ?? "", firstName: c1 ?? null }],
        nation: c3 ?? null,
        year: yearOf(c4 ?? ""),
        isNationalRecord: national,
      });
      taken += 1;
      continue;
    }

    const year = yearOf(c5 ?? c4 ?? "");
    if (year === null) {
      unparsed.push({ page: `${page.surface}/${page.gender}`, cells });
      continue;
    }

    /* Fehlt die Kategorie, rutschen Jahr und Kategorie eine Spalte nach
       vorn — die alte Seite laesst sie gelegentlich weg. */
    const hasCategory = cells.length >= 6;

    records.push({
      /* Der Index haengt hinten dran, weil eine Disziplin in einer Tabelle
         mehrfach stehen kann — etwa wenn zwei Athletinnen denselben Wert
         halten und die alte Seite dafuer zwei Zeilen fuehrt. */
      id: `${page.gender}-${page.surface}-${discipline.key}-${taken}`,
      disciplineKey: discipline.key,
      surface: page.surface,
      gender: page.gender,
      performanceRaw: performance.display,
      performanceNumeric: performance.numeric,
      /* Teilen sich zwei Athlet:innen einen Rekord, steht in der Zelle
         "U23 U20". Zum Filtern taugt das nicht — dafuer zaehlt die erste
         Kategorie; die vollstaendige Angabe bleibt fuer die Anzeige. */
      category: hasCategory ? (c4 ?? "").split(/\s+/)[0] ?? "" : "",
      categoryRaw: hasCategory ? (c4 ?? "") : "",
      year,
      yearRaw: (hasCategory ? c5 : c4) ?? String(year),
      date: null,
      isNationalRecord: national,
      isEspoirsBest: espoirs,
      holders: holdersOf(c2 ?? "", c3 ?? ""),
    });
    taken += 1;
  }
  console.log(`${page.surface}/${page.gender ?? "all"}: ${taken}`);
}

mkdirSync("data", { recursive: true });
writeFileSync(
  "data/records.json",
  JSON.stringify(
    {
      source: "celtic.lu (altes CMS)",
      importedAt: new Date().toISOString().slice(0, 10),
      /* Der Katalog wird mitgeschrieben, damit es genau eine Quelle fuer
         Reihenfolge und Art der Disziplinen gibt. */
      disciplines: catalogue,
      records,
      venue,
    },
    null,
    1,
  ) + "\n",
);

const ids = new Set(records.map((r) => r.id));
if (ids.size !== records.length) {
  throw new Error(`Doppelte IDs: ${records.length - ids.size}`);
}

console.log(`\n${records.length} Vereinsrekorder, ${venue.length} Stade-Rekorder`);
if (unknownDisciplines.length > 0) {
  console.log(`\n${unknownDisciplines.length} Zeile(n) mit unbekannter Disziplin:`);
  for (const row of unknownDisciplines) {
    console.log(`  [${row.page}] ${row.cells.join(" | ")}`);
  }
}
if (unparsed.length > 0) {
  console.log(`\n${unparsed.length} Zeile(n) mit unlesbarer Leistung:`);
  for (const row of unparsed) console.log(`  [${row.page}] ${row.cells.join(" | ")}`);
}
if (unknownDisciplines.length === 0 && unparsed.length === 0) {
  console.log("\nAlle Zeilen gelesen.");
}
