import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { AlbumForm } from "@/components/admin/AlbumForm";
import { AlbumPhotos } from "@/components/admin/AlbumPhotos";
import { createClient } from "@/lib/supabase/server";

type PageProps = { params: Promise<{ locale: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "admin" });
  return { title: t("albumsTitle"), robots: { index: false, follow: false } };
}

/**
 * /admin/fotoen (§12)
 *
 * Ein Album anlegen, dann Bilder hineinladen. Der Alternativtext steht beim
 * Hochladen und nicht als Nacharbeit: die Datenbank weist ein Albumbild ohne
 * ihn ab (§8), und eine Redaktion, die ihn nachtraegt, traegt ihn nie nach.
 */
export default async function AdminPhotosPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("admin");
  const supabase = await createClient();

  const { data: albums } = await supabase
    .from("albums")
    .select("*, media(id, path, alt)")
    .order("taken_on", { ascending: false });

  const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const url = (path: string) => `${base}/storage/v1/object/public/media/${path}`;

  return (
    <div className="mx-auto max-w-[1000px] px-5 py-10 sm:px-8">
      <AdminHeader title={t("albumsTitle")} />

      <section className="mt-10">
        <h2 className="text-h3 wdth-100">{t("albumNew")}</h2>
        <div className="mt-6">
          <AlbumForm />
        </div>
      </section>

      <section className="mt-16 space-y-16">
        {(albums ?? []).map((album) => {
          const media = (album.media ?? []) as {
            id: string;
            path: string;
            alt: Record<string, string> | null;
          }[];
          return (
            <div key={album.id} className="border-hairline-on-page border-t pt-8">
              <h2 className="font-data text-data-xs text-muted-on-page uppercase">
                {(album.title as Record<string, string>).lb} · {media.length}
              </h2>
              <div className="mt-4">
                <AlbumForm
                  defaults={{
                    id: album.id,
                    title: album.title as never,
                    description: (album.description ?? {}) as never,
                    takenOn: album.taken_on ?? "",
                  }}
                />
              </div>
              <div className="mt-8">
                <AlbumPhotos
                  albumId={album.id}
                  coverMediaId={album.cover_media_id}
                  photos={media.map((m) => ({
                    id: m.id,
                    url: url(m.path),
                    alt: m.alt?.lb ?? "",
                  }))}
                />
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
