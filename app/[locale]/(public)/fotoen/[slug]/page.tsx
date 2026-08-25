import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PhotoGrid } from "@/components/photos/PhotoGrid";
import { requireFeature } from "@/lib/features";
import { LaneSection } from "@/components/lane/LaneSection";
import { Link } from "@/i18n/navigation";
import { getAlbum } from "@/lib/data/albums";
import { localized } from "@/lib/localized";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const found = await getAlbum(slug);
  if (!found) return {};
  return { title: localized(found.album.title, locale) };
}

export default async function AlbumPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  /* §2: abgeschaltet heisst 404, nicht leere Seite. */
  await requireFeature("photoGallery");

  const found = await getAlbum(slug);
  if (!found) notFound();

  const t = await getTranslations("nav");
  const tp = await getTranslations("photos");
  const activeLocale = await getLocale();
  const { album, photos } = found;

  const dateFormat = new Intl.DateTimeFormat(activeLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <LaneSection id="album" labelledBy="album-title">
      <div className="mx-auto max-w-[1240px] px-5 pt-16 pb-24 sm:px-8">
        <Link
          href="/fotoen"
          className="font-data text-data-xs text-muted-on-page hover:text-ink-text uppercase transition-colors duration-200"
        >
          &larr; {t("photos")}
        </Link>

        <h1 id="album-title" className="text-h1 wdth-112 mt-6">
          {localized(album.title, activeLocale)}
        </h1>
        <p className="font-data text-data-xs text-muted-on-page mt-3 uppercase">
          {album.takenOn ? `${dateFormat.format(new Date(album.takenOn))} · ` : ""}
          {tp("count", { count: album.photoCount })}
        </p>
        {album.description ? (
          <p className="text-body-lg text-muted-on-page mt-4 max-w-prose">
            {localized(album.description, activeLocale)}
          </p>
        ) : null}

        <div className="mt-12">
          <PhotoGrid photos={photos} locale={activeLocale} />
        </div>
      </div>
    </LaneSection>
  );
}
