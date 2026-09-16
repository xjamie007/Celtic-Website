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
      Ohne Server gibt es niemanden, der die Groessen berechnet. Der eigene
      Loader liefert deshalb die Originaldatei aus — die Bilder in public/
      sind bereits als WebP in Zielgroesse abgelegt (tools/process-assets.mjs).

      Warum ein Loader und nicht images.unoptimized: unoptimized reicht die
      src unveraendert durch, auch das Pfad-Praefix bleibt dann weg, und
      unter /Celtic-Website waere jedes Bild ein toter Link. Siehe
      lib/image-loader.ts.
    */
    ...(staticExport
      ? { loader: "custom" as const, loaderFile: "./lib/image-loader.ts" }
      : {}),
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
