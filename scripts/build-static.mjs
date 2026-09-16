#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════════
 * scripts/build-static.mjs — die Seite als Ordner fertiger HTML-Dateien
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * GitHub Pages liefert Dateien aus, sonst nichts. Kein Node, keine
 * Middleware, keine Server Actions. Der weitaus groesste Teil dieser Seite
 * stoert das nicht — `next build` rendert ohnehin fast alles vor (§14). Vier
 * Dinge gehen aber nicht ohne Server und sind im Export deshalb nicht dabei:
 *
 *   1. der Redaktionsbereich und die Anmeldung — sie leben von Sitzungen,
 *      Server Actions und einer Supabase-Instanz;
 *   2. die Middleware — sie setzt Sitzungscookies und das Sprach-Rewrite;
 *   3. der Catch-All — ohne Server gibt es keine unbekannte Route, die man
 *      abfangen koennte; GitHub Pages liefert bei jedem Fehlgriff 404.html,
 *      also genau app/not-found.tsx;
 *   4. die Albumseiten — sie entstehen aus den Alben in der Datenbank, und
 *      ohne Datenbank gibt es keine.
 *
 * ── Warum eine Kopie ───────────────────────────────────────────────────────
 *
 * Naheliegender waere, diese Pfade kurz beiseitezulegen und nach dem Bauen
 * zurueckzuholen. Das funktioniert — bis ein Lauf abbricht, bevor er
 * zurueckraeumt. Dann fehlt der Redaktionsbereich im Arbeitsverzeichnis, und
 * gemerkt wird es beim naechsten Commit oder gar nicht.
 *
 * Deshalb wird gar nichts verschoben. Der Quelltext wird in einen eigenen
 * Ordner kopiert, dort um die vier Punkte gekuerzt und dort gebaut. Was
 * schiefgehen kann, geht in der Kopie schief; das Arbeitsverzeichnis wird
 * nur gelesen.
 *
 * Aufruf:  npm run build:static
 */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const work = path.join(root, ".static-export-build");
const out = path.join(root, "out");

/** Was ohne Server nicht laufen kann und deshalb nicht mitkopiert wird. */
const SERVER_ONLY = [
  "middleware.ts",
  "app/auth",
  "app/[locale]/admin",
  "app/[locale]/(public)/login",
  "app/[locale]/(public)/[...rest]",
  "app/[locale]/(public)/fotoen/[slug]",
];

/**
 * Was nicht in die Kopie gehoert.
 *
 * node_modules bleibt aussen vor: der Ordner liegt eine Ebene ueber der
 * Kopie, und Node sucht Module nach oben — die Kopie findet dieselben
 * Pakete, ohne dass 300 MB dupliziert werden.
 *
 * .env.local ebenfalls: die lokale Datenbank gehoert nicht in eine Vorschau,
 * die auf jedem Rechner gleich aussehen soll. Ohne sie liest die Seite aus
 * data/ — genau das tut der Build auf GitHub auch.
 */
const NOT_COPIED = new Set([
  ".git",
  ".next",
  "node_modules",
  "out",
  ".static-export-build",
  ".env.local",
  ".DS_Store",
  "tsconfig.tsbuildinfo",
]);

/**
 * Ordner samt Inhalt entfernen.
 *
 * Mit Wiederholungen: auf macOS meldet das Dateisystem beim Loeschen grosser
 * Baeume gelegentlich ENOTEMPTY, weil parallel noch jemand hineinschaut —
 * Spotlight, ein Editor, der Vorschauserver. Ein zweiter Versuch genuegt
 * dann; ohne ihn bricht der Build an einer Stelle ab, an der nichts kaputt
 * ist.
 */
function removeTree(target) {
  fs.rmSync(target, {
    recursive: true,
    force: true,
    maxRetries: 10,
    retryDelay: 100,
  });
}

function copyTree(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    if (NOT_COPIED.has(entry.name)) continue;
    const source = path.join(from, entry.name);
    const target = path.join(to, entry.name);
    if (entry.isDirectory()) copyTree(source, target);
    else if (entry.isFile()) fs.copyFileSync(source, target);
  }
}

/**
 * Die Standardsprache an die Wurzel holen.
 *
 * localePrefix ist "as-needed" (§11): /rekorder ist die luxemburgische
 * Seite, /de/rekorder die Uebersetzung. Genau so stehen die Verweise auch im
 * erzeugten HTML. Der Export legt die Dateien aber immer unter ihrem Segment
 * ab, also unter out/lb/ — sonst zeigte jeder luxemburgische Link ins Leere.
 * Auf dem Server loest die Middleware das; hier tut es ein Verschieben nach
 * dem Bauen.
 */
function hoistDefaultLocale(locale) {
  const from = path.join(out, locale);
  if (!fs.existsSync(from)) {
    throw new Error(`Der Export enthaelt kein ${locale}/ — Build unvollstaendig.`);
  }
  mergeInto(from, out);
  removeTree(from);
}

function mergeInto(from, to) {
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const source = path.join(from, entry.name);
    const target = path.join(to, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(target, { recursive: true });
      mergeInto(source, target);
    } else {
      fs.renameSync(source, target);
    }
  }
}

function countHtml(dir) {
  let n = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) n += countHtml(path.join(dir, entry.name));
    else if (entry.name.endsWith(".html")) n += 1;
  }
  return n;
}

/* ── Ablauf ─────────────────────────────────────────────────────────────── */

removeTree(work);
removeTree(out);

copyTree(root, work);
for (const relative of SERVER_ONLY) {
  removeTree(path.join(work, relative));
}

const next = path.join(root, "node_modules", ".bin", "next");
const result = spawnSync(next, ["build"], {
  cwd: work,
  stdio: "inherit",
  env: {
    ...process.env,
    STATIC_EXPORT: "1",
    /* Ohne Instanz liest die Seite aus data/ — siehe lib/supabase/env.ts. */
    NEXT_PUBLIC_SUPABASE_URL: "",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "",
  },
});

if (result.status !== 0) {
  console.error("\nBuild fehlgeschlagen. Die Kopie bleibt zum Nachsehen stehen:");
  console.error(`  ${work}`);
  process.exit(result.status ?? 1);
}

fs.renameSync(path.join(work, "out"), out);
removeTree(work);

/*
  Ohne diese Datei schickt GitHub Pages den Export durch Jekyll, und Jekyll
  laesst jeden Ordner mit fuehrendem Unterstrich weg — also _next/, also
  saemtliche Stylesheets und Skripte. Die Seite kaeme als nackter Text an.
*/
hoistDefaultLocale("lb");
fs.writeFileSync(path.join(out, ".nojekyll"), "");

console.log(`\nStatischer Export: ${countHtml(out)} Seiten in out/`);
