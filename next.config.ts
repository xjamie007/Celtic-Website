import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // §14: alle Bilder ueber next/image, moderne Formate zuerst
    formats: ["image/avif", "image/webp"],
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
  async headers() {
    return [
      {
        // §12: Der Redaktionsbereich taucht in keiner Suchmaschine auf.
        source: "/:locale(lb|de|fr)?/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
