import { Image } from "@/components/media/Image";

import { cn } from "@/lib/utils";

/**
 * Vereinsfoto mit einheitlicher Farbabstimmung (§9).
 *
 * Die Bilder auf der alten Seite stammen aus zwanzig Jahren, von zehn
 * Kameras, bei jedem Licht. Nebeneinander sehen sie aus wie eine
 * Zufallssammlung. Ein Duotone-Overlay im Trikotblau bei 12% Deckkraft und
 * multiply bindet sie zu einer Bildsprache zusammen, ohne sie zu faelschen —
 * und beim Hover geht es weg, damit man das Bild sieht, wie es ist.
 *
 * Ohne dieses Overlay muesste man alle Fotos nachbearbeiten. Mit ihm reicht
 * es, sie hochzuladen.
 */
export function ClubPhoto({
  src,
  alt,
  sizes,
  priority = false,
  className,
  imageClassName,
  fill = true,
  width,
  height,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <span
      className={cn("club-photo bg-deep relative block overflow-hidden", className)}
    >
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "100vw"}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className={cn("object-cover", imageClassName)}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width ?? 1200}
          height={height ?? 800}
          sizes={sizes ?? "100vw"}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className={cn("h-auto w-full object-cover", imageClassName)}
        />
      )}
      <span aria-hidden="true" className="club-photo-tone" />
    </span>
  );
}
