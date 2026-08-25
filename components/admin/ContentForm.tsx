"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { LocalizedField } from "@/components/admin/LocalizedField";
import { deleteContent, saveEvent, saveNews } from "@/lib/actions/content";
import { cn } from "@/lib/utils";

const localized = z.object({
  lb: z.string().trim().min(1),
  de: z.string().trim().optional(),
  fr: z.string().trim().optional(),
});
const localizedOptional = z.object({
  lb: z.string().trim().optional(),
  de: z.string().trim().optional(),
  fr: z.string().trim().optional(),
});

const newsSchema = z.object({
  title: localized,
  excerpt: localizedOptional,
  body: localized,
  coverImage: z.string().trim().optional(),
  status: z.enum(["draft", "published"]),
});

const eventSchema = z.object({
  title: localized,
  body: localizedOptional,
  startsAt: z.string().min(1),
  endsAt: z.string().optional(),
  location: z.string().trim().optional(),
  externalUrl: z.string().trim().url().or(z.literal("")).optional(),
  isClubRace: z.boolean(),
});

const field =
  "border-hairline-on-page text-ui w-full border bg-transparent px-3 py-2";
const label = "font-data text-data-xs text-muted-on-page uppercase";

export type NewsDefaults = z.input<typeof newsSchema> & { id?: string };
export type EventDefaults = z.input<typeof eventSchema> & { id?: string };

/**
 * Formular fuer Meldungen und Termine.
 *
 * Eine Komponente fuer beides, weil sie sich nur in drei Feldern
 * unterscheiden — und weil ein Vorstand, der beides pflegt, nicht zwei
 * verschiedene Masken lernen soll.
 */
export function ContentForm({
  kind,
  defaults,
}: {
  kind: "news" | "events";
  defaults?: NewsDefaults | EventDefaults;
}) {
  const t = useTranslations("admin");
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);

  const isNews = kind === "news";
  const form = useForm({
    resolver: zodResolver(isNews ? newsSchema : eventSchema),
    defaultValues:
      defaults ??
      (isNews
        ? { title: { lb: "" }, excerpt: {}, body: { lb: "" }, status: "draft" as const }
        : {
            title: { lb: "" },
            body: {},
            startsAt: "",
            endsAt: "",
            location: "",
            isClubRace: false,
          }),
  });

  const { register, handleSubmit, formState } = form;

  const onSubmit = handleSubmit(async (values) => {
    setFailed(null);
    setSaved(false);
    const outcome = isNews
      ? await saveNews({ ...(values as NewsDefaults), id: defaults?.id })
      : await saveEvent({ ...(values as EventDefaults), id: defaults?.id });
    if (!outcome.ok) {
      setFailed(outcome.message ?? "");
      return;
    }
    setSaved(true);
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <LocalizedField name="title" label={t("fieldTitle")} register={register} />

      {isNews ? (
        <>
          <LocalizedField
            name="excerpt"
            label={t("fieldExcerpt")}
            register={register}
            rows={2}
          />
          <LocalizedField
            name="body"
            label={t("fieldBody")}
            register={register}
            rows={8}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={label}>{t("fieldCover")}</span>
              <input {...register("coverImage")} className={cn(field, "mt-2")} />
            </label>
            <label className="block">
              <span className={label}>{t("fieldStatus")}</span>
              <select {...register("status")} className={cn(field, "mt-2")}>
                <option value="draft">{t("statusDraft")}</option>
                <option value="published">{t("statusPublished")}</option>
              </select>
            </label>
          </div>
        </>
      ) : (
        <>
          <LocalizedField
            name="body"
            label={t("fieldBody")}
            register={register}
            rows={4}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block">
              <span className={label}>{t("fieldStart")}</span>
              <input type="date" {...register("startsAt")} className={cn(field, "mt-2")} />
            </label>
            <label className="block">
              <span className={label}>{t("fieldEnd")}</span>
              <input type="date" {...register("endsAt")} className={cn(field, "mt-2")} />
            </label>
            <label className="block">
              <span className={label}>{t("fieldLocation")}</span>
              <input {...register("location")} className={cn(field, "mt-2")} />
            </label>
            <label className="block">
              <span className={label}>{t("fieldExternal")}</span>
              <input {...register("externalUrl")} className={cn(field, "mt-2")} />
            </label>
          </div>

          {/* Eigene Veranstaltung: steht im Kalender oben und hervorgehoben. */}
          <label className="flex items-start gap-3">
            <input type="checkbox" {...register("isClubRace")} className="mt-1" />
            <span>
              <span className="text-ui block">{t("isClubRace")}</span>
              <span className="text-muted-on-page text-ui-sm block">
                {t("isClubRaceHint")}
              </span>
            </span>
          </label>
        </>
      )}

      {Object.keys(formState.errors).length > 0 ? (
        <p className="text-accent-on-page text-ui-sm">{t("required")}</p>
      ) : null}

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
              const outcome = await deleteContent(kind, defaults.id as string);
              if (outcome.ok) router.refresh();
              else setFailed(outcome.message ?? "");
            }}
            className="font-data text-data-xs text-muted-on-page hover:text-accent-on-page uppercase transition-colors duration-200"
          >
            {t("delete")}
          </button>
        ) : null}

        {saved ? <span className="text-ui-sm text-muted-on-page">{t("saved")}</span> : null}
        {failed ? <span className="text-accent-on-page text-ui-sm">{failed}</span> : null}
      </div>
    </form>
  );
}
