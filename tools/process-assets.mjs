#!/usr/bin/env node
/**
 * Heruntergeladene Vereinsassets aufbereiten.
 *
 * Die Dateien der alten Seite sind gewachsen wie die Seite selbst: das
 * Teamfoto aus Palamós ist 8,6 MB gross, die Sponsorenlogos haben fuenf
 * verschiedene Hoehen zwischen 46 und 117 Pixeln. Dieses Skript bringt sie
 * auf einen Nenner.
 *
 * Die Logos werden auf eine einheitliche Hoehe gebracht und NICHT verzerrt —
 * die Breite folgt dem Seitenverhaeltnis. Eine Bande auf der Zielgeraden hat
 * eine feste Hoehe und zentriert das Logo darin.
 *
 *   node tools/process-assets.mjs
 */
import { readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const IN = "/tmp";
const OUT_BRAND = "public/brand";
const OUT_SPONSORS = "public/sponsors";
const OUT_PHOTOS = "public/photos";

for (const dir of [OUT_BRAND, OUT_SPONSORS, OUT_PHOTOS]) {
  await mkdir(dir, { recursive: true });
}

const kb = (n) => `${Math.round(n / 1024)} KB`;

async function convert(from, to, options) {
  if (!existsSync(from)) {
    console.log(`  fehlt: ${from}`);
    return null;
  }
  const pipeline = sharp(from).rotate();
  if (options.resize) pipeline.resize(options.resize);
  const { data, info } = await pipeline
    .webp({ quality: options.quality, alphaQuality: 100 })
    .toBuffer({ resolveWithObject: true });
  await sharp(data).toFile(to);
  console.log(
    `  ${path.basename(to).padEnd(26)} ${String(info.width).padStart(4)}x${String(info.height).padEnd(4)} ${kb(data.length)}`,
  );
  return info;
}

console.log("Vereinslogo");
/* Das Logo bleibt zusaetzlich als PNG liegen: das Favicon braucht es, und
   der Austausch gegen eine Vektordatei soll ein Dateitausch bleiben. */
await sharp(`${IN}/logo1.png`).toFile(`${OUT_BRAND}/celtic-logo.png`);
await convert(`${IN}/logo1.png`, `${OUT_BRAND}/celtic-logo.webp`, {
  quality: 95,
  resize: { height: 160, fit: "inside", withoutEnlargement: false },
});
await convert(`${IN}/logo2.png`, `${OUT_BRAND}/celtic-logo-footer.webp`, {
  quality: 95,
  resize: { height: 200, fit: "inside", withoutEnlargement: false },
});

console.log("\nSponsorenlogos (einheitlich 56px hoch, nicht verzerrt)");
for (const name of ["asport", "zens", "pepin", "schmit", "lalux"]) {
  await convert(`${IN}/sp-${name}`, `${OUT_SPONSORS}/${name}.webp`, {
    quality: 92,
    /* fit "contain" wuerde Rand anfuegen, "fill" wuerde verzerren.
       "inside" behaelt das Seitenverhaeltnis und trifft die Hoehe. */
    resize: { height: 112, fit: "inside", withoutEnlargement: false },
  });
}

console.log("\nFotos (max 2000px lange Kante)");
const photos = (await readdir(IN)).filter((f) => f.startsWith("ph-"));
for (const file of photos.sort()) {
  const target = file.replace(/^ph-/, "").replace(/\.[^.]+$/, ".webp");
  await convert(`${IN}/${file}`, `${OUT_PHOTOS}/${target}`, {
    quality: 82,
    resize: { width: 2000, height: 2000, fit: "inside", withoutEnlargement: true },
  });
}
