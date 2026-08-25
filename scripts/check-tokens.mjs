#!/usr/bin/env node
/**
 * §3 des Auftrags: "Kein einziger Hex-Wert darf sonst irgendwo im Code stehen."
 *
 * Die Farbwerte des Trikots sind aus Fotos abgeleitet. Sobald der Verein die
 * offiziellen Pantone-/HEX-Werte liefert, muss ein einziger Ort geaendert
 * werden. Diese Pruefung haelt das durch — sie faellt beim ersten Hex-Wert,
 * der sich in eine Komponente schleicht.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const ROOT = process.cwd();
const ALLOWED = new Set(["app/globals.css"]);
const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "public", "app/fonts"]);
const EXTENSIONS = new Set([".ts", ".tsx", ".css", ".js", ".jsx", ".mjs"]);
const HEX = /#[0-9a-fA-F]{3,8}\b/g;
/** rgb()/rgba()/hsl()/hsla() mit Zahlen sind genauso hartkodierte Farben. */
const FUNCTIONAL = /\b(?:rgba?|hsla?)\(\s*[\d.]/g;

/** Farbaehnliche Laengen: #rgb, #rrggbb, #rrggbbaa */
const isColorLength = (hex) => [4, 7, 9].includes(hex.length);

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const abs = join(dir, entry);
    const rel = relative(ROOT, abs);
    if (SKIP_DIRS.has(entry) || SKIP_DIRS.has(rel)) continue;
    if (statSync(abs).isDirectory()) yield* walk(abs);
    else if (EXTENSIONS.has(extname(abs))) yield abs;
  }
}

const findings = [];
for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file);
  if (ALLOWED.has(rel)) continue;
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const match of line.matchAll(HEX)) {
      if (!isColorLength(match[0])) continue;
      findings.push(`${rel}:${i + 1}  ${match[0]}  ${line.trim().slice(0, 90)}`);
    }
    for (const match of line.matchAll(FUNCTIONAL)) {
      findings.push(`${rel}:${i + 1}  ${match[0]}...  ${line.trim().slice(0, 90)}`);
    }
  });
}

if (findings.length > 0) {
  console.error("Hartkodierte Farben ausserhalb von app/globals.css gefunden:\n");
  for (const f of findings) console.error("  " + f);
  console.error(
    "\nFarben gehoeren als Rollen-Token nach app/globals.css (§3). Dort steht" +
      "\ndie einzige Ebene mit Hex-Werten, damit der Verein sie spaeter durch" +
      "\ndie offiziellen Pantone-Werte ersetzen kann.\n",
  );
  process.exit(1);
}

console.log("Farbtokens: keine hartkodierten Farben ausserhalb von app/globals.css.");
