import { NotFoundView } from "@/components/layout/NotFoundView";
import { fontVariables } from "@/app/fonts";
import { defaultLocale } from "@/config/site";

import "./globals.css";

/**
 * Die 404 des Projekts.
 *
 * Sie liegt ausserhalb von app/[locale] und damit ausserhalb des
 * Wurzel-Layouts — Next rendert jede notFound() in einer eigenen Huelle,
 * Navigation und Footer kaemen dort nie an. Statt das zu verschleiern,
 * bringt diese Datei die Huelle selbst mit und NotFoundView traegt den Rest:
 * Bahn, Wortmarke und die Wege zurueck.
 *
 * Eine Seite, die es nicht gibt, gehoert zu keiner Sprache: es gibt keinen
 * Pfad, aus dem sich eine ableiten liesse. Deshalb antwortet sie in der
 * Standardsprache des Vereins (§11) — im statischen Export ist sie ohnehin
 * eine einzige Datei, die GitHub Pages fuer jeden Fehlgriff ausliefert.
 *
 * Die Sprache wird durchgereicht und nicht erfragt. Next rendert diese
 * Grenze bei jeder Route mit, noch vor dem Layout; wer hier nach der Sprache
 * der Seite fragt, legt sie fuer den ganzen Seitenaufbau falsch fest. Siehe
 * den Kommentar in NotFoundView.
 */
export default function NotFound() {
  return (
    <html lang={defaultLocale} className={fontVariables}>
      <body className="min-h-dvh antialiased">
        <NotFoundView locale={defaultLocale} />
      </body>
    </html>
  );
}
