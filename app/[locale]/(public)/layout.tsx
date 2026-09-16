import { getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { SessionBar } from "@/components/auth/SessionBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LaneChannel } from "@/components/lane/LaneChannel";
import { LaneMount } from "@/components/lane/LaneMount";
import { Zilgerad } from "@/components/sponsors/Zilgerad";
import { mainNav, site } from "@/config/site";
import { getFeatures, isPathEnabled } from "@/lib/features";

/**
 * Die oeffentliche Huelle: Sprungmarke, Bahn, Navigation, Zielgerade, Footer.
 *
 * Sie liegt in einer Routengruppe, weil der Redaktionsbereich sie nicht haben
 * darf. §12 verlangt ihn "komplett von der oeffentlichen Seite getrennt" —
 * und ein Admin, in dem beim Scrollen ein Magenta-Punkt an der Bahn
 * entlanglaeuft, waere genau das Gegenteil von "ruhig, dicht, schnell".
 */
export default async function PublicLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  /*
    Auch hier, obwohl das Wurzel-Layout die Sprache schon gesetzt hat: React
    rendert die Huelle nicht zwingend nach ihrem Elternteil, sondern faengt
    parallel an. Fehlt die Zeile, liest die Navigation die Sprache aus dem
    Anfragekopf — und schon haengt jede Seite am Server (§14). Die Regel von
    next-intl lautet deshalb: in jedem Layout und jeder Seite.
  */
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("a11y");
  const features = await getFeatures();

  /*
    §2: Abgeschaltete Bereiche verschwinden aus der Navigation — nicht
    ausgegraut, nicht als toter Link. Gefiltert wird hier einmal, und die
    Navigation bekommt das Ergebnis; sonst muesste jede Komponente die
    Schalter kennen.
  */
  const nav = mainNav
    .filter((item) => isPathEnabled(item.href, features))
    .map((item) => ({
      ...item,
      children: item.children?.filter((child) =>
        isPathEnabled(child.href, features),
      ),
    }));

  return (
    <>
      <a
        href="#inhalt"
        className="bg-motion-accent sr-only px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
      >
        {t("skipToContent")}
      </a>

      {site.features.lane ? (
        <>
          <LaneChannel />
          <LaneMount />
        </>
      ) : null}

      <div className="flex min-h-dvh flex-col pt-1.5 lg:pt-0 lg:pl-lane">
        <SessionBar />
        <SiteHeader nav={nav} />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <Zilgerad />
        <SiteFooter />
      </div>
    </>
  );
}
