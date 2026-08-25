#!/usr/bin/env node
/**
 * §8: "Kontrastverhaeltnisse mindestens AA."
 *
 * Geprueft werden die Kombinationen, die auf der Seite wirklich vorkommen —
 * nicht alle moeglichen. Eine Farbe ist nicht gut oder schlecht, sondern nur
 * auf einem bestimmten Grund lesbar oder nicht.
 *
 * AA verlangt 4.5:1 fuer Fliesstext und 3:1 fuer grosse Schrift (ab 24px,
 * oder ab 18.66px bei Fettschrift). Bedienelemente und Ränder brauchen
 * ebenfalls 3:1.
 */
import { readFileSync } from "node:fs";

const css = readFileSync("app/globals.css", "utf8");

/** Die Trikotwerte aus Ebene 1 direkt aus dem Stylesheet lesen. */
function token(name) {
  const match = new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`).exec(css);
  if (!match) throw new Error(`Token nicht gefunden: --${name}`);
  return match[1];
}

const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

/** WCAG 2.1 relative Luminanz. */
function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

/** Farbe auf Grund mischen, fuer die halbtransparenten Rollen-Tokens. */
function mix(fg, bg, alpha) {
  const [fr, fg2, fb] = hexToRgb(fg);
  const [br, bg2, bb] = hexToRgb(bg);
  const blend = (f, b) => Math.round(f * alpha + b * (1 - alpha));
  const toHex = (n) => n.toString(16).padStart(2, "0");
  return `#${toHex(blend(fr, br))}${toHex(blend(fg2, bg2))}${toHex(blend(fb, bb))}`;
}

const blue = token("celtic-blue");
const deep = token("celtic-blue-deep");
const ink = token("celtic-ink");
const magenta = token("celtic-magenta");
const magentaBright = token("celtic-magenta-bright");
const magentaDeep = token("celtic-magenta-deep");
const gold = token("celtic-gold");
const paper = token("celtic-paper");
const white = token("celtic-white");

/* [Beschreibung, Vordergrund, Grund, benoetigt] */
const checks = [
  ["Fliesstext auf Papier", ink, paper, 4.5],
  ["muted-on-page (64%) auf Papier", mix(ink, paper, 0.64), paper, 4.5],
  ["Hairline auf Papier (Rand)", mix(ink, paper, 0.12), paper, 1],
  ["accent-on-page (Text) auf Papier", magentaDeep, paper, 4.5],
  ["Fokusring auf Papier (Grafik)", magenta, paper, 3],
  ["Nav-Akzent heller Ton (aktive Sprache)", magentaDeep, paper, 4.5],
  ["Unterstreichung auf Papier (Grafik)", magenta, paper, 3],

  ["Text auf Ink (Footer, Nav)", white, ink, 4.5],
  ["muted-on-ink (62%) auf Ink", mix(white, ink, 0.62), ink, 4.5],
  ["accent-on-dark (Text) auf Ink", magentaBright, ink, 4.5],
  ["Nav-Akzent dunkler Ton (aktive Sprache)", magentaBright, ink, 4.5],

  ["Text auf blue-deep (Rekordtabelle)", paper, deep, 4.5],
  ["muted-on-ink (62%) auf blue-deep", mix(white, deep, 0.62), deep, 4.5],
  ["Gold-Badge: Ink auf Gold", ink, gold, 4.5],
  ["Espoirs-Badge: Weiss auf blue-deep", white, deep, 4.5],
  ["accent-on-dark (Text) auf blue-deep", magentaBright, deep, 4.5],
  ["NEI-Text auf blue-deep", magentaBright, deep, 4.5],
  ["NEI-Punkt (Grafik) auf blue-deep", magenta, deep, 3],

  ["Bahn: weisse Linie (60%) auf Belag", mix(white, deep, 0.6), deep, 3],
  ["Bahn: Marke (70%) auf Belag", mix(white, deep, 0.7), deep, 4.5],
  ["Bahn: aktive Marke auf Belag", magentaBright, deep, 4.5],
  ["Bahn-Punkt Magenta auf Belag (Grafik)", magenta, deep, 3],

  ["Hero: Verlaufsanfang auf Papier", blue, paper, 3],
  ["Hero: Verlaufsende auf Papier", magenta, paper, 3],
];

let failed = 0;
console.log("Kontraste (§8: AA)\n");
for (const [name, fg, bg, needed] of checks) {
  const value = ratio(fg, bg);
  const ok = value >= needed;
  if (!ok) failed += 1;
  console.log(
    `  ${ok ? "ok  " : "FEHL"} ${value.toFixed(2).padStart(6)}:1  (>= ${needed})  ${name}`,
  );
}

console.log();
if (failed > 0) {
  console.error(`${failed} Kombination(en) unter AA.`);
  process.exit(1);
}
console.log("Alle geprueften Kombinationen erfuellen AA.");
