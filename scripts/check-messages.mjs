#!/usr/bin/env node
/**
 * §11: lb ist die Referenz. Diese Pruefung meldet, welche Keys in den anderen
 * Sprachen fehlen — im Betrieb faellt die Seite still auf lb zurueck, aber im
 * Build soll sichtbar sein, was noch zu uebersetzen ist.
 *
 * Welche Sprachen es gibt, steht in config/site.ts und wird von dort gelesen.
 * Stand hier eine eigene Liste, pruefte eine neu aufgenommene Sprache
 * monatelang niemand — genau so ist Englisch beim ersten Anlauf durch die
 * Pruefung gerutscht.
 */
import { readFileSync } from "node:fs";

const load = (locale) =>
  JSON.parse(readFileSync(new URL(`../messages/${locale}.json`, import.meta.url), "utf8"));

const flatten = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([key, value]) =>
    typeof value === "object" && value !== null
      ? flatten(value, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );

/* Aus config/site.ts gelesen statt importiert: die Datei ist TypeScript,
   und dieses Skript laeuft ohne Uebersetzungsschritt. */
const siteConfig = readFileSync(
  new URL("../config/site.ts", import.meta.url),
  "utf8",
);
const localesMatch = siteConfig.match(/export const locales = \[([^\]]*)\]/);
if (!localesMatch) {
  console.error("locales in config/site.ts nicht gefunden.");
  process.exit(1);
}
const locales = [...localesMatch[1].matchAll(/"([a-z-]+)"/g)].map((m) => m[1]);
const defaultLocale = locales[0];

const reference = new Set(flatten(load(defaultLocale)));
let missingTranslations = 0;

for (const locale of locales.filter((l) => l !== defaultLocale)) {
  const keys = new Set(flatten(load(locale)));
  const absent = [...reference].filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !reference.has(k));

  if (absent.length > 0) {
    missingTranslations += absent.length;
    console.error(`${locale}: ${absent.length} Key(s) fehlen`);
    for (const k of absent) console.error("   fehlt  " + k);
  }
  if (extra.length > 0) {
    console.warn(`${locale}: ${extra.length} Key(s) ohne Gegenstueck in lb`);
    for (const k of extra) console.warn("   extra  " + k);
  }
}

if (missingTranslations > 0) process.exit(1);
console.log(
  `Messages: ${locales.join("/")} vollstaendig (${reference.size} Keys).`,
);

/**
 * Zweite Pruefung: benutzt der Code Schluessel, die es nicht gibt?
 *
 * Die Sprachdateien koennen deckungsgleich sein und trotzdem falsch — wenn
 * eine Komponente t("tierPartner") im Namensraum admin ruft, die Bezeichnung
 * aber unter sponsors steht. Das faellt sonst erst im Browser auf, als
 * "admin.tierPartner" mitten im Formular, und nur wenn jemand hinschaut.
 */
import { readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const SOURCE_DIRS = ["app", "components", "lib"];
const reference2 = load(defaultLocale);

const flat = new Set(flatten(reference2));

function* sources(dir) {
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry);
    if (statSync(abs).isDirectory()) yield* sources(abs);
    else if ([".ts", ".tsx"].includes(extname(abs))) yield abs;
  }
}

/**
 * Variablenname -> alle Namensraeume, an die er in der Datei gebunden wird.
 *
 * Mehrzahl, weil derselbe Name mehrfach vorkommt: generateMetadata bindet t
 * oft an "nav", die Seite darunter an "records". Ein Schluessel gilt als
 * vorhanden, wenn ihn einer der Namensraeume kennt — sonst meldet die
 * Pruefung Dinge, die es gibt, und man gewoehnt sich an, sie zu ignorieren.
 */
function namespacesOf(source) {
  const map = {};
  const patterns = [
    /const\s+(\w+)\s*=\s*(?:await\s+)?(?:use|get)Translations\(\s*"([^"]+)"\s*\)/g,
    /const\s+(\w+)\s*=\s*await\s+getTranslations\(\s*\{[^}]*namespace:\s*"([^"]+)"/g,
  ];
  for (const pattern of patterns) {
    for (const m of source.matchAll(pattern)) {
      (map[m[1]] ??= new Set()).add(m[2]);
    }
  }
  return map;
}

const unknownKeys = [];
for (const dir of SOURCE_DIRS) {
  for (const file of sources(dir)) {
    const source = readFileSync(file, "utf8");
    const map = namespacesOf(source);
    if (Object.keys(map).length === 0) continue;

    for (const [variable, namespaces] of Object.entries(map)) {
      const calls = new RegExp(`\\b${variable}\\(\\s*"([^"${"`"}]+)"`, "g");
      for (const call of source.matchAll(calls)) {
        const candidates = [...namespaces].map((ns) => `${ns}.${call[1]}`);
        if (!candidates.some((key) => flat.has(key))) {
          unknownKeys.push(`${file}: ${variable}("${call[1]}") -> ${candidates.join(" | ")}`);
        }
      }
    }
  }
}

if (unknownKeys.length > 0) {
  console.error(`\n${unknownKeys.length} Schluessel im Code ohne Eintrag in lb.json:`);
  for (const entry of [...new Set(unknownKeys)]) console.error("   " + entry);
  process.exit(1);
}
console.log("Schluessel im Code: alle in lb.json vorhanden.");
