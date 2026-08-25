"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

/**
 * Sponsorenverwaltung (§12).
 *
 * Nur admin — durchgesetzt in der Datenbank, nicht hier. Diese Datei prueft
 * die Eingabe; wer schreiben darf, entscheidet die Policy auf public.sponsors.
 * Ein Redakteur, der diese Aktion direkt aufruft, kommt trotzdem nicht durch.
 */
const schema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1),
  websiteUrl: z.string().trim().url().or(z.literal("")).optional(),
  logoUrl: z.string().trim().optional(),
  tier: z.enum(["haaptsponsor", "partner", "supporter"]),
  activeFrom: z.string().trim().optional(),
  activeUntil: z.string().trim().optional(),
  sortOrder: z.coerce.number().int().min(0).default(0),
  jerseyX: z.coerce.number().min(0).max(100).nullable().optional(),
  jerseyY: z.coerce.number().min(0).max(100).nullable().optional(),
});

export type SponsorInput = z.input<typeof schema>;

export async function saveSponsor(
  input: SponsorInput,
): Promise<{ ok: boolean; message?: string }> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message };
  }
  const value = parsed.data;

  const row = {
    name: value.name,
    website_url: value.websiteUrl && value.websiteUrl !== "" ? value.websiteUrl : null,
    logo_url: value.logoUrl && value.logoUrl !== "" ? value.logoUrl : null,
    tier: value.tier,
    active_from: value.activeFrom && value.activeFrom !== "" ? value.activeFrom : null,
    active_until: value.activeUntil && value.activeUntil !== "" ? value.activeUntil : null,
    sort_order: value.sortOrder,
    jersey_position:
      value.jerseyX === null || value.jerseyX === undefined || value.jerseyY === null || value.jerseyY === undefined
        ? null
        : { x: value.jerseyX, y: value.jerseyY },
  };

  const supabase = await createClient();
  const { error } = value.id
    ? await supabase.from("sponsors").update(row).eq("id", value.id)
    : await supabase.from("sponsors").insert(row);

  if (error) return { ok: false, message: error.message };

  /* Die Zielgerade steht auf jeder Seite — deshalb faellt hier der ganze
     Sponsoren-Tag, und nicht eine einzelne Adresse. */
  revalidateTag("sponsors");
  return { ok: true };
}

export async function deleteSponsor(
  id: string,
): Promise<{ ok: boolean; message?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("sponsors").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidateTag("sponsors");
  return { ok: true };
}
