import { getTranslations } from "next-intl/server";

import { RecordBadge } from "@/components/records/RecordBadge";
import { Link } from "@/i18n/navigation";
import { getDiscipline, type VenueRecord } from "@/lib/data/records";

/**
 * Der Stade-Tab (§9).
 *
 * Inhaltlich etwas anderes als die uebrigen sechs Tabellen: hier stehen nicht
 * die Rekorde des Vereins, sondern die besten Leistungen, die im Stade
 * Municipal jemals aufgestellt wurden — von Gaesten so gut wie von eigenen
 * Athlet:innen. Deshalb eine Nation statt einer Kategorie, und deshalb ein
 * Hinweis darueber: ohne ihn liest man die Tabelle als Vereinsrekorde.
 */
export async function VenueRecordTable({
  records,
}: {
  records: readonly VenueRecord[];
}) {
  const t = await getTranslations("records");

  if (records.length === 0) {
    return <p className="text-muted-on-ink text-ui py-12">{t("tabEmpty")}</p>;
  }

  return (
    <>
      <p className="text-muted-on-ink text-ui-sm mb-6 max-w-prose">
        {t("venueNote")}
      </p>

      <table className="record-table w-full border-collapse text-left">
        <thead>
          <tr className="border-hairline-on-ink border-b">
            <th scope="col" className="record-col-discipline">{t("colDiscipline")}</th>
            <th scope="col" className="record-col-performance">{t("colPerformance")}</th>
            <th scope="col" className="record-col-name">{t("colName")}</th>
            <th scope="col" className="record-col-category">{t("colNation")}</th>
            <th scope="col" className="record-col-year">{t("colYear")}</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => {
            const discipline = getDiscipline(record.disciplineKey);
            const names = record.holders
              .map((h) => (h.firstName ? `${h.lastName} ${h.firstName}` : h.lastName))
              .join(" · ");

            return (
              <tr
                key={record.id}
                className="record-row border-hairline-on-ink border-b"
                data-record-row=""
                data-discipline={record.disciplineKey}
                data-category={record.nation ?? ""}
                data-decade={
                  record.year === null ? "" : Math.floor(record.year / 10) * 10
                }
                data-search={`${discipline?.name ?? ""} ${names} ${record.nation ?? ""}`.toLowerCase()}
              >
                <td className="record-col-discipline">
                  <Link
                    href={`/rekorder/${record.disciplineKey}`}
                    className="hover:text-accent-on-dark transition-colors duration-200"
                  >
                    {discipline?.name}
                  </Link>
                </td>
                <td className="record-col-performance">{record.performanceRaw}</td>
                <td className="record-col-name record-name">{names}</td>
                <td className="record-col-category">{record.nation}</td>
                <td className="record-col-year">
                  <span className="flex items-center justify-end gap-2">
                    <RecordBadge national={record.isNationalRecord} espoirs={false} />
                    <span className="tabular-nums">{record.year}</span>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
