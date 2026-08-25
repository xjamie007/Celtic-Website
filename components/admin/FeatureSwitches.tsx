"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { setFeatures } from "@/lib/actions/settings";
import { cn } from "@/lib/utils";

/**
 * Schalter je Bereich (§2).
 *
 * Was hier ausgeht, verschwindet vollstaendig von der Seite: aus der
 * Navigation, aus dem Footer, aus der Sitemap und aus jeder internen
 * Verlinkung. Die Seite selbst antwortet dann mit 404. Deshalb steht der
 * Hinweis daneben und nicht im Handbuch.
 */
export function FeatureSwitches({
  features,
  editable,
}: {
  features: Record<string, boolean>;
  editable: readonly string[];
}) {
  const t = useTranslations("admin");
  const router = useRouter();
  const [state, setState] = useState(features);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggle = async (key: string) => {
    const next = { ...state, [key]: !state[key] };
    setState(next);
    setBusy(true);
    setSaved(false);
    const outcome = await setFeatures(next);
    setBusy(false);
    if (outcome.ok) {
      setSaved(true);
      router.refresh();
    } else {
      setState(state);
    }
  };

  return (
    <div>
      <ul className="border-hairline-on-page border-t">
        {editable.map((key) => (
          <li
            key={key}
            className="border-hairline-on-page flex flex-wrap items-center justify-between gap-4 border-b py-4"
          >
            <span>
              <span className="text-ui block">{t(`feature_${key}`)}</span>
              <span className="font-data text-data-xs text-muted-on-page uppercase">
                {state[key] ? t("featureOn") : t("featureOff")}
              </span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={state[key]}
              aria-label={t(`feature_${key}`)}
              disabled={busy}
              onClick={() => void toggle(key)}
              className={cn(
                "relative h-7 w-12 shrink-0 transition-colors duration-200 disabled:opacity-50",
                state[key] ? "bg-motion-accent" : "bg-hairline-on-page",
              )}
            >
              <span
                className={cn(
                  "bg-page absolute top-1 h-5 w-5 transition-transform duration-200",
                  state[key] ? "translate-x-6" : "translate-x-1",
                )}
              />
            </button>
          </li>
        ))}
      </ul>
      {saved ? (
        <p className="text-muted-on-page text-ui-sm mt-4">{t("saved")}</p>
      ) : null}
    </div>
  );
}
