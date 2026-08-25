"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { JerseyShape, JERSEY_VIEWBOX } from "@/components/sponsors/JerseyShape";
import { saveSponsor, deleteSponsor } from "@/lib/actions/sponsors";
import type { Sponsor } from "@/lib/data/sponsors";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(1),
  websiteUrl: z.string().trim().url().or(z.literal("")),
  logoUrl: z.string().trim(),
  tier: z.enum(["haaptsponsor", "partner", "supporter"]),
  activeFrom: z.string(),
  activeUntil: z.string(),
  sortOrder: z.coerce.number().int().min(0),
});

type Values = z.input<typeof schema>;

const field =
  "border-hairline-on-page text-ui w-full border bg-transparent px-3 py-2";
const label = "font-data text-data-xs text-muted-on-page uppercase";

/**
 * Sponsorenformular mit zwei Vorschauen (§12).
 *
 * Links das Trikot: ein Klick setzt die Position, in Prozent. Rechts die
 * Bande, wie sie auf der Zielgeraden stehen wird — Name und Stufe aendern
 * sie sofort, noch bevor gespeichert wird.
 *
 * Beide Vorschauen benutzen dieselben Bausteine wie die oeffentliche Seite:
 * denselben Trikotpfad, dieselben Groessen der Banden. Eine Vorschau, die
 * anders aussieht als das Ergebnis, ist schlimmer als keine.
 */
export function SponsorForm({ sponsor }: { sponsor?: Sponsor }) {
  const t = useTranslations("admin");
  /* Die Stufenbezeichnungen stehen im sponsors-Namensraum — sie sind
     dieselben wie auf der oeffentlichen Seite und sollen es bleiben. */
  const ts = useTranslations("sponsors");
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    sponsor?.jerseyPosition ?? null,
  );

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: sponsor?.name ?? "",
      websiteUrl: sponsor?.websiteUrl ?? "",
      logoUrl: sponsor?.logoUrl ?? "",
      tier: sponsor?.tier ?? "partner",
      activeFrom: "",
      activeUntil: sponsor?.activeUntil ?? "",
      sortOrder: sponsor?.sortOrder ?? 0,
    },
  });

  const name = watch("name");
  const tier = watch("tier");
  const isMain = tier === "haaptsponsor";

  const onSubmit = async (values: Values) => {
    setFailed(null);
    setSaved(false);
    const outcome = await saveSponsor({
      ...values,
      id: sponsor?.id,
      jerseyX: position?.x ?? null,
      jerseyY: position?.y ?? null,
    });
    if (!outcome.ok) {
      setFailed(outcome.message ?? "");
      return;
    }
    setSaved(true);
    router.refresh();
  };

  /* Die Klickposition kommt aus den SVG-Koordinaten und wird in Prozent
     umgerechnet — so bleibt sie gueltig, wenn das Trikot spaeter groesser
     dargestellt wird oder der Schnitt sich aendert. */
  const pickPosition = (event: React.MouseEvent<SVGSVGElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: Math.round(((event.clientX - box.left) / box.width) * 1000) / 10,
      y: Math.round(((event.clientY - box.top) / box.height) * 1000) / 10,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={label}>{t("fieldName")}</span>
          <input {...register("name")} className={cn(field, "mt-2")} />
        </label>
        <label className="block">
          <span className={label}>{t("fieldTier")}</span>
          <select {...register("tier")} className={cn(field, "mt-2")}>
            <option value="haaptsponsor">{ts("tierHaaptsponsor")}</option>
            <option value="partner">{ts("tierPartner")}</option>
            <option value="supporter">{ts("tierSupporter")}</option>
          </select>
        </label>
        <label className="block">
          <span className={label}>{t("fieldWebsite")}</span>
          <input {...register("websiteUrl")} className={cn(field, "mt-2")} />
        </label>
        {/*
          Statt eine Adresse abzutippen: Datei wählen, und die Anwendung macht
          daraus ein WebP mit höchstens 400px Höhe (§12). Das Feld bleibt ein
          Formularwert — Controller verbindet den Upload mit dem Formular,
          damit Speichern und Vorschau denselben Wert sehen.
        */}
        <div className="sm:col-span-2">
          <Controller
            control={control}
            name="logoUrl"
            render={({ field: logo }) => (
              <ImageUpload
                kind="logo"
                label={t("fieldLogo")}
                value={logo.value || null}
                onChange={(url) => logo.onChange(url ?? "")}
              />
            )}
          />
        </div>
        <label className="block">
          <span className={label}>{t("fieldFrom")}</span>
          <input type="date" {...register("activeFrom")} className={cn(field, "mt-2")} />
        </label>
        <label className="block">
          <span className={label}>{t("fieldUntil")}</span>
          <input type="date" {...register("activeUntil")} className={cn(field, "mt-2")} />
        </label>
        <label className="block max-w-[8rem]">
          <span className={label}>{t("fieldSort")}</span>
          <input
            type="number"
            {...register("sortOrder")}
            className={cn(field, "font-data mt-2 tabular-nums")}
          />
        </label>
      </div>

      {/* ── Vorschau der Bande (§12: sofort sichtbar, vor dem Speichern) ── */}
      <div>
        <span className={label}>{t("preview")}</span>
        <div className="bg-deep mt-2 overflow-hidden">
          <div className="bg-lane-line/70 h-px w-full" />
          <div className="flex py-5">
            <div
              className={cn(
                "border-hairline-on-ink/60 flex h-16 shrink-0 items-center justify-center border-x px-6 text-white/70",
                isMain ? "min-w-[19rem]" : "min-w-[9.5rem]",
              )}
            >
              <span
                className={cn(
                  "font-display leading-none font-extrabold whitespace-nowrap uppercase wdth-88",
                  isMain ? "text-[1.5rem]" : "text-[1.0625rem]",
                  tier === "supporter" && "text-[0.9375rem]",
                )}
              >
                {name || "—"}
              </span>
            </div>
          </div>
          <div className="bg-lane-line/70 h-px w-full" />
        </div>
        <p className="text-muted-on-page text-ui-sm mt-2">{t("previewHint")}</p>
      </div>

      {/* ── Position auf dem Trikot ─────────────────────────────────────── */}
      <div>
        <span className={label}>{t("fieldJersey")}</span>
        <div className="mt-2 flex flex-wrap items-start gap-6">
          <svg
            viewBox={`0 0 ${JERSEY_VIEWBOX.width} ${JERSEY_VIEWBOX.height}`}
            onClick={pickPosition}
            role="presentation"
            className="w-40 cursor-crosshair"
          >
            <JerseyShape gradientId="admin-jersey" />
            {position ? (
              <circle
                cx={(position.x / 100) * JERSEY_VIEWBOX.width}
                cy={(position.y / 100) * JERSEY_VIEWBOX.height}
                r={9}
                fill="var(--celtic-gold)"
              />
            ) : null}
          </svg>
          <div>
            <p className="font-data text-ui-sm tabular-nums">
              {position ? `x ${position.x} · y ${position.y}` : t("jerseyNone")}
            </p>
            <p className="text-muted-on-page text-ui-sm mt-1 max-w-xs">
              {t("jerseyHint")}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-ink text-page-text text-ui px-6 py-3 transition-opacity duration-200 disabled:opacity-60"
        >
          {isSubmitting ? t("saving") : t("save")}
        </button>

        {sponsor ? (
          <button
            type="button"
            onClick={async () => {
              if (!window.confirm(t("confirmDelete"))) return;
              const outcome = await deleteSponsor(sponsor.id);
              if (outcome.ok) router.refresh();
              else setFailed(outcome.message ?? "");
            }}
            className="font-data text-data-xs text-muted-on-page hover:text-accent-on-page uppercase transition-colors duration-200"
          >
            {t("delete")}
          </button>
        ) : null}

        {saved ? (
          <span className="text-ui-sm text-muted-on-page">{t("sponsorSaved")}</span>
        ) : null}
        {failed ? <span className="text-accent-on-page text-ui-sm">{failed}</span> : null}
      </div>
    </form>
  );
}
