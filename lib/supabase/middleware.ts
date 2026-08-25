import { createServerClient } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";

import type { Database } from "./database.types";
import { supabaseAnonKey, supabaseUrl } from "./env";

/**
 * Frischt die Sitzung auf und schreibt die Cookies in die Antwort, die
 * next-intl schon gebaut hat.
 *
 * Beide Middlewares muessen dieselbe Antwort benutzen. Wuerde hier eine neue
 * erzeugt, ginge entweder das Rewrite der Sprache oder das Sitzungscookie
 * verloren — je nachdem, welche zuletzt gewinnt.
 */
export async function updateSession(
  request: NextRequest,
  response: NextResponse,
) {
  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
