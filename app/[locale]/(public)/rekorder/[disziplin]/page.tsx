import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { requireFeature } from "@/lib/features";
import { LaneSection } from "@/components/lane/LaneSection";
import { RecordTimeline } from "@/components/records/RecordTimeline";
import { Link } from "@/i18n/navigation";
import {
  disciplines,
  getDiscipline,
  getRecordHistory,
  getRecords,
} from "@/lib/data/records";

type PageProps = { params: Promise<{ locale: string; disziplin: string }> };

export function generateStaticParams() {
  return disciplines.map((discipline) => ({ disziplin: discipline.key }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { disziplin } = await params;
  const discipline = getDiscipline(disziplin);
  return { title: discipline?.name ?? disziplin };
}

/**
 * /rekorder/[disziplin] (§10)
 *
 * Eine Disziplin gibt es mehrfach — Piste und Indoor, Dammen und Haeren.
 * Die Seite zeigt jede Fassung mit ihrem eigenen Verlauf, statt eine
 * willkuerlich auszuwaehlen. Die Adresse bleibt dabei die aus §9.
 */
export default async function DisciplinePage({ params }: PageProps) {
  const { locale, disziplin } = await params;
  setRequestLocale(locale);

  /* §2: abgeschaltet heisst 404, nicht leere Seite. */
  await requireFeature("records");

  const discipline = getDiscipline(disziplin);
  if (!discipline) notFound();

  const t = await getTranslations("records");
  const records = (await getRecords()).filter(
    (record) => record.disciplineKey === disziplin,
  );

  const surfaceLabel = {
    piste: t("surfacePiste"),
    indoor: t("surfaceIndoor"),
    route: t("surfaceRoute"),
    stade: t("surfaceStade"),
  } as const;

  const sections = await Promise.all(
    records.map(async (record) => ({
      record,
      history: await getRecordHistory(
        record.disciplineKey,
        record.surface,
        record.gender,
      ),
    })),
  );

  return (
    <LaneSection
      id="rekordverlaf"
      labelledBy="rekordverlaf-title"
      className="bg-deep text-page-text"
    >
      <div className="mx-auto max-w-[1240px] px-5 pt-16 pb-24 sm:px-8">
        <Link
          href="/rekorder"
          className="font-data text-data-xs text-muted-on-ink uppercase transition-colors duration-200 hover:text-white"
        >
          &larr; {t("historyBack")}
        </Link>

        <h1 id="rekordverlaf-title" className="text-h1 wdth-112 mt-6">
          {discipline.name}
        </h1>
        <p className="font-data text-data-xs text-muted-on-ink mt-3 uppercase">
          {t("historyTitle")}
        </p>

        {sections.length === 0 ? (
          <p className="text-muted-on-ink text-ui mt-12">{t("empty")}</p>
        ) : (
          <div className="mt-12 space-y-16">
            {sections.map(({ record, history }) => (
              <section key={record.id}>
                <h2 className="font-data text-data-xs text-muted-on-ink mb-6 uppercase">
                  {surfaceLabel[record.surface]}{" "}
                  {record.gender === "f" ? t("genderF") : t("genderM")}
                </h2>
                <RecordTimeline
                  discipline={discipline}
                  current={record}
                  history={history}
                />
              </section>
            ))}
          </div>
        )}
      </div>
    </LaneSection>
  );
}
