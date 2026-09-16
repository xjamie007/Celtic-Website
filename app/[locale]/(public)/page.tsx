import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { EventCard } from "@/components/events/EventCard";
import { Anzeigetafel } from "@/components/home/Anzeigetafel";
import { Hero } from "@/components/home/Hero";
import { TrainingGroupCard } from "@/components/club/TrainingGroupCard";
import { LaneSection } from "@/components/lane/LaneSection";
import { ClubPhoto } from "@/components/media/ClubPhoto";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { getClubEvents, getFederationEvents } from "@/lib/data/events";
import { fromClubEvent, fromFederationEvent } from "@/lib/events-view";
import { getFeatures } from "@/lib/features";

type PageProps = { params: Promise<{ locale: string }> };

/**
 * Startsaeit.
 *
 *   START · Hero mit der Bahn dahinter
 *   100   · Naechste Termine
 *   200   · Rekorder
 *   300   · Trainingsgruppen
 *   ZIEL  · Zielgerade (aus dem Layout)
 *
 * Sektionen ohne Inhalt rendern gar nicht erst (§2) — kein "keine Eintraege
 * vorhanden", keine leere Ueberschrift.
 */
export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tn = await getTranslations("nav");
  const activeLocale = await getLocale();
  const features = await getFeatures();

  const [clubEvents, federationEvents] = features.events
    ? await Promise.all([getClubEvents(), getFederationEvents(new Date(), 6)])
    : [[], []];

  /*
    Drei Termine statt einem (§5).
    Ein einzelner Termin unter einer Ueberschrift fuellte eine ganze Sektion
    mit vier Zeilen Text — viel Flaeche, wenig Aussage. Drei Karten sagen
    mehr und brauchen weniger Hoehe.

    Eigene Veranstaltungen stehen vorn: sie sind der Grund, warum der Verein
    einen Kalender fuehrt. Danach wird mit dem FLA-Kalender aufgefuellt, ohne
    Dubletten — die eigenen Laeufe stehen dort auch drin.
  */
  const own = clubEvents.map((event) => fromClubEvent(event, activeLocale));
  const ownDates = new Set(own.map((event) => `${event.date}|${event.title}`));
  const upcoming = [
    ...own,
    ...federationEvents
      .map(fromFederationEvent)
      .filter((event) => !ownDates.has(`${event.date}|${event.title}`))
      /* Fortbildungen fuer Trainer und Kampfrichter stehen im FLA-Kalender
         und gehoeren dorthin — auf /next stehen sie weiter. Auf der
         Startseite nicht: "Wou de CELTIC um Start steet" sind Wettkaempfe,
         und ein Kurstermin verdraengt sonst den naechsten Lauf. */
      .filter((event) => !event.category?.startsWith("Formation")),
  ]
    .toSorted((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  return (
    <>
      {/* ── START ────────────────────────────────────────────────────── */}
      <LaneSection
        id="start"
        className="bg-page text-ink-text relative isolate -mt-[var(--header-height)] overflow-hidden"
      >
        <Hero />
      </LaneSection>

      {/* ── 100 · Naechste Termine ───────────────────────────────────── */}
      {upcoming.length > 0 ? (
        <LaneSection id="next" labelledBy="next-title" className="bg-page">
          <Reveal>
            <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 lg:py-24">
              <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
                <div>
                  <h2
                    id="next-title"
                    className="font-data text-data-xs text-muted-on-page rise tracking-[0.12em] uppercase"
                  >
                    {tn("next")}
                  </h2>
                  <p
                    className="text-h3 wdth-100 rise mt-2 max-w-[34ch] font-display font-semibold text-balance"
                    style={{ "--i": 1 } as React.CSSProperties}
                  >
                    {t("nextLead")}
                  </p>
                </div>
                <Link
                  href="/next"
                  className="text-ui decoration-hairline-on-page hover:decoration-motion-accent hover:text-accent-on-page rise underline decoration-2 underline-offset-8 transition-colors duration-200"
                  style={{ "--i": 2 } as React.CSSProperties}
                >
                  {t("nextAll")} &rarr;
                </Link>
              </div>

              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((event, index) => (
                  <li
                    key={event.id}
                    className="rise"
                    style={{ "--i": index + 3 } as React.CSSProperties}
                  >
                    <EventCard event={event} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </LaneSection>
      ) : null}

      {/* ── 200 · Rekorder ───────────────────────────────────────────── */}
      {features.records ? (
        <LaneSection
          id="rekorder"
          labelledBy="rekorder-title"
          className="bg-deep text-page-text"
        >
          <Reveal>
            <Anzeigetafel />
          </Reveal>
        </LaneSection>
      ) : null}

      {/* ── 300 · Der Verein ─────────────────────────────────────────── */}
      <LaneSection id="veräin" labelledBy="club-title" className="bg-page">
        {/*
          §9: Das Gruppenbild zwischen Rekordern und Trainingsgruppen, volle
          Breite, mit Verlauf nach unten in die Seitenfarbe. Es ist der Beweis,
          dass hinter der Seite ein Verein mit echten Menschen steht — und der
          gehoert vor die Aufzaehlung der Gruppen, nicht dahinter.
        */}
        <div className="relative">
          <ClubPhoto
            src="/photos/palamos-team.webp"
            alt={t("groupPhotoAlt")}
            sizes="100vw"
            className="h-[52svh] w-full"
          />
          <span
            aria-hidden="true"
            className="from-page pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t to-transparent"
          />
        </div>

        <Reveal>
          <div className="mx-auto max-w-[1240px] px-5 pt-16 pb-20 sm:px-8 lg:pb-24">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
              <h2
                id="club-title"
                className="font-data text-data-xs text-muted-on-page rise tracking-[0.12em] uppercase"
              >
                {t("clubTitle")}
              </h2>
              <Link
                href="/club/training"
                className="text-ui decoration-hairline-on-page hover:decoration-motion-accent hover:text-accent-on-page rise underline decoration-2 underline-offset-8 transition-colors duration-200"
                style={{ "--i": 1 } as React.CSSProperties}
              >
                {t("clubLink")} &rarr;
              </Link>
            </div>

            <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {site.trainingGroups.map((group, index) => (
                <li
                  key={group.key}
                  className="rise"
                  style={{ "--i": index + 2 } as React.CSSProperties}
                >
                  <TrainingGroupCard group={group} index={index} maxCoaches={3} />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </LaneSection>
    </>
  );
}
