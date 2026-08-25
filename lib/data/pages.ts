import data from "@/data/pages.json";

import { defaultLocale } from "@/config/site";
import { supabaseConfigured } from "@/lib/supabase/env";
import { cached } from "@/lib/supabase/cached";
import { createPublicClient } from "@/lib/supabase/public";

/**
 * Langtexte, importiert von der alten Seite (tools/import-pages.mjs).
 *
 * Als Bloecke, nicht als HTML: das alte CMS gibt Word-Markup mit
 * Inline-Styles aus, und rohes Fremd-HTML zu rendern hiesse
 * dangerouslySetInnerHTML fuer Inhalt, den ein fremdes CMS erzeugt hat.
 *
 * Die Texte sind luxemburgisch. §11 sieht den stillen Rueckfall auf lb vor —
 * bis der Verein Uebersetzungen liefert, steht auf /de und /fr derselbe Text.
 * Das ist die dokumentierte Regel und kein Provisorium.
 */

export type ContentBlock =
  | { readonly type: "heading"; readonly text: string }
  | { readonly type: "paragraph"; readonly text: string }
  | { readonly type: "list"; readonly items: readonly string[] };

export type PageContent = {
  readonly slug: string;
  readonly source: string;
  readonly blocks: readonly ContentBlock[];
};

const pages = data.pages as Record<string, PageContent>;

export async function getPageContent(slug: string): Promise<PageContent | null> {
  if (supabaseConfigured) {
    const fromDatabase = await cached("pages", `page:${slug}`, async () => {
      const supabase = createPublicClient("pages");
      const { data: row, error } = await supabase
        .from("pages")
        .select("slug, body")
        .eq("slug", slug)
        .maybeSingle();
      if (error || !row) return null;
      const body = row.body as Record<string, ContentBlock[]>;
      return {
        slug: row.slug,
        source: "supabase",
        blocks: body[defaultLocale] ?? [],
      } satisfies PageContent;
    });
    if (fromDatabase) return fromDatabase;
  }

  return pages[slug] ?? null;
}
