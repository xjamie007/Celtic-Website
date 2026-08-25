"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

/**
 * Benutzerverwaltung (§12) — nur admin.
 *
 * Wer schreiben darf, entscheidet die Policy auf public.profiles. Diese Datei
 * prueft die Eingabe und verhindert einen Fall, den die Policy nicht kennt:
 * dass sich jemand selbst die Administratorrolle nimmt und der Verein danach
 * ohne Administrator dasteht.
 */
const schema = z.object({
  profileId: z.string().uuid(),
  role: z.enum(["admin", "editor", "author"]),
});

export async function setUserRole(
  input: z.input<typeof schema>,
): Promise<{ ok: boolean; message?: string }> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: own } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("user_id", user?.id ?? "")
    .maybeSingle();

  if (own?.id === parsed.data.profileId && parsed.data.role !== "admin") {
    return { ok: false, message: "self-demote" };
  }

  const { error } = await supabase
    .from("profiles")
    .update({ role: parsed.data.role })
    .eq("id", parsed.data.profileId);

  if (error) return { ok: false, message: error.message };

  revalidateTag("people");
  return { ok: true };
}
