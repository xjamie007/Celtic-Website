import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { FeatureSwitches } from "@/components/admin/FeatureSwitches";
import { getFeatures } from "@/lib/features";

type PageProps = { params: Promise<{ locale: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });
  return { title: t("settingsTitle"), robots: { index: false, follow: false } };
}

/** Bereiche, die der Verein selbst zuschalten kann (§2). */
const EDITABLE = [
  "news",
  "events",
  "records",
  "bestPerformances",
  "celticsBest",
  "paraAthletics",
  "youth",
  "photoGallery",
  "history",
  "join",
  "links",
  "sponsors",
  "shop",
] as const;

export default async function AdminSettingsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("admin");
  const features = await getFeatures();

  return (
    <div className="mx-auto max-w-[720px] px-5 py-10 sm:px-8">
      <AdminHeader title={t("settingsTitle")} />
      <p className="text-muted-on-page text-ui mt-8 max-w-prose">
        {t("settingsIntro")}
      </p>
      <div className="mt-10">
        <FeatureSwitches features={features} editable={EDITABLE} />
      </div>
    </div>
  );
}
