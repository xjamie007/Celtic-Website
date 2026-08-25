import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ContentPage } from "@/components/content/ContentPage";
import { CampPhoto } from "@/components/club/CampPhoto";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("clubCamp") };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ContentPage titleKey="clubCamp" namespace="nav" contentSlug="club/trainingscamp">
      <CampPhoto />
    </ContentPage>
  );
}
