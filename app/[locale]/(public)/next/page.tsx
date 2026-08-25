import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Calendar } from "@/components/events/Calendar";
import { requireFeature } from "@/lib/features";
import { LaneSection } from "@/components/lane/LaneSection";
import { Reveal } from "@/components/motion/Reveal";
import {
  getClubEvents,
  getFederationEvents,
  recurringEvents,
} from "@/lib/data/events";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("next") };
}

/**
 * /next (§9) — der Wettkampfkalender.
 *
 * Ein Kalender, chronologisch, mit allem darin: die eigenen Veranstaltungen
 * des Vereins und die Termine aus dem Verbandskalender. Die eigenen fallen
 * auf — Magenta-Kante, groesserer Titel, Kennzeichnung —, ohne aus der
 * Reihenfolge zu fallen. Wer wissen will, was als Naechstes ansteht, liest
 * von oben; wer den eigenen Lauf sucht, sieht ihn beim Ueberfliegen.
 */
export default async function NextPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  /* §2: abgeschaltet heisst 404, nicht leere Seite. */
  await requireFeature("events");

  const t = await getTranslations("next");
  const tn = await getTranslations("nav");
  const [club, federation] = await Promise.all([
    getClubEvents(),
    getFederationEvents(),
  ]);

  return (
    <>
      <LaneSection id="kalenner" labelledBy="kalenner-title">
        <div className="mx-auto max-w-[1240px] px-5 pt-16 pb-16 sm:px-8">
          <h1 id="kalenner-title" className="text-h1 wdth-112">
            {tn("next")}
          </h1>
          <p className="text-body-lg text-muted-on-page mt-4 max-w-prose">
            {t("federationNote")}
          </p>

          <div className="mt-12">
            <Calendar clubEvents={club} federationEvents={federation} />
          </div>

          <p className="mt-10">
            <a
              href="https://www.fla.lu/calendrier-80552v4"
              target="_blank"
              rel="noopener noreferrer"
              className="font-data text-data-xs text-muted-on-page hover:text-ink-text uppercase transition-colors duration-200"
            >
              {t("federationAll")} ↗
            </a>
          </p>
        </div>
      </LaneSection>

      <LaneSection
        id="veranstaltungen"
        labelledBy="veranstaltungen-title"
        className="border-hairline-on-page border-t"
      >
        <Reveal>
          <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8">
            <h2
              id="veranstaltungen-title"
              className="font-data text-data-xs text-muted-on-page rise mb-6 uppercase"
            >
              {t("recurring")}
            </h2>
            <ul className="flex flex-wrap gap-x-10 gap-y-4">
              {recurringEvents.map((event, index) => (
                <li
                  key={event.slug}
                  className="rise"
                  style={{ "--i": index + 1 } as React.CSSProperties}
                >
                  <a
                    href={event.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-h3 wdth-96 hover:text-accent-on-page font-display font-bold transition-colors duration-200"
                  >
                    {event.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </LaneSection>
    </>
  );
}
