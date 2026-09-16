import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LaneSection } from "@/components/lane/LaneSection";
import { RecordMatrix, type MatrixView } from "@/components/records/RecordMatrix";
import { site } from "@/config/site";
import { getDiscipline, getRecords, getVenueRecords } from "@/lib/data/records";
import { requireFeature } from "@/lib/features";
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
 */
export default async function RecordsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  await requireFeature("records");

  const t = await getTranslations("records");
  const tn = await getTranslations("nav");
  const [records, venue] = await Promise.all([getRecords(), getVenueRecords()]);

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

  return (
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
  );
}
