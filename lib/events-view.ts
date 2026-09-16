import type { ClubEvent, FederationEvent } from "@/lib/data/events";
import { localized } from "@/lib/localized";

/**
 * Eine gemeinsame Sicht auf beide Terminquellen (§5).
 *
 * Vereinstermine und FLA-Kalender bleiben in der Datenschicht getrennt — sie
 * haben verschiedene Eigentuemer und verschiedene Lebensdauern. Fuer die
 * Darstellung sind sie aber dasselbe: ein Datum, ein Name, ein Ort, eine
 * Kategorie. Ohne diese Zwischenschicht braeuchte jede Karte zwei Zweige, und
 * der zweite wuerde beim naechsten Umbau vergessen.
 */
export type EventView = {
  readonly id: string;
  readonly title: string;
  /** ISO-Datum, Tagesgenauigkeit. */
  readonly date: string;
  readonly endDate: string | null;
  readonly time: string | null;
  readonly location: string | null;
  readonly category: string | null;
  readonly href: string | null;
  /** Eine Veranstaltung des Vereins selbst — sie traegt die Akzentkante. */
  readonly isClubRace: boolean;
};

export function fromClubEvent(event: ClubEvent, locale: string): EventView {
  return {
    id: event.id,
    title: localized(event.title, locale),
    date: event.startsAt.slice(0, 10),
    endDate: event.endsAt?.slice(0, 10) ?? null,
    time: null,
    location: event.location,
    category: null,
    href: event.externalUrl,
    isClubRace: event.isClubRace,
  };
}

export function fromFederationEvent(event: FederationEvent): EventView {
  return {
    id: event.id,
    title: event.title,
    date: event.date,
    endDate: event.endDate,
    time: event.time,
    location: event.location,
    category: event.category,
    href: event.sourceUrl,
    isClubRace: event.isClubRace,
  };
}

/**
 * Tage bis zum Termin, von Kalendertag zu Kalendertag.
 *
 * Bewusst nicht ueber Millisekunden geteilt: zwischen 23:30 und 00:30 liegt
 * eine Stunde, aber ein Tag. Und in der Nacht der Zeitumstellung liegen
 * zwischen zwei Kalendertagen 23 oder 25 Stunden — eine Division haette dort
 * "an 0 Deeg" fuer morgen ergeben.
 */
export function daysUntil(date: string, now: Date): number {
  const target = new Date(`${date}T00:00:00`);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round(
    (new Date(target.getFullYear(), target.getMonth(), target.getDate()).getTime() -
      today.getTime()) /
      86_400_000,
  );
}

/**
 * Der Veranstaltungsort, kurz.
 *
 * Die FLA liefert vollstaendige Postanschriften: "Stade Émile Mayrisch, 24-60
 * rue du Stade, Esch-sur-Alzette". In einer Kalenderzeile ist davon nur der
 * erste Teil interessant — wie die Anlage heisst. Die Hausnummer sucht man,
 * wenn man hinfaehrt, und dann steht man ohnehin auf der Seite der FLA.
 *
 * Abgeschnitten wurde vorher am Zeichen: "INSTITUT NATIONAL DE…". Das ist die
 * schlechteste von drei Moeglichkeiten — es kostet denselben Platz und sagt
 * weniger als der ganze erste Teil.
 */
export function shortLocation(location: string | null): string | null {
  if (!location) return null;
  const first = location.split(",")[0]?.trim();
  return first && first.length > 0 ? first : location;
}
