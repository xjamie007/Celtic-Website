import type { MetadataRoute } from "next";

import { locales, defaultLocale, site } from "@/config/site";
import { disciplines } from "@/lib/data/records";
import { getFeatures, isPathEnabled } from "@/lib/features";

/*
  Beide Bauarten rendern diese Datei einmal beim Bauen. Der statische Export
  verlangt die Angabe ausdruecklich: ohne sie haelt Next die Metadaten-Route
  fuer serverabhaengig und bricht ab, obwohl hier nichts steht, was zur
  Laufzeit entstehen muesste.
*/
export const dynamic = "force-static";

/**
 * Sitemap fuer alle drei Sprachfassungen.
 *
 * Jede Seite steht einmal je Sprache, mit alternates untereinander — sonst
 * behandeln Suchmaschinen die Fassungen als Dubletten statt als
 * Uebersetzungen. Das ist auch die Stelle, an der die hreflang-Angaben
 * korrekt stehen: im Layout waren sie es nicht und wurden deshalb entfernt.
 */
const PATHS = [
  "",
  "/news",
  "/next",
  "/rekorder",
  "/beschtleeschtungen",
  "/celtics-best",
  "/para-athletics",
  "/jugend",
  "/club",
  "/club/training",
  "/club/trainer",
  "/club/comite",
  "/club/stadion",
  "/club/trainingscamp",
  "/club/kontakt",
  "/zenter-1968",
  "/zenter-1968/liichtathletik-zu-dikrich",
  "/zenter-1968/grennung",
  "/zenter-1968/trainingsmeiglechkeeten",
  "/zenter-1968/sportlech-entwecklung",
  "/zenter-1968/historique",
  "/sponsoren",
  "/fotoen",
  "/matmaachen",
  "/links",
  "/impressum",
  "/dateschutz",
];

const url = (locale: string, path: string) =>
  `${site.url}${locale === defaultLocale ? "" : `/${locale}`}${path}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const features = await getFeatures();
  /* §2: Was abgeschaltet ist, steht auch nicht in der Sitemap — sonst
     schickt man Suchmaschinen auf Seiten, die mit 404 antworten. */
  const paths = [
    ...PATHS,
    ...(features.records
      ? disciplines.map((discipline) => `/rekorder/${discipline.key}`)
      : []),
  ].filter((path) => isPathEnabled(path, features));

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: url(locale, path),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((other) => [other, url(other, path)]),
        ),
      },
    })),
  );
}
