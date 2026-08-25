import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { PersonCard } from "@/components/club/PersonCard";
import { LaneSection } from "@/components/lane/LaneSection";
import { ClubPhoto } from "@/components/media/ClubPhoto";
import { Reveal } from "@/components/motion/Reveal";
import { getCoaches } from "@/lib/data/people";
import { localized } from "@/lib/localized";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("clubCoaches") };
}

/**
 * /club/trainer (§9)
 *
 * Jede Trainer:in bekommt eine Karte mit Portrait und kurzer Vorstellung.
 * Fehlt das Foto, steht das Monogramm auf dem Trikotverlauf — die Karte
 * bleibt vollstaendig, statt eine Luecke zu zeigen.
 */
export default async function CoachesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("nav");
  const tc = await getTranslations("club");
  const activeLocale = await getLocale();
  const [athletics, triathlon] = await Promise.all([
    getCoaches("athletics"),
    getCoaches("triathlon"),
  ]);

  const sections = [
    { key: "athletics", label: tc("sectionAthletics"), coaches: athletics },
    { key: "triathlon", label: tc("sectionTriathlon"), coaches: triathlon },
  ];

  return (
    <LaneSection id="traineren" labelledBy="traineren-title">
      <div className="mx-auto max-w-[1240px] px-5 pt-16 pb-24 sm:px-8">
        <h1 id="traineren-title" className="text-h1 wdth-112">
          {t("clubCoaches")}
        </h1>

        {/* §9: Ein Bild des Trainerteams als Kopf — es zeigt, dass hinter
            den Namen Menschen stehen, bevor man die Liste liest. */}
        <ClubPhoto
          src="/photos/trainer-freides.webp"
          alt={tc("coachesPhotoAlt")}
          sizes="(min-width: 1240px) 1240px, 100vw"
          className="mt-10 aspect-[21/9] w-full"
        />

        <div className="mt-12 space-y-16">
          {sections.map((section) => (
            <Reveal key={section.key}>
              <section>
                <h2 className="font-data text-data-xs text-muted-on-page rise mb-6 uppercase">
                  {section.label} · {section.coaches.length}
                </h2>
                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {section.coaches.map((coach, index) => (
                    <li
                      key={coach.id}
                      className="rise"
                      style={{ "--i": index } as React.CSSProperties}
                    >
                      <PersonCard
                        name={`${coach.lastName} ${coach.firstName}`}
                        role={coach.brevet}
                        bio={coach.bio ? localized(coach.bio, activeLocale) : null}
                        photo={coach.photo}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </LaneSection>
  );
}
