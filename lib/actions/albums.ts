"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

/** "Eurocross 2025" -> "eurocross-2025" */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

const localized = z.object({
  lb: z.string().trim().min(1),
  de: z.string().trim().optional(),
  fr: z.string().trim().optional(),
});

const clean = (value: z.infer<typeof localized>) =>
  Object.fromEntries(Object.entries(value).filter(([, v]) => v && v.trim() !== ""));

const schema = z.object({
  id: z.string().uuid().optional(),
  title: localized,
  description: localized.partial({ lb: true }).optional(),
  takenOn: z.string().optional(),
});

export type AlbumInput = z.input<typeof schema>;

export async function saveAlbum(
  input: AlbumInput,
): Promise<{ ok: boolean; message?: string; id?: string }> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message };
  }
  const value = parsed.data;
  const supabase = await createClient();

  const row = {
    slug: slugify(value.title.lb),
    title: clean(value.title),
    description: value.description?.lb ? clean(value.description as never) : null,
    taken_on: value.takenOn && value.takenOn !== "" ? value.takenOn : null,
  };

  const { data, error } = value.id
    ? await supabase.from("albums").update(row).eq("id", value.id).select("id").single()
    : await supabase.from("albums").insert(row).select("id").single();

  if (error) return { ok: false, message: error.message };

  revalidateTag("media");
  return { ok: true, id: data?.id };
}

export async function deleteAlbum(
  id: string,
): Promise<{ ok: boolean; message?: string }> {
  const supabase = await createClient();
  /* Die Bilder bleiben in media stehen und verlieren nur ihr Album — ein
     geloeschtes Album soll nicht unbemerkt Dateien mitnehmen. */
  const { error } = await supabase.from("albums").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidateTag("media");
  return { ok: true };
}

export async function setAlbumCover(
  albumId: string,
  mediaId: string,
): Promise<{ ok: boolean; message?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("albums")
    .update({ cover_media_id: mediaId })
    .eq("id", albumId);
  if (error) return { ok: false, message: error.message };
  revalidateTag("media");
  return { ok: true };
}
