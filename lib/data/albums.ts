import type { Localized } from "@/lib/localized";
import { cached } from "@/lib/supabase/cached";
import { supabaseConfigured } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/public";

/**
 * Fotoalben (§9: /fotoen).
 *
 * Fotos ohne Anlass sind ein Haufen. Ein Album hat ein Datum und einen Namen,
 * und danach sucht man: "Eurocross 2025", nicht "Bild 47".
 *
 * Es gibt keinen Seed. Die alte Seite fuehrt keine Galerie, und erfundene
 * Wettkampffotos gibt es nicht — die Alben entstehen, sobald der Verein die
 * ersten hochlaedt.
 */
export type Photo = {
  readonly id: string;
  readonly url: string;
  readonly alt: Localized | null;
  readonly width: number | null;
  readonly height: number | null;
};

export type Album = {
  readonly id: string;
  readonly slug: string;
  readonly title: Localized;
  readonly description: Localized | null;
  readonly takenOn: string | null;
  readonly coverUrl: string | null;
  readonly photoCount: number;
};

function publicUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return `${base}/storage/v1/object/public/media/${path}`;
}

export async function getAlbums(): Promise<readonly Album[]> {
  if (!supabaseConfigured) return [];

  const result = await cached("media", "albums", async () => {
    const supabase = createPublicClient("media");
    const { data: rows, error } = await supabase
      .from("albums")
      .select("*, media(id, path)")
      .order("taken_on", { ascending: false });
    if (error || !rows) return null;

    return rows.map((row) => {
      const photos = (row.media ?? []) as { id: string; path: string }[];
      const cover = photos.find((p) => p.id === row.cover_media_id) ?? photos[0];
      return {
        id: row.id,
        slug: row.slug,
        title: row.title as Localized,
        description: row.description as Localized | null,
        takenOn: row.taken_on,
        coverUrl: cover ? publicUrl(cover.path) : null,
        photoCount: photos.length,
      };
    });
  });

  return result ?? [];
}

export async function getAlbum(
  slug: string,
): Promise<{ album: Album; photos: readonly Photo[] } | null> {
  if (!supabaseConfigured) return null;

  return cached("media", `album:${slug}`, async () => {
    const supabase = createPublicClient("media");
    const { data: row, error } = await supabase
      .from("albums")
      .select("*, media(id, path, alt, width, height, sort_order)")
      .eq("slug", slug)
      .maybeSingle();
    if (error || !row) return null;

    const media = ((row.media ?? []) as {
      id: string;
      path: string;
      alt: unknown;
      width: number | null;
      height: number | null;
      sort_order: number;
    }[]).toSorted((a, b) => a.sort_order - b.sort_order);

    const cover = media.find((p) => p.id === row.cover_media_id) ?? media[0];

    return {
      album: {
        id: row.id,
        slug: row.slug,
        title: row.title as Localized,
        description: row.description as Localized | null,
        takenOn: row.taken_on,
        coverUrl: cover ? publicUrl(cover.path) : null,
        photoCount: media.length,
      },
      photos: media.map((photo) => ({
        id: photo.id,
        url: publicUrl(photo.path),
        alt: photo.alt as Localized | null,
        width: photo.width,
        height: photo.height,
      })),
    };
  });
}
