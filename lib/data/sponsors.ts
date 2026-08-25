import type { SponsorTier } from "@/config/site";
import { supabaseConfigured } from "@/lib/supabase/env";
import { cached } from "@/lib/supabase/cached";
import { createPublicClient } from "@/lib/supabase/public";

export type Sponsor = {
  readonly id: string;
  readonly name: string;
  /** Kein Logo vorhanden -> die Bande traegt den Namen als Schriftzug. */
  readonly logoUrl: string | null;
  readonly websiteUrl: string | null;
  readonly tier: SponsorTier;
  readonly sortOrder: number;
  /**
   * Position auf dem Trikot in Prozent, fuer /sponsoren (§7).
   *
   * Die Werte hier sind eine Belegung der ueblichen Plaetze, keine
   * Vermessung des echten Trikots — die liegt nicht vor. Ab Phase 5 setzt
   * der Vorstand sie mit einem Klick auf eine Trikot-Vorschau, und die
   * Seite sagt bis dahin, dass sie vorlaeufig sind.
   */
  readonly jerseyPosition: { readonly x: number; readonly y: number } | null;
  readonly activeUntil: string | null;
};

/**
 * Seed-Daten aus §7 des Auftrags (Stand Recherche).
 * Phase 4 ersetzt getSponsors() durch die Supabase-Abfrage — die Signatur
 * bleibt, damit die Komponenten sich nicht aendern muessen.
 */
const seed: readonly Sponsor[] = [
  { id: "asport", name: "Asport", logoUrl: "/sponsors/asport.webp", websiteUrl: "https://www.asport.lu", tier: "haaptsponsor", sortOrder: 10, jerseyPosition: { x: 50, y: 42 }, activeUntil: null },
  { id: "zens", name: "Zens sàrl", logoUrl: "/sponsors/zens.webp", websiteUrl: "https://www.porteszens.lu", tier: "partner", sortOrder: 20, jerseyPosition: { x: 40, y: 56 }, activeUntil: null },
  { id: "pepin", name: "Garage Pepin", logoUrl: "/sponsors/pepin.webp", websiteUrl: "https://www.pepin.lu", tier: "partner", sortOrder: 30, jerseyPosition: { x: 60, y: 56 }, activeUntil: null },
  { id: "voyages-schmit", name: "Voyages Schmit", logoUrl: "/sponsors/schmit.webp", websiteUrl: "https://www.voyages-schmit.lu", tier: "partner", sortOrder: 40, jerseyPosition: { x: 40, y: 66 }, activeUntil: null },
  { id: "lalux", name: "LALUX", logoUrl: "/sponsors/lalux.webp", websiteUrl: "https://www.lalux.lu", tier: "partner", sortOrder: 50, jerseyPosition: { x: 60, y: 66 }, activeUntil: null },
  { id: "peters-sports", name: "Peters Sports", logoUrl: null, websiteUrl: null, tier: "supporter", sortOrder: 60, jerseyPosition: { x: 50, y: 76 }, activeUntil: null },
  { id: "s-cape", name: "S-Cape", logoUrl: null, websiteUrl: null, tier: "supporter", sortOrder: 70, jerseyPosition: { x: 38, y: 30 }, activeUntil: null },
  { id: "reiff-mazout", name: "Reiff Mazout S.A.", logoUrl: null, websiteUrl: null, tier: "supporter", sortOrder: 80, jerseyPosition: { x: 62, y: 30 }, activeUntil: null },
];

/**
 * §12: Sponsoren mit abgelaufener Laufzeit verschwinden automatisch von der
 * Seite, bleiben aber im Datenbestand. Die Filterung gehoert deshalb hierhin
 * und nicht in die Komponente.
 */
export async function getSponsors(now = new Date()): Promise<readonly Sponsor[]> {
  if (supabaseConfigured) {
    const fromDatabase = await cached("sponsors", "sponsors:active", async () => {
    const supabase = createPublicClient("sponsors");
    /* Die Laufzeitpruefung steht in der Datenbank — als Policy und als Sicht.
       Hier wird deshalb nicht noch einmal gefiltert: zwei Stellen mit
       derselben Regel gehen irgendwann auseinander. */
    const { data: rows, error } = await supabase
      .from("active_sponsors")
      .select("*")
      .order("sort_order");

    if (error || !rows) return null;
    return rows.map((row) => ({
      id: row.id as string,
      name: row.name as string,
      logoUrl: row.logo_url as string | null,
      websiteUrl: row.website_url as string | null,
      tier: row.tier as SponsorTier,
      sortOrder: row.sort_order as number,
      jerseyPosition: row.jersey_position as { x: number; y: number } | null,
      activeUntil: row.active_until as string | null,
    }));
    });
    if (fromDatabase) return fromDatabase;
  }

  return seed
    .filter((s) => !s.activeUntil || new Date(s.activeUntil) >= now)
    .toSorted((a, b) => a.sortOrder - b.sortOrder);
}
