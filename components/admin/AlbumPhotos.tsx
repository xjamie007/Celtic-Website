"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { ImageUpload } from "@/components/admin/ImageUpload";
import { setAlbumCover } from "@/lib/actions/albums";
import { deleteMedia } from "@/lib/actions/media";

/**
 * Fotos eines Albums verwalten (§12).
 *
 * Hochladen, Titelbild bestimmen, einzelne Bilder entfernen. Der
 * Alternativtext ist beim Hochladen Pflicht — die Datenbank weist ein Bild
 * ohne ihn ab, sobald es zu einem Album gehoert.
 */
export function AlbumPhotos({
  albumId,
  coverMediaId,
  photos,
}: {
  albumId: string;
  coverMediaId: string | null;
  photos: readonly { id: string; url: string; alt: string }[];
}) {
  const t = useTranslations("admin");
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <div className="space-y-6">
      <ImageUpload
        kind="photo"
        value={null}
        albumId={albumId}
        keepAfterUpload
        needsConsent
        label={t("addPhoto")}
        onChange={() => router.refresh()}
      />

      {photos.length > 0 ? (
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {photos.map((photo) => (
            <li key={photo.id} className="space-y-1">
              <span className="border-hairline-on-page bg-page relative block aspect-square border">
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </span>
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  disabled={busy || photo.id === coverMediaId}
                  onClick={async () => {
                    setBusy(true);
                    await setAlbumCover(albumId, photo.id);
                    setBusy(false);
                    router.refresh();
                  }}
                  className="font-data text-data-xs text-muted-on-page hover:text-ink-text uppercase transition-colors duration-200 disabled:opacity-40"
                >
                  {photo.id === coverMediaId ? t("isCover") : t("makeCover")}
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={async () => {
                    if (!window.confirm(t("confirmDelete"))) return;
                    setBusy(true);
                    await deleteMedia(photo.id);
                    setBusy(false);
                    router.refresh();
                  }}
                  className="font-data text-data-xs text-muted-on-page hover:text-accent-on-page uppercase transition-colors duration-200"
                >
                  {t("delete")}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
