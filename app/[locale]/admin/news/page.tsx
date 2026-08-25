import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { ContentForm } from "@/components/admin/ContentForm";
import { createClient } from "@/lib/supabase/server";

type PageProps = { params: Promise<{ locale: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });
  return { title: t("news"), robots: { index: false, follow: false } };
}

/**
 * /admin/news (§12)
 *
 * Hier steht auch, was noch nicht veroeffentlicht ist — RLS laesst
 * Angemeldete Entwuerfe sehen, Besucher nicht. Ein Autor sieht zwar alle
 * Entwuerfe, kann aber nur die eigenen aendern; auch das entscheidet die
 * Policy und nicht diese Seite.
 */
export default async function AdminNewsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("admin");
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-[1000px] px-5 py-10 sm:px-8">
      <AdminHeader title={t("news")} />

      <section className="mt-10">
        <h2 className="text-h3 wdth-100">{t("newsNew")}</h2>
        <div className="mt-6">
          <ContentForm kind="news" />
        </div>
      </section>

      <section className="mt-16 space-y-12">
        {(items ?? []).length === 0 ? (
          <p className="text-muted-on-page text-ui">{t("emptyNews")}</p>
        ) : null}

        {(items ?? []).map((item) => (
          <div key={item.id}>
            <h2 className="font-data text-data-xs text-muted-on-page flex items-baseline gap-3 uppercase">
              {(item.title as Record<string, string>).lb}
              <span
                className={
                  item.status === "published"
                    ? "text-accent-on-page"
                    : "text-muted-on-page"
                }
              >
                {item.status === "published" ? t("statusPublished") : t("statusDraft")}
              </span>
            </h2>
            <div className="mt-4">
              <ContentForm
                kind="news"
                defaults={{
                  id: item.id,
                  title: item.title as never,
                  excerpt: (item.excerpt ?? {}) as never,
                  body: item.body as never,
                  coverImage: item.cover_image ?? "",
                  status: item.status as "draft" | "published",
                }}
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
