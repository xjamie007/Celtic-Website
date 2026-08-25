import { getLocale, getTranslations } from "next-intl/server";

import { RecordBadge } from "@/components/records/RecordBadge";
import type { Discipline, ClubRecord, RecordHistoryEntry } from "@/lib/data/records";
import { formatImprovement } from "@/lib/records";

/**
 * Der Rekordverlauf (§10).
 *
 * Alle frueheren Halter:innen als senkrechte Zeitleiste, oben der aelteste
 * Eintrag. Jeder Knoten sitzt waagerecht dort, wo seine Leistung im Feld
 * liegt: der schwaechste Wert links, der beste rechts. Dadurch wandert die
 * Linie ueber die Jahre sichtbar nach rechts — man sieht, wie der Rekord
 * gefallen ist, statt es aus Zahlen ableiten zu muessen.
 *
 * Das kostet fast nichts, weil das CMS jeden ueberschriebenen Rekord ohnehin
 * archiviert (§12) — und es macht 58 Jahre Vereinsgeschichte anfassbar.
 */
export async function RecordTimeline({
  discipline,
  current,
  history,
}: {
  discipline: Discipline;
  current: ClubRecord;
  history: readonly RecordHistoryEntry[];
}) {
  const t = await getTranslations("records");
  const locale = await getLocale();

  /* Von alt nach neu, der aktuelle Rekord am Ende. */
  const entries = [
    ...[...history].sort((a, b) => a.year - b.year).map((entry) => ({
      key: entry.id,
      performanceRaw: entry.performanceRaw,
      performanceNumeric: entry.performanceNumeric,
      holders: entry.holders,
      year: entry.year,
      isCurrent: false,
      national: false,
      espoirs: false,
    })),
    {
      key: current.id,
      performanceRaw: current.performanceRaw,
      performanceNumeric: current.performanceNumeric,
      holders: current.holders,
      year: current.year,
      isCurrent: true,
      national: current.isNationalRecord,
      espoirs: current.isEspoirsBest,
    },
  ];

  const values = entries.map((e) => e.performanceNumeric);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min;

  /** 0 = schwaechster Wert, 1 = bester. Bei Zeiten ist klein besser.
   *  Gibt es nur einen Eintrag, gibt es nichts zu vergleichen — dann steht er
   *  buendig statt eingerueckt an einer Position, die nichts bedeutet. */
  const position = (value: number) => {
    if (span === 0) return 0;
    const ratio = (value - min) / span;
    return discipline.kind === "time" ? 1 - ratio : ratio;
  };

  return (
    <div>
      {history.length === 0 ? (
        <p className="text-muted-on-ink text-ui-sm mb-8">{t("noHistory")}</p>
      ) : null}

      <ol className="relative">
        {entries.map((entry, index) => {
          const previous = entries[index - 1];
          const names = entry.holders
            .map((h) => (h.firstName ? `${h.lastName} ${h.firstName}` : h.lastName))
            .join(" · ");

          return (
            <li key={entry.key} className="relative grid grid-cols-[auto_1fr] gap-x-5">
              {/* Die Linie im Trikotverlauf laeuft durch alle Knoten. */}
              <div className="relative flex w-3 justify-center">
                {index > 0 ? (
                  <span
                    aria-hidden="true"
                    className="gradient-surface absolute top-0 bottom-1/2 w-0.5"
                  />
                ) : null}
                {index < entries.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="gradient-surface absolute top-1/2 bottom-0 w-0.5"
                  />
                ) : null}
                <span
                  aria-hidden="true"
                  className={
                    entry.isCurrent
                      ? "bg-motion-accent relative top-1/2 h-3 w-3 -translate-y-1/2 rounded-full"
                      : "bg-lane-line/50 relative top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
                  }
                />
              </div>

              <div
                className="border-hairline-on-ink flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b py-5"
                style={{
                  /* Waagerechte Position kodiert die Leistung im Feld. */
                  marginInlineStart: `calc(${position(entry.performanceNumeric)} * 12%)`,
                }}
              >
                <span className="font-data text-ui-lg text-page-text tabular-nums">
                  {entry.performanceRaw}
                </span>
                <span className="text-ui-sm text-page-text font-medium">{names}</span>
                <span className="font-data text-data-xs text-muted-on-ink tabular-nums">
                  {entry.year}
                </span>
                {entry.isCurrent ? (
                  <span className="font-data text-data-xs text-accent-on-dark uppercase">
                    {t("historyCurrent")}
                  </span>
                ) : null}
                <RecordBadge national={entry.national} espoirs={entry.espoirs} />
                {previous ? (
                  <span className="font-data text-data-xs text-accent-on-dark tabular-nums">
                    {formatImprovement(
                      entry.performanceNumeric,
                      previous.performanceNumeric,
                      discipline.kind,
                      locale,
                    )}
                  </span>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
