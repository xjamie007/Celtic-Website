import { getLocale, getTranslations } from "next-intl/server";

import { daysUntil, shortLocation, type EventView } from "@/lib/events-view";
import { cn } from "@/lib/utils";

/**
 * Eine Terminkarte (§5).
 *
 * Der Aufbau folgt dem, wonach man in einem Wettkampfkalender sucht, und in
 * dieser Reihenfolge: Wann — Was — Wo — Welche Art. Deshalb sitzt das Datum
 * als eigener Block links, gesetzt wie eine Startnummer, und traegt die
 * Karte. Der Rest liest sich daneben in einer Zeile weiter.
 *
 * Drei Dinge machen aus der Liste eine Karte, ohne sie zu ueberladen:
 *
 * 1. Der Datumsblock ist farbig und traegt die einzige grosse Zahl. Er ist
 *    der Ankerpunkt beim Ueberfliegen — man sucht ein Datum, keinen Namen.
 * 2. Die Restzeit steht als kleine Angabe daneben ("an 7 Deeg"). Ein Datum
 *    allein zwingt zum Nachrechnen.
 * 3. Eigene Veranstaltungen tragen Magenta statt Blau und eine Kennzeichnung.
 *    Sie sind der Grund, warum der Verein einen Kalender hat.
 */

function ClockGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <circle cx="8" cy="8" r="6.2" />
      <path d="M8 4.4V8l2.6 1.6" strokeLinecap="round" />
    </svg>
  );
}

function PlaceGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M8 14.2s4.8-4.1 4.8-7.6a4.8 4.8 0 1 0-9.6 0c0 3.5 4.8 7.6 4.8 7.6Z" />
      <circle cx="8" cy="6.5" r="1.8" />
    </svg>
  );
}

export async function EventCard({
  event,
  now = new Date(),
}: {
  event: EventView;
  now?: Date;
}) {
  const locale = await getLocale();
  const t = await getTranslations("next");

  const start = new Date(`${event.date}T00:00:00`);
  const day = new Intl.DateTimeFormat(locale, { day: "2-digit" }).format(start);
  const month = new Intl.DateTimeFormat(locale, { month: "short" }).format(start);
  const weekday = new Intl.DateTimeFormat(locale, { weekday: "short" }).format(start);

  const days = daysUntil(event.date, now);
  const countdown =
    days <= 0 ? t("today") : days === 1 ? t("tomorrow") : t("inDays", { count: days });

  /* Mehrtaegig: der letzte Tag steht klein unter dem ersten, statt eine
     zweite Karte zu bekommen. Es ist eine Veranstaltung, kein zweiter Termin. */
  const end = event.endDate && event.endDate !== event.date ? new Date(`${event.endDate}T00:00:00`) : null;
  const endDay = end ? new Intl.DateTimeFormat(locale, { day: "2-digit" }).format(end) : null;

  const body = (
    <>
      {/* ── Datumsblock ───────────────────────────────────────────────── */}
      <span
        className={cn(
          "event-bib flex shrink-0 flex-col items-center justify-center px-4 py-4",
          event.isClubRace ? "event-bib-club" : "event-bib-default",
        )}
      >
        <span className="font-data text-[0.625rem] leading-none tracking-[0.16em] uppercase opacity-80">
          {month}
        </span>
        <span className="font-display text-[1.75rem] leading-[1.1] font-black tabular-nums">
          {day}
          {endDay ? <span className="opacity-70">–{endDay}</span> : null}
        </span>
        <span className="font-data text-[0.625rem] leading-none tracking-[0.16em] uppercase opacity-80">
          {weekday}
        </span>
      </span>

      {/* ── Inhalt ────────────────────────────────────────────────────── */}
      <span className="flex min-w-0 flex-1 flex-col gap-2 px-5 py-4">
        {/* Der Titel bekommt die ganze Zeile. Stand die Restzeit daneben,
            blieben ihm in einer Dreierspalte rund 210px und jeder zweite Name
            brach auf drei Zeilen um — der Titel ist das, wonach man sucht. */}
        {/* Mindesthoehe zweier Zeilen: sonst sitzt bei einem kurzen Titel
            die Metazeile hoeher als bei den Nachbarkarten, und die Reihe
            wirkt ausgefranst. */}
        <span className="flex min-h-[2.75rem] items-start justify-between gap-3">
          <span className="text-ui wdth-100 font-display leading-snug font-semibold text-balance">
            {event.title}
          </span>
          {event.href ? (
            <span
              aria-hidden="true"
              className="event-arrow text-muted-on-page mt-1 shrink-0"
            >
              ↗
            </span>
          ) : null}
        </span>

        {/* Zeit und Ort links, Restzeit rechts — alles in Mono, alles klein.
            Die Zeile steht immer, auch ohne Zeit und Ort: sonst haette die
            Restzeit keinen festen Platz und saesse mal hier, mal dort. */}
        <span className="font-data text-data-xs text-muted-on-page flex items-center gap-x-4">
          {event.time ? (
            <span className="flex shrink-0 items-center gap-1.5">
              <ClockGlyph />
              <span className="sr-only">{t("timeLabel")} </span>
              {event.time}
            </span>
          ) : null}
          {event.location ? (
            <span className="flex min-w-0 items-center gap-1.5">
              <PlaceGlyph />
              <span className="sr-only">{t("placeLabel")} </span>
              <span className="truncate">{shortLocation(event.location)}</span>
            </span>
          ) : null}
          <span className="ml-auto shrink-0 tabular-nums">{countdown}</span>
        </span>

        {event.isClubRace || event.category ? (
          <span className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1.5 pt-1">
            {event.isClubRace ? (
              <span className="font-data text-data-xs bg-motion-accent px-1.5 py-0.5 leading-none tracking-[0.1em] text-white uppercase">
                {t("ourRace")}
              </span>
            ) : null}
            {event.category ? (
              <span className="font-data text-data-xs text-muted-on-page border-hairline-on-page border px-1.5 py-0.5 leading-none tracking-[0.08em] uppercase">
                {event.category}
              </span>
            ) : null}
          </span>
        ) : null}
      </span>
    </>
  );

  const className = "event-card group/event flex h-full w-full items-stretch text-left";

  if (!event.href) {
    return <div className={className}>{body}</div>;
  }

  return (
    <a
      href={event.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {body}
    </a>
  );
}
