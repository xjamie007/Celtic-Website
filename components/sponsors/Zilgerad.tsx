import { getTranslations } from "next-intl/server";

import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { getSponsors } from "@/lib/data/sponsors";

import { SponsorBande } from "./SponsorBande";

/**
 * D'ZILGERAD — die Zielgerade (§7)
 *
 * Direkt vor dem Footer, auf jeder Seite. Gestaltet wie die Bandenwerbung
 * entlang der Zielgeraden eines Stadions: eine durchgehende Flaeche in
 * blue-deep, oben und unten von einer duennen weissen Linie begrenzt — das
 * ist die Bahnbegrenzung, nicht ein Rahmen.
 *
 * Die Banden laufen langsam (30s pro Durchlauf). Nicht schnell, nicht
 * aufdringlich: es ist Peripherie, wie im echten Stadion. Hover auf eine
 * Bande haelt das ganze Band an.
 *
 * Server-Komponente: kein Framer Motion, kein JavaScript. Der Lauf ist eine
 * CSS-Animation auf transform — sie laeuft im Compositor und kostet die
 * Startseite kein einziges Kilobyte JS (§14).
 */
export async function Zilgerad() {
  const sponsors = await getSponsors();
  const t = await getTranslations("sponsors");

  if (sponsors.length === 0) return null;

  const main = sponsors.filter((s) => s.tier === "haaptsponsor");
  const rest = sponsors.filter((s) => s.tier !== "haaptsponsor");
  /* Der Haaptsponsor laeuft mit, aber an eigener Position: einmal vorne,
     danach die uebrigen Banden. */
  const lane = [...main, ...rest];

  return (
    <section
      id="ziel"
      data-lane-section="ziel"
      aria-label={t("bandAria")}
      className="zilgerad-band bg-deep relative isolate overflow-hidden"
      style={{ ["--zilgerad-duration" as string]: `${site.sponsorMarqueeDuration}s` }}
    >
      {/* Bahnbegrenzung oben und unten */}
      <div aria-hidden="true" className="bg-lane-line/70 h-px w-full" />

      <div className="flex overflow-hidden py-5">
        <div className="zilgerad-track flex w-max items-center">
          {lane.map((sponsor) => (
            <SponsorBande
              key={sponsor.id}
              sponsor={sponsor}
              label={t("visit", { name: sponsor.name })}
            />
          ))}
          {/* Zweiter Durchlauf, damit der Lauf nahtlos schliesst. Fuer
              Screenreader unsichtbar, bei reduced motion ausgeblendet. */}
          <div className="zilgerad-clone flex items-center" aria-hidden="true">
            {lane.map((sponsor) => (
              <SponsorBande
                key={`clone-${sponsor.id}`}
                sponsor={sponsor}
                label={t("visit", { name: sponsor.name })}
                decorative
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 pb-4 sm:px-8">
        <p className="font-data text-data-xs text-muted-on-ink uppercase">
          {t("bandTitle")}
        </p>
        <Link
          href="/sponsoren"
          className="font-data text-data-xs text-muted-on-ink uppercase transition-colors duration-200 hover:text-white"
        >
          {t("all")} &rarr;
        </Link>
      </div>

      <div aria-hidden="true" className="bg-lane-line/70 h-px w-full" />
    </section>
  );
}
