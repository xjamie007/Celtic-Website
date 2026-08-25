"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";

import { disciplines } from "@/lib/data/records";
import { parsePerformance } from "@/lib/records";
import { createClient } from "@/lib/supabase/server";

/**
 * Der Ablauf aus §12: neuer Rekord in unter 60 Sekunden.
 *
 * Die Entscheidung, ob eine Leistung den Rekord schlaegt, faellt in der
 * Datenbank (public.submit_record). Hier passiert davor genau zwei Dinge:
 * die Eingabe pruefen und die Schreibweise in eine Zahl uebersetzen.
 *
 * Beides gehoert auf den Server. Kaeme der Zahlenwert aus dem Formular,
 * koennte er von der Schreibweise abweichen — und dann stuende in der
 * Rekordliste 4'05"58 und in der Sortierung etwas anderes.
 */

const holderSchema = z.object({
  lastName: z.string().trim().min(1),
  firstName: z.string().trim().optional(),
});

const recordSchema = z.object({
  disciplineKey: z.string().min(1),
  surface: z.enum(["piste", "indoor", "route"]),
  gender: z.enum(["f", "m"]),
  performanceRaw: z.string().trim().min(1),
  category: z.string().trim(),
  year: z.coerce.number().int().min(1960).max(2100),
  date: z.string().trim().optional(),
  holders: z.array(holderSchema).min(1),
  isNationalRecord: z.boolean().default(false),
  isEspoirsBest: z.boolean().default(false),
  showOnHome: z.boolean().default(false),
});

export type RecordInput = z.input<typeof recordSchema>;

export type RecordResult =
  | { status: "created" }
  | { status: "superseded"; previous: string; previousYear: number }
  | {
      status: "not_better";
      performance: string;
      current: string;
      currentYear: number;
      /** Alles, was die Bestleistung braucht — der zweite Klick soll nichts
       *  neu eintippen muessen. */
      fallback: {
        disciplineKey: string;
        gender: "f" | "m";
        category: string;
        performanceRaw: string;
        athlete: string;
        year: number;
      };
    }
  | { status: "unreadable"; value: string }
  | { status: "error"; message: string };

export async function submitRecord(input: RecordInput): Promise<RecordResult> {
  const parsed = recordSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "" };
  }
  const value = parsed.data;

  const discipline = disciplines.find((d) => d.key === value.disciplineKey);
  if (!discipline) {
    return { status: "error", message: value.disciplineKey };
  }

  /* §12: Was nicht sicher gelesen werden kann, wird nicht geraten. Die
     Meldung sagt, wie die Schreibweise aussehen muss — nicht nur, dass sie
     falsch ist. */
  const numeric = parsePerformance(value.performanceRaw, discipline.kind);
  if (numeric === null) {
    return { status: "unreadable", value: value.performanceRaw };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("submit_record", {
    p_discipline_key: value.disciplineKey,
    p_surface: value.surface,
    p_gender: value.gender,
    p_performance_raw: value.performanceRaw,
    p_performance_numeric: numeric,
    p_category: value.category,
    p_year: value.year,
    p_holders: value.holders,
    p_date: value.date && value.date.length > 0 ? value.date : undefined,
    p_is_national_record: value.isNationalRecord,
    p_is_espoirs_best: value.isEspoirsBest,
    p_show_on_home: value.showOnHome,
  });

  if (error) {
    return { status: "error", message: error.message };
  }

  const result = data as {
    status: string;
    current?: { performance_raw: string; year: number };
    previous?: { performance_raw: string; year: number };
  };

  if (result.status === "not_better") {
    return {
      status: "not_better",
      performance: value.performanceRaw,
      current: result.current?.performance_raw ?? "",
      currentYear: result.current?.year ?? 0,
      fallback: {
        disciplineKey: value.disciplineKey,
        gender: value.gender,
        category: value.category,
        performanceRaw: value.performanceRaw,
        athlete: value.holders
          .map((h) => (h.firstName ? `${h.lastName} ${h.firstName}` : h.lastName))
          .join(" · "),
        year: value.year,
      },
    };
  }

  /* §12 und §14: die betroffenen Seiten sind innerhalb von Sekunden live,
     ohne Rebuild. Genau ein Tag — die Vereinsgeschichte muss dafuer nicht
     neu gerendert werden. */
  revalidateTag("records");

  if (result.status === "superseded") {
    return {
      status: "superseded",
      previous: result.previous?.performance_raw ?? "",
      previousYear: result.previous?.year ?? 0,
    };
  }
  return { status: "created" };
}

const bestSchema = z.object({
  surface: z.enum(["piste", "indoor", "route"]).default("piste"),
  disciplineKey: z.string().min(1),
  gender: z.enum(["f", "m"]),
  category: z.string().trim().min(1),
  performanceRaw: z.string().trim().min(1),
  athlete: z.string().trim().min(1),
  year: z.coerce.number().int().min(1960).max(2100),
});

/**
 * Der zweite Weg aus §12: "Als Bestleistung eintragen statt als Rekord?"
 * Eine Leistung, die den Rekord nicht schlaegt, ist deshalb nicht wertlos —
 * und sie soll nicht daran scheitern, dass man sie neu eintippen muss.
 */
export async function saveAsBestPerformance(
  input: z.input<typeof bestSchema>,
): Promise<{ ok: boolean; message?: string }> {
  const parsed = bestSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message };
  }
  const value = parsed.data;

  const discipline = disciplines.find((d) => d.key === value.disciplineKey);
  const numeric = discipline
    ? parsePerformance(value.performanceRaw, discipline.kind)
    : null;

  const supabase = await createClient();
  /* athlete ist einem holders-Feld gewichen: eine Bestleistung kann eine
     Staffel sein, und ein Textfeld kann vier Namen nicht sauber fuehren. */
  const [lastName = value.athlete, ...rest] = value.athlete.trim().split(/\s+/);
  const { error } = await supabase.from("best_performances").insert({
    discipline_key: value.disciplineKey,
    discipline_raw: discipline?.name ?? value.disciplineKey,
    surface: value.surface,
    gender: value.gender,
    category: value.category,
    performance_raw: value.performanceRaw,
    performance_numeric: numeric,
    holders: [{ lastName, firstName: rest.join(" ") || null }],
    year: value.year,
  });

  if (error) return { ok: false, message: error.message };

  revalidateTag("records");
  return { ok: true };
}
