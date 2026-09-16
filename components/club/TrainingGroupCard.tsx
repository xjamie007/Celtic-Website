import { getTranslations } from "next-intl/server";

import { site } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Eine Trainingsgruppe als Karte (§6).
 *
 * Vorher stand hier eine Liste aus Name und Altersangabe — zwei Zeilen pro
 * Gruppe, durch einen Haarstrich getrennt. Das war korrekt und sagte nichts:
 * wer eine Gruppe fuer sein Kind sucht, will wissen, welche Kategorien dazu
 * gehoeren und wer davorsteht.
 *
 * Die Karte traegt links ein Stueck Bahn — derselbe Belag, dieselbe weisse
 * Markierung, dieselbe Koernung wie am Seitenrand. Das ist nicht Zierrat: es
 * macht aus fuenf Karten fuenf Bahnen, und die Gruppennummer darauf liest
 * sich als Bahnzuteilung. Beim Hover laeuft ein Magenta-Punkt die Bahn
 * hinunter — dieselbe Geste wie der Punkt an der Seite, nur im Kleinen.
 *
 * Vier Informationsebenen, in der Reihenfolge, in der man sie braucht:
 * Nummer und Alter, Name, Kategorien, Traineren.
 */
export async function TrainingGroupCard({
  group,
  index,
  showCoaches = true,
  maxCoaches = 4,
}: {
  group: {
    readonly key: string;
    readonly name: string;
    readonly section: string;
    readonly ages: string | null;
    readonly categories: string | null;
    readonly description: string;
    readonly coaches: readonly string[];
    readonly href: string | null;
  };
  index: number;
  showCoaches?: boolean;
  /** Auf der Startseite reichen vier Namen; auf /club/training stehen alle. */
  maxCoaches?: number;
}) {
  const t = await getTranslations("training");
  const isTriathlon = group.section === "triathlon";

  /* "5–11" wird zu "5–11 Joer", "Cadets +" bleibt "Cadets +".
     Ohne die Pruefung stand auf der Karte "CADETS + JOER". */
  const ageLabel =
    group.ages === null
      ? null
      : /^\d/.test(group.ages)
        ? `${group.ages} ${t("years")}`
        : group.ages;

  const shown = showCoaches ? group.coaches.slice(0, maxCoaches) : [];
  const hidden = showCoaches ? group.coaches.length - shown.length : 0;

  /*
    Die Trainingstage stehen schon in der Config — sie mussten nur an die
    Gruppe gebunden werden. Ein Slot ohne groups gilt fuer alle Gruppen; so
    ist die Tabelle unten auf der Seite gemeint, und so wird sie hier gelesen.
    Der Triathlon hat eigene Zeiten, die dem Verein nicht vorliegen, also
    steht bei ihm nichts — lieber nichts als ein falscher Tag.
  */
  const days = isTriathlon
    ? []
    : site.trainingTimes
        .filter(
          (slot) =>
            slot.groups.length === 0 ||
            (slot.groups as readonly string[]).includes(group.key),
        )
        .map((slot) => t(`day_${slot.dayKey}`));

  const body = (
    <>
      {/* Das Stueck Bahn mit der Gruppennummer */}
      <span
        aria-hidden="true"
        className="group-lane lane-surface relative flex w-11 shrink-0 justify-center pt-5"
      >
        <span className="bg-lane-line/60 absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2" />
        <span className="group-lane-dot bg-motion-accent absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full" />
        <span className="font-data text-data-xs text-lane-line/80 relative tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-3 px-5 py-5">
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {ageLabel ? (
            <span
              className={cn(
                "font-data text-data-xs px-1.5 py-0.5 leading-none tracking-[0.1em] uppercase",
                isTriathlon
                  ? "bg-motion-accent text-white"
                  : "border-hairline-on-page text-muted-on-page border",
              )}
            >
              {ageLabel}
            </span>
          ) : null}
          {isTriathlon ? (
            <span className="font-data text-data-xs text-accent-on-page tracking-[0.1em] uppercase">
              {t("sectionTriathlon")}
            </span>
          ) : null}
          {group.href ? (
            <span aria-hidden="true" className="event-arrow text-muted-on-page ml-auto">
              ↗
            </span>
          ) : null}
        </span>

        <span className="text-h3 wdth-100 block font-display leading-tight font-bold text-balance">
          {group.name}
        </span>

        {group.categories ? (
          <span className="font-data text-data-xs text-muted-on-page block leading-relaxed">
            {group.categories}
          </span>
        ) : null}

        <span className="text-ui-sm text-muted-on-page block leading-relaxed text-pretty">
          {group.description}
        </span>

        {days.length > 0 ? (
          <span className="font-data text-data-xs text-muted-on-page mt-1 flex flex-wrap items-center gap-1.5">
            {days.map((day) => (
              <span
                key={day}
                className="border-hairline-on-page border px-1.5 py-0.5 leading-none"
              >
                {day}
              </span>
            ))}
          </span>
        ) : null}

        {shown.length > 0 ? (
          <span className="border-hairline-on-page mt-auto block border-t pt-3">
            <span className="font-data text-data-xs text-muted-on-page block tracking-[0.1em] uppercase">
              {t("coachesLabel")}
            </span>
            <span className="text-ui-sm mt-1.5 block leading-relaxed">
              {shown.join(" · ")}
              {hidden > 0 ? (
                <span className="text-muted-on-page">
                  {" "}
                  {t("moreCoaches", { count: hidden })}
                </span>
              ) : null}
            </span>
          </span>
        ) : null}
      </span>
    </>
  );

  const className = "group-card group/gc flex h-full items-stretch text-left";

  if (!group.href) return <div className={className}>{body}</div>;

  return (
    <a
      href={group.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {body}
    </a>
  );
}
