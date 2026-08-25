import data from "@/data/records.json";

import type { Gender, RecordSurface } from "@/config/site";
import type { DisciplineKind } from "@/lib/records";
import { supabaseConfigured } from "@/lib/supabase/env";
import { cached } from "@/lib/supabase/cached";
import { createPublicClient } from "@/lib/supabase/public";

/**
 * Die Rekorddaten kommen aus data/records.json, erzeugt von
 * tools/import-records.mjs aus den Tabellen der alten Seite. Der Import
 * normalisiert die ueber Jahre gewachsenen Schreibweisen auf eine einzige
 * Wettkampfnotation und meldet jede Zeile, die er nicht sicher lesen kann.
 *
 * Phase 4 ersetzt die Datei durch Supabase; die Signaturen hier bleiben,
 * damit sich keine Komponente aendern muss.
 */

export type Discipline = {
  readonly key: string;
  /** Wettkampfnotation, bewusst nicht uebersetzt. */
  readonly name: string;
  readonly order: number;
  readonly kind: DisciplineKind;
};

export type RecordHolder = {
  readonly lastName: string;
  readonly firstName: string | null;
};

export type ClubRecord = {
  readonly id: string;
  readonly disciplineKey: string;
  readonly surface: RecordSurface;
  readonly gender: Gender;
  readonly performanceRaw: string;
  readonly performanceNumeric: number;
  /** Erste Kategorie — zum Filtern. */
  readonly category: string;
  /** Vollstaendige Angabe, bei geteilten Rekorden etwa "U23 U20". */
  readonly categoryRaw: string;
  readonly year: number;
  readonly yearRaw: string;
  readonly date: string | null;
  readonly isNationalRecord: boolean;
  readonly isEspoirsBest: boolean;
  readonly holders: readonly RecordHolder[];
};

/** Rekorde, die im Stade Municipal aufgestellt wurden — von wem auch immer. */
export type VenueRecord = {
  readonly id: string;
  readonly disciplineKey: string;
  readonly performanceRaw: string;
  readonly performanceNumeric: number;
  readonly holders: readonly RecordHolder[];
  readonly nation: string | null;
  readonly year: number | null;
  readonly isNationalRecord: boolean;
};

export type RecordHistoryEntry = {
  readonly id: string;
  readonly disciplineKey: string;
  readonly surface: RecordSurface;
  readonly gender: Gender;
  readonly performanceRaw: string;
  readonly performanceNumeric: number;
  readonly holders: readonly RecordHolder[];
  readonly year: number;
  readonly supersededAt: string;
};

export const disciplines = data.disciplines as readonly Discipline[];
const records = data.records as readonly ClubRecord[];
const venue = data.venue as readonly VenueRecord[];

const byKey = new Map(disciplines.map((d) => [d.key, d]));

export function getDiscipline(key: string): Discipline | undefined {
  return byKey.get(key);
}

const order = (key: string) => byKey.get(key)?.order ?? Number.MAX_SAFE_INTEGER;

/**
 * Rekordverlauf (§10).
 *
 * Bewusst leer. Die alte Seite fuehrt nur die aktuellen Rekorde, keine
 * frueheren Halter:innen — und erfundene Namen und Zeiten haetten in einer
 * Vereinschronik nichts verloren, auch nicht als Demo. Zeitleiste und
 * Delta-Spalte sind gebaut und zeigen sich, sobald echte Daten da sind. Ab
 * Phase 5 fuellt sich die Tabelle ausserdem von selbst: jeder ueberschriebene
 * Rekord wandert automatisch hierher.
 */
const history: readonly RecordHistoryEntry[] = [];

/**
 * Zeilen aus der Datenbank in die Form bringen, die die Komponenten kennen.
 * Die Umbenennung passiert hier und nicht in den Komponenten: sonst muesste
 * jede von ihnen wissen, dass Postgres in snake_case denkt.
 */
type RecordRow = {
  id: string;
  discipline_key: string;
  surface: string;
  gender: string | null;
  performance_raw: string;
  performance_numeric: number;
  category: string;
  category_raw: string;
  year: number;
  year_raw: string;
  date: string | null;
  is_national_record: boolean;
  is_espoirs_best: boolean;
  nation: string | null;
  record_holders: { last_name: string; first_name: string | null; position: number }[];
};

const toClubRecord = (row: RecordRow): ClubRecord => ({
  id: row.id,
  disciplineKey: row.discipline_key,
  surface: row.surface as RecordSurface,
  gender: (row.gender ?? "f") as Gender,
  performanceRaw: row.performance_raw,
  performanceNumeric: Number(row.performance_numeric),
  category: row.category,
  categoryRaw: row.category_raw,
  year: row.year,
  yearRaw: row.year_raw,
  date: row.date,
  isNationalRecord: row.is_national_record,
  isEspoirsBest: row.is_espoirs_best,
  holders: [...row.record_holders]
    .sort((a, b) => a.position - b.position)
    .map((h) => ({ lastName: h.last_name, firstName: h.first_name })),
});

const RECORD_SELECT =
  "id, discipline_key, surface, gender, performance_raw, performance_numeric, category, category_raw, year, year_raw, date, is_national_record, is_espoirs_best, nation, record_holders(last_name, first_name, position)";

export async function getRecords(): Promise<readonly ClubRecord[]> {
  if (supabaseConfigured) {
    /* Faellt die Datenbank aus, zeigt die Seite den importierten Bestand
       statt einer leeren Rekordtabelle. Ein Verein, dessen Rekorde fuer
       zehn Minuten verschwinden, bekommt Anrufe. */
    const fromDatabase = await cached("records", "records:current", async () => {
      const supabase = createPublicClient("records");
      const { data: rows, error } = await supabase
        .from("records")
        .select(RECORD_SELECT)
        .neq("surface", "stade")
        .eq("is_current", true);
      if (error || !rows) return null;
      return (rows as unknown as RecordRow[])
        .map(toClubRecord)
        .sort((a, b) => order(a.disciplineKey) - order(b.disciplineKey));
    });
    if (fromDatabase) return fromDatabase;
  }

  return [...records].sort((a, b) => order(a.disciplineKey) - order(b.disciplineKey));
}

export async function getVenueRecords(): Promise<readonly VenueRecord[]> {
  if (supabaseConfigured) {
    const fromDatabase = await cached("records", "records:venue", async () => {
      const supabase = createPublicClient("records");
      const { data: rows, error } = await supabase
        .from("records")
        .select(RECORD_SELECT)
        .eq("surface", "stade");
      if (error || !rows) return null;
      return (rows as unknown as RecordRow[])
        .map((row) => ({
          id: row.id,
          disciplineKey: row.discipline_key,
          performanceRaw: row.performance_raw,
          performanceNumeric: Number(row.performance_numeric),
          holders: [...row.record_holders]
            .sort((a, b) => a.position - b.position)
            .map((h) => ({ lastName: h.last_name, firstName: h.first_name })),
          nation: row.nation,
          year: row.year,
          isNationalRecord: row.is_national_record,
        }))
        .sort((a, b) => order(a.disciplineKey) - order(b.disciplineKey));
    });
    if (fromDatabase) return fromDatabase;
  }

  return [...venue].sort((a, b) => order(a.disciplineKey) - order(b.disciplineKey));
}

export async function getRecordHistory(
  disciplineKey: string,
  surface: RecordSurface,
  gender: Gender,
): Promise<readonly RecordHistoryEntry[]> {
  if (supabaseConfigured) {
    const fromDatabase = await cached("records", `records:history:${disciplineKey}:${surface}:${gender}`, async () => {
    const supabase = createPublicClient("records");
    const { data: rows, error } = await supabase
      .from("record_history")
      .select("*")
      .eq("discipline_key", disciplineKey)
      .eq("surface", surface)
      .eq("gender", gender)
      .order("year", { ascending: false });

    if (error || !rows) return null;
    return rows.map((row) => ({
      id: row.id,
      disciplineKey: row.discipline_key,
      surface: row.surface as RecordSurface,
      gender: (row.gender ?? gender) as Gender,
      performanceRaw: row.performance_raw,
      performanceNumeric: Number(row.performance_numeric),
      holders: (row.holders as { lastName: string; firstName: string | null }[]) ?? [],
      year: row.year,
      supersededAt: row.superseded_at,
    }));
    });
    if (fromDatabase) return fromDatabase;
  }

  return history
    .filter(
      (e) =>
        e.disciplineKey === disciplineKey &&
        e.surface === surface &&
        e.gender === gender,
    )
    .sort((a, b) => b.year - a.year);
}

/** Fuer die Kennzahl im Hero (§6). */
export async function countNationalRecords(): Promise<number> {
  if (supabaseConfigured) {
    const supabase = createPublicClient("records");
    /* Ohne den Ausschluss von stade zaehlten auch Landesrekorde mit, die
       Gaeste im Stade Municipal aufgestellt haben. Die Kennzahl im Hero
       heisst "Landesrekorder" und meint die des Vereins — der Unterschied
       waren drei Rekorde, und niemand haette gemerkt, welche. */
    const fromDatabase = await cached("records", "records:national-count", async () => {
      const { count, error } = await supabase
        .from("records")
        .select("id", { count: "exact", head: true })
        .eq("is_current", true)
        .eq("is_national_record", true)
        .neq("surface", "stade");
      return error || count === null ? null : count;
    });
    if (fromDatabase !== null) return fromDatabase;
  }
  return records.filter((r) => r.isNationalRecord).length;
}
