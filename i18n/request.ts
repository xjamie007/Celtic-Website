import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    /**
     * Ohne Angabe nimmt next-intl die Zeitzone des Rechners, der baut. Lokal
     * ist das Europe/Luxembourg, auf einem Bauserver UTC — und dann kann ein
     * Termin, der um 00:30 beginnt, auf der veroeffentlichten Seite einen Tag
     * frueher stehen als in der Vorschau. Der Verein ist in Luxemburg, seine
     * Termine sind es auch.
     */
    timeZone: "Europe/Luxembourg",
    /**
     * §11: Fehlt eine Uebersetzung, wird auf lb zurueckgefallen — still, ohne
     * Hinweis auf der oeffentlichen Seite. Der Hinweis gehoert in den Admin
     * (Phase 5), nicht vor die Besucher.
     */
    onError() {},
    getMessageFallback({ key }) {
      return key;
    },
  };
});
