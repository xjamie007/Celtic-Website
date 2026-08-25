#!/usr/bin/env node
/**
 * Bestleistungen nach Kategorie (§9: /beschtleeschtungen).
 *
 * Die alte Seite fuehrt sie als Matrix: Belag mal Geschlecht mal
 * Altersklasse, jede Kombination eine eigene Word-Tabelle. Dieses Skript
 * liest alle und schreibt data/best-performances.json.
 *
 * Die Regeln zum Lesen der Leistungen stehen in tools/lib/athletics.mjs und
 * sind dieselben wie beim Rekordimport — sonst stuende dieselbe Zeit auf
 * zwei Seiten unterschiedlich.
 *
 *   node tools/import-best-performances.mjs
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

/**
 * Die Kategorie steht zweimal in der Zeile: einmal als Kuerzel der Seite,
 * einmal als die Klasse, in der die Leistung wirklich erzielt wurde. Eine
 * U20-Bestleistung kann von jemandem stammen, der damals U18 war — beides
 * bleibt erhalten.
 */
const PAGES = [
  { path: "387/545/747", surface: "piste", gender: "f", category: "Sen" },
  { path: "387/545/749", surface: "piste", gender: "f", category: "U23" },
  { path: "387/545/751", surface: "piste", gender: "f", category: "U20" },
  { path: "387/545/753", surface: "piste", gender: "f", category: "U18" },
  { path: "387/545/755", surface: "piste", gender: "f", category: "U16" },
  { path: "387/545/757", surface: "piste", gender: "f", category: "U14" },
  { path: "387/545/759", surface: "piste", gender: "f", category: "U12" },
  { path: "387/553/768", surface: "indoor", gender: "f", category: "Sen" },
  { path: "387/553/770", surface: "indoor", gender: "f", category: "U20" },
  { path: "387/553/772", surface: "indoor", gender: "f", category: "U18" },
  { path: "387/553/774", surface: "indoor", gender: "f", category: "U16" },
  { path: "387/553/776", surface: "indoor", gender: "f", category: "U14" },
  { path: "387/553/778", surface: "indoor", gender: "f", category: "U12" },
  { path: "387/554/1034", surface: "piste", gender: "m", category: "Sen" },
  { path: "387/554/1039", surface: "piste", gender: "m", category: "U20" },
  { path: "387/554/1041", surface: "piste", gender: "m", category: "U18" },
  { path: "387/554/1043", surface: "piste", gender: "m", category: "U16" },
  { path: "387/554/1045", surface: "piste", gender: "m", category: "U14" },
  { path: "387/554/1047", surface: "piste", gender: "m", category: "U12" },
  { path: "387/554/1049", surface: "piste", gender: "m", category: "Relais" },
  { path: "387/555/787", surface: "indoor", gender: "m", category: "Sen" },
  { path: "387/555/789", surface: "indoor", gender: "m", category: "U20" },
  { path: "387/555/791", surface: "indoor", gender: "m", category: "U18" },
  { path: "387/555/793", surface: "indoor", gender: "m", category: "U16" },
  { path: "387/555/795", surface: "indoor", gender: "m", category: "U14" },
  { path: "387/555/797", surface: "indoor", gender: "m", category: "U12" },
];

const performances = [];
const unknownDisciplines = [];
const unparsed = [];
let swapped = 0;

/** Sieht die Zeile ueberhaupt nach einer Leistung aus? */
const looksLikeRow = (cells) =>
  cells.length >= 5 && cells.some((c) => /^\d{4}$/.test(c));

/**
 * Kategoriekuerzel wie Sen, Jun, Cad, Min, Déb oder U16.
 *
 * Die Spaltenzahl schwankt: die meisten Tabellen fuehren das Kuerzel in der
 * zweiten Spalte, ein Teil laesst es weg. Wird das nicht erkannt, liest der
 * Import den Namen als Leistung — beim ersten Lauf waren das 40 Zeilen, die
 * als "unlesbare Leistung Scol" gemeldet wurden.
 */
const CATEGORY = /^(Sen|Jun|Cad|Min|Esp|Ben|Lud|Deb|Déb|Scol|U\d+|Relais)\.?$/i;

/**
 * Die Kuerzel der alten Seite auf die U-Notation.
 *
 * Auf den Uebersichtsseiten steht die Kategorie zeilenweise, nicht fuer die
 * ganze Seite: dieselbe Staffelzeit taucht dort unter Esp, Jun und Cad auf.
 * Wird das ignoriert und stattdessen die Seitenkategorie genommen, entstehen
 * drei identische Eintraege — und die Bestenliste behauptet, es haette
 * dreimal jemand dieselbe Zeit gelaufen.
 */
const CATEGORY_MAP = {
  sen: "Sen",
  esp: "U23",
  jun: "U20",
  cad: "U18",
  min: "U16",
  scol: "U14",
  deb: "U12",
  déb: "U12",
  ben: "U12",
  lud: "U12",
  relais: "Relais",
};

function normaliseCategory(raw, fallback) {
  const key = (raw ?? "").toLowerCase().replace(/\./g, "").trim();
  if (/^u\d+$/.test(key)) return key.toUpperCase();
  return CATEGORY_MAP[key] ?? fallback;
}

for (const page of PAGES) {
  const url = BASE.replace("{path}", page.path);
  const response = await fetch(url, { headers: { "User-Agent": "celtic-import" } });
  if (!response.ok) throw new Error(`${url} -> ${response.status}`);
  const html = await response.text();

  const label = `${page.surface}/${page.gender}/${page.category}`;
  let taken = 0;

  for (let cells of rowsOf(html)) {
    /*
      Ein Teil der Tabellen fuehrt Leistung und Disziplin in umgekehrter
      Reihenfolge. Das laesst sich erkennen statt raten: loest die erste
      Zelle keine Disziplin auf, die zweite aber schon, sind sie vertauscht.
    */
    let row = cells;
    let discipline = resolveDiscipline(cells[0] ?? "");
    if (!discipline && resolveDiscipline(cells[1] ?? "")) {
      row = [cells[1], cells[0], ...cells.slice(2)];
      discipline = resolveDiscipline(row[0] ?? "");
      swapped += 1;
    }
    if (!discipline) {
      if (looksLikeRow(cells)) unknownDisciplines.push({ page: label, cells });
      continue;
    }
    cells = row;

    /* Spalten: Disziplin | [Kuerzel] | Leistung | Name | Vorname | Klasse | Jahr */
    const shift = CATEGORY.test(cells[1] ?? "") ? 1 : 0;
    /* Die Kategorie der Zeile schlaegt die der Seite. */
    const category = shift
      ? normaliseCategory(cells[1], page.category)
      : page.category;
    const performanceRaw = cells[1 + shift] ?? "";
    const c3 = cells[2 + shift];
    const c4 = cells[3 + shift];
    const c5 = cells[4 + shift];
    const c6 = cells[5 + shift];
    const performance = parsePerformance(performanceRaw, discipline.kind);
    if (!performance) {
      unparsed.push({ page: label, cells });
      continue;
    }

    const year = yearOf(c6 ?? c5 ?? "");
    if (year === null) {
      unparsed.push({ page: label, cells });
      continue;
    }

    const national = /\*\*/.test(`${cells[0]} ${performanceRaw}`);
    const espoirs = !national && /\*/.test(`${cells[0]} ${performanceRaw}`);

    performances.push({
      id: `${page.gender}-${page.surface}-${category}-${discipline.key}-${taken}`,
      disciplineKey: discipline.key,
      /* Die Schreibweise der alten Seite bleibt fuer die Anzeige erhalten —
         "Poids 3 Kg" sagt mehr als "Poids", wenn es um eine U16-Liste geht. */
      disciplineRaw: (cells[0] ?? "").replace(/\*+|\+\+/g, "").trim(),
      surface: page.surface,
      gender: page.gender,
      /* Die Kategorie der Zeile — danach wird gefiltert. */
      category,
      /* Die Klasse, in der die Leistung erzielt wurde. */
      achievedIn: c5 && /^U\d|Sen|Jun|Cad|Esp/.test(c5) ? c5 : null,
      performanceRaw: performance.display,
      performanceNumeric: performance.numeric,
      year,
      isNationalRecord: national,
      isEspoirsBest: espoirs,
      holders: holdersOf(c3 ?? "", c4 ?? ""),
    });
    taken += 1;
  }

  console.log(`${label.padEnd(24)} ${String(taken).padStart(3)}`);
}

/*
  Je Kategorie, Belag, Geschlecht und Disziplin bleibt die beste Leistung.
  Die Uebersichtsseiten fuehren teils mehrere Staffelzeiten untereinander —
  das ist eine Bestenliste, keine Bestleistung. Unterschiedliche
  Geraetegewichte bleiben getrennt: Javelot 500 g und Javelot 600 g sind
  zwei Wettbewerbe, nicht zwei Schreibweisen.
*/
const best = new Map();
for (const p of performances) {
  const key = [p.category, p.surface, p.gender, p.disciplineRaw.toLowerCase()].join("|");
  const kind = p.disciplineKey;
  const current = best.get(key);
  if (!current) {
    best.set(key, p);
    continue;
  }
  const better =
    catalogue.find((d) => d.key === kind)?.kind === "time"
      ? p.performanceNumeric < current.performanceNumeric
      : p.performanceNumeric > current.performanceNumeric;
  if (better) best.set(key, p);
}
const deduped = [...best.values()];
console.log(`  ${performances.length - deduped.length} Dublette(n) zusammengefasst`);
performances.length = 0;
performances.push(...deduped);

const ids = new Set(performances.map((p) => p.id));
if (ids.size !== performances.length) {
  performances.forEach((p, i) => { p.id = `${p.id}-${i}`; });
}

mkdirSync("data", { recursive: true });
writeFileSync(
  "data/best-performances.json",
  JSON.stringify(
    {
      source: "celtic.lu (altes CMS)",
      importedAt: new Date().toISOString().slice(0, 10),
      performances,
    },
    null,
    1,
  ) + "\n",
);

console.log(`\n${performances.length} Bestleistungen`);
if (swapped > 0) {
  console.log(`  davon ${swapped} Zeile(n) mit vertauschten Spalten erkannt`);
}
if (unknownDisciplines.length > 0) {
  console.log(`\n${unknownDisciplines.length} Zeile(n) mit unbekannter Disziplin:`);
  for (const row of unknownDisciplines.slice(0, 12)) {
    console.log(`  [${row.page}] ${row.cells.join(" | ")}`);
  }
}
if (unparsed.length > 0) {
  console.log(`\n${unparsed.length} Zeile(n) mit unlesbarer Leistung:`);
  for (const row of unparsed.slice(0, 12)) {
    console.log(`  [${row.page}] ${row.cells.join(" | ")}`);
  }
}
if (unknownDisciplines.length === 0 && unparsed.length === 0) {
  console.log("\nAlle Zeilen gelesen.");
}
