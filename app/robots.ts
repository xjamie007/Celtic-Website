import type { MetadataRoute } from "next";

import { site } from "@/config/site";

/*
  Beide Bauarten rendern diese Datei einmal beim Bauen. Der statische Export
  verlangt die Angabe ausdruecklich: ohne sie haelt Next die Metadaten-Route
  fuer serverabhaengig und bricht ab, obwohl hier nichts steht, was zur
  Laufzeit entstehen muesste.
*/
export const dynamic = "force-static";

/**
 * §12: Der Redaktionsbereich taucht in keiner Suchmaschine auf. Der
 * X-Robots-Header in next.config sagt das schon; hier steht es zusaetzlich
 * fuer Crawler, die gar nicht erst anfragen sollen.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/auth"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
