import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import type { Database } from "./database.types";
import { supabaseAnonKey, supabaseUrl } from "./env";

/**
 * Die Bereiche, auf die sich eine Auffrischung beziehen kann. Speichert die
 * Redaktion einen Rekord, wird "records" ungueltig — und nur das. Die
 * Vereinsgeschichte muss dafuer nicht neu gerendert werden.
 */
export type CacheTag =
  | "records"
  | "sponsors"
  | "news"
  | "events"
  | "people"
  | "pages"
  | "media"
  | "settings";

/**
 * Client fuer oeffentliche Daten — ohne Cookies, ohne Sitzung.
 *
 * Zwei Dinge haengen daran:
 *
 * 1. Kein cookies(). Jeder Aufruf davon macht eine Seite dynamisch, und
 *    Rekorde oder Vereinstexte haengen an keiner Sitzung.
 * 2. Getaggte, unbegrenzt gueltige fetch-Aufrufe. Next 15 setzt fuer fetch
 *    standardmaessig no-store; damit waere jede Seite mit einer Abfrage
 *    dynamisch, und §14 verlangt das Gegenteil. So bleibt alles vorgerendert,
 *    bis der Admin revalidateTag() ruft — "innerhalb von Sekunden live, ohne
 *    Rebuild".
 *
 * Gelesen wird als anon, also genau das, was auch ein Besucher sieht: die
 * RLS-Policies gelten unveraendert.
 */
export function createPublicClient(tag: CacheTag) {
  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          next: { tags: [tag], revalidate: false },
        } as RequestInit),
    },
  });
}
