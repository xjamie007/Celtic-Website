import type { Locale } from "@/config/site";
import { defaultLocale } from "@/config/site";

/**
 * Mehrsprachiges Textfeld, wie es als JSONB in der Datenbank liegt (§12).
 * de und fr sind optional: §11 sieht ausdruecklich den Rueckfall auf lb vor.
 */
export type Localized = Partial<Record<Locale, string>> &
  Record<typeof defaultLocale, string>;

/**
 * §11: Fehlt eine Uebersetzung, wird auf lb zurueckgefallen — still, ohne
 * Hinweis auf der oeffentlichen Seite. Der Hinweis gehoert in den Admin.
 */
export function localized(field: Localized, locale: string): string {
  const value = field[locale as Locale];
  return value && value.trim() !== "" ? value : field[defaultLocale];
}
