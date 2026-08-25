import { getTranslations } from "next-intl/server";

import { NewRecordMark, RecordBadge } from "@/components/records/RecordBadge";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { getDiscipline, getRecords } from "@/lib/data/records";
import { isNewRecord } from "@/lib/records";

/**
 * Die Anzeigetafel — der Rekord-Anriss auf der Startseite.
 *
 * Bewusst kein News-Kartenraster: ein Leichtathletikverein produziert primaer
 * Leistungen, keine Artikel. Was hier steht, ist die Waehrung des Vereins,
 * gesetzt wie eine Stadionanzeige — dunkler Grund, Mono mit Tabularziffern,
 * Landesrekorde in Gold.
 *
 * Die Reihenfolge ist "was zuletzt gefallen ist": Jahr absteigend,
 * Landesrekorde zuerst.
 */
export async function Anzeigetafel() {
  const t = await getTranslations("home");
  const tr = await getTranslations("records");
  const records = await getRecords();

  const latest = [...records]
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      if (a.isNationalRecord !== b.isNationalRecord) {
        return a.isNationalRecord ? -1 : 1;
      }
      return (
        (getDiscipline(a.disciplineKey)?.order ?? 0) -
        (getDiscipline(b.disciplineKey)?.order ?? 0)
      );
    })
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 id="rekorder-title" className="text-h2 wdth-100 rise text-page-text">
          {t("recordsTitle")}
        </h2>
        <Link
          href="/rekorder"
          className="rise font-data text-data-xs text-muted-on-ink uppercase transition-colors duration-200 hover:text-white"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {t("recordsAll")} &rarr;
        </Link>
      </div>

      {latest.length === 0 ? (
        <p className="text-muted-on-ink text-ui mt-8">{tr("empty")}</p>
      ) : (
        <ul className="border-hairline-on-ink mt-10 border-t">
          {latest.map((record, index) => {
            const discipline = getDiscipline(record.disciplineKey);
            const isNew = isNewRecord(record.date, site.newRecordDays);

            return (
              <li
                key={record.id}
                className="record-row rise border-hairline-on-ink border-b"
                style={{ "--i": index + 2 } as React.CSSProperties}
              >
                <Link
                  href={`/rekorder/${record.disciplineKey}`}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-4 sm:grid-cols-[10rem_8rem_1fr_auto]"
                >
                  <span className="font-data text-ui-sm text-muted-on-ink">
                    {discipline?.name}
                  </span>
                  <span className="font-data text-ui-lg text-page-text justify-self-end tabular-nums sm:justify-self-start">
                    {record.performanceRaw}
                  </span>
                  <span className="record-name text-ui-sm text-page-text col-span-2 font-medium sm:col-span-1">
                    {record.holders
                      .map((h) =>
                        h.firstName ? `${h.lastName} ${h.firstName}` : h.lastName,
                      )
                      .join(" · ")}
                  </span>
                  <span className="col-span-2 flex items-center gap-3 sm:col-span-1 sm:justify-self-end">
                    {isNew ? <NewRecordMark /> : null}
                    <RecordBadge
                      national={record.isNationalRecord}
                      espoirs={record.isEspoirsBest}
                    />
                    <span className="font-data text-data-xs text-muted-on-ink tabular-nums">
                      {record.year}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
