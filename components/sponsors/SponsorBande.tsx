import { Image } from "@/components/media/Image";

import type { Sponsor } from "@/lib/data/sponsors";
import { cn } from "@/lib/utils";

/**
 * Eine Bande auf der Zielgeraden (§7, §8).
 *
 * Das Logo steht in voller Farbe auf einer hellen Tafel — kein Graustufen-
 * filter mehr, der erst bei Hover weicht.
 *
 * Die Tafel ist nicht Dekoration, sondern die Bedingung dafuer, dass "farbig"
 * ueberhaupt funktioniert. Vier der fuenf Logos sind auf weissem Grund
 * angelegt, das fuenfte (Asport) ist eine schwarze Wortmarke auf
 * Transparenz — auf dem dunkelblauen Band war es schlicht unsichtbar. Genau
 * deshalb stand im Auftrag, es fehle ein Asport-Logo: die Datei war da, nur
 * nicht zu sehen. Auf einheitlich hellen Tafeln sitzen alle fuenf gleich, in
 * ihren eigenen Farben, und keines faellt aus dem Rahmen.
 *
 * Einheitlich heisst hier: gleiche Tafelhoehe, gleiche Innenluft, gleiche
 * Logohoehe. Die Breite darf variieren, denn ein Logo auf eine feste Breite
 * zu zwingen hiesse, es zu verzerren oder zu beschneiden.
 */
export function SponsorBande({
  sponsor,
  label,
  decorative = false,
}: {
  sponsor: Sponsor;
  label: string;
  /* Der zweite Durchlauf des Marquees ist aria-hidden. Ohne tabIndex -1
     koennte man mit der Tastatur trotzdem in die unsichtbaren Dubletten
     laufen — sichtbar passiert nichts, der Fokus verschwindet einfach. */
  decorative?: boolean;
}) {
  /* §7: Ohne Logo keine Bande. Gefiltert wird in lib/data/sponsors.ts; diese
     Bedingung ist die zweite Sicherung, damit hier nie eine leere Tafel
     entsteht, falls jemand die Komponente anderswo verwendet. */
  if (!sponsor.logoUrl) return null;

  const isMain = sponsor.tier === "haaptsponsor";

  const content = (
    <span
      className={cn(
        "sponsor-plate flex items-center justify-center bg-white",
        isMain ? "h-16 px-7" : "h-14 px-5",
      )}
    >
      <Image
        src={sponsor.logoUrl}
        alt={sponsor.name}
        width={isMain ? 300 : 220}
        height={112}
        sizes={isMain ? "300px" : "220px"}
        className={cn(
          "h-auto w-auto object-contain",
          isMain ? "max-h-10 max-w-[170px]" : "max-h-8 max-w-[130px]",
        )}
      />
    </span>
  );

  const className = cn(
    "group/bande flex shrink-0 items-center px-3",
    "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "hover:-translate-y-1 focus-visible:-translate-y-1",
  );

  if (!sponsor.websiteUrl) {
    return (
      <div className={className} aria-label={sponsor.name}>
        {content}
      </div>
    );
  }

  return (
    <a
      href={sponsor.websiteUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      title={label}
      tabIndex={decorative ? -1 : undefined}
      className={className}
    >
      {content}
    </a>
  );
}
