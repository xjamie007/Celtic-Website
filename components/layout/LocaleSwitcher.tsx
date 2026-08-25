"use client";

import NextLink from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { locales } from "@/config/site";
import { getPathname, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/**
 * §11: drei Buchstaben in Mono. Echte Links, keine Buttons — die
 * Sprachfassung einer Seite hat eine eigene URL und muss teilbar und
 * indexierbar sein.
 *
 * Als einzige Stelle im Projekt benutzt der Umschalter next/link direkt statt
 * des locale-bewussten Link. Grund: Bekommt dessen locale-Prop einen Wert,
 * setzt next-intl immer ein Praefix — auch fuer lb, das laut §11 keins haben
 * soll. Das ergaebe /lb/rekorder und eine 307 zurueck auf /rekorder bei jedem
 * Klick. getPathname liefert direkt den richtigen Pfad je Sprache, also lb
 * ohne und de/fr mit Praefix.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("locale");
  const tA11y = useTranslations("a11y");
  const pathname = usePathname();
  const params = useParams();
  const current = typeof params.locale === "string" ? params.locale : "lb";

  return (
    <nav aria-label={tA11y("localeSwitcher")} className={cn("flex", className)}>
      <ul className="flex items-center gap-0.5">
        {locales.map((locale) => {
          const isActive = locale === current;
          return (
            <li key={locale}>
              <NextLink
                href={getPathname({ href: pathname, locale })}
                hrefLang={locale}
                lang={locale}
                aria-current={isActive ? "true" : undefined}
                title={t(locale)}
                className={cn(
                  "font-data text-data-xs block px-1.5 py-1 uppercase transition-colors duration-200",
                  isActive
                    ? "text-[var(--nav-accent)]"
                    : "text-[var(--nav-fg-muted)] hover:text-[var(--nav-fg)]",
                )}
              >
                {locale}
              </NextLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
