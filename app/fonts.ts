import localFont from "next/font/local";

/**
 * Fonts liegen lokal im Repo (§13: kein Google-CDN, kein Request an Dritte,
 * damit kein Cookie-Banner und keine Uebermittlung von IP-Adressen noetig ist).
 * Quelle sind die OFL-Variable-Fonts aus @fontsource-variable, die Dateien
 * wurden nach app/fonts kopiert — inklusive Lizenztexten.
 *
 * Je Familie zwei Schnitte: latin und latin-ext. Der ext-Schnitt haengt in der
 * Font-Stack-Kette direkt hinter dem Basis-Schnitt, damit Namen wie SIMIC oder
 * LOPES mit Diakritika weiterhin in der richtigen Schrift stehen. Das ist
 * besonders in der Rekordtabelle wichtig: fiele ein Name auf eine System-Mono
 * zurueck, waere die Tabularausrichtung der Zeiten dahin.
 *
 * adjustFontFallback ist bewusst deaktiviert — sonst schoebe Next einen
 * metrisch angepassten Arial-Fallback zwischen Basis- und ext-Schnitt, und der
 * ext-Schnitt kaeme nie zum Zug. Der CLS-Ausgleich wird in Phase 6 beim
 * Lighthouse-Durchgang gegengeprueft; alle Basis-Schnitte sind preloaded.
 */

/** Display — Archivo. wght 100–900, wdth 62–125. Die Width-Achse ist der Hero. */
export const archivo = localFont({
  src: "./fonts/archivo-latin-wdth-normal.woff2",
  variable: "--font-archivo",
  display: "swap",
  weight: "100 900",
  style: "normal",
  preload: true,
  adjustFontFallback: false,
  fallback: [],
});

export const archivoExt = localFont({
  src: "./fonts/archivo-latin-ext-wdth-normal.woff2",
  variable: "--font-archivo-ext",
  display: "swap",
  weight: "100 900",
  style: "normal",
  preload: false,
  adjustFontFallback: false,
  fallback: [],
});

/** Body — Instrument Sans. wght 400–700. */
export const instrument = localFont({
  src: "./fonts/instrument-sans-latin-wght-normal.woff2",
  variable: "--font-instrument",
  display: "swap",
  weight: "400 700",
  style: "normal",
  preload: true,
  adjustFontFallback: false,
  fallback: [],
});

export const instrumentExt = localFont({
  src: "./fonts/instrument-sans-latin-ext-wght-normal.woff2",
  variable: "--font-instrument-ext",
  display: "swap",
  weight: "400 700",
  style: "normal",
  preload: false,
  adjustFontFallback: false,
  fallback: [],
});

/** Data — JetBrains Mono. wght 100–800. Zeiten, Weiten, Jahre. */
export const jetbrains = localFont({
  src: "./fonts/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-jetbrains",
  display: "swap",
  weight: "100 800",
  style: "normal",
  preload: true,
  adjustFontFallback: false,
  fallback: [],
});

export const jetbrainsExt = localFont({
  src: "./fonts/jetbrains-mono-latin-ext-wght-normal.woff2",
  variable: "--font-jetbrains-ext",
  display: "swap",
  weight: "100 800",
  style: "normal",
  preload: false,
  adjustFontFallback: false,
  fallback: [],
});

/** Alle Font-Variablen fuer das <html>-Element. */
export const fontVariables = [
  archivo.variable,
  archivoExt.variable,
  instrument.variable,
  instrumentExt.variable,
  jetbrains.variable,
  jetbrainsExt.variable,
].join(" ");
