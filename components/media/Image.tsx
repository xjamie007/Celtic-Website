import NextImage, { type ImageProps } from "next/image";

import { asset } from "@/lib/asset";

/**
 * next/image mit dem richtigen Pfad-Praefix.
 *
 * Im ganzen Projekt wird dieses Image benutzt, nie next/image direkt — sonst
 * faellt unter einem Praefix genau ein Bild heraus, und zwar immer erst auf
 * der veroeffentlichten Seite.
 *
 * ── Warum nicht ein eigener Loader ────────────────────────────────────────
 *
 * Naheliegender waere images.loader in next.config: ein Loader bekommt jede
 * src zu sehen und koennte das Praefix anhaengen. Das war die erste Fassung,
 * und sie hat die Sponsorenlogos auf 22 Pixel Breite schrumpfen lassen.
 *
 * Der Grund: sobald ein Loader eingetragen ist, baut Next ein srcSet mit
 * mehreren Breitenangaben — "logo.webp 16w, logo.webp 32w, …". Ohne
 * Bildoptimierung gibt es aber nur diese eine Datei, also stehen hinter
 * allen Angaben dieselben Pixel. Der Browser glaubt der Angabe: er haelt
 * das Bild fuer 16 Pixel breit und rechnet die Anzeigegroesse danach aus.
 * Bei Bildern mit fester Groesse faellt das nicht auf, bei w-auto h-auto
 * schrumpfen sie auf nichts zusammen.
 *
 * Deshalb bleibt images.unoptimized stehen — damit erzeugt Next gar kein
 * srcSet, die Datei behaelt ihre echte Groesse — und das Praefix kommt hier
 * davor, wo es keine Nebenwirkung hat.
 */
export function Image({ src, ...props }: ImageProps) {
  return <NextImage src={typeof src === "string" ? asset(src) : src} {...props} />;
}
