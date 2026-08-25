"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

/**
 * Trainer:innen und Vorstand pflegen (§12).
 *
 * Beide bekommen ein Portrait und eine kurze Vorstellung. Das Foto haengt an
 * einer Bedingung in der Datenbank: ohne bestaetigte Einwilligung wird es
 * abgewiesen (§13). Diese Datei kann das nicht umgehen — und soll es nicht.
 */
const localized = z.object({
  lb: z.string().trim().optional(),
  de: z.string().trim().optional(),
  fr: z.string().trim().optional(),
});

const clean = (value: z.infer<typeof localized> | undefined) => {
  if (!value) return null;
  const entries = Object.entries(value).filter(([, v]) => v && v.trim() !== "");
  return entries.length > 0 ? Object.fromEntries(entries) : null;
};

const coachSchema = z.object({
  id: z.string().uuid().optional(),
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  section: z.enum(["athletics", "triathlon"]),
  brevet: z.string().trim().optional(),
  bio: localized.optional(),
  photo: z.string().trim().optional(),
  consent: z.boolean().optional(),
  sortOrder: z.coerce.number().int().default(0),
});

export type CoachInput = z.input<typeof coachSchema>;

export async function saveCoach(
  input: CoachInput,
): Promise<{ ok: boolean; message?: string }> {
  const parsed = coachSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message };
  }
  const value = parsed.data;
  const photo = value.photo && value.photo !== "" ? value.photo : null;

  /* Die Bedingung steht in der Datenbank; hier wird sie nur frueher und mit
     einer verstaendlichen Meldung beantwortet. */
  if (photo && !value.consent) {
    return { ok: false, message: "consent-required" };
  }

  const supabase = await createClient();
  const row = {
    first_name: value.firstName,
    last_name: value.lastName,
    section: value.section,
    brevet: value.brevet && value.brevet !== "" ? value.brevet : null,
    bio: clean(value.bio),
    photo,
    consent_on_file: value.consent ?? false,
    sort_order: value.sortOrder,
  };

  const { error } = value.id
    ? await supabase.from("coaches").update(row).eq("id", value.id)
    : await supabase.from("coaches").insert(row);

  if (error) return { ok: false, message: error.message };
  revalidateTag("people");
  return { ok: true };
}

const memberSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1),
  roleKey: z.string().trim().min(1),
  bio: localized.optional(),
  photo: z.string().trim().optional(),
  consent: z.boolean().optional(),
  sortOrder: z.coerce.number().int().default(0),
});

export type CommitteeInput = z.input<typeof memberSchema>;

export async function saveCommitteeMember(
  input: CommitteeInput,
): Promise<{ ok: boolean; message?: string }> {
  const parsed = memberSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message };
  }
  const value = parsed.data;
  const photo = value.photo && value.photo !== "" ? value.photo : null;
  if (photo && !value.consent) return { ok: false, message: "consent-required" };

  const supabase = await createClient();
  const row = {
    name: value.name,
    role_key: value.roleKey,
    bio: clean(value.bio),
    photo,
    consent_on_file: value.consent ?? false,
    sort_order: value.sortOrder,
  };

  const { error } = value.id
    ? await supabase.from("committee").update(row).eq("id", value.id)
    : await supabase.from("committee").insert(row);

  if (error) return { ok: false, message: error.message };
  revalidateTag("people");
  return { ok: true };
}

export async function deletePerson(
  table: "coaches" | "committee",
  id: string,
): Promise<{ ok: boolean; message?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidateTag("people");
  return { ok: true };
}
