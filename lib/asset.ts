/**
 * Die Adresse einer Datei aus public/.
 *
 * Next haengt das Pfad-Praefix (basePath) von sich aus an jeden Link und an
 * alles unter _next — nur nicht an die src eines Bildes. Unter
 * xjamie007.github.io/Celtic-Website zeigt /photos/header.webp deshalb auf
 * die Wurzel der Domain, wo nichts liegt.
 *
 * Absolute Adressen bleiben unangetastet: Bilder aus dem Supabase-Speicher
 * tragen ihren eigenen Host, und der Redaktionsbereich zeigt Vorschauen als
 * blob:-Adresse.
 */
export function asset(src: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return src.startsWith("/") ? `${base}${src}` : src;
}
