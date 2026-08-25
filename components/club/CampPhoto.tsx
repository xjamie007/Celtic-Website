import { getTranslations } from "next-intl/server";

import { ClubPhoto } from "@/components/media/ClubPhoto";

/** Trainingslager Palafrugell / La Fosca (§9). */
export async function CampPhoto() {
  const t = await getTranslations("club");

  return (
    <div className="mt-12 space-y-4">
      <ClubPhoto
        src="/photos/palamos-team.webp"
        alt={t("campPhotoAlt")}
        sizes="(min-width: 1240px) 1240px, 100vw"
        className="aspect-[16/10] w-full"
      />
      <ClubPhoto
        src="/photos/stage2.webp"
        alt={t("campPhotoAlt2")}
        sizes="(min-width: 640px) 50vw, 100vw"
        className="aspect-[16/10] w-full sm:w-1/2"
      />
    </div>
  );
}
