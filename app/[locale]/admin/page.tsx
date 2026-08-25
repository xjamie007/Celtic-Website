import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { SignOutButton } from "@/components/admin/SignOutButton";
import { Wordmark } from "@/components/layout/Wordmark";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";

type PageProps = { params: Promise<{ locale: string }> };

/*
  Nie vorrendern: diese Seite haengt an der angemeldeten Person. Ohne das
  baut Next sie einmal ohne Sitzung und liefert dieselbe Fassung an alle —
  im Build stand sie als statisch markiert, und im Admin haette jeder den
  abgemeldeten Zustand gesehen.
*/
export const dynamic = "force-dynamic";


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

/**
 * Die Uebersicht des Redaktionsbereichs.
 *
 * Welche Module jemand sieht, richtet sich nach der Rolle aus §12 — und
 * zwar nur zur Orientierung. Verboten wird in der Datenbank: RLS laesst
 * einen Autor auch dann nicht an die Sponsoren, wenn er die Adresse direkt
 * eingibt.
 */
export default async function AdminPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("admin");
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, role")
    .eq("user_id", user?.id ?? "")
    .maybeSingle();

  const role = profile?.role ?? null;
  const isEditor = role === "admin" || role === "editor";
  const isAdmin = role === "admin";

  const modules = [
    { key: "records", href: "/admin/rekorder", allowed: isEditor, ready: true },
    { key: "sponsors", href: "/admin/sponsoren", allowed: isAdmin, ready: true },
    { key: "news", href: "/admin/news", allowed: role !== null, ready: true },
    { key: "events", href: "/admin/termine", allowed: role !== null, ready: true },
    { key: "coachesTitle", href: "/admin/traineren", allowed: isEditor, ready: true },
    { key: "committeeTitle", href: "/admin/comite", allowed: isEditor, ready: true },
    { key: "albumsTitle", href: "/admin/fotoen", allowed: isEditor, ready: true },
    { key: "users", href: "/admin/benotzer", allowed: isAdmin, ready: true },
    { key: "settingsTitle", href: "/admin/astellungen", allowed: isAdmin, ready: true },
  ].filter((module) => module.allowed);

  return (
    <div className="mx-auto max-w-[1000px] px-5 py-10 sm:px-8">
      <header className="border-hairline-on-page flex flex-wrap items-center justify-between gap-4 border-b pb-6">
        <div className="flex items-baseline gap-4">
          <Link href="/" className="text-ink-text">
            <Wordmark />
          </Link>
          <span className="font-data text-data-xs text-muted-on-page uppercase">
            {t("title")}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-data text-data-xs text-muted-on-page uppercase">
            {t("signedInAs")} {profile?.name ?? user?.email}
            {role ? ` · ${t(`role${role.charAt(0).toUpperCase()}${role.slice(1)}`)}` : ""}
          </span>
          <SignOutButton />
        </div>
      </header>

      {role === null ? (
        <p className="border-motion-accent text-ui mt-10 border-l-2 py-2 pl-4">
          {t("noProfile")}
        </p>
      ) : (
        <ul className="border-hairline-on-page mt-10 border-t">
          {modules.map((module) => (
            <li key={module.key} className="border-hairline-on-page record-row border-b">
              {module.ready ? (
                <Link
                  href={module.href}
                  className="flex items-baseline justify-between gap-4 py-5"
                >
                  <span className="text-h3 wdth-100 record-name font-display font-bold">
                    {t(module.key)}
                  </span>
                  <span className="font-data text-data-xs text-muted-on-page uppercase">
                    &rarr;
                  </span>
                </Link>
              ) : (
                <div className="flex items-baseline justify-between gap-4 py-5">
                  <span className="text-h3 wdth-100 text-muted-on-page font-display font-bold">
                    {t(module.key)}
                  </span>
                  <span className="font-data text-data-xs text-muted-on-page uppercase">
                    {t("comingInPhase5")}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
