import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { requireFeature } from "@/lib/features";
import { LaneSection } from "@/components/lane/LaneSection";
import { BestPerformanceTable } from "@/components/records/BestPerformanceTable";
import { RecordBrowser, type RecordPanel } from "@/components/records/RecordBrowser";
import { getBestPerformances, getCategories } from "@/lib/data/best-performances";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("bestPerformances") };
}

/**
 * /beschtleeschtungen (§9)
 *
 * Die Kategorie ist der Tab, nicht der Belag — so ist die Seite auch auf
 * celtic.lu aufgebaut, und so sucht man: "was ist die beste U16-Zeit". In
 * jeder Kategorie stehen die vier Listen untereinander, weil 60 m nur in der
 * Halle existiert und 100 m nur draussen; nebeneinander waeren sie eine
 * Tabelle mit Luecken.
 *
 * Filterleiste und Tabs sind dieselben Komponenten wie bei den Rekorden.
 */
export default async function BestPerformancesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  /* §2: abgeschaltet heisst 404, nicht leere Seite. */
  await requireFeature("bestPerformances");

  const t = await getTranslations("records");
  const tn = await getTranslations("nav");
  const [performances, categories] = await Promise.all([
    getBestPerformances(),
    getCategories(),
  ]);

  const sections = [
    { surface: "piste", gender: "f" },
    { surface: "piste", gender: "m" },
    { surface: "indoor", gender: "f" },
    { surface: "indoor", gender: "m" },
  ] as const;

  const surfaceLabel = {
    piste: t("surfacePiste"),
    indoor: t("surfaceIndoor"),
    route: t("surfaceRoute"),
    stade: t("surfaceStade"),
  } as const;

  const panels: RecordPanel[] = categories.map((category) => {
    const inCategory = performances.filter((p) => p.category === category);
    return {
      key: category.toLowerCase(),
      label: category,
      node: (
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={`${section.surface}-${section.gender}`}>
              <h3 className="font-data text-data-xs text-muted-on-ink mb-3 uppercase">
                {surfaceLabel[section.surface]}{" "}
                {section.gender === "f" ? t("genderF") : t("genderM")}
              </h3>
              <BestPerformanceTable
                performances={inCategory}
                surface={section.surface}
                gender={section.gender}
              />
            </section>
          ))}
        </div>
      ),
    };
  });

  const achievedIn = [
    ...new Set(performances.map((p) => p.achievedIn).filter(Boolean)),
  ].sort() as string[];
  const decades = [
    ...new Set(performances.map((p) => Math.floor(p.year / 10) * 10)),
  ].sort((a, b) => b - a);

  return (
    <LaneSection
      id="beschtleeschtungen"
      labelledBy="beschtleeschtungen-title"
      className="bg-deep text-page-text"
    >
      <div className="mx-auto max-w-[1240px] px-5 pt-16 pb-24 sm:px-8">
        <h1 id="beschtleeschtungen-title" className="text-h1 wdth-112">
          {tn("bestPerformances")}
        </h1>
        <p className="text-muted-on-ink text-body-lg mt-4 max-w-prose">
          {t("bestIntro")}
        </p>

        <div className="mt-10">
          <RecordBrowser
            panels={panels}
            categories={achievedIn}
            decades={decades}
          />
        </div>
      </div>
    </LaneSection>
  );
}
