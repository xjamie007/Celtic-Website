import { getTranslations } from "next-intl/server";

import { RecordBadge } from "@/components/records/RecordBadge";
import type { Gender, RecordSurface } from "@/config/site";
import { Link } from "@/i18n/navigation";
import type { BestPerformance } from "@/lib/data/best-performances";

/**
 * Bestleistungen einer Kategorie, Belag und Geschlecht (§9).
 *
 * Dieselbe Tabellengestalt wie die Rekorde — dasselbe ch-Raster, dieselbe
 * Zielstrich-Zeile beim Hover. Wer die Rekorde gelesen hat, muss hier nichts
 * Neues lernen.
 *
 * Zusaetzlich eine Spalte: die Klasse, in der die Leistung erzielt wurde.
 * Steht dort U18 in einer U20-Liste, war jemand zwei Jahre frueher so weit —
 * und genau das ist die interessante Information.
 */
export async function BestPerformanceTable({
  performances,
  surface,
  gender,
}: {
  performances: readonly BestPerformance[];
  surface: RecordSurface;
  gender: Gender;
}) {
  const t = await getTranslations("records");

  const rows = performances.filter(
    (p) => p.surface === surface && p.gender === gender,
  );

  if (rows.length === 0) {
    return <p className="text-muted-on-ink text-ui-sm py-6">{t("bestEmpty")}</p>;
  }

  return (
    <table className="record-table w-full border-collapse text-left">
      <thead>
        <tr className="border-hairline-on-ink border-b">
          <th scope="col" className="record-col-discipline">{t("colDiscipline")}</th>
          <th scope="col" className="record-col-performance">{t("colPerformance")}</th>
          <th scope="col" className="record-col-name">{t("colName")}</th>
          <th scope="col" className="record-col-category">{t("colAchievedIn")}</th>
          <th scope="col" className="record-col-year">{t("colYear")}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((entry) => {
          const names = entry.holders
            .map((h) => (h.firstName ? `${h.lastName} ${h.firstName}` : h.lastName))
            .join(" · ");

          return (
            <tr
              key={entry.id}
              className="record-row border-hairline-on-ink border-b"
              data-record-row=""
              data-discipline={entry.disciplineKey}
              data-category={entry.achievedIn ?? ""}
              data-decade={Math.floor(entry.year / 10) * 10}
              data-search={`${entry.disciplineRaw} ${names}`.toLowerCase()}
            >
              <td className="record-col-discipline">
                <Link
                  href={`/rekorder/${entry.disciplineKey}`}
                  className="hover:text-accent-on-dark transition-colors duration-200"
                >
                  {/* Die Schreibweise der Quelle: "Poids 3 Kg" sagt in einer
                      U16-Liste mehr als "Poids". */}
                  {entry.disciplineRaw || entry.disciplineKey}
                </Link>
              </td>
              <td className="record-col-performance">{entry.performanceRaw}</td>
              <td className="record-col-name record-name">{names}</td>
              <td className="record-col-category">{entry.achievedIn}</td>
              <td className="record-col-year">
                <span className="flex items-center justify-end gap-2">
                  <RecordBadge
                    national={entry.isNationalRecord}
                    espoirs={entry.isEspoirsBest}
                  />
                  <span className="tabular-nums">{entry.year}</span>
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
