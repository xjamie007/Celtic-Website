import data from "@/data/best-performances.json";

import type { Gender, RecordSurface } from "@/config/site";
import { cached } from "@/lib/supabase/cached";
import { supabaseConfigured } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/public";

import { getDiscipline, type RecordHolder } from "./records";

/**
 * Bestleistungen nach Kategorie (§9).
 *
 * Anders als die Rekorde: hier steht pro Altersklasse die beste je erzielte
 * Leistung, auch wenn sie inzwischen von einem Vereinsrekord uebertroffen
 * ist. Eine U16-Bestleistung bleibt eine U16-Bestleistung, auch wenn dieselbe
 * Person spaeter schneller lief.
 */
export type BestPerformance = {
  readonly id: string;
  readonly disciplineKey: string;
  /** Schreibweise der alten Seite, etwa "Poids 3 Kg". */
  readonly disciplineRaw: string;
  readonly surface: RecordSurface;
  readonly gender: Gender;
  /** Kategorie der Liste. */
  readonly category: string;
  /** Klasse, in der die Leistung erzielt wurde — kann abweichen. */
  readonly achievedIn: string | null;
  readonly performanceRaw: string;
  readonly performanceNumeric: number;
  readonly year: number;
  readonly isNationalRecord: boolean;
  readonly isEspoirsBest: boolean;
  readonly holders: readonly RecordHolder[];
};

const performances = data.performances as readonly BestPerformance[];

const order = (key: string) =>
  getDiscipline(key)?.order ?? Number.MAX_SAFE_INTEGER;

/** Reihenfolge wie auf der alten Seite: von der aeltesten Klasse abwaerts. */
export const categoryOrder = [
  "Sen",
  "U23",
  "U20",
  "U18",
  "U16",
  "U14",
  "U12",
  "Relais",
] as const;

export async function getBestPerformances(): Promise<readonly BestPerformance[]> {
  if (supabaseConfigured) {
    const fromDatabase = await cached("records", "best-performances", async () => {
      const supabase = createPublicClient("records");
      const { data: rows, error } = await supabase
        .from("best_performances")
        .select("*");
      if (error || !rows || rows.length === 0) return null;
      return rows.map((row) => ({
        id: row.id,
        disciplineKey: row.discipline_key,
        disciplineRaw: row.discipline_raw ?? "",
        surface: row.surface as RecordSurface,
        gender: row.gender as Gender,
        category: row.category,
        achievedIn: row.achieved_in,
        performanceRaw: row.performance_raw,
        performanceNumeric: Number(row.performance_numeric ?? 0),
        year: row.year,
        isNationalRecord: row.is_national_record ?? false,
        isEspoirsBest: row.is_espoirs_best ?? false,
        holders: (row.holders as RecordHolder[]) ?? [],
      }));
    });
    if (fromDatabase) return fromDatabase;
  }

  return [...performances].sort(
    (a, b) => order(a.disciplineKey) - order(b.disciplineKey),
  );
}

/** Welche Kategorien haben ueberhaupt Eintraege? */
export async function getCategories(): Promise<readonly string[]> {
  const all = await getBestPerformances();
  const present = new Set(all.map((p) => p.category));
  return categoryOrder.filter((category) => present.has(category));
}
