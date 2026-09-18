import type { Metadata } from "next";
import { Image } from "@/components/media/Image";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { requireFeature } from "@/lib/features";
import { LaneSection } from "@/components/lane/LaneSection";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import { getAlbums } from "@/lib/data/albums";
import { localized } from "@/lib/localized";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return { title: t("photos") };
}

/**
 * /fotoen (§9)
 *
 * Alben statt einer endlosen Wand: ein Wettkampf ist ein Anlass, und danach
 * sucht man. Ohne Alben zeigt die Seite eine Einladung und keinen leeren
 * Rahmen (§12: leere Zustaende sind Einladungen).
 */
export default async function PhotosPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  /* §2: abgeschaltet heisst 404, nicht leere Seite. */
  await requireFeature("photoGallery");

  const t = await getTranslations("nav");
  const tp = await getTranslations("photos");
  const activeLocale = await getLocale();
  const albums = await getAlbums();

  const dateFormat = new Intl.DateTimeFormat(activeLocale, {
    month: "long",
    year: "numeric",
  });

  return (
    <LaneSection id="fotoen" labelledBy="fotoen-title">
      <div className="mx-auto max-w-[1240px] px-5 pt-16 pb-24 sm:px-8">
        <h1 id="fotoen-title" className="text-h1 wdth-112">
          {t("photos")}
        </h1>

        {albums.length === 0 ? (
          <div className="border-hairline-on-page mt-12 border-t pt-8">
            <p className="text-body-lg text-muted-on-page max-w-prose">
              {tp("empty")}
            </p>
          </div>
        ) : (
          <Reveal>
            <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {albums.map((album, index) => (
                <li
                  key={album.id}
                  className="rise"
                  style={{ "--i": index } as React.CSSProperties}
                >
                  <Link href={`/fotoen/${album.slug}`} className="group block">
                    <span className="bg-deep relative block aspect-[4/3] overflow-hidden">
                      {album.coverUrl ? (
                        <Image
                          src={album.coverUrl}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <span className="gradient-surface absolute inset-0" />
                      )}
                    </span>
                    <span className="mt-3 block">
                      <span className="text-h3 wdth-100 block font-display font-bold">
                        {localized(album.title, activeLocale)}
                      </span>
                      <span className="font-data text-data-xs text-muted-on-page mt-1 block uppercase">
                        {album.takenOn
                          ? `${dateFormat.format(new Date(album.takenOn))} · `
                          : ""}
                        {tp("count", { count: album.photoCount })}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </LaneSection>
  );
}
