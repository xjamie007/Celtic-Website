import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";

import { fontVariables } from "@/app/fonts";

import "./globals.css";

/**
 * Wurzel-Layout.
 *
 * Es gaebe die Versuchung, das html-Element im [locale]-Layout zu lassen und
 * diese Datei zu sparen — die Seite laeuft so. Aber ohne echtes Wurzel-Layout
 * betrachtet Next jede 404 als Wurzelfall und rendert sie in einer eigenen,
 * nackten HTML-Huelle: ohne Stylesheet, ohne Schriften, ohne Navigation. Ein
 * Verein, der von einem alten CMS umzieht, sammelt jahrelang Aufrufe auf tote
 * Links ein. Genau die duerfen nicht auf einer unformatierten Seite landen.
 *
 * Die Sprache kommt aus next-intl statt aus params, weil dieses Layout
 * ausserhalb des [locale]-Segments liegt und keine Route-Parameter sieht.
 */
export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={fontVariables}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
