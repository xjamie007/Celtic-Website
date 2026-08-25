import feed from "@/data/events.json";

import { site } from "@/config/site";
import type { Localized } from "@/lib/localized";
import { supabaseConfigured } from "@/lib/supabase/env";
import { cached } from "@/lib/supabase/cached";
import { createPublicClient } from "@/lib/supabase/public";

/**
 * Termine (§9, §12).
 *
 * Zwei Quellen, bewusst getrennt gehalten:
 *
 * 1. Eigene Termine des Vereins. Sie gehoeren dem Verein und werden ab
 *    Phase 5 im Admin gepflegt. Der Seed stammt von der alten Seite.
 * 2. Der Wettkampfkalender der FLA. Er aendert sich staendig und gehoert
 *    nicht dem Verein; er wird verlinkt, nicht besessen.
 *
 * Die Trennung ist keine Formsache: wuerde beides in einem Topf liegen,
 * muesste der Vorstand fremde Termine pflegen, und ein Ausfall der Quelle
 * saehe aus wie ein leerer Vereinskalender.
 */

export type ClubEvent = {
  readonly id: string;
  readonly slug: string;
  readonly title: Localized;
  readonly body: Localized | null;
  readonly startsAt: string;
  readonly endsAt: string | null;
  readonly location: string | null;
  readonly externalUrl: string | null;
  /** Veranstaltung des Vereins selbst (§9: Nordstadsemi, Eurocross, …). */
  readonly isClubRace: boolean;
};

export type FederationEvent = {
  readonly id: string;
  readonly title: string;
  readonly date: string;
  /** Mehrtaegige Veranstaltungen: letzter Tag. */
  readonly endDate: string | null;
  readonly time: string | null;
  readonly location: string | null;
  readonly category: string | null;
  readonly sourceUrl: string;
  /** Vermutung des Imports — im Admin überstimmbar. */
  readonly isClubRace: boolean;
};

/** Von celtic.lu uebernommen — der einzige Termin, der dort steht. */
const clubEvents: readonly ClubEvent[] = [
  {
    id: "waemper-2026",
    slug: "waemper-triathlon-lof-2026",
    title: { lb: "Wämper Triathlon + Wämper Lof" },
    body: { lb: "Den 22. an 23. August zu Weiswampech." },
    startsAt: "2026-08-22",
    endsAt: "2026-08-23",
    location: "Weiswampach",
    externalUrl: null,
    isClubRace: true,
  },
];

/**
 * Die wiederkehrenden Vereinsveranstaltungen stehen in config/site.ts, weil
 * sie laut §9 spaeter eigene Subsites bekommen sollen. Sie haben hier noch
 * kein Datum — das traegt der Vorstand ein, sobald es feststeht.
 */
export const recurringEvents = site.events;

export async function getClubEvents(now = new Date()): Promise<readonly ClubEvent[]> {
  const today = now.toISOString().slice(0, 10);

  if (supabaseConfigured) {
    const fromDatabase = await cached("events", `events:${today}`, async () => {
      const supabase = createPublicClient("events");
      const { data: rows, error } = await supabase
        .from("events")
        .select("*")
        .or(`ends_at.gte.${today},and(ends_at.is.null,starts_at.gte.${today})`)
        .order("starts_at");
      if (error || !rows) return null;
      return rows.map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title as Localized,
        body: row.body as Localized | null,
        startsAt: row.starts_at,
        endsAt: row.ends_at,
        location: row.location,
        externalUrl: row.external_url,
        isClubRace: row.is_club_race,
      }));
    });
    if (fromDatabase) return fromDatabase;
  }

  return clubEvents
    .filter((event) => (event.endsAt ?? event.startsAt) >= today)
    .toSorted((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export async function getFederationEvents(
  now = new Date(),
  limit?: number,
): Promise<readonly FederationEvent[]> {
  const today = now.toISOString().slice(0, 10);
  const upcoming = (feed.events as readonly FederationEvent[])
    .filter((event) => event.date >= today)
    .toSorted((a, b) => a.date.localeCompare(b.date));
  return limit === undefined ? upcoming : upcoming.slice(0, limit);
}

export const federationSource = feed.source;
