import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { PersonCard } from "@/components/club/PersonCard";
import { LaneSection } from "@/components/lane/LaneSection";
import { Reveal } from "@/components/motion/Reveal";
import { getCommittee } from "@/lib/data/people";
import { localized } from "@/lib/localized";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("clubCommittee") };
}

/**
 * /club/comite (§9)
 *
 * Karten statt einer Liste: der Vorstand soll vorgestellt werden, und ein
 * Name in einer Tabellenzeile stellt niemanden vor. Die Rollen stehen als
 * Schluessel im Datensatz und als Text in den Messages — der Trésorier heisst
 * auf der deutschen Fassung Kassier, ohne dass die Namensliste dreimal
 * gepflegt werden muesste.
 */
export default async function CommitteePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("nav");
  const tc = await getTranslations("club");
  const activeLocale = await getLocale();
  const committee = await getCommittee();

  return (
    <LaneSection id="comite" labelledBy="comite-title">
      <div className="mx-auto max-w-[1240px] px-5 pt-16 pb-24 sm:px-8">
        <h1 id="comite-title" className="text-h1 wdth-112">
          {t("clubCommittee")}
        </h1>

        <Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {committee.map((person, index) => (
              <li
                key={person.id}
                className="rise"
                style={{ "--i": index } as React.CSSProperties}
              >
                <PersonCard
                  name={person.name}
                  role={tc(person.roleKey)}
                  bio={person.bio ? localized(person.bio, activeLocale) : null}
                  photo={person.photo}
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </LaneSection>
  );
}
