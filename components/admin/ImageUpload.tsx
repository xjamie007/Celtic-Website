"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useId, useRef, useState } from "react";

import { uploadImage } from "@/lib/actions/media";
import type { ImageKind } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Bild hochladen (§12).
 *
 * Der Alternativtext ist Pflicht und steht neben dem Dateifeld, nicht
 * darunter versteckt: §8 verlangt ihn, und eine Redaktion, die ihn nachträgt,
 * trägt ihn nie nach. Bei Portraits und Fotos kommt die Einwilligung aus §13
 * dazu — ohne sie weist die Datenbank das Bild ab, nicht erst dieses
 * Formular.
 */
export function ImageUpload({
  kind,
  value,
  onChange,
  needsConsent = false,
  label,
  albumId,
  keepAfterUpload = false,
}: {
  kind: ImageKind;
  value: string | null;
  onChange: (url: string | null) => void;
  needsConsent?: boolean;
  label?: string;
  /** Legt das Bild in ein Album (§9: /fotoen). */
  albumId?: string;
  /** Fuer Alben: nach dem Hochladen bereit fuer das naechste Bild bleiben. */
  keepAfterUpload?: boolean;
}) {
  const t = useTranslations("admin");
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [alt, setAlt] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);

  const message = (code: string) =>
    ({
      "no-file": t("imageNoFile"),
      "not-an-image": t("imageNotAnImage"),
    })[code] ?? code;

  const send = async (file: File) => {
    setFailed(null);

    if (file.size > 10 * 1024 * 1024) {
      setFailed(t("imageTooBig"));
      return;
    }
    if (alt.trim() === "") {
      setFailed(t("imageAltHint"));
      return;
    }

    setBusy(true);
    const form = new FormData();
    form.set("file", file);
    form.set("kind", kind);
    form.set("alt", alt);
    if (albumId) form.set("albumId", albumId);
    if (needsConsent) form.set("consent", String(consent));

    const result = await uploadImage(form);
    setBusy(false);

    if (!result.ok) {
      setFailed(message(result.message));
      return;
    }
    onChange(result.url);
    if (keepAfterUpload) {
      /* Beim Album laedt man zwanzig Bilder hintereinander hoch. Das
         Alternativtextfeld leert sich, alles andere bleibt stehen. */
      setAlt("");
    }
  };

  return (
    <div className="space-y-3">
      <span className="font-data text-data-xs text-muted-on-page uppercase">
        {label ?? t("image")}
      </span>

      {value ? (
        <div className="flex items-center gap-4">
          <span className="border-hairline-on-page bg-page relative block h-20 w-20 shrink-0 border">
            <Image
              src={value}
              alt=""
              fill
              sizes="80px"
              className="object-contain"
            />
          </span>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="font-data text-data-xs text-muted-on-page hover:text-accent-on-page uppercase transition-colors duration-200"
          >
            {t("imageRemove")}
          </button>
        </div>
      ) : null}

      <label className="block">
        <span className="font-data text-data-xs text-muted-on-page uppercase">
          {t("imageAlt")}
        </span>
        <input
          value={alt}
          onChange={(event) => setAlt(event.target.value)}
          className="border-hairline-on-page text-ui mt-1 w-full border bg-transparent px-3 py-2"
        />
        <span className="text-muted-on-page text-ui-sm mt-1 block">
          {t("imageAltHint")}
        </span>
      </label>

      {needsConsent ? (
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="mt-1"
          />
          <span>
            <span className="text-ui block">{t("imageConsent")}</span>
            <span className="text-muted-on-page text-ui-sm block">
              {t("imageConsentHint")}
            </span>
          </span>
        </label>
      ) : null}

      <input
        ref={fileRef}
        id={inputId}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/heic,image/heif"
        disabled={busy}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void send(file);
          event.target.value = "";
        }}
        className={cn(
          "text-ui-sm file:border-hairline-on-page file:bg-transparent",
          "file:text-ui-sm file:mr-3 file:border file:px-3 file:py-1.5",
        )}
      />

      {busy ? (
        <p className="text-muted-on-page text-ui-sm">{t("imageUploading")}</p>
      ) : null}
      {failed ? <p className="text-accent-on-page text-ui-sm">{failed}</p> : null}
    </div>
  );
}
