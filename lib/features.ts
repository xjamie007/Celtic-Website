import { site } from "@/config/site";
import { cached } from "@/lib/supabase/cached";
import { supabaseConfigured } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/public";

/**
 * Welche Bereiche der Seite sichtbar sind (§2).
 *
 * Zwei Quellen, eine Antwort: config/site.ts gibt die Vorgabe, die Tabelle
 * settings ueberschreibt sie. So kann der Verein einen Bereich zuschalten,
 * sobald er Inhalte hat, ohne dass jemand Code ausliefert — und ohne dass
 * die Seite ohne Datenbank kaputtgeht, denn dann gilt schlicht die Vorgabe.
 */
export type FeatureKey = keyof typeof site.features;
export type Features = Record<FeatureKey, boolean>;

const SETTINGS_KEY = "features";

export async function getFeatures(): Promise<Features> {
  const defaults = { ...site.features } as Features;
  if (!supabaseConfigured) return defaults;

  const stored = await cached("settings", "features", async () => {
    const supabase = createPublicClient("settings");
    const { data, error } = await supabase
      .from("settings")
      .select("value")
      .eq("key", SETTINGS_KEY)
      .maybeSingle();
    if (error || !data) return null;
    return data.value as Partial<Features>;
  });

  if (!stored) return defaults;

  /* Nur bekannte Schluessel uebernehmen: eine alte Einstellung in der
     Datenbank soll keinen Bereich einschalten, den es nicht mehr gibt. */
  const merged = { ...defaults };
  for (const key of Object.keys(defaults) as FeatureKey[]) {
    if (typeof stored[key] === "boolean") merged[key] = stored[key];
  }
  return merged;
}

/**
 * Welche Bereiche haengen an welchem Pfad?
 *
 * Die Zuordnung steht an genau einer Stelle. Sonst muesste man beim
 * Abschalten eines Bereichs daran denken, ihn auch aus Navigation, Footer,
 * Sitemap und Bahn zu nehmen — und genau das vergisst man.
 */
const PATH_FEATURE: readonly (readonly [string, FeatureKey])[] = [
  ["/news", "news"],
  ["/next", "events"],
  ["/rekorder", "records"],
  ["/beschtleeschtungen", "bestPerformances"],
  ["/celtics-best", "celticsBest"],
  ["/para-athletics", "paraAthletics"],
  ["/jugend", "youth"],
  ["/zenter-1968", "history"],
  ["/fotoen", "photoGallery"],
  ["/matmaachen", "join"],
  ["/links", "links"],
  ["/sponsoren", "sponsors"],
  ["/shop", "shop"],
];

export function featureForPath(path: string): FeatureKey | null {
  const match = PATH_FEATURE.find(
    ([prefix]) => path === prefix || path.startsWith(`${prefix}/`),
  );
  return match ? match[1] : null;
}

/** Ist dieser Pfad sichtbar? Pfade ohne Zuordnung sind immer sichtbar. */
export function isPathEnabled(path: string, features: Features): boolean {
  const key = featureForPath(path);
  return key === null || features[key];
}

/**
 * Abgeschaltete Bereiche antworten mit 404, nicht mit einer leeren Seite
 * (§2). Eine leere Seite behauptet, es gaebe hier etwas — die 404 sagt die
 * Wahrheit, und Suchmaschinen nehmen sie aus dem Bestand.
 */
export async function requireFeature(key: FeatureKey): Promise<void> {
  const features = await getFeatures();
  if (!features[key]) {
    const { notFound } = await import("next/navigation");
    notFound();
  }
}
