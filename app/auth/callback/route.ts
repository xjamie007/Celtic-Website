import { NextResponse, type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";

/**
 * Einloesung des Magic Links.
 *
 * Liegt ausserhalb von [locale], weil die Adresse in der Mail steht und
 * keine Sprache tragen soll — der Link muss auch dann funktionieren, wenn
 * jemand ihn in einem anderen Browser oeffnet als dem, in dem er ihn
 * angefordert hat.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("weider") ?? "/admin";

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=expired`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    /* Der haeufigste Fall ist ein Link, der zu lange lag — die Anmeldeseite
       sagt das dann konkret, statt nur das Formular noch einmal zu zeigen. */
    return NextResponse.redirect(`${origin}/login?error=expired`);
  }

  return NextResponse.redirect(`${origin}${next}`);
}
