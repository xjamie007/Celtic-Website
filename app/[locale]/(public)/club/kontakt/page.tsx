import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LaneSection } from "@/components/lane/LaneSection";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { site } from "@/config/site";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("clubContact") };
}

/**
 * /club/kontakt (§9)
 *
 * Die alte Seite hat hier keinen Inhalt — deshalb steht hier nichts
 * Importiertes, sondern die Daten aus config/site.ts. Das Kontaktformular
 * aus §13 kommt in Phase 5 dazu; bis dahin ist eine Adresse, die stimmt,
 * mehr wert als ein Formular, das ins Leere schreibt.
 */
export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("nav");
  const tf = await getTranslations("footer");
  const tc = await getTranslations("club");
  const { contact } = site;

  const places = [
    { key: "stadium", label: tf("stadium"), place: contact.stadium },
    { key: "clubhouse", label: tf("clubhouse"), place: contact.clubhouse },
  ];

  return (
    <LaneSection id="kontakt" labelledBy="kontakt-title">
      <div className="mx-auto max-w-[1240px] px-5 pt-16 pb-24 sm:px-8">
        <h1 id="kontakt-title" className="text-h1 wdth-112">
          {t("clubContact")}
        </h1>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="font-data text-data-xs text-muted-on-page uppercase">
              {tc("postalAddress")}
            </h2>
            <address className="text-ui mt-3 not-italic">
              {contact.postal.line1}
              <br />
              {contact.postal.line2}
              <br />
              {contact.postal.postalCode} {contact.postal.city}
            </address>
            <p className="mt-4">
              <a
                href={`mailto:${contact.email}`}
                className="font-data text-ui-sm decoration-motion-accent underline decoration-2 underline-offset-4 transition-colors duration-200 hover:text-accent-on-page"
              >
                {contact.email}
              </a>
            </p>
          </div>

          {places.map(({ key, label, place }) => (
            <div key={key}>
              <h2 className="font-data text-data-xs text-muted-on-page uppercase">
                {label}
              </h2>
              <address className="text-ui mt-3 not-italic">
                {"name" in place && place.name !== label ? (
                  <>
                    {place.name}
                    <br />
                  </>
                ) : null}
                {place.street}
                <br />
                {place.postalCode} {place.city}
              </address>
              <p className="mt-4">
                <a
                  href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(place.mapsQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-data text-data-xs text-muted-on-page hover:text-ink-text uppercase transition-colors duration-200"
                >
                  {tc("mapLink")} ↗
                </a>
              </p>
            </div>
          ))}
        </div>

        <div className="border-hairline-on-page mt-12 border-t pt-8">
          <SocialLinks tone="light" />
        </div>
      </div>
    </LaneSection>
  );
}
