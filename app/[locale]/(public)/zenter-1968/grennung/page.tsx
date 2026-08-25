import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ContentPage } from "@/components/content/ContentPage";
import { requireFeature } from "@/lib/features";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "history" });
  return { title: t("grennung") };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  /* §2: abgeschaltet heisst 404, nicht leere Seite. */
  await requireFeature("history");

  return <ContentPage titleKey="grennung" namespace="history" contentSlug="zenter-1968/grennung" />;
}
