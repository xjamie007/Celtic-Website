import Image from "next/image";

import type { Sponsor } from "@/lib/data/sponsors";
import { cn } from "@/lib/utils";

/**
 * Ein Sponsor auf der Sponsorenseite (§7, §8).
 *
 * Dieselbe Tafel wie auf der Zielgeraden, nur auf hellem Grund: dort setzt
 * ein weisser Lichtstrich sie vom Band ab, hier ein Haarstrich in Trikotblau.
 * Das Logo bleibt in beiden Faellen unangetastet — volle Farbe, unverzerrt,
 * gleiche Hoehe wie alle anderen.
 *
 * Vorher stand hier nur der Name als Textzeile. Ein Sponsor, der Geld gibt,
 * bekommt sein Zeichen zu sehen, nicht seinen Namen in einer Liste.
 */
export function SponsorTile({
  sponsor,
  label,
  emphasis = false,
}: {
  sponsor: Sponsor;
  label: string;
  /** Der Haaptsponsor steht groesser — er zahlt auch mehr. */
  emphasis?: boolean;
}) {
  if (!sponsor.logoUrl) return null;

  const inner = (
    <>
      <span
        className={cn(
          "flex items-center justify-center bg-white px-6",
          emphasis ? "h-28" : "h-24",
        )}
      >
      {/* Begrenzt in BEIDE Richtungen, nicht nur in der Hoehe.
          Bei fester Hoehe belegt ein breites Logo (Zens, 609x112) das
          Fuenffache der Flaeche eines quadratischen (Pepin, 114x112) — der
          eine wirkt gross, der andere verloren, obwohl beide gleich hoch
          sind. Mit einer Hoehen- UND einer Breitengrenze laufen beide gegen
          eine Kante und kommen optisch auf vergleichbare Flaeche. */}
        <Image
          src={sponsor.logoUrl}
          alt={sponsor.name}
          width={340}
          height={112}
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
          className={cn(
          "h-auto w-auto object-contain",
          emphasis ? "max-h-16 max-w-[220px]" : "max-h-14 max-w-[180px]",
        )}
        />
      </span>
      <span className="font-data text-data-xs text-muted-on-page flex items-baseline justify-between gap-3 px-1 pt-3 uppercase">
        <span>{sponsor.name}</span>
        {sponsor.websiteUrl ? <span aria-hidden="true">↗</span> : null}
      </span>
    </>
  );

  const className = cn(
    "sponsor-tile group/tile block transition-transform duration-300",
    "ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 focus-visible:-translate-y-1",
  );

  if (!sponsor.websiteUrl) {
    return <div className={className}>{inner}</div>;
  }

  return (
    <a
      href={sponsor.websiteUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      title={label}
      className={className}
    >
      {inner}
    </a>
  );
}
