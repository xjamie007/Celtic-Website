import { unstable_cache } from "next/cache";

import type { CacheTag } from "./public";

/**
 * Ergebnis einer oeffentlichen Abfrage zwischenspeichern, bis der Admin sie
 * fuer ungueltig erklaert.
 *
 * Warum nicht ueber fetch: Next cacht keinen fetch-Aufruf, der einen
 * Authorization-Header traegt — und Supabase sendet immer einen. Damit war
 * jede Seite mit einer Abfrage dynamisch, und §14 verlangt das Gegenteil
 * ("ISR mit revalidateTag — Redaktionsaenderungen sind innerhalb von
 * Sekunden live, ohne Rebuild"). unstable_cache speichert das Ergebnis und
 * nicht die Antwort, und umgeht das Problem damit an der richtigen Stelle.
 *
 * revalidate: false heisst nicht "nie": es heisst, dass nur revalidateTag
 * den Eintrag verfallen laesst. Eine Zeitspanne waere hier falsch — ein
 * Rekord aendert sich nicht nach Fahrplan, sondern wenn jemand ihn eintraegt.
 */
export function cached<T>(
  tag: CacheTag,
  key: string,
  query: () => Promise<T | null>,
): Promise<T | null> {
  return unstable_cache(query, [key], { tags: [tag], revalidate: false })();
}
