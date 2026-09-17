import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { LaneSection } from "@/components/lane/LaneSection";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/config/site";
import { getClubEvents } from "@/lib/data/events";
import { requireFeature } from "@/lib/features";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

/** Die Veranstaltungen mit eigener Seite — der Triathlon hat seine eigene. */
const ownPages = site.events.filter((event) => !event.external);

export function generateStaticParams() {
  return ownPages.map((event) => ({ slug: event.slug }));
}

function find(slug: string) {
  return ownPages.find((event) => event.slug === slug) ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = find(slug);
  return event ? { title: event.name } : {};
}

/**
 * /evenementer/[slug] (§9)
 *
 * Nordstadsemi und Eurocross standen bisher nur als Links im Fuss, die aus
 * der Seite herausfuehrten. Beides sind aber Veranstaltungen des Vereins —
 * sie gehoeren ins Haus.
 *
 * Die Seite bleibt bewusst knapp: Name, Termin, Ort, Strecken, und von dort
 * ein Weg zur Anmeldung. Sie tritt nicht in Konkurrenz zur
 * Veranstaltungsseite mit Ergebnislisten und Streckenplaenen, sondern sagt,
 * was die Veranstaltung ist und wann sie stattfindet.
 *
 * Der Termin ist das Einzige, was sich jedes Jahr aendert — und genau das
 * Feld, das das Comite im Redaktionsbereich pflegt. Steht dort ein Termin
 * mit diesem Slug, gilt er. Sonst zeigt die Seite die letzte bekannte
 * Ausgabe und sagt dazu, dass der naechste Termin noch nicht feststeht.
 * Eine erfundene Jahreszahl waere schlimmer als keine.
 */
export default async function EventPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  await requireFeature("events");

  const event = find(slug);
  if (!event) notFound();

  const t = await getTranslations("events");
  const tf = await getTranslations("footer");
  const tc = await getTranslations("club");
  const activeLocale = await getLocale();

  /* Ein kommender Termin aus dem Redaktionsbereich schlaegt den Stand aus
     der Config — deshalb wird hier gesucht und nicht dort gelesen. */
  const upcoming = (await getClubEvents()).find((item) => item.slug === slug);
  const date = upcoming?.startsAt.slice(0, 10) ?? event.lastKnownDate;
  const isUpcoming = Boolean(upcoming);

  const format = new Intl.DateTimeFormat(activeLocale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <LaneSection id="evenement" labelledBy="evenement-title">
      <div className="mx-auto max-w-[1240px] px-5 pt-16 pb-24 sm:px-8">
        <p className="font-data text-data-xs text-muted-on-page uppercase">
          {tf("events")}
        </p>
        <h1 id="evenement-title" className="text-h1 wdth-112 mt-3">
          {event.name}
        </h1>
        <p className="text-body-lg text-muted-on-page mt-4 max-w-prose">
          {t(slug === "nordstadsemi" ? "leadNordstadsemi" : "leadEurocross")}
        </p>

        {/* ── Termin ────────────────────────────────────────────────────
            Die groesste Zahl auf der Seite, weil es die einzige Angabe ist,
            wegen der jemand wiederkommt. */}
        <Reveal>
          <div className="border-hairline-on-page mt-12 border-t pt-8">
            <h2 className="font-data text-data-xs text-muted-on-page uppercase">
              {isUpcoming ? t("nextEdition") : t("lastEdition")}
            </h2>
            {date ? (
              <p className="text-h2 wdth-100 mt-3">
                <time dateTime={date}>{format.format(new Date(date))}</time>
              </p>
            ) : (
              <p className="text-body-lg text-muted-on-page mt-3 max-w-prose">
                {t("dateUnknown")}
              </p>
            )}
            {date && !isUpcoming ? (
              <p className="text-muted-on-page text-ui-sm mt-3 max-w-prose">
                {t("dateTbd")}
              </p>
            ) : null}
            {upcoming?.location ? (
              <p className="text-muted-on-page text-ui mt-3">
                {upcoming.location}
              </p>
            ) : null}
          </div>
        </Reveal>

        {/* ── Strecken und Ort ──────────────────────────────────────────── */}
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-data text-data-xs text-muted-on-page uppercase">
              {t("races")}
            </h2>
            <ul className="border-hairline-on-page mt-3 border-t">
              {event.races.map((race) => (
                <li
                  key={race}
                  className="border-hairline-on-page text-ui border-b py-3"
                >
                  {race}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-data text-data-xs text-muted-on-page uppercase">
              {t("place")}
            </h2>
            <p className="text-ui mt-3">{event.city}</p>
            <p className="mt-3">
              <a
                href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(event.mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-data text-data-xs text-muted-on-page hover:text-ink-text uppercase transition-colors duration-200"
              >
                {tc("mapLink")} ↗
              </a>
            </p>

            {event.edition ? (
              <>
                <h2 className="font-data text-data-xs text-muted-on-page mt-8 uppercase">
                  {t("edition")}
                </h2>
                <p className="text-ui mt-3">
                  {t("editionNumber", { number: event.edition })}
                </p>
              </>
            ) : null}
          </div>
        </div>

        {/* ── Weg zur Veranstaltungsseite ──────────────────────────────── */}
        <div className="border-hairline-on-page mt-12 border-t pt-8">
          <p className="text-muted-on-page text-ui max-w-prose">
            {t("officialNote", { name: event.fullName })}
          </p>
          <p className="mt-4">
            <a
              href={event.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ui-lg decoration-hairline-on-page hover:decoration-motion-accent hover:text-accent-on-page underline decoration-2 underline-offset-8 transition-colors duration-200"
            >
              {t("officialSite")} ↗
            </a>
          </p>
        </div>
      </div>
    </LaneSection>
  );
}
