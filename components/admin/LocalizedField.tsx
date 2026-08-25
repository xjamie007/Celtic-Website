"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

import { locales, defaultLocale } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Ein mehrsprachiges Textfeld (§12: alle Textfelder als JSONB mit lb, de, fr).
 *
 * Drei Reiter statt drei Felder untereinander. Der Unterschied ist nicht
 * Platz: wer eine Meldung schreibt, schreibt sie auf Lëtzebuergesch und ist
 * fertig. §11 sieht den Rueckfall ausdruecklich vor, und ein Formular mit
 * drei leeren Pflichtfeldern wuerde das Gegenteil suggerieren.
 *
 * Nur die Standardsprache traegt eine Markierung — sie ist die einzige, ohne
 * die es nicht geht.
 */
export function LocalizedField<T extends FieldValues>({
  name,
  label,
  register,
  rows,
}: {
  name: string;
  label: string;
  register: UseFormRegister<T>;
  rows?: number;
}) {
  const t = useTranslations("admin");
  const [active, setActive] = useState<string>(defaultLocale);

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <span className="font-data text-data-xs text-muted-on-page uppercase">
          {label}
        </span>
        <div role="tablist" className="flex gap-1">
          {locales.map((locale) => (
            <button
              key={locale}
              type="button"
              role="tab"
              aria-selected={locale === active}
              onClick={() => setActive(locale)}
              className={cn(
                "font-data text-data-xs px-2 py-1 uppercase transition-colors duration-200",
                locale === active
                  ? "text-accent-on-page"
                  : "text-muted-on-page hover:text-ink-text",
              )}
            >
              {locale}
              {locale === defaultLocale ? " *" : ""}
            </button>
          ))}
        </div>
      </div>

      {/* Alle drei bleiben im DOM: wer den Reiter wechselt, soll nicht
          verlieren, was er im anderen geschrieben hat. */}
      {locales.map((locale) => {
        const shared =
          "border-hairline-on-page text-ui mt-2 w-full border bg-transparent px-3 py-2";
        return (
          <div key={locale} hidden={locale !== active}>
            {rows ? (
              <textarea
                rows={rows}
                {...register(`${name}.${locale}` as Path<T>)}
                className={shared}
              />
            ) : (
              <input
                {...register(`${name}.${locale}` as Path<T>)}
                className={shared}
              />
            )}
          </div>
        );
      })}

      <p className="text-muted-on-page text-ui-sm mt-1">{t("fallbackHint")}</p>
    </div>
  );
}
