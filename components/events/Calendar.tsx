import { getLocale, getTranslations } from "next-intl/server";

import type { ClubEvent, FederationEvent } from "@/lib/data/events";
import { localized } from "@/lib/localized";
import { cn } from "@/lib/utils";

/**
 * Der Wettkampfkalender (§9).
 *
 * Nach Monaten gruppiert, nicht als Monatsraster: ein Raster mit vier
 * Terminen ist zu neunzig Prozent leere Kaesten. Ein Kalender wird nach
 * Datum gelesen, und die Liste zeigt in derselben Hoehe das Dreifache.
 *
 * Die eigenen Veranstaltungen des Vereins stehen in derselben Zeitleiste wie
 * alle anderen — sie an den Anfang zu sortieren wuerde die Chronologie
 * zerstoeren, und ein Kalender, der nicht chronologisch ist, ist keiner. Sie
 * heben sich stattdessen ab: Magenta-Marke, groesserer Titel, Kennzeichnung.
 */
type Entry = {
  key: string;
  date: string;
  endsAt: string | null;
  time: string | null;
  title: string;
  body: string | null;
  location: string | null;
  category: string | null;
  href: string | null;
  isClubRace: boolean;
};

export async function Calendar({
  clubEvents,
  federationEvents,
}: {
  clubEvents: readonly ClubEvent[];
  federationEvents: readonly FederationEvent[];
}) {
  const t = await getTranslations("next");
  const locale = await getLocale();

  const entries: Entry[] = [
    ...clubEvents.map((event) => ({
      key: `club-${event.id}`,
      date: event.startsAt,
      endsAt: event.endsAt,
      time: null,
      title: localized(event.title, locale),
      body: event.body ? localized(event.body, locale) : null,
      location: event.location,
      category: null,
      href: event.externalUrl,
      isClubRace: event.isClubRace,
    })),
    ...federationEvents.map((event) => ({
      key: `fla-${event.id}`,
      date: event.date,
      endsAt: event.endDate,
      time: event.time,
      title: event.title,
      body: null,
      location: event.location,
      category: event.category,
      href: event.sourceUrl,
      isClubRace: event.isClubRace,
    })),
  ]
    /*
      Eine unlesbare Zeile darf nicht die ganze Seite mitnehmen. Der Import
      hat sie gemeldet und der Verein kann sie richtigstellen — bis dahin
      fehlt ein Termin, statt dass der Kalender gar nicht erscheint.
    */
    .filter((entry) => !Number.isNaN(new Date(entry.date).getTime()))
    .sort((a, b) => a.date.localeCompare(b.date));

  if (entries.length === 0) {
    return <p className="text-muted-on-page text-ui">{t("empty")}</p>;
  }

  /* Nach Monat gruppieren, Reihenfolge bleibt chronologisch. */
  const months = new Map<string, Entry[]>();
  for (const entry of entries) {
    const key = entry.date.slice(0, 7);
    const list = months.get(key);
    if (list) list.push(entry);
    else months.set(key, [entry]);
  }

  const monthFormat = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  });
  const dayFormat = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
  });
  const dayOnlyFormat = new Intl.DateTimeFormat(locale, { day: "numeric" });
  const dayMonthFormat = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
  });

  return (
    <div className="space-y-12">
      {[...months].map(([month, list]) => (
        <section key={month}>
          <h3 className="border-hairline-on-page font-data text-data-xs text-muted-on-page border-b pb-2 uppercase">
            {monthFormat.format(new Date(`${month}-01`))}
          </h3>

          <ul>
            {list.map((entry) => {
              const Row = entry.href ? "a" : "div";
              return (
                <li
                  key={entry.key}
                  className={cn(
                    "border-hairline-on-page border-b",
                    entry.isClubRace && "calendar-own",
                  )}
                >
                  <Row
                    {...(entry.href
                      ? {
                          href: entry.href,
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                    className="record-row grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[9rem_1fr_auto]"
                  >
                    <span className="font-data text-data-xs text-muted-on-page flex items-baseline gap-2 uppercase">
                      {/* Die Marke sitzt an der Zeitleiste, nicht am Titel:
                          so sieht man beim Ueberfliegen der Datumsspalte
                          sofort, wo die eigenen Termine liegen. */}
                      {entry.isClubRace ? (
                        <span
                          aria-hidden="true"
                          className="bg-motion-accent mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        />
                      ) : null}
                      <time dateTime={entry.date}>
                        {/* "11.–12. Sep" statt "11. September – 12. September":
                            die Datumsspalte ist neun Zeichen breit, und ein
                            Bereich, der über drei Zeilen umbricht, macht die
                            Zeitleiste unlesbar. */}
                        {entry.endsAt && entry.endsAt !== entry.date
                          ? `${dayOnlyFormat.format(new Date(entry.date))}–${dayMonthFormat.format(new Date(entry.endsAt))}`
                          : dayFormat.format(new Date(entry.date))}
                      </time>
                      {entry.time ? <span>{entry.time}</span> : null}
                    </span>

                    <span>
                      <span
                        className={cn(
                          "record-name block",
                          entry.isClubRace
                            ? "text-h3 wdth-100 font-display font-bold"
                            : "text-ui-sm",
                        )}
                      >
                        {entry.title}
                      </span>
                      {entry.body ? (
                        <span className="text-muted-on-page text-ui-sm mt-1 block">
                          {entry.body}
                        </span>
                      ) : null}
                      {entry.isClubRace ? (
                        <span className="font-data text-data-xs text-accent-on-page mt-1 block uppercase">
                          {t("ourRace")}
                        </span>
                      ) : null}
                    </span>

                    <span className="font-data text-data-xs text-muted-on-page uppercase sm:text-right">
                      {entry.location ?? entry.category ?? ""}
                    </span>
                  </Row>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
