#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════════
 * scripts/serve-static.mjs — den Export ansehen, wie GitHub Pages ihn zeigt
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * `npm run build:static` legt fertiges HTML in out/ ab. Wer es vor dem
 * Veroeffentlichen ansehen will, braucht etwas, das sich verhaelt wie GitHub
 * Pages — und das sind drei Dinge, die ein beliebiger Dateiserver nicht tut:
 *
 *   1. Die Seite liegt unter einem Praefix (/Celtic-Website), solange sie
 *      keine eigene Domain hat. NEXT_PUBLIC_BASE_PATH sagt welches.
 *   2. /club ist ein Ordner; ausgeliefert wird /club/index.html.
 *   3. Was es nicht gibt, bekommt 404.html — mit Statuscode 404.
 *
 * Aufruf:  npm run serve:static        (dann http://localhost:4173)
 */

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "out");
const port = Number(process.env.PORT ?? 4173);

/**
 * Unter welchem Praefix liegt dieser Export?
 *
 * Es steht im erzeugten HTML — jede Datei aus _next traegt es. Das aus dem
 * Ergebnis zu lesen ist verlaesslicher, als es beim Starten noch einmal von
 * Hand mitzugeben: so zeigt die Vorschau immer genau den Export, der da ist,
 * und nicht den, den man gemeint hat.
 */
function detectBasePath() {
  if (process.env.NEXT_PUBLIC_BASE_PATH) return process.env.NEXT_PUBLIC_BASE_PATH;
  const index = path.join(out, "index.html");
  if (!fs.existsSync(index)) return "";
  const match = fs
    .readFileSync(index, "utf8")
    .match(/["'(](\/[^"'()]*?)\/_next\//);
  return match ? match[1] : "";
}

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

if (!fs.existsSync(out)) {
  console.error("Kein out/ gefunden. Erst `npm run build:static` laufen lassen.");
  process.exit(1);
}

const basePath = detectBasePath();

/** Der Pfad im Dateisystem zu einer Adresse — oder null. */
function resolveFile(pathname) {
  if (basePath) {
    if (pathname === basePath) pathname = "/";
    else if (pathname.startsWith(`${basePath}/`)) pathname = pathname.slice(basePath.length);
    else return null;
  }

  /* Kein Ausbrechen aus out/, auch nicht mit ../ in der Adresse. */
  const target = path.resolve(out, `.${decodeURIComponent(pathname)}`);
  if (target !== out && !target.startsWith(out + path.sep)) return null;

  if (fs.existsSync(target) && fs.statSync(target).isFile()) return target;

  const index = path.join(target, "index.html");
  return fs.existsSync(index) ? index : null;
}

http
  .createServer((request, response) => {
    const { pathname } = new URL(request.url, "http://localhost");
    const file = resolveFile(pathname);

    if (!file) {
      const notFound = path.join(out, "404.html");
      response.writeHead(404, { "content-type": TYPES[".html"] });
      response.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : "404");
      return;
    }

    response.writeHead(200, {
      "content-type": TYPES[path.extname(file)] ?? "application/octet-stream",
    });
    response.end(fs.readFileSync(file));
  })
  .listen(port, () => {
    console.log(`Export laeuft auf http://localhost:${port}${basePath || "/"}`);
  });
