/**
 * Bildadressen im statischen Export.
 *
 * Next haengt das Pfad-Praefix (basePath) von sich aus an jeden Link und an
 * jede Datei aus _next — nur nicht an die src eines Bildes. Im Normalbetrieb
 * faellt das nicht auf, weil Bilder dort ueber /_next/image laufen und dieser
 * Pfad das Praefix bereits traegt. Im Export gibt es diesen Umweg nicht: dort
 * steht die Datei aus public/ unverändert in der src — und unter
 * xjamie007.github.io/Celtic-Website zeigt /photos/header.webp dann auf die
 * Wurzel der Domain, wo nichts liegt. Jedes Bild der Seite waere kaputt.
 *
 * Dieser Loader setzt das Praefix davor. Absolute Adressen bleiben, wie sie
 * sind — Bilder aus dem Supabase-Speicher tragen ihren eigenen Host.
 *
 * Eingetragen wird er nur fuer den Export (next.config.ts); im Serverbetrieb
 * bleibt die Bildoptimierung von Next zustaendig.
 */
export default function basePathImageLoader({ src }: { src: string }): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return src.startsWith("/") ? `${base}${src}` : src;
}
