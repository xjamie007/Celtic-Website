"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { LocalizedField } from "@/components/admin/LocalizedField";
import { deleteAlbum, saveAlbum } from "@/lib/actions/albums";
import { cn } from "@/lib/utils";

const schema = z.object({
  title: z.object({
    lb: z.string().trim().min(1),
    de: z.string().trim().optional(),
    fr: z.string().trim().optional(),
  }),
  description: z.object({
    lb: z.string().trim().optional(),
    de: z.string().trim().optional(),
    fr: z.string().trim().optional(),
  }),
  takenOn: z.string().optional(),
});

export type AlbumDefaults = z.input<typeof schema> & { id?: string };

const field =
  "border-hairline-on-page text-ui w-full border bg-transparent px-3 py-2";

export function AlbumForm({ defaults }: { defaults?: AlbumDefaults }) {
  const t = useTranslations("admin");
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaults ?? { title: { lb: "" }, description: {}, takenOn: "" },
  });

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        setFailed(null);
        setSaved(false);
        const outcome = await saveAlbum({ ...values, id: defaults?.id });
        if (!outcome.ok) {
          setFailed(outcome.message ?? "");
          return;
        }
        setSaved(true);
        router.refresh();
      })}
      noValidate
      className="space-y-5"
    >
      <LocalizedField name="title" label={t("fieldTitle")} register={register} />
      <LocalizedField
        name="description"
        label={t("fieldBody")}
        register={register}
        rows={3}
      />
      <label className="block max-w-xs">
        <span className="font-data text-data-xs text-muted-on-page uppercase">
          {t("fieldTakenOn")}
        </span>
        <input type="date" {...register("takenOn")} className={cn(field, "mt-2")} />
      </label>

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
              const outcome = await deleteAlbum(defaults.id as string);
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
