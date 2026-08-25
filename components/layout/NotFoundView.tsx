import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";

import { LaneChannel } from "@/components/lane/LaneChannel";
import { Wordmark } from "@/components/layout/Wordmark";
import { fontVariables } from "@/app/fonts";
import { mainNav } from "@/config/site";
import { Link } from "@/i18n/navigation";

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
 */
export async function NotFoundView() {
  const t = await getTranslations("error");
  const tn = await getTranslations("nav");
  const tA11y = await getTranslations("a11y");

  /*
    Der Provider steht hier und nicht im Layout: Next rendert diese Ansicht
    ausserhalb aller Layouts, der Kontext aus dem [locale]-Layout kommt also
    nie an. Ohne ihn brechen die locale-bewussten Links mit "No intl context
    found" — die Fehlerseite waere selbst ein Fehler.
  */
  return (
    <NextIntlClientProvider>
      <div
        className={`${fontVariables} bg-page text-ink-text relative min-h-dvh`}
      >
        <LaneChannel />

        <div className="mx-auto flex min-h-dvh max-w-[1240px] flex-col px-5 pt-1.5 pb-16 sm:px-8 lg:pt-0 lg:pl-lane">
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
    </NextIntlClientProvider>
  );
}
