"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import {
  saveAsBestPerformance,
  submitRecord,
  type RecordResult,
} from "@/lib/actions/records";
import type { Discipline } from "@/lib/data/records";
import { cn } from "@/lib/utils";

const schema = z.object({
  disciplineKey: z.string().min(1),
  surface: z.enum(["piste", "indoor", "route"]),
  gender: z.enum(["f", "m"]),
  performanceRaw: z.string().trim().min(1),
  category: z.string().trim().min(1),
  year: z.coerce.number().int().min(1960).max(2100),
  date: z.string().optional(),
  holders: z
    .array(
      z.object({
        lastName: z.string().trim().min(1),
        firstName: z.string().trim().optional(),
      }),
    )
    .min(1),
  isNationalRecord: z.boolean(),
  isEspoirsBest: z.boolean(),
  showOnHome: z.boolean(),
});

type Values = z.input<typeof schema>;

const field =
  "border-hairline-on-page text-ui w-full border bg-transparent px-3 py-2";
const label = "font-data text-data-xs text-muted-on-page uppercase";

/**
 * Das Formular fuer den wichtigsten Ablauf (§12).
 *
 * Es entscheidet nichts. Ob eine Leistung den Rekord schlaegt, ob der alte
 * archiviert wird und ob die NEI-Markierung greift, sagt die Datenbank —
 * dieses Formular sammelt ein und zeigt die Antwort. Deshalb kann es auch
 * nicht falsch liegen, wenn zwei Personen gleichzeitig eintragen.
 */
export function RecordForm({
  disciplines,
  categories,
}: {
  disciplines: readonly Discipline[];
  categories: readonly string[];
}) {
  const t = useTranslations("admin");
  const tr = useTranslations("records");
  const [result, setResult] = useState<RecordResult | null>(null);
  const [bestSaved, setBestSaved] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      surface: "piste",
      gender: "f",
      year: new Date().getFullYear(),
      holders: [{ lastName: "", firstName: "" }],
      isNationalRecord: false,
      isEspoirsBest: false,
      showOnHome: false,
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "holders" });

  const onSubmit = async (values: Values) => {
    setBestSaved(false);
    const outcome = await submitRecord(values);
    setResult(outcome);
    if (outcome.status === "created" || outcome.status === "superseded") {
      reset();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className={label}>{t("fieldDiscipline")}</span>
            <select {...register("disciplineKey")} className={cn(field, "mt-2")}>
              <option value="">—</option>
              {disciplines.map((discipline) => (
                <option key={discipline.key} value={discipline.key}>
                  {discipline.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className={label}>{t("fieldSurface")}</span>
            <select {...register("surface")} className={cn(field, "mt-2")}>
              <option value="piste">{tr("surfacePiste")}</option>
              <option value="indoor">{tr("surfaceIndoor")}</option>
              <option value="route">{tr("surfaceRoute")}</option>
            </select>
          </label>

          <label className="block">
            <span className={label}>{t("fieldGender")}</span>
            <select {...register("gender")} className={cn(field, "mt-2")}>
              <option value="f">{tr("genderF")}</option>
              <option value="m">{tr("genderM")}</option>
            </select>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className={label}>{t("fieldPerformance")}</span>
            <input
              {...register("performanceRaw")}
              placeholder={`4'05"58`}
              className={cn(field, "font-data mt-2 tabular-nums")}
            />
            <span className="text-muted-on-page text-ui-sm mt-1 block">
              {t("fieldPerformanceHint")}
            </span>
          </label>

          <label className="block">
            <span className={label}>{t("fieldCategory")}</span>
            <input
              list="admin-categories"
              {...register("category")}
              className={cn(field, "mt-2")}
            />
            <datalist id="admin-categories">
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </label>

          <label className="block">
            <span className={label}>{t("fieldYear")}</span>
            <input
              type="number"
              {...register("year")}
              className={cn(field, "font-data mt-2 tabular-nums")}
            />
          </label>
        </div>

        <label className="block max-w-xs">
          <span className={label}>{t("fieldDate")}</span>
          <input type="date" {...register("date")} className={cn(field, "mt-2")} />
          <span className="text-muted-on-page text-ui-sm mt-1 block">
            {t("fieldDateHint")}
          </span>
        </label>

        {/* Staffeln: mehrere Namen, in der Reihenfolge des Wechsels. */}
        <fieldset>
          <legend className={label}>{t("holders")}</legend>
          <div className="mt-2 space-y-2">
            {fields.map((holder, index) => (
              <div key={holder.id} className="flex gap-2">
                <input
                  {...register(`holders.${index}.lastName`)}
                  placeholder={t("lastName")}
                  className={field}
                />
                <input
                  {...register(`holders.${index}.firstName`)}
                  placeholder={t("firstName")}
                  className={field}
                />
                {fields.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="font-data text-data-xs text-muted-on-page hover:text-accent-on-page px-2 uppercase"
                  >
                    {t("remove")}
                  </button>
                ) : null}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => append({ lastName: "", firstName: "" })}
            className="font-data text-data-xs text-muted-on-page hover:text-ink-text mt-2 uppercase"
          >
            + {t("addHolder")}
          </button>
        </fieldset>

        <div className="flex flex-wrap gap-x-8 gap-y-3">
          {(
            [
              ["isNationalRecord", t("flagNational")],
              ["isEspoirsBest", t("flagEspoirs")],
              ["showOnHome", t("flagHome")],
            ] as const
          ).map(([name, text]) => (
            <label key={name} className="text-ui flex items-center gap-2">
              <input type="checkbox" {...register(name)} />
              {text}
            </label>
          ))}
        </div>

        {Object.keys(errors).length > 0 ? (
          <p className="text-accent-on-page text-ui-sm">{t("required")}</p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-ink text-page-text text-ui px-6 py-3 transition-opacity duration-200 disabled:opacity-60"
        >
          {isSubmitting ? t("saving") : t("save")}
        </button>
      </form>

      {result ? (
        <div
          role="status"
          className={cn(
            "mt-8 border-l-2 py-3 pl-4",
            result.status === "not_better" || result.status === "unreadable"
              ? "border-motion-accent"
              : "border-hairline-on-page",
          )}
        >
          {result.status === "created" ? (
            <p className="text-ui">{t("savedCreated")}</p>
          ) : null}

          {result.status === "superseded" ? (
            <p className="text-ui">
              {t("savedSuperseded", {
                previous: result.previous,
                year: result.previousYear,
              })}
            </p>
          ) : null}

          {result.status === "unreadable" ? (
            <p className="text-ui">{t("errorUnreadable", { value: result.value })}</p>
          ) : null}

          {result.status === "error" ? (
            <p className="text-ui">
              {t("errorGeneric")} {result.message}
            </p>
          ) : null}

          {/*
            §12: klare Meldung, was passiert ist und was zu tun ist — nicht
            nur "Fehler". Der zweite Weg steht direkt daneben und muss nichts
            neu eingetippt bekommen.
          */}
          {result.status === "not_better" ? (
            <div>
              <p className="text-ui">
                {t("notBetter", {
                  performance: result.performance,
                  current: result.current,
                  year: result.currentYear,
                })}
              </p>
              {bestSaved ? (
                <p className="text-muted-on-page text-ui-sm mt-3">
                  {t("savedBest")}
                </p>
              ) : (
                <button
                  type="button"
                  onClick={async () => {
                    const outcome = await saveAsBestPerformance(result.fallback);
                    if (outcome.ok) setBestSaved(true);
                  }}
                  className="border-ink text-ui mt-3 border px-4 py-2 transition-colors duration-200 hover:bg-ink hover:text-page-text"
                >
                  {t("saveAsBest")}
                </button>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
