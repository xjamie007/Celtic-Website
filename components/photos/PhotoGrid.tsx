"use client";

import { Image } from "@/components/media/Image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import type { Photo } from "@/lib/data/albums";
import { localized } from "@/lib/localized";

/**
 * Fotoraster mit Grossansicht.
 *
 * Die Grossansicht ist ein dialog-Element und kein nachgebautes Overlay:
 * damit uebernimmt der Browser Fokusfalle, Escape und die Rueckgabe des
 * Fokus — drei Dinge, die man von Hand fast immer falsch macht.
 */
export function PhotoGrid({
  photos,
  locale,
}: {
  photos: readonly Photo[];
  locale: string;
}) {
  const t = useTranslations("photos");
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setOpen((i) => (i === null ? null : (i + 1) % photos.length));
      if (event.key === "ArrowLeft") setOpen((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
      if (event.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, photos.length]);

  if (photos.length === 0) {
    return <p className="text-muted-on-page text-ui">{t("emptyAlbum")}</p>;
  }

  const current = open === null ? null : photos[open];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, index) => (
          <li key={photo.id}>
            <button
              type="button"
              onClick={() => setOpen(index)}
              className="bg-deep relative block aspect-square w-full overflow-hidden"
            >
              <Image
                src={photo.url}
                alt={photo.alt ? localized(photo.alt, locale) : ""}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 hover:scale-[1.04]"
              />
            </button>
          </li>
        ))}
      </ul>

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt ? localized(current.alt, locale) : t("view")}
          onClick={() => setOpen(null)}
          className="bg-ink/95 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            autoFocus
            className="font-data text-data-xs text-muted-on-ink hover:text-white absolute top-5 right-5 uppercase"
          >
            {t("close")}
          </button>
          <div className="relative max-h-[85vh] w-full max-w-[min(90vw,1200px)]">
            <Image
              src={current.url}
              alt={current.alt ? localized(current.alt, locale) : ""}
              width={current.width ?? 1600}
              height={current.height ?? 1200}
              sizes="90vw"
              className="max-h-[85vh] w-full object-contain"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
