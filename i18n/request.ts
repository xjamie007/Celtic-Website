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
