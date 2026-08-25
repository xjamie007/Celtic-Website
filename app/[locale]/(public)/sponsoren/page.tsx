import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { requireFeature } from "@/lib/features";
import { LaneSection } from "@/components/lane/LaneSection";
import { Reveal } from "@/components/motion/Reveal";
import { SponsorJersey } from "@/components/sponsors/SponsorJersey";
import { site } from "@/config/site";
import { getSponsors } from "@/lib/data/sponsors";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("sponsors") };
}

/**
 * /sponsoren (§7)
 *
 * Zwei Teile: die Sponsoren nach Stufe, und das Trikot, das zeigt, wo sie
 * stehen. Der Auftrag war, dass Sponsoren einen guten Platz bekommen, der
 * passt und trotzdem nicht stoert — auf der Zielgeraden ist das die
 * Peripherie, hier ist es die Hauptsache.
 */
export default async function SponsorsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  /* §2: abgeschaltet heisst 404, nicht leere Seite. */
  await requireFeature("sponsors");

  const t = await getTranslations("sponsors");
  const tn = await getTranslations("nav");
  const sponsors = await getSponsors();

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
    <>
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
                    <ul className="border-hairline-on-page grid border-t sm:grid-cols-2 lg:grid-cols-3">
                      {group.entries.map((sponsor, index) => (
                        <li
                          key={sponsor.id}
                          className="border-hairline-on-page record-row rise border-b py-4"
                          style={{ "--i": index } as React.CSSProperties}
                        >
                          {sponsor.websiteUrl ? (
                            <a
                              href={sponsor.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer sponsored"
                              className="record-name text-ui hover:text-accent-on-page transition-colors duration-200"
                            >
                              {sponsor.name} ↗
                            </a>
                          ) : (
                            <span className="record-name text-ui">{sponsor.name}</span>
                          )}
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

      <LaneSection
        id="trikot"
        labelledBy="trikot-title"
        className="border-hairline-on-page border-t"
      >
        <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8">
          <h2 id="trikot-title" className="text-h2 wdth-100">
            {t("jerseyTitle")}
          </h2>
          <div className="mt-10">
            <SponsorJersey sponsors={sponsors} />
          </div>
          <p className="text-muted-on-page text-ui mt-12">
            {t("becomeLead")}{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="text-ink-text decoration-motion-accent underline decoration-2 underline-offset-4 transition-colors duration-200 hover:text-accent-on-page"
            >
              {site.contact.email}
            </a>
          </p>
        </div>
      </LaneSection>
    </>
  );
}
