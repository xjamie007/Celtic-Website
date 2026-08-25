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
  return { title: t("committeeTitle"), robots: { index: false, follow: false } };
}

/**
 * /admin/comite (§12)
 *
 * Portrait und kurze Vorstellung je Trainer:in. Beides ist optional — ein
 * Verein hat nicht von allen 18 ein Foto, und eine Liste, die erst
 * vollstaendig sein muss, bevor sie etwas zeigt, wird nie fertig.
 */
export default async function AdminCommitteePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("admin");
  const tc = await getTranslations("club");
  const supabase = await createClient();
  const { data: members } = await supabase
    .from("committee")
    .select("*")
    .order("sort_order");

  return (
    <div className="mx-auto max-w-[1000px] px-5 py-10 sm:px-8">
      <AdminHeader title={t("committeeTitle")} />

      <section className="mt-10">
        <h2 className="text-h3 wdth-100">{t("newEntry")}</h2>
        <div className="mt-6">
          <PersonForm kind="committee" />
        </div>
      </section>

      <section className="mt-16 space-y-12">
        {(members ?? []).map((member) => (
          <div key={member.id}>
            <h2 className="font-data text-data-xs text-muted-on-page flex flex-wrap items-baseline gap-3 uppercase">
              {member.name}
              <span>{tc(member.role_key)}</span>
              {member.photo ? <span>{t("image")}</span> : null}
            </h2>
            <div className="mt-4">
              <PersonForm
                kind="committee"
                defaults={{
                  id: member.id,
                  name: member.name,
                  roleKey: member.role_key,
                  bio: (member.bio ?? {}) as never,
                  photo: member.photo ?? "",
                  consent: member.consent_on_file,
                  sortOrder: member.sort_order,
                }}
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
