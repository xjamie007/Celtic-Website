import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";

import { fontVariables } from "@/app/fonts";
import { site } from "@/config/site";
import { routing } from "@/i18n/routing";

import "../globals.css";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(site.url),
    title: {
      default: t("title"),
      template: t("titleTemplate", { page: "%s" }),
    },
    description: t("description"),
    openGraph: {
      type: "website",
      siteName: site.name,
      locale,
      title: t("title"),
      description: t("description"),
    },
    /*
      Hier standen hreflang-Alternativen, die auf "/" und "/de" zeigten. Im
      Layout ist der Pfad der aktuellen Seite nicht bekannt, also waren sie
      auf jeder Unterseite falsch und haetten Suchmaschinen die Startseite
      als Uebersetzung von /rekorder gemeldet. Falsche Angaben sind schlechter
      als keine — sie gehoeren in die generateMetadata der einzelnen Seiten
      und kommen mit dem SEO-Durchgang in Phase 3.
    */
  };
}

/**
 * Das Wurzel-Layout der Seite.
 *
 * Das html-Element stand frueher eine Ebene hoeher, in app/layout.tsx. Dort
 * gibt es aber keinen Route-Parameter, also musste die Sprache aus dem
 * Sprachkopf der Middleware kommen — und der existiert beim Vorrendern
 * nicht. Ergebnis: jede Seite trug lang="lb", auch die deutschen und die
 * franzoesischen, und ausserdem hing dadurch das ganze Projekt an der
 * Anfrage (§14). Hier steht der Parameter unmittelbar zur Verfuegung.
 *
 * Die 404 liegt ausserhalb jeder Sprache und bringt ihre eigene Huelle mit,
 * siehe app/not-found.tsx.
 */
export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  /*
    Hier stand eine Locale-Pruefung mit notFound(). Sie ist unerreichbar: die
    Middleware laesst nur bekannte Locales als erstes Segment durch und
    praefixt alles andere mit lb, wo es im Catch-All landet.
  */
  // Erlaubt statisches Rendern trotz Middleware (§14).
  setRequestLocale(locale);

  /*
    Der Provider steht hier, nicht in den Gruppen: oeffentliche Seite und
    Redaktionsbereich brauchen beide Messages im Client, und children bleibt
    eine Server-Prop und damit serverseitig gerendert.
  */
  return (
    <html lang={locale} className={fontVariables}>
      <body className="min-h-dvh antialiased">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
