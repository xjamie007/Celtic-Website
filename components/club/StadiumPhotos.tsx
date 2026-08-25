import { getTranslations } from "next-intl/server";

import { ClubPhoto } from "@/components/media/ClubPhoto";

/**
 * Das Stade Municipal (§9).
 *
 * Vier Bilder aus dem Bestand der alten Seite. Sie sind unterschiedlich
 * belichtet und teils klein — das Duotone-Overlay bindet sie zusammen, statt
 * dass jedes fuer sich steht.
 */
const PHOTOS = [
  "/photos/stadion-1.webp",
  "/photos/stadion-2.webp",
  "/photos/stadion-3.webp",
  "/photos/stadion-4.webp",
] as const;

export async function StadiumPhotos() {
  const t = await getTranslations("club");

  return (
    <ul className="mt-12 grid gap-4 sm:grid-cols-2">
      {PHOTOS.map((src, index) => (
        <li key={src}>
          <ClubPhoto
            src={src}
            alt={t("stadiumPhotoAlt", { n: index + 1 })}
            sizes="(min-width: 640px) 50vw, 100vw"
            className="aspect-[4/3] w-full"
          />
        </li>
      ))}
    </ul>
  );
}
