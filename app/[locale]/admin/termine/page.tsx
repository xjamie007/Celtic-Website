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
  return { title: t("events"), robots: { index: false, follow: false } };
}

/**
 * /admin/termine (§12)
 *
 * Termine sind immer oeffentlich — es gibt keinen Entwurfsstatus. Ein Termin,
 * den niemand sieht, ist keiner. Ein Autor kann nur die eigenen aendern; das
 * entscheidet die Policy und nicht diese Seite.
 */
export default async function AdminEventsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("admin");
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("events")
    .select("*")
    .order("starts_at", { ascending: false });

  return (
    <div className="mx-auto max-w-[1000px] px-5 py-10 sm:px-8">
      <AdminHeader title={t("events")} />

      <section className="mt-10">
        <h2 className="text-h3 wdth-100">{t("eventsNew")}</h2>
        <div className="mt-6">
          <ContentForm kind="events" />
        </div>
      </section>

      <section className="mt-16 space-y-12">
        {(items ?? []).length === 0 ? (
          <p className="text-muted-on-page text-ui">{t("emptyEvents")}</p>
        ) : null}

        {(items ?? []).map((item) => (
          <div key={item.id}>
            <h2 className="font-data text-data-xs text-muted-on-page flex items-baseline gap-3 uppercase">
              {(item.title as Record<string, string>).lb}
              <span>{item.starts_at}</span>
            </h2>
            <div className="mt-4">
              <ContentForm
                kind="events"
                defaults={{
                  id: item.id,
                  title: item.title as never,
                  body: (item.body ?? {}) as never,
                  startsAt: item.starts_at,
                  endsAt: item.ends_at ?? "",
                  location: item.location ?? "",
                  externalUrl: item.external_url ?? "",
                  isClubRace: item.is_club_race,
                }}
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
