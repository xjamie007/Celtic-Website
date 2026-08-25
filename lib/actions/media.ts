"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";

import { prepareImage, safeFileName, type ImageKind } from "@/lib/images";
import { createClient } from "@/lib/supabase/server";

/**
 * Bild hochladen (§12).
 *
 * Der Ablauf ist bewusst einer: Datei entgegennehmen, aufbereiten, in den
 * Speicher legen, in media eintragen, öffentliche Adresse zurückgeben. Wer
 * ein Sponsorenlogo hochlädt, soll nicht vorher wissen müssen, dass es WebP
 * sein und 400px hoch sein soll — das macht die Anwendung.
 */
const schema = z.object({
  kind: z.enum(["logo", "portrait", "photo"]),
  alt: z.string().trim().min(1),
  albumId: z.string().uuid().optional(),
  /* §13: Zeigt das Bild erkennbare Personen, muss die Einwilligung
     bestätigt sein. Die Datenbank weist es sonst ab. */
  consent: z.boolean().optional(),
});

export type UploadResult =
  | { ok: true; url: string; mediaId: string; width: number; height: number }
  | { ok: false; message: string };

export async function uploadImage(form: FormData): Promise<UploadResult> {
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "no-file" };
  }

  const parsed = schema.safeParse({
    kind: form.get("kind"),
    alt: form.get("alt"),
    albumId: form.get("albumId") || undefined,
    consent: form.get("consent") === "true",
  });
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "invalid" };
  }
  const value = parsed.data;

  let prepared;
  try {
    prepared = await prepareImage(await file.arrayBuffer(), value.kind as ImageKind);
  } catch {
    /* Kein lesbares Bild — etwa ein PDF mit .jpg am Ende. */
    return { ok: false, message: "not-an-image" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "not-signed-in" };

  /* Der Pfad enthält einen Zeitstempel: lädt jemand dasselbe Logo zweimal
     hoch, überschreibt die zweite Datei nicht die erste — sonst änderte sich
     ein Bild an einer Stelle, an der niemand damit rechnet. */
  const path = `${value.kind}/${Date.now()}-${safeFileName(file.name)}.${prepared.extension}`;

  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(path, prepared.data, {
      contentType: prepared.contentType,
      cacheControl: "31536000",
      upsert: false,
    });

  if (uploadError) return { ok: false, message: uploadError.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(path);

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  const { data: media, error: mediaError } = await supabase
    .from("media")
    .insert({
      path,
      alt: { lb: value.alt },
      album_id: value.albumId ?? null,
      width: prepared.width,
      height: prepared.height,
      consent_on_file: value.consent ?? false,
      uploaded_by: profile?.id ?? null,
    })
    .select("id")
    .single();

  if (mediaError || !media) {
    /* Der Eintrag ist fehlgeschlagen — dann darf die Datei nicht als Leiche
       im Speicher bleiben. */
    await supabase.storage.from("media").remove([path]);
    return { ok: false, message: mediaError?.message ?? "media-insert-failed" };
  }

  revalidateTag("media");
  return {
    ok: true,
    url: publicUrl,
    mediaId: media.id,
    width: prepared.width,
    height: prepared.height,
  };
}

export async function deleteMedia(
  mediaId: string,
): Promise<{ ok: boolean; message?: string }> {
  const supabase = await createClient();
  const { data: media } = await supabase
    .from("media")
    .select("path")
    .eq("id", mediaId)
    .maybeSingle();

  if (media?.path) await supabase.storage.from("media").remove([media.path]);
  const { error } = await supabase.from("media").delete().eq("id", mediaId);
  if (error) return { ok: false, message: error.message };

  revalidateTag("media");
  return { ok: true };
}
