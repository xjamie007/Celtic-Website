/**
 * Leistungen lesen, vergleichen und einordnen.
 *
 * Das ist die Grundlage fuer den wichtigsten Ablauf im Redaktionssystem (§12):
 * Traegt jemand eine neue Leistung ein, muss das System selbst erkennen, ob
 * sie den bestehenden Rekord schlaegt. Bei Zeiten ist kleiner besser, bei
 * Sprung und Wurf groesser — deshalb steht neben der Schreibweise
 * (performanceRaw) immer ein Zahlenwert (performanceNumeric).
 *
 * Die Schreibweise selbst bleibt erhalten, wie sie in Ergebnislisten steht:
 * 4'05"58 wird nicht zu 245,58 s umgeschrieben. Wer die Tabelle liest, will
 * die Wettkampfnotation sehen.
 */

export type DisciplineKind = "time" | "distance" | "points";

/** mm'ss"hh · ss"hh */
const TIME = /^(?:(\d+)')?(\d+)"(\d{1,2})$/;
/** 5,99 m · 47,90 m · 5.99m */
const MEASURE = /^(\d+)[.,](\d{1,2})\s*m$/;
/** 4812 (Mehrkampf) */
const POINTS = /^(\d{3,5})$/;

/**
 * Wandelt eine Schreibweise in einen vergleichbaren Zahlenwert:
 * Zeiten in Sekunden, Weiten in Metern, Mehrkampf in Punkten.
 * Gibt null zurueck, wenn die Eingabe nicht gelesen werden kann — der Admin
 * soll dann nachfragen und nicht raten (§12).
 */
export function parsePerformance(
  raw: string,
  kind: DisciplineKind,
): number | null {
  const value = raw.trim();

  if (kind === "time") {
    const match = TIME.exec(value);
    if (!match) return null;
    const [, minutes, seconds, hundredths] = match;
    if (seconds === undefined || hundredths === undefined) return null;
    return (
      Number(minutes ?? 0) * 60 +
      Number(seconds) +
      Number(hundredths.padEnd(2, "0")) / 100
    );
  }

  if (kind === "distance") {
    const match = MEASURE.exec(value);
    if (!match) return null;
    const [, whole, fraction] = match;
    if (whole === undefined || fraction === undefined) return null;
    return Number(whole) + Number(fraction.padEnd(2, "0")) / 100;
  }

  const match = POINTS.exec(value);
  return match?.[1] ? Number(match[1]) : null;
}

/**
 * Ist a besser als b? Zeiten: kleiner. Sprung, Wurf, Mehrkampf: groesser.
 * Genau diese Frage stellt der Admin, bevor er einen Rekord ueberschreibt.
 */
export function isBetter(a: number, b: number, kind: DisciplineKind): boolean {
  return kind === "time" ? a < b : a > b;
}

/**
 * Der Betrag der Verbesserung, in der Einheit der Disziplin.
 * Immer positiv, wenn es wirklich eine Verbesserung ist.
 */
export function improvement(
  next: number,
  previous: number,
  kind: DisciplineKind,
): number {
  return kind === "time" ? previous - next : next - previous;
}

/** −0,31 · +12 cm — die Spalte, die eine Rekordliste von einer Tabelle trennt. */
export function formatImprovement(
  next: number,
  previous: number,
  kind: DisciplineKind,
  locale: string,
): string {
  const delta = improvement(next, previous, kind);
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  /* Bei Zeiten ist die Verbesserung eine Verkuerzung und traegt deshalb ein
     Minus — so steht es auch auf jeder Anzeigetafel. */
  const sign = kind === "time" ? "−" : "+";
  return `${sign}${formatter.format(Math.abs(delta))}`;
}

/** §10: Ein Rekord gilt als NEI, solange er juenger als 90 Tage ist. */
export function isNewRecord(
  date: string | null,
  windowDays: number,
  now = new Date(),
): boolean {
  if (!date) return false;
  const age = now.getTime() - new Date(date).getTime();
  return age >= 0 && age <= windowDays * 24 * 60 * 60 * 1000;
}
