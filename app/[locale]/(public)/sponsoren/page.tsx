import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { requireFeature } from "@/lib/features";
import { LaneSection } from "@/components/lane/LaneSection";
import { Reveal } from "@/components/motion/Reveal";
import { SponsorTile } from "@/components/sponsors/SponsorTile";
import { site } from "@/config/site";
import { getVisibleSponsors } from "@/lib/data/sponsors";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("sponsors") };
}

/**
 * /sponsoren (§7)
 *
 * Die Sponsoren nach Stufe, jeder mit seinem Zeichen. Der Auftrag war, dass
 * sie einen guten Platz bekommen, der passt und trotzdem nicht stoert — auf
 * der Zielgeraden ist das die Peripherie, hier ist es die Hauptsache.
 *
 * Hier stand darunter ein zweiter Abschnitt mit dem Trikot und den
 * Positionen der Logos darauf. Der Verein braucht ihn nicht: die Positionen
 * stehen ohnehin nicht fest, und die Seite soll zeigen, wer den Verein
 * traegt, nicht wo auf dem Stoff das Zeichen sitzt.
 */
export default async function SponsorsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  /* §2: abgeschaltet heisst 404, nicht leere Seite. */
  await requireFeature("sponsors");

  const t = await getTranslations("sponsors");
  const tn = await getTranslations("nav");
  const sponsors = await getVisibleSponsors();

  const tiers = site.sponsorTiers.map((tier) => ({
    tier,
    label: t(
      tier === "haaptsponsor"
        ? "tierHaaptsponsor"
        : tier === "partner"
          ? "tierPartner"
          : "tierSupporter",
    ),
    entries: sponsors.filter((sponsor) => sponsor.tier === tier),
  }));

  return (
    <LaneSection id="sponsoren" labelledBy="sponsoren-title">
        <div className="mx-auto max-w-[1240px] px-5 pt-16 pb-16 sm:px-8">
          <h1 id="sponsoren-title" className="text-h1 wdth-112">
            {tn("sponsors")}
          </h1>

          <div className="mt-12 space-y-12">
            {tiers.map((group) =>
              group.entries.length === 0 ? null : (
                <Reveal key={group.tier}>
                  <section>
                    <h2 className="font-data text-data-xs text-muted-on-page rise mb-4 uppercase">
                      {group.label}
                    </h2>
                    <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                      {group.entries.map((sponsor, index) => (
                        <li
                          key={sponsor.id}
                          className="rise"
                          style={{ "--i": index } as React.CSSProperties}
                        >
                          <SponsorTile
                            sponsor={sponsor}
                            label={t("visit", { name: sponsor.name })}
                            emphasis={group.tier === "haaptsponsor"}
                          />
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              ),
            )}
          </div>
        </div>
    </LaneSection>
  );
}
