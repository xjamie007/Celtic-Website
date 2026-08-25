"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { ImageUpload } from "@/components/admin/ImageUpload";
import { LocalizedField } from "@/components/admin/LocalizedField";
import {
  deletePerson,
  saveCoach,
  saveCommitteeMember,
} from "@/lib/actions/people";
import { cn } from "@/lib/utils";

const localized = z.object({
  lb: z.string().trim().optional(),
  de: z.string().trim().optional(),
  fr: z.string().trim().optional(),
});

const coachSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  section: z.enum(["athletics", "triathlon"]),
  brevet: z.string().trim().optional(),
  bio: localized,
  photo: z.string().trim().optional(),
  consent: z.boolean(),
  sortOrder: z.coerce.number().int(),
});

const memberSchema = z.object({
  name: z.string().trim().min(1),
  roleKey: z.string().trim().min(1),
  bio: localized,
  photo: z.string().trim().optional(),
  consent: z.boolean(),
  sortOrder: z.coerce.number().int(),
});

const field =
  "border-hairline-on-page text-ui w-full border bg-transparent px-3 py-2";
const label = "font-data text-data-xs text-muted-on-page uppercase";

const ROLE_KEYS = [
  "president",
  "vicePresident",
  "secretary",
  "secretaryDeputy",
  "treasurer",
  "member",
  "sportsCoordinator",
  "licences",
  "athleteRep",
] as const;

/**
 * Trainer:in oder Vorstandsmitglied bearbeiten (§12).
 *
 * Eine Maske fuer beide: sie unterscheiden sich in zwei Feldern, und wer
 * beides pflegt, soll nicht zwei Formulare lernen. Das Portrait haengt an der
 * Einwilligung — ohne Haken weist schon diese Maske ab, und dahinter noch
 * einmal die Datenbank (§13).
 */
export type CoachDefaults = z.input<typeof coachSchema> & { id?: string };
export type CommitteeDefaults = z.input<typeof memberSchema> & { id?: string };

export function PersonForm({
  kind,
  defaults,
}: {
  kind: "coach" | "committee";
  defaults?: CoachDefaults | CommitteeDefaults;
}) {
  const t = useTranslations("admin");
  const tc = useTranslations("club");
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);

  const isCoach = kind === "coach";
  const { register, control, handleSubmit, watch, formState } = useForm({
    resolver: zodResolver(isCoach ? coachSchema : memberSchema),
    defaultValues:
      defaults ??
      (isCoach
        ? {
            firstName: "",
            lastName: "",
            section: "athletics" as const,
            brevet: "",
            bio: {},
            photo: "",
            consent: false,
            sortOrder: 0,
          }
        : {
            name: "",
            roleKey: "member",
            bio: {},
            photo: "",
            consent: false,
            sortOrder: 0,
          }),
  });

  const photo = watch("photo") as string | undefined;
  const consent = watch("consent") as boolean;

  const onSubmit = handleSubmit(async (values) => {
    setFailed(null);
    setSaved(false);
    const outcome = isCoach
      ? await saveCoach({ ...(values as CoachDefaults), id: defaults?.id })
      : await saveCommitteeMember({
          ...(values as CommitteeDefaults),
          id: defaults?.id,
        });
    if (!outcome.ok) {
      setFailed(
        outcome.message === "consent-required"
          ? t("imageConsentHint")
          : (outcome.message ?? ""),
      );
      return;
    }
    setSaved(true);
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {isCoach ? (
          <>
            <label className="block">
              <span className={label}>{t("fieldFirstName")}</span>
              <input {...register("firstName")} className={cn(field, "mt-2")} />
            </label>
            <label className="block">
              <span className={label}>{t("fieldLastName")}</span>
              <input {...register("lastName")} className={cn(field, "mt-2")} />
            </label>
            <label className="block">
              <span className={label}>{t("fieldSection")}</span>
              <select {...register("section")} className={cn(field, "mt-2")}>
                <option value="athletics">{tc("sectionAthletics")}</option>
                <option value="triathlon">{tc("sectionTriathlon")}</option>
              </select>
            </label>
            <label className="block">
              <span className={label}>{t("fieldBrevet")}</span>
              <input {...register("brevet")} className={cn(field, "mt-2")} />
            </label>
          </>
        ) : (
          <>
            <label className="block">
              <span className={label}>{t("fieldName")}</span>
              <input {...register("name")} className={cn(field, "mt-2")} />
            </label>
            <label className="block">
              <span className={label}>{t("userRole")}</span>
              <select {...register("roleKey")} className={cn(field, "mt-2")}>
                {ROLE_KEYS.map((key) => (
                  <option key={key} value={key}>
                    {tc(key)}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}
        <label className="block">
          <span className={label}>{t("fieldSort")}</span>
          <input
            type="number"
            {...register("sortOrder")}
            className={cn(field, "mt-2")}
          />
        </label>
      </div>

      <LocalizedField name="bio" label={t("fieldBio")} register={register} rows={4} />

      <div className="border-hairline-on-page border-t pt-6">
        <Controller
          control={control}
          name="photo"
          render={({ field: image }) => (
            <ImageUpload
              kind="portrait"
              value={(image.value as string) || null}
              onChange={(url) => image.onChange(url ?? "")}
            />
          )}
        />

        {/* §13: Das Portrait bleibt ohne bestaetigte Einwilligung liegen. */}
        <label className="mt-4 flex items-start gap-3">
          <input type="checkbox" {...register("consent")} className="mt-1" />
          <span>
            <span className="text-ui block">{t("imageConsent")}</span>
            <span className="text-muted-on-page text-ui-sm block">
              {t("imageConsentHint")}
            </span>
          </span>
        </label>

        {photo && !consent ? (
          <p className="text-accent-on-page text-ui-sm mt-2">
            {t("imageConsentHint")}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="bg-ink text-page-text text-ui px-6 py-3 transition-opacity duration-200 disabled:opacity-60"
        >
          {formState.isSubmitting ? t("saving") : t("save")}
        </button>

        {defaults?.id ? (
          <button
            type="button"
            onClick={async () => {
              if (!window.confirm(t("confirmDelete"))) return;
              const outcome = await deletePerson(
                isCoach ? "coaches" : "committee",
                defaults.id as string,
              );
              if (outcome.ok) router.refresh();
              else setFailed(outcome.message ?? "");
            }}
            className="font-data text-data-xs text-muted-on-page hover:text-accent-on-page uppercase transition-colors duration-200"
          >
            {t("delete")}
          </button>
        ) : null}

        {saved ? (
          <span className="text-ui-sm text-muted-on-page">{t("saved")}</span>
        ) : null}
        {failed ? (
          <span className="text-accent-on-page text-ui-sm">{failed}</span>
        ) : null}
      </div>
    </form>
  );
}
