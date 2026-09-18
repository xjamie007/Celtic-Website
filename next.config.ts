import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/**
 * Zwei Bauarten aus einer Konfiguration.
 *
 * Normal laeuft die Seite als Next-Anwendung mit Middleware, Sitzungen und
 * Redaktionsbereich — so gehoert sie spaeter auf celtic.lu.
 *
 * Mit STATIC_EXPORT=1 entsteht stattdessen ein Ordner aus fertigen
 * HTML-Dateien (`out/`), wie ihn GitHub Pages ausliefern kann. Dort gibt es
 * keinen Server: keine Middleware, keine Server Actions, keine Bildoptimierung
 * zur Laufzeit. Was davon abhaengt, nimmt scripts/build-static.mjs vorher aus
 * dem Baum — diese Datei stellt nur um, was Next selbst betrifft.
 */
const staticExport = process.env.STATIC_EXPORT === "1";

/**
 * Projektseiten auf GitHub liegen unter /<repo>/, nicht an der Wurzel. Der
 * Pfad steht in der Umgebung, damit derselbe Build unter einer eigenen Domain
 * ohne Praefix laeuft — dort ist die Variable schlicht leer.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  ...(staticExport
    ? {
        output: "export" as const,
        basePath: basePath || undefined,
        /*
          Jede Seite wird zu <pfad>/index.html. Ohne das liefert GitHub Pages
          fuer /rekorder eine 404, weil dort nur ein Ordner liegt.
        */
        trailingSlash: true,
      }
    : {}),

  images: {
    // §14: alle Bilder ueber next/image, moderne Formate zuerst
    formats: ["image/avif", "image/webp"],
    /*
      Ohne Server gibt es niemanden, der die Groessen berechnet. Next liefert
      dann die Originaldatei aus — die Bilder in public/ sind bereits als
      WebP in Zielgroesse abgelegt (tools/process-assets.mjs).

      Wichtig: unoptimized erzeugt KEIN srcSet. Genau darauf kommt es an.
      Hier stand kurz ein eigener Loader, um das Pfad-Praefix anzuhaengen —
      und ein Loader laesst Next ein srcSet mit Breitenangaben bauen, hinter
      denen ohne Optimierung immer dieselbe Datei steht. Der Browser glaubt
      der Angabe und rechnet die Anzeigegroesse danach aus; die
      Sponsorenlogos kamen so auf 22 Pixel Breite heraus. Das Praefix setzt
      jetzt components/media/Image.tsx, wo es keine Nebenwirkung hat.
    */
    unoptimized: staticExport,
    /*
      Bilder liegen im Supabase-Speicher. Die Adresse steht in der Umgebung,
      damit lokale Instanz und Produktion dieselbe Konfiguration benutzen —
      ein fest eingetragener Projektname waere beim ersten Wechsel falsch.
    */
    remotePatterns: [
      ...(process.env.NEXT_PUBLIC_SUPABASE_URL
        ? [
            {
              protocol: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL)
                .protocol.replace(":", "") as "http" | "https",
              hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,
              port: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).port,
              pathname: "/storage/v1/object/public/**",
            },
          ]
        : []),
    ],
  },

  /*
    Kopfzeilen setzt der Server. Im statischen Export gibt es keinen, deshalb
    steht die Regel dort gar nicht erst da — sonst warnt Next bei jedem Build
    ueber eine Einstellung, die niemand liest. Der Redaktionsbereich ist im
    Export ohnehin nicht enthalten.
  */
  ...(staticExport
    ? {}
    : {
        async headers() {
          return [
            {
              // §12: Der Redaktionsbereich taucht in keiner Suchmaschine auf.
              source: "/:locale(lb|de|fr)?/admin/:path*",
              headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
            },
          ];
        },
      }),
};

export default withNextIntl(nextConfig);
