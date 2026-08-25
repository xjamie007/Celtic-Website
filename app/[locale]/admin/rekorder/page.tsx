import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { RecordForm } from "@/components/admin/RecordForm";
import { site } from "@/config/site";
import { disciplines, getDiscipline, getRecords } from "@/lib/data/records";
import { isNewRecord } from "@/lib/records";

type PageProps = { params: Promise<{ locale: string }> };

/* Haengt an der angemeldeten Person und schreibt; nie vorrendern. */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });
  return { title: t("records"), robots: { index: false, follow: false } };
}

/**
 * /admin/rekorder (§12, §15)
 *
 * Das Formular steht oben, nicht unten. Der Ablauf, der in unter 60 Sekunden
 * erledigt sein soll, faengt mit dem Eintragen an — wer erst durch 109
 * Zeilen scrollen muss, hat die Minute schon verloren. Die Liste darunter
 * ist zum Nachsehen da, nicht zum Suchen.
 */
export default async function AdminRecordsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("admin");
  const tr = await getTranslations("records");
  const records = await getRecords();
  const categories = [...new Set(records.map((r) => r.category))]
    .filter(Boolean)
    .sort();

  return (
    <div className="mx-auto max-w-[1000px] px-5 py-10 sm:px-8">
      <AdminHeader title={t("records")} />

      <section className="mt-10">
        <h2 className="text-h3 wdth-100">{t("recordsNew")}</h2>
        <div className="mt-6">
          <RecordForm disciplines={disciplines} categories={categories} />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-data text-data-xs text-muted-on-page uppercase">
          {t("recordsCurrent")} · {records.length}
        </h2>
        <ul className="border-hairline-on-page mt-4 border-t">
          {records.map((record) => {
            const discipline = getDiscipline(record.disciplineKey);
            return (
              <li
                key={record.id}
                /* Feste Spalten erst ab sm: 8rem + 7rem plus Inhalt passen
                   auf einem Telefon nicht nebeneinander, und eine seitlich
                   scrollende Liste ist im Admin unbenutzbar. */
                className="border-hairline-on-page grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b py-2 sm:grid-cols-[8rem_7rem_1fr_auto]"
              >
                <span className="font-data text-ui-sm text-muted-on-page">
                  {discipline?.name}
                </span>
                <span className="font-data text-ui-sm text-right tabular-nums">
                  {record.performanceRaw}
                </span>
                <span className="text-ui-sm col-span-2 sm:col-span-1">
                  {record.holders
                    .map((h) => (h.firstName ? `${h.lastName} ${h.firstName}` : h.lastName))
                    .join(" · ")}
                </span>
                <span className="font-data text-data-xs text-muted-on-page col-span-2 flex items-center gap-2 tabular-nums sm:col-span-1 sm:justify-end">
                  {isNewRecord(record.date, site.newRecordDays) ? (
                    <span className="text-rec-new uppercase">{tr("new")}</span>
                  ) : null}
                  {record.isNationalRecord ? <span>**</span> : null}
                  {record.year}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
