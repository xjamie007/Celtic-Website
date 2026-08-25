import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { PersonForm } from "@/components/admin/PersonForm";
import { createClient } from "@/lib/supabase/server";

type PageProps = { params: Promise<{ locale: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });
  return { title: t("coachesTitle"), robots: { index: false, follow: false } };
}

/**
 * /admin/traineren (§12)
 *
 * Portrait und kurze Vorstellung je Trainer:in. Beides ist optional — ein
 * Verein hat nicht von allen 18 ein Foto, und eine Liste, die erst
 * vollstaendig sein muss, bevor sie etwas zeigt, wird nie fertig.
 */
export default async function AdminCoachesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("admin");
  const tc = await getTranslations("club");
  const supabase = await createClient();
  const { data: coaches } = await supabase
    .from("coaches")
    .select("*")
    .order("section")
    .order("last_name");

  return (
    <div className="mx-auto max-w-[1000px] px-5 py-10 sm:px-8">
      <AdminHeader title={t("coachesTitle")} />

      <section className="mt-10">
        <h2 className="text-h3 wdth-100">{t("newEntry")}</h2>
        <div className="mt-6">
          <PersonForm kind="coach" />
        </div>
      </section>

      <section className="mt-16 space-y-12">
        {(coaches ?? []).map((coach) => (
          <div key={coach.id}>
            <h2 className="font-data text-data-xs text-muted-on-page flex flex-wrap items-baseline gap-3 uppercase">
              {coach.last_name} {coach.first_name}
              <span>
                {coach.section === "athletics"
                  ? tc("sectionAthletics")
                  : tc("sectionTriathlon")}
              </span>
              {coach.photo ? <span>{t("image")}</span> : null}
            </h2>
            <div className="mt-4">
              <PersonForm
                kind="coach"
                defaults={{
                  id: coach.id,
                  firstName: coach.first_name,
                  lastName: coach.last_name,
                  section: coach.section as "athletics" | "triathlon",
                  brevet: coach.brevet ?? "",
                  bio: (coach.bio ?? {}) as never,
                  photo: coach.photo ?? "",
                  consent: coach.consent_on_file,
                  sortOrder: coach.sort_order,
                }}
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
