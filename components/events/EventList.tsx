import { getLocale, getTranslations } from "next-intl/server";

import type { ClubEvent, FederationEvent } from "@/lib/data/events";
import { localized } from "@/lib/localized";

/**
 * Termine als Liste, nicht als Kartenraster.
 *
 * Ein Kalender wird nach Datum gelesen, nicht nach Bild. Deshalb steht das
 * Datum links in Mono und traegt die Zeile — wie in einer Ausschreibung.
 */

function formatRange(
  startsAt: string,
  endsAt: string | null,
  locale: string,
  until: string,
) {
  const day = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
  });
  const full = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (!endsAt || endsAt === startsAt) return full.format(new Date(startsAt));
  return `${day.format(new Date(startsAt))} ${until} ${full.format(new Date(endsAt))}`;
}

export async function ClubEventList({ events }: { events: readonly ClubEvent[] }) {
  const t = await getTranslations("next");
  const locale = await getLocale();

  if (events.length === 0) {
    return <p className="text-muted-on-page text-ui">{t("empty")}</p>;
  }

  const weekday = new Intl.DateTimeFormat(locale, { weekday: "short" });

  return (
    <ul className="border-hairline-on-page border-t">
      {events.map((event) => (
        <li
          key={event.id}
          className="border-hairline-on-page grid gap-x-8 gap-y-2 border-b py-6 sm:grid-cols-[12rem_1fr]"
        >
          <p className="font-data text-data-xs text-muted-on-page uppercase">
            <time dateTime={event.startsAt}>
              {weekday.format(new Date(event.startsAt))}{" "}
              {formatRange(event.startsAt, event.endsAt, locale, t("until"))}
            </time>
          </p>
          <div>
            <h3 className="text-h3 wdth-100">{localized(event.title, locale)}</h3>
            {event.body ? (
              <p className="text-muted-on-page text-ui-sm mt-2 max-w-prose">
                {localized(event.body, locale)}
              </p>
            ) : null}
            {event.location ? (
              <p className="font-data text-data-xs text-muted-on-page mt-2 uppercase">
                {event.location}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}

export async function FederationEventList({
  events,
}: {
  events: readonly FederationEvent[];
}) {
  const t = await getTranslations("next");
  const locale = await getLocale();

  if (events.length === 0) {
    return <p className="text-muted-on-page text-ui">{t("empty")}</p>;
  }

  const date = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "long",
  });

  return (
    <ul className="border-hairline-on-page border-t">
      {events.map((event) => (
        <li key={event.id} className="border-hairline-on-page border-b">
          <a
            href={event.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="record-row grid gap-x-8 gap-y-1 py-4 sm:grid-cols-[12rem_1fr_auto]"
          >
            <span className="font-data text-data-xs text-muted-on-page uppercase">
              <time dateTime={event.date}>{date.format(new Date(event.date))}</time>
              {event.time ? ` · ${event.time}` : ""}
            </span>
            <span className="text-ui-sm record-name">{event.title}</span>
            <span className="font-data text-data-xs text-muted-on-page uppercase">
              {event.location ?? event.category ?? ""}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
