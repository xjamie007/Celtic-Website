import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { routing } from "@/i18n/routing";
import { supabaseConfigured } from "@/lib/supabase/env";
import { updateSession } from "@/lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

/** Pfad ohne fuehrendes Sprachsegment. */
function segmentsWithoutLocale(pathname: string): string[] {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  return first && (routing.locales as readonly string[]).includes(first)
    ? segments.slice(1)
    : segments;
}

export default async function middleware(request: NextRequest) {
  /*
    Beide Middlewares arbeiten auf derselben Antwort. Erzeugte die zweite
    eine neue, ginge entweder das Sprach-Rewrite oder das Sitzungscookie
    verloren — je nachdem, welche zuletzt schreibt.
  */
  const response = intlMiddleware(request);

  const segments = segmentsWithoutLocale(request.nextUrl.pathname);
  const isAdmin = segments[0] === "admin";
  if (!isAdmin) return response;

  /*
    Ohne hinterlegte Instanz gibt es keine Anmeldung — dann bleibt der
    Redaktionsbereich zu, statt eine Anmeldemaske zu zeigen, die niemand
    bedienen kann.
  */
  if (!supabaseConfigured) {
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  const user = await updateSession(request, response);

  if (!user) {
    /* §3: Die Anmeldung liegt oeffentlich unter /login. Wer nicht
       angemeldet ist, landet dort — mit dem Ziel im Gepaeck. */
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("weider", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  /**
   * Alles ausser API-Routen, Next-Interna und Dateien mit Endung.
   * /admin bleibt bewusst enthalten: der Bereich ist zwar von der
   * oeffentlichen Seite getrennt (§12), soll aber in der Sprache der
   * Nutzer:innen laufen.
   */
  matcher: "/((?!api|auth|_next|_vercel|.*\\..*).*)",
};
