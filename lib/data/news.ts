import type { Localized } from "@/lib/localized";
import { supabaseConfigured } from "@/lib/supabase/env";
import { cached } from "@/lib/supabase/cached";
import { createPublicClient } from "@/lib/supabase/public";

export type NewsItem = {
  readonly id: string;
  readonly slug: string;
  readonly title: Localized;
  readonly excerpt: Localized | null;
  readonly body: Localized;
  readonly coverImage: string | null;
  readonly publishedAt: string;
};

/**
 * Leer — und zwar nicht als Platzhalter.
 *
 * Die News-Seite der alten Vereinsseite enthaelt keinen einzigen Beitrag.
 * Das ist kein Versehen, sondern das Symptom: ein CMS, das niemand anfassen
 * will, bleibt leer. Genau deshalb ist das Redaktionssystem aus §12 der
 * eigentliche Auftrag und nicht ein Nebenaspekt.
 *
 * Hier stehen keine erfundenen Meldungen. Die Seite zeigt einen leeren
 * Zustand, der zum Schreiben einlaedt — und ab Phase 5 fuellt ihn der
 * Vorstand selbst.
 */
const news: readonly NewsItem[] = [];

export async function getNews(limit?: number): Promise<readonly NewsItem[]> {
  if (supabaseConfigured) {
    const supabase = createPublicClient("news");
    /* Welche Beitraege sichtbar sind, entscheidet RLS: veroeffentlicht und
       Datum erreicht. Hier steht kein zweiter Filter — sonst gaebe es zwei
       Wahrheiten darueber, was oeffentlich ist. */
    const fromDatabase = await cached("news", `news:${limit ?? "all"}`, async () => {
    let query = supabase
      .from("news")
      .select("*")
      .order("published_at", { ascending: false });
    if (limit !== undefined) query = query.limit(limit);

    const { data: rows, error } = await query;
    if (error || !rows) return null;
    return rows.map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title as Localized,
        excerpt: row.excerpt as Localized | null,
        body: row.body as Localized,
        coverImage: row.cover_image,
        publishedAt: row.published_at ?? "",
      }));
    });
    if (fromDatabase) return fromDatabase;
  }

  const published = [...news].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
  return limit === undefined ? published : published.slice(0, limit);
}
