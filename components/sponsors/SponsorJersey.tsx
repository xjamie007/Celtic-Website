"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { JerseyShape } from "@/components/sponsors/JerseyShape";
import type { Sponsor } from "@/lib/data/sponsors";
import { cn } from "@/lib/utils";

/**
 * Das interaktive Trikot (§7).
 *
 * Hover auf ein Logo in der Liste -> die Position auf dem Trikot leuchtet auf.
 * Hover auf dem Trikot -> der Eintrag in der Liste wird hervorgehoben. Das
 * zeigt einem potenziellen Sponsor sofort und konkret, was er bekommt — statt
 * ihm eine Preisliste zu geben.
 *
 * Der Schnitt ist eine Skizze, kein Aufmass: die Vorlage des echten
 * Wettkampftrikots liegt nicht vor. Was stimmt, ist die Farbfuehrung — der
 * Verlauf laeuft in denselben 115 Grad wie ueberall sonst, aus denselben
 * Tokens. Kommt der echte Schnitt, wird genau ein Pfad ausgetauscht: der in
 * JerseyShape, den auch der Admin benutzt.
 */
export function SponsorJersey({ sponsors }: { sponsors: readonly Sponsor[] }) {
  const t = useTranslations("sponsors");
  const [active, setActive] = useState<string | null>(null);

  const placed = sponsors.filter((s) => s.jerseyPosition !== null);

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,22rem)_1fr]">
      {/* ── Trikot ───────────────────────────────────────────────────── */}
      <svg
        viewBox="0 0 200 260"
        role="img"
        aria-label={t("jerseyTitle")}
        className="w-full max-w-sm"
      >
        <JerseyShape gradientId="jersey-gradient" />

        {placed.map((sponsor) => {
          const position = sponsor.jerseyPosition;
          if (!position) return null;
          const isActive = active === sponsor.id;

          return (
            <g
              key={sponsor.id}
              onMouseEnter={() => setActive(sponsor.id)}
              onMouseLeave={() => setActive(null)}
              className="cursor-pointer"
            >
              <circle
                cx={(position.x / 100) * 200}
                cy={(position.y / 100) * 260}
                r={isActive ? 11 : 7}
                fill={isActive ? "var(--celtic-gold)" : "var(--celtic-white)"}
                fillOpacity={isActive ? 1 : 0.55}
                className="transition-all duration-200"
              />
              <title>{sponsor.name}</title>
            </g>
          );
        })}
      </svg>

      {/* ── Liste ────────────────────────────────────────────────────── */}
      <div>
        <p className="text-muted-on-page text-ui-sm mb-6 max-w-prose">
          {t("jerseyNote")}
        </p>
        <ul className="border-hairline-on-page border-t">
          {placed.map((sponsor) => (
            <li
              key={sponsor.id}
              onMouseEnter={() => setActive(sponsor.id)}
              onMouseLeave={() => setActive(null)}
              className={cn(
                "border-hairline-on-page flex items-baseline justify-between gap-4 border-b py-3 transition-colors duration-200",
                active === sponsor.id ? "text-ink-text" : "text-muted-on-page",
              )}
            >
              <span className="text-ui">{sponsor.name}</span>
              <span className="font-data text-data-xs uppercase">
                {t(
                  sponsor.tier === "haaptsponsor"
                    ? "tierHaaptsponsor"
                    : sponsor.tier === "partner"
                      ? "tierPartner"
                      : "tierSupporter",
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
