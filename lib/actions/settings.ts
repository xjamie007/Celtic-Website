"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";

import { site } from "@/config/site";
import { createClient } from "@/lib/supabase/server";

/**
 * Bereiche zuschalten oder abschalten (§2) — nur admin.
 *
 * Gespeichert wird die vollstaendige Karte, nicht ein einzelner Schalter:
 * so gibt es genau einen Datensatz und keine Frage, was gilt, wenn zwei
 * Personen gleichzeitig etwas umlegen.
 */
const schema = z.record(z.string(), z.boolean());

export async function setFeatures(
  input: Record<string, boolean>,
): Promise<{ ok: boolean; message?: string }> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false, message: "invalid" };

  /* Nur bekannte Schluessel: ein Tippfehler im Formular soll keinen
     Bereich erfinden, den es nicht gibt. */
  const known = Object.keys(site.features);
  const value = Object.fromEntries(
    Object.entries(parsed.data).filter(([key]) => known.includes(key)),
  );

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", user?.id ?? "")
    .maybeSingle();

  const { error } = await supabase
    .from("settings")
    .upsert(
      { key: "features", value, updated_by: profile?.id ?? null },
      { onConflict: "key" },
    );

  if (error) return { ok: false, message: error.message };

  /* Alles auffrischen: ein Schalter aendert Navigation, Footer, Sitemap und
     die Sichtbarkeit ganzer Seiten auf einmal. */
  for (const tag of [
    "settings",
    "records",
    "news",
    "events",
    "sponsors",
    "people",
    "pages",
    "media",
  ] as const) {
    revalidateTag(tag);
  }

  return { ok: true };
}
