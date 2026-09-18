import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LaneSection } from "@/components/lane/LaneSection";
import { BestPerformanceTable } from "@/components/records/BestPerformanceTable";
import { RecordBrowser, type RecordPanel } from "@/components/records/RecordBrowser";
import { RecordMatrix, type MatrixView } from "@/components/records/RecordMatrix";
import { site } from "@/config/site";
import { getBestPerformances, getCategories } from "@/lib/data/best-performances";
import { getDiscipline, getRecords, getVenueRecords } from "@/lib/data/records";
import { getFeatures, requireFeature } from "@/lib/features";
import { isNewRecord } from "@/lib/records";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("records") };
}

/**
 * /rekorder (§9, §8)
 *
 * Eine Tabelle, sieben Ansichten. Die Daten kommen serverseitig und werden
 * einmal an die Tabelle gereicht; der Wechsel zwischen den Ansichten
 * passiert im Browser, ohne neu zu laden — deshalb koennen die Zeilen dabei
 * stehen bleiben und nur die Werte tauschen.
 *
 * Der verlinkbare Tab (?bunn=) wurde frueher hier aus der Adresse gelesen.
 * Das machte die Seite von der Anfrage abhaengig — fuer eine Tabelle, die
 * sich zwischen zwei Rekorden nicht aendert, ein schlechter Tausch, und im
 * statischen Export unmoeglich. Die Adresse liest jetzt die Tabelle selbst,
 * im Browser, wo der Wechsel ohnehin stattfindet.
 *
 * ── Die Beschtleeschtungen stehen darunter ───────────────────────────────
 *
 * Sie hatten eine eigene Adresse. Das war eine Trennung, die nur der Code
 * kennt: wer den Vereinsrekord ueber 100 m sucht, sucht auch die beste Zeit
 * der U16 — und musste dafuer die Seite wechseln und die Navigation neu
 * lesen. Jetzt steht beides untereinander, mit derselben Filterleiste und
 * denselben Tabellen.
 *
 * Getrennt bleiben die beiden Bloecke trotzdem: Rekorde sind nach Belag und
 * Geschlecht geordnet, Beschtleeschtungen nach Altersklasse. Das in eine
 * Tabelle zu zwingen hiesse, eine der beiden Ordnungen aufzugeben.
 */
export default async function RecordsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  await requireFeature("records");

  const t = await getTranslations("records");
  const tn = await getTranslations("nav");
  const [records, venue, features] = await Promise.all([
    getRecords(),
    getVenueRecords(),
    getFeatures(),
  ]);

  /* §2: Die Beschtleeschtungen haben einen eigenen Schalter. Aus heisst hier
     nicht 404 — die Rekorde stehen ja da —, sondern der Block faellt weg. */
  const [performances, categories] = features.bestPerformances
    ? await Promise.all([getBestPerformances(), getCategories()])
    : [[], []];

  const surfaceLabel = {
    piste: t("surfacePiste"),
    indoor: t("surfaceIndoor"),
    route: t("surfaceRoute"),
    stade: t("surfaceStade"),
  } as const;

  const names = (holders: readonly { lastName: string; firstName: string | null }[]) =>
    holders
      .map((h) => (h.firstName ? `${h.lastName} ${h.firstName}` : h.lastName))
      .join(" · ");

  const views: MatrixView[] = site.recordTabs.map((tab) => {
    const key =
      tab.gender === null
        ? tab.surface
        : `${tab.surface}-${tab.gender === "f" ? "dammen" : "haeren"}`;

    const label =
      tab.gender === null
        ? surfaceLabel[tab.surface]
        : `${surfaceLabel[tab.surface]} ${tab.gender === "f" ? t("genderF") : t("genderM")}`;

    if (tab.surface === "stade") {
      return {
        key,
        label,
        rows: venue.map((record) => ({
          disciplineKey: record.disciplineKey,
          disciplineName: getDiscipline(record.disciplineKey)?.name ?? record.disciplineKey,
          performanceRaw: record.performanceRaw,
          names: names(record.holders),
          category: record.nation ?? "",
          year: record.year ?? 0,
          isNationalRecord: record.isNationalRecord,
          isEspoirsBest: false,
          isNew: false,
        })),
      };
    }

    return {
      key,
      label,
      rows: records
        .filter((r) => r.surface === tab.surface && r.gender === tab.gender)
        .map((record) => ({
          disciplineKey: record.disciplineKey,
          disciplineName: getDiscipline(record.disciplineKey)?.name ?? record.disciplineKey,
          performanceRaw: record.performanceRaw,
          names: names(record.holders),
          category: record.category,
          year: record.year,
          isNationalRecord: record.isNationalRecord,
          isEspoirsBest: record.isEspoirsBest,
          isNew: isNewRecord(record.date, site.newRecordDays),
        })),
    };
  });

  /* ── Beschtleeschtungen: die Altersklasse ist der Tab ─────────────────
     So ist die Seite auch auf celtic.lu aufgebaut, und so sucht man: "was
     ist die beste U16-Zeit". In jeder Klasse stehen die vier Listen
     untereinander, weil 60 m nur in der Halle existiert und 100 m nur
     draussen; nebeneinander waeren sie eine Tabelle mit Luecken. */
  const bestSections = [
    { surface: "piste", gender: "f" },
    { surface: "piste", gender: "m" },
    { surface: "indoor", gender: "f" },
    { surface: "indoor", gender: "m" },
  ] as const;

  const bestPanels: RecordPanel[] = categories.map((category) => {
    const inCategory = performances.filter((p) => p.category === category);
    return {
      key: category.toLowerCase(),
      label: category,
      node: (
        <div className="space-y-10">
          {bestSections.map((section) => (
            <section key={`${section.surface}-${section.gender}`}>
              {/* h3, nicht h2: darueber steht die h2 des Blocks. */}
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

  const bestAchievedIn = [
    ...new Set(performances.map((p) => p.achievedIn).filter(Boolean)),
  ].sort() as string[];
  const bestDecades = [
    ...new Set(performances.map((p) => Math.floor(p.year / 10) * 10)),
  ].sort((a, b) => b - a);

  return (
    <>
    <LaneSection
      id="rekorder"
      labelledBy="rekorder-title"
      className="bg-deep text-page-text"
    >
      <div className="section-space mx-auto max-w-[1240px] px-5 sm:px-8">
        <h1 id="rekorder-title" className="text-h1 wdth-112">
          {tn("records")}
        </h1>

        <div className="mt-10">
          <RecordMatrix
              views={views}
              labels={{
                discipline: t("colDiscipline"),
                performance: t("colPerformance"),
                name: t("colName"),
                category: t("colCategory"),
                year: t("colYear"),
                empty: t("tabEmpty"),
                national: t("national"),
                espoirs: t("espoirs"),
                isNew: t("new"),
            }}
          />
        </div>
      </div>
    </LaneSection>

    {bestPanels.length > 0 ? (
      <LaneSection
        id="beschtleeschtungen"
        labelledBy="beschtleeschtungen-title"
        className="bg-deep text-page-text border-hairline-on-ink border-t"
      >
        <div className="mx-auto max-w-[1240px] px-5 pt-16 pb-24 sm:px-8">
          <h2 id="beschtleeschtungen-title" className="text-h2 wdth-100">
            {tn("bestPerformances")}
          </h2>
          <p className="text-muted-on-ink text-body-lg mt-4 max-w-prose">
            {t("bestIntro")}
          </p>

          <div className="mt-10">
            <RecordBrowser
              panels={bestPanels}
              categories={bestAchievedIn}
              decades={bestDecades}
            />
          </div>
        </div>
      </LaneSection>
    ) : null}
    </>
  );
}
