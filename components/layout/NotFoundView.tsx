import { getTranslations } from "next-intl/server";
import Link from "next/link";

import { LaneChannel } from "@/components/lane/LaneChannel";
import { Wordmark } from "@/components/layout/Wordmark";
import { fontVariables } from "@/app/fonts";
import { mainNav, type Locale } from "@/config/site";

/**
 * Die 404-Ansicht — bewusst eigenstaendig.
 *
 * Next rendert notFound() ausserhalb aller Layouts, in einer eigenen
 * HTML-Huelle ohne unsere Schriftvariablen und ohne Navigation. Diese
 * Komponente bringt deshalb mit, was sie braucht: die Font-Variablen auf dem
 * eigenen Wrapper, die Bahn und die Wege zurueck. Das Stylesheet laedt Next
 * mit, die Seite steht damit vollstaendig.
 *
 * Der Aufwand lohnt, weil der Verein von einem alten CMS umzieht: alte Links
 * werden noch jahrelang aufgerufen, aus Suchmaschinen, PDFs und Mails. Wer
 * dort landet, soll weiterkommen statt umzukehren.
 *
 * ── Warum die Sprache hier als Prop steht und nicht aus dem Kontext kommt ──
 *
 * Next rendert die not-found-Grenze jeder Route mit, auch wenn niemand sie
 * zu sehen bekommt — und zwar bevor das Layout laeuft. Holte sich diese
 * Ansicht die Sprache selbst, waere sie die erste, die danach fragt: die
 * Antwort wird fuer den ganzen Seitenaufbau gemerkt, und weil zu diesem
 * Zeitpunkt noch keine Sprache gesetzt ist, faellt sie auf die
 * Standardsprache zurueck. Folge: jede deutsche und franzoesische Seite kam
 * mit luxemburgischer Navigation heraus.
 *
 * Deshalb bekommt jede Uebersetzung hier ihre Sprache ausdruecklich mit.
 * Damit fragt diese Ansicht nie nach der Sprache der Seite und kann die
 * Antwort auch nicht mehr verfaelschen.
 */
export async function NotFoundView({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "error" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const tA11y = await getTranslations({ locale, namespace: "a11y" });

  /*
    Hier standen ein NextIntlClientProvider und die locale-bewussten Links
    aus i18n/navigation. Beide fragen im Hintergrund nach der Sprache der
    Seite — und weil Next diese Ansicht vor dem Layout rendert, war genau
    das die Ursache dafuer, dass jede Seite luxemburgisch herauskam.

    Sie werden hier auch nicht gebraucht: die Ansicht steht in der
    Standardsprache, und deren Adressen tragen laut §11 kein Praefix. Ein
    gewoehnliches next/link genuegt. Ein Client-Kontext ist ebenfalls nicht
    noetig — nichts unter dieser Ansicht liest Uebersetzungen im Browser.
  */
  return (
    <>
      <div
        className={`${fontVariables} bg-page text-ink-text relative min-h-dvh`}
      >
        <LaneChannel />

        <div className="mx-auto flex min-h-dvh max-w-[1240px] flex-col px-5 pb-16 sm:px-8 md:pl-lane">
          <div className="py-6">
            <Link href="/" className="text-ink-text">
              <Wordmark />
            </Link>
          </div>

          <div className="flex flex-1 flex-col justify-center">
            <p className="font-data text-data-xs text-muted-on-page uppercase">
              404
            </p>
            <h1 className="text-h1 wdth-110 mt-4">{t("notFoundTitle")}</h1>
            <p className="text-body-lg text-muted-on-page mt-4 max-w-prose">
              {t("notFoundBody")}
            </p>

            <p className="mt-10">
              <Link
                href="/"
               
                className="text-ui-lg decoration-hairline-on-page hover:decoration-motion-accent hover:text-accent-on-page underline decoration-2 underline-offset-8 transition-colors duration-200"
              >
                {t("backHome")} &rarr;
              </Link>
            </p>

            {/* Die Hauptwege stehen mit auf der Seite: von einem toten Link aus
              ist der naechste Klick wichtiger als die Fehlermeldung. */}
            <nav
              aria-label={tA11y("mainNav")}
              className="border-hairline-on-page mt-12 border-t pt-6"
            >
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                {mainNav.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                     
                      className="text-muted-on-page text-ui-sm transition-colors duration-200 hover:text-ink-text"
                    >
                      {tn(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
