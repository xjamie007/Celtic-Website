import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { SponsorForm } from "@/components/admin/SponsorForm";
import { getSponsors } from "@/lib/data/sponsors";

type PageProps = { params: Promise<{ locale: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });
  return { title: t("sponsors"), robots: { index: false, follow: false } };
}

/**
 * /admin/sponsoren (§12)
 *
 * Nur admin. Der Schutz steht in der Policy auf public.sponsors — diese
 * Seite waehlt nur aus, was sie zeigt.
 */
export default async function AdminSponsorsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("admin");
  const sponsors = await getSponsors();

  return (
    <div className="mx-auto max-w-[1000px] px-5 py-10 sm:px-8">
      <AdminHeader title={t("sponsors")} />

      <section className="mt-10">
        <h2 className="text-h3 wdth-100">{t("sponsorNew")}</h2>
        <div className="mt-6">
          <SponsorForm />
        </div>
      </section>

      <section className="mt-16 space-y-12">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id}>
            <h2 className="font-data text-data-xs text-muted-on-page uppercase">
              {sponsor.name}
            </h2>
            <div className="mt-4">
              <SponsorForm sponsor={sponsor} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
