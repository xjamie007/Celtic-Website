import type { MetadataRoute } from "next";

import { site } from "@/config/site";

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
