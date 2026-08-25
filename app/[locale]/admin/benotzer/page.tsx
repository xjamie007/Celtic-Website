import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { UserRoleSelect } from "@/components/admin/UserRoleSelect";
import { createClient } from "@/lib/supabase/server";

type PageProps = { params: Promise<{ locale: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });
  return { title: t("users"), robots: { index: false, follow: false } };
}

/**
 * /admin/benotzer (§12) — nur admin.
 *
 * Neue Personen werden nicht hier angelegt, sondern eingeladen: die
 * Selbstregistrierung ist in Supabase abgeschaltet, damit niemand sich durch
 * Kenntnis der Adresse in den Redaktionsbereich einschreibt. Diese Seite
 * vergibt die Rolle.
 */
export default async function AdminUsersPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("admin");
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, name, role, user_id")
    .order("name");

  return (
    <div className="mx-auto max-w-[1000px] px-5 py-10 sm:px-8">
      <AdminHeader title={t("users")} />

      <ul className="border-hairline-on-page mt-10 border-t">
        {(profiles ?? []).map((profile) => (
          <li
            key={profile.id}
            className="border-hairline-on-page flex flex-wrap items-center justify-between gap-4 border-b py-4"
          >
            <span className="text-ui">{profile.name}</span>
            <UserRoleSelect
              profileId={profile.id}
              role={profile.role as "admin" | "editor" | "author"}
              isSelf={profile.user_id === user?.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
