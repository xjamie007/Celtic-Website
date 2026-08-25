import sharp from "sharp";

/**
 * Bildaufbereitung vor dem Hochladen (§12, §14).
 *
 * Drei Zuschnitte, weil drei verschiedene Dinge damit gemacht werden:
 *
 * - logo     max 400px hoch, transparenter Grund bleibt erhalten
 * - portrait quadratisch beschnitten, 800px — Trainer:innen und Vorstand
 * - photo    max 2000px lange Kante — Wettkampffotos
 *
 * Alles wird zu WebP. Der Verein lädt hoch, was die Kamera oder das Telefon
 * liefert — auch HEIC vom iPhone —, und was auf der Seite landet, ist immer
 * dasselbe Format in vernünftiger Grösse. Ohne diesen Schritt stünde
 * irgendwann ein 8-Megabyte-JPEG im Footer.
 */
export type ImageKind = "logo" | "portrait" | "photo";

const PRESETS = {
  logo: { width: null, height: 400, fit: "inside" as const, quality: 90 },
  portrait: { width: 800, height: 800, fit: "cover" as const, quality: 82 },
  photo: { width: 2000, height: 2000, fit: "inside" as const, quality: 80 },
};

export type PreparedImage = {
  readonly data: Buffer;
  readonly width: number;
  readonly height: number;
  readonly contentType: "image/webp";
  readonly extension: "webp";
};

export async function prepareImage(
  input: ArrayBuffer,
  kind: ImageKind,
): Promise<PreparedImage> {
  const preset = PRESETS[kind];

  const pipeline = sharp(Buffer.from(input), { failOn: "error" })
    /* Kameras drehen nicht, sie notieren die Drehung im EXIF. Ohne rotate()
       liegen Hochformatfotos quer. */
    .rotate()
    .resize({
      width: preset.width ?? undefined,
      height: preset.height,
      fit: preset.fit,
      withoutEnlargement: true,
    })
    .webp({ quality: preset.quality });

  const { data, info } = await pipeline.toBuffer({ resolveWithObject: true });

  return {
    data,
    width: info.width,
    height: info.height,
    contentType: "image/webp",
    extension: "webp",
  };
}

/** Dateiname ohne Umlaute, Leerzeichen und Grossbuchstaben. */
export function safeFileName(original: string): string {
  return original
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) || "bild";
}
