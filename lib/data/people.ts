/**
 * Trainer:innen und Vorstand — die Namen aus dem Anhang des Auftrags.
 * Echte Bestandsdaten, unveraendert uebernommen. Was fehlt (Brevets,
 * Biografien, Fotos), kommt vom Verein und ist im Datenmodell (§12) schon
 * vorgesehen; hier steht null statt einer Erfindung.
 */

import type { Localized } from "@/lib/localized";
import { supabaseConfigured } from "@/lib/supabase/env";
import { cached } from "@/lib/supabase/cached";
import { createPublicClient } from "@/lib/supabase/public";

export type CoachSection = "athletics" | "triathlon";

export type Coach = {
  readonly id: string;
  readonly lastName: string;
  readonly firstName: string;
  readonly section: CoachSection;
  readonly brevet: string | null;
  readonly photo: string | null;
  /** Kurze Vorstellung — mehrsprachig, lb als Rueckfall (§11). */
  readonly bio: Localized | null;
};

const coach = (
  firstName: string,
  lastName: string,
  section: CoachSection,
): Coach => ({
  id: `${firstName}-${lastName}`.toLowerCase().replace(/[^a-z]+/g, "-"),
  firstName,
  lastName,
  section,
  brevet: null,
  photo: null,
  bio: null,
});

const coaches: readonly Coach[] = [
  coach("Bob", "BERTEMES", "athletics"),
  coach("Jo", "BRANDENBURGER", "athletics"),
  coach("Mirko", "GREGOR", "athletics"),
  coach("Elisabeth", "HOFFMANN", "athletics"),
  coach("Aline", "KIESCH", "athletics"),
  coach("Stefan", "KORNELIS", "athletics"),
  coach("Mieke", "KOSTER", "athletics"),
  coach("Olivier", "LESSIRE", "athletics"),
  coach("Romain", "POSSING", "athletics"),
  coach("Josée", "SCHAEFER", "athletics"),
  coach("Anne", "SIEBENALER", "athletics"),
  coach("Sebastiaan", "VAN DEN HEUVEL", "athletics"),
  coach("Jang", "WINANDY", "athletics"),
  coach("Kenny-Neal", "WOLMERING", "athletics"),
  coach("Steve", "FELLER", "triathlon"),
  coach("Tom", "HEMMEN", "triathlon"),
  coach("Max", "SCHROEDER", "triathlon"),
  coach("Jean-Marc", "WAGNER", "triathlon"),
];

/**
 * Vorstandsrollen als Schluessel, nicht als Text — die Bezeichnungen stehen
 * in messages/*.json und damit in allen drei Sprachen.
 */
export type CommitteeMember = {
  readonly id: string;
  readonly name: string;
  readonly roleKey: string;
  readonly sortOrder: number;
  readonly photo: string | null;
  readonly bio: Localized | null;
};

const committee: readonly CommitteeMember[] = [
  { id: "funck", name: "Marc FUNCK", roleKey: "president", sortOrder: 10, photo: null, bio: null },
  { id: "weis", name: "Joel WEIS", roleKey: "vicePresident", sortOrder: 20, photo: null, bio: null },
  { id: "reiser-m", name: "Monique REISER", roleKey: "secretary", sortOrder: 30, photo: null, bio: null },
  { id: "hoffmann-e", name: "Elisabeth HOFFMANN", roleKey: "secretaryDeputy", sortOrder: 40, photo: null, bio: null },
  { id: "juchemes", name: "Annie JUCHEMES", roleKey: "treasurer", sortOrder: 50, photo: null, bio: null },
  { id: "scheller", name: "Luc SCHELLER", roleKey: "treasurer", sortOrder: 60, photo: null, bio: null },
  { id: "angelsberg-s", name: "Steve ANGELSBERG", roleKey: "member", sortOrder: 70, photo: null, bio: null },
  { id: "mathay", name: "Jeff MATHAY", roleKey: "member", sortOrder: 80, photo: null, bio: null },
  { id: "reiser-a", name: "Anne REISER", roleKey: "member", sortOrder: 90, photo: null, bio: null },
  { id: "sauber", name: "Aline SAUBER", roleKey: "member", sortOrder: 100, photo: null, bio: null },
  { id: "useldinger", name: "Michel USELDINGER", roleKey: "member", sortOrder: 110, photo: null, bio: null },
  { id: "weis-coord", name: "Joel WEIS", roleKey: "sportsCoordinator", sortOrder: 120, photo: null, bio: null },
  { id: "reiser-lic", name: "Monique REISER", roleKey: "licences", sortOrder: 130, photo: null, bio: null },
  { id: "angelsberg-l", name: "Lara ANGELSBERG", roleKey: "athleteRep", sortOrder: 140, photo: null, bio: null },
  { id: "ley", name: "Jamie LEY", roleKey: "athleteRep", sortOrder: 150, photo: null, bio: null },
];

export async function getCoaches(
  section?: CoachSection,
): Promise<readonly Coach[]> {
  if (supabaseConfigured) {
    const fromDatabase = await cached("people", `coaches:${section ?? "all"}`, async () => {
      const supabase = createPublicClient("people");
      let query = supabase.from("coaches").select("*").order("sort_order");
      if (section) query = query.eq("section", section);
      const { data: rows, error } = await query;
      if (error || !rows) return null;
      return rows.map((row) => ({
        id: row.id,
        firstName: row.first_name,
        lastName: row.last_name,
        section: row.section as CoachSection,
        brevet: row.brevet,
        photo: row.photo,
        bio: row.bio as Localized | null,
      }));
    });
    if (fromDatabase) return fromDatabase;
  }

  return section ? coaches.filter((c) => c.section === section) : coaches;
}

export async function countCoaches(): Promise<number> {
  if (supabaseConfigured) {
    const fromDatabase = await cached("people", "coaches:count", async () => {
      const supabase = createPublicClient("people");
      const { count, error } = await supabase
        .from("coaches")
        .select("id", { count: "exact", head: true });
      return error || count === null ? null : count;
    });
    if (fromDatabase !== null) return fromDatabase;
  }
  return coaches.length;
}

export async function getCommittee(): Promise<readonly CommitteeMember[]> {
  if (supabaseConfigured) {
    const fromDatabase = await cached("people", "committee", async () => {
      const supabase = createPublicClient("people");
      const { data: rows, error } = await supabase
        .from("committee")
        .select("*")
        .order("sort_order");
      if (error || !rows) return null;
      return rows.map((row) => ({
        id: row.id,
        name: row.name,
        roleKey: row.role_key,
        sortOrder: row.sort_order,
        photo: row.photo,
        bio: row.bio as Localized | null,
      }));
    });
    if (fromDatabase) return fromDatabase;
  }
  return [...committee].sort((a, b) => a.sortOrder - b.sortOrder);
}
