import Image from "next/image";

import type { Sponsor } from "@/lib/data/sponsors";
import { cn } from "@/lib/utils";

/**
 * Eine Bande. Graustufen bei 70% Deckkraft; erst bei Hover volle Farbe, volle
 * Deckkraft, 4px angehoben mit weichem Schatten (§7). Der Sponsor bekommt
 * Aufmerksamkeit genau dann, wenn der Besucher sie gibt.
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
  const isMain = sponsor.tier === "haaptsponsor";

  const content = sponsor.logoUrl ? (
    <Image
      src={sponsor.logoUrl}
      alt={sponsor.name}
      width={isMain ? 240 : 160}
      height={56}
      sizes={isMain ? "240px" : "160px"}
      className="h-full w-auto object-contain grayscale transition-[filter] duration-300 group-hover/bande:grayscale-0"
    />
  ) : (
    /* Solange kein Logo vorliegt, traegt die Bande den Namen — gesetzt wie
       eine Bandenbeschriftung, nicht wie ein Platzhalter. */
    <span
      className={cn(
        "font-display leading-none font-extrabold whitespace-nowrap uppercase wdth-88",
        isMain ? "text-[1.5rem] tracking-[-0.02em]" : "text-[1.0625rem] tracking-[-0.01em]",
        sponsor.tier === "supporter" && "text-[0.9375rem]",
      )}
    >
      {sponsor.name}
    </span>
  );

  const className = cn(
    "group/bande flex shrink-0 items-center justify-center px-6",
    "border-x border-hairline-on-ink/60 text-white/70",
    "transition-[opacity,transform,box-shadow,color] duration-300",
    "hover:-translate-y-1 hover:text-white hover:opacity-100",
    "hover:shadow-[0_10px_24px_-8px_var(--color-ink)]",
    "focus-visible:-translate-y-1 focus-visible:text-white",
    isMain ? "h-16 min-w-[19rem]" : "h-16 min-w-[9.5rem]",
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
