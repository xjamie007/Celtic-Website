import { getTranslations } from "next-intl/server";

import { NewRecordMark, RecordBadge } from "@/components/records/RecordBadge";
import { site, type Gender, type RecordSurface } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { getDiscipline, type ClubRecord } from "@/lib/data/records";
import { isNewRecord } from "@/lib/records";

/**
 * Die Rekordtabelle (§10).
 *
 * Serverseitig gerendert (§14) — die Filterleiste arbeitet danach auf dem
 * fertigen DOM und blendet Zeilen aus, statt sie neu zu bauen. Deshalb traegt
 * jede Zeile ihre Merkmale als data-Attribute: die Filterung braucht keine
 * zweite Kopie der Daten im Browser.
 *
 * Die Spalten stehen auf einem festen ch-Raster. Das ist der eigentliche
 * Grund fuer JetBrains Mono mit Tabularziffern: die Kommastellen von 4'05"58
 * und 15'29"06 stehen damit exakt untereinander, ueber alle Zeilen und ueber
 * alle sieben Tabs hinweg. Beim Tabwechsel springt keine Spalte.
 */
export async function RecordTable({
  records,
  surface,
  gender,
}: {
  records: readonly ClubRecord[];
  surface: RecordSurface;
  gender: Gender | null;
}) {
  const t = await getTranslations("records");

  const rows = records.filter(
    (r) => r.surface === surface && (gender === null || r.gender === gender),
  );

  if (rows.length === 0) {
    return (
      <p className="text-muted-on-ink text-ui py-12">{t("tabEmpty")}</p>
    );
  }

  return (
    <table className="record-table w-full border-collapse text-left">
      <caption className="sr-only">
        {t("colDiscipline")} · {t("colPerformance")} · {t("colName")} ·{" "}
        {t("colCategory")} · {t("colYear")}
      </caption>
      <thead>
        <tr className="border-hairline-on-ink border-b">
          <th scope="col" className="record-col-discipline">{t("colDiscipline")}</th>
          <th scope="col" className="record-col-performance">{t("colPerformance")}</th>
          <th scope="col" className="record-col-name">{t("colName")}</th>
          <th scope="col" className="record-col-category">{t("colCategory")}</th>
          <th scope="col" className="record-col-year">{t("colYear")}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((record) => {
          const discipline = getDiscipline(record.disciplineKey);
          const isNew = isNewRecord(record.date, site.newRecordDays);
          const names = record.holders
            .map((h) => (h.firstName ? `${h.lastName} ${h.firstName}` : h.lastName))
            .join(" · ");

          return (
            <tr
              key={record.id}
              className="record-row border-hairline-on-ink border-b"
              data-record-row=""
              data-discipline={record.disciplineKey}
              data-category={record.category}
              data-decade={Math.floor(record.year / 10) * 10}
              data-search={`${discipline?.name ?? ""} ${names}`.toLowerCase()}
            >
              <td className="record-col-discipline">
                <Link
                  href={`/rekorder/${record.disciplineKey}`}
                  className="hover:text-accent-on-dark transition-colors duration-200"
                >
                  {discipline?.name}
                </Link>
              </td>
              <td className="record-col-performance">
                {record.performanceRaw}
              </td>
              <td className="record-col-name record-name">
                {/* §10: Staffeln stehen mit mehreren Namen in einer Zeile,
                    sauber gruppiert statt in eine Zelle gequetscht. */}
                {record.holders.length > 1 ? (
                  <span className="flex flex-wrap gap-x-2 gap-y-0.5">
                    {record.holders.map((holder, index) => (
                      <span key={`${record.id}-${holder.lastName}-${index}`}>
                        {holder.lastName}
                        {index < record.holders.length - 1 ? " ·" : ""}
                      </span>
                    ))}
                  </span>
                ) : (
                  names
                )}
              </td>
              <td className="record-col-category">{record.category}</td>
              <td className="record-col-year">
                <span className="flex items-center justify-end gap-2">
                  {isNew ? <NewRecordMark /> : null}
                  <RecordBadge
                    national={record.isNationalRecord}
                    espoirs={record.isEspoirsBest}
                  />
                  <span className="tabular-nums">{record.year}</span>
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
