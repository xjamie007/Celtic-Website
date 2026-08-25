import { defineRouting } from "next-intl/routing";

import { defaultLocale, locales } from "@/config/site";

/**
 * §11: Luxemburgisch ist Standard, weil der Verein und seine Texte
 * luxemburgisch sind. "as-needed" bedeutet: /rekorder ist die luxemburgische
 * Seite, /de/rekorder und /fr/rekorder sind die Uebersetzungen.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  /**
   * Bewusst aus. Browser in Luxemburg senden de, fr oder en — praktisch nie
   * lb. Mit Autoerkennung laendete fast jeder Besucher auf der deutschen
   * Fassung und die luxemburgische Standardsprache waere unsichtbar, genau
   * gegen die Absicht von §11. Alle kommen auf lb an; der Umschalter steht
   * in der Navigation.
   */
  localeDetection: false,
});
