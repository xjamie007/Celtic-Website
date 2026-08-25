import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { Anzeigetafel } from "@/components/home/Anzeigetafel";
import { Hero } from "@/components/home/Hero";
import { LaneSection } from "@/components/lane/LaneSection";
import { ClubPhoto } from "@/components/media/ClubPhoto";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { getClubEvents, getFederationEvents } from "@/lib/data/events";
import { getFeatures } from "@/lib/features";
import { localized } from "@/lib/localized";

type PageProps = { params: Promise<{ locale: string }> };

/**
 * Startsaeit.
 *
 * §1: hoechstens fuenf Sektionen, drei Informationsebenen je Sektion, ein
 * Akzent je Bildschirm. Was hier nicht steht, steht auf einer Unterseite —
 * die Startseite soll den Verein zeigen, nicht ihn abbilden.
 *
 *   START · Hero
 *   100   · Naechster Termin (einer, nicht die Liste)
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
    ? await Promise.all([getClubEvents(), getFederationEvents(new Date(), 1)])
    : [[], []];

  /* Ein Termin, nicht drei: der naechste eigene Lauf, sonst der naechste
     Termin ueberhaupt. */
  const nextEvent = clubEvents[0] ?? null;
  const nextFederation = nextEvent ? null : (federationEvents[0] ?? null);
  const hasNext = Boolean(nextEvent ?? nextFederation);

  const dateFormat = new Intl.DateTimeFormat(activeLocale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <>
      {/* ── START ────────────────────────────────────────────────────── */}
      <LaneSection
        id="start"
        className="bg-page text-ink-text relative isolate -mt-[var(--header-height)] overflow-hidden"
      >
        <Hero />
      </LaneSection>

      {/* ── 100 · Naechster Termin ───────────────────────────────────── */}
      {hasNext ? (
        <LaneSection id="next" labelledBy="next-title" className="bg-page">
          <Reveal>
            <div className="section-space mx-auto max-w-[1240px] px-5 sm:px-8">
              <h2
                id="next-title"
                className="font-data text-data-xs text-muted-on-page rise uppercase"
              >
                {tn("next")}
              </h2>
              <p
                className="text-h2 wdth-100 rise mt-4"
                style={{ "--i": 1 } as React.CSSProperties}
              >
                {nextEvent
                  ? localized(nextEvent.title, activeLocale)
                  : (nextFederation?.title ?? "")}
              </p>
              <p
                className="font-data text-ui-sm text-muted-on-page rise mt-3"
                style={{ "--i": 2 } as React.CSSProperties}
              >
                <time
                  dateTime={nextEvent ? nextEvent.startsAt : nextFederation?.date}
                >
                  {dateFormat.format(
                    new Date(
                      nextEvent ? nextEvent.startsAt : (nextFederation?.date ?? ""),
                    ),
                  )}
                </time>
                {nextEvent?.location ? ` · ${nextEvent.location}` : ""}
              </p>
              <p className="rise mt-8" style={{ "--i": 3 } as React.CSSProperties}>
                <Link
                  href="/next"
                  className="text-ui decoration-hairline-on-page hover:decoration-motion-accent hover:text-accent-on-page underline decoration-2 underline-offset-8 transition-colors duration-200"
                >
                  {t("nextAll")} &rarr;
                </Link>
              </p>
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
          §9: Das Gruppenbild zwischen Hero und Trainingsgruppen, volle
          Breite, mit Verlauf nach unten in Ink. Es ist der Beweis, dass
          hinter der Seite ein Verein mit echten Menschen steht — und der
          gehoert vor die Aufzaehlung der Gruppen, nicht dahinter.
        */}
        <div className="relative">
          <ClubPhoto
            src="/photos/palamos-team.webp"
            alt={t("groupPhotoAlt")}
            sizes="100vw"
            className="h-[60svh] w-full"
          />
          <span
            aria-hidden="true"
            className="from-page pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t to-transparent"
          />
        </div>

        <Reveal>
          <div className="section-space mx-auto max-w-[1240px] px-5 sm:px-8">
            <h2
              id="club-title"
              className="font-data text-data-xs text-muted-on-page rise uppercase"
            >
              {t("clubTitle")}
            </h2>

            <ul className="mt-6">
              {site.trainingGroups.map((group, index) => (
                <li
                  key={group.key}
                  className="border-hairline-on-page rise border-b py-5"
                  style={{ "--i": index + 1 } as React.CSSProperties}
                >
                  <span className="text-h3 wdth-100 block font-display font-bold">
                    {group.name}
                  </span>
                  {group.ages ? (
                    <span className="font-data text-data-xs text-muted-on-page mt-1 block uppercase">
                      {group.ages}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>

            <p className="rise mt-8" style={{ "--i": 8 } as React.CSSProperties}>
              <Link
                href="/club/training"
                className="text-ui decoration-hairline-on-page hover:decoration-motion-accent hover:text-accent-on-page underline decoration-2 underline-offset-8 transition-colors duration-200"
              >
                {t("clubLink")} &rarr;
              </Link>
            </p>
          </div>
        </Reveal>
      </LaneSection>
    </>
  );
}
