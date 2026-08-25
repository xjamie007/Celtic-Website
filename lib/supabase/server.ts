import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { Database } from "./database.types";
import { supabaseAnonKey, supabaseUrl } from "./env";

/**
 * Supabase-Client fuer Server-Komponenten und Route Handler.
 *
 * Die Sitzung liegt in Cookies, damit RLS auf dem Server dieselbe Rolle
 * sieht wie im Browser. Ohne das liefe jede serverseitige Abfrage als anon —
 * und der Admin waere leer, obwohl jemand angemeldet ist.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          /* In Server-Komponenten sind Cookies schreibgeschuetzt. Das
             Auffrischen uebernimmt die Middleware — hier ist der Fehler
             erwartet und nicht der Rede wert. */
        }
      },
    },
  });
}
