"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createClient } from "@/lib/supabase/client";

const schema = z.object({ email: z.string().trim().email() });
type Values = z.infer<typeof schema>;

/** Sekunden, bevor erneut geschickt werden kann (§3). */
const RESEND_AFTER = 60;

/**
 * Anmeldung per Magic Link (§3).
 *
 * Ein Feld, ein Knopf, ein Satz Erklaerung. Wer sich dreimal im Jahr
 * anmeldet, soll nicht raten muessen, was passiert — deshalb steht die
 * Gueltigkeit des Links direkt daneben und nicht erst in der Mail.
 *
 * Die Fehlermeldungen sind konkret: "Dës Adress ass net fräigeschalt" sagt,
 * was zu tun ist. "Ein Fehler ist aufgetreten" sagt nichts.
 */
export function LoginPanel() {
  const t = useTranslations("login");
  const params = useSearchParams();
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [failed, setFailed] = useState<string | null>(null);

  /* Kommt jemand ueber einen abgelaufenen Link, steht der Grund hier und
     nicht als kryptischer Parameter in der Adresszeile. */
  useEffect(() => {
    if (params.get("error") === "expired") setFailed(t("expired"));
  }, [params, t]);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const send = async (email: string) => {
    setFailed(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        /* Selbstregistrierung ist abgeschaltet: wer nicht angelegt ist,
           bekommt keinen Link — und erfaehrt hier, an wen er sich wendet. */
        shouldCreateUser: false,
      },
    });

    if (error) {
      const code = error.message.toLowerCase();
      if (code.includes("signups not allowed") || code.includes("not found")) {
        setFailed(t("notAllowed"));
      } else if (code.includes("rate") || code.includes("many")) {
        setFailed(t("tooMany"));
      } else {
        setFailed(error.message);
      }
      return;
    }

    setSentTo(email);
    setSeconds(RESEND_AFTER);
  };

  if (sentTo) {
    return (
      <div className="space-y-5">
        <p className="text-ui text-page-text">
          {t("sentTo", { email: sentTo })}
        </p>
        <p className="text-muted-on-ink text-ui-sm">{t("explain")}</p>
        <button
          type="button"
          disabled={seconds > 0}
          onClick={() => void send(sentTo)}
          className="font-data text-data-xs text-muted-on-ink hover:text-white uppercase transition-colors duration-200 disabled:opacity-50"
        >
          {seconds > 0 ? t("resendIn", { seconds }) : t("resend")}
        </button>
        {failed ? (
          <p className="text-accent-on-dark text-ui-sm">{failed}</p>
        ) : null}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(({ email }) => send(email))}
      noValidate
      className="space-y-5"
    >
      <label className="block">
        <span className="font-data text-data-xs text-muted-on-ink uppercase">
          {t("email")}
        </span>
        <input
          type="email"
          autoComplete="email"
          autoFocus
          aria-invalid={errors.email ? "true" : undefined}
          {...register("email")}
          className="border-hairline-on-ink text-ui text-page-text mt-2 w-full border bg-transparent px-3 py-3"
        />
      </label>

      <p className="text-muted-on-ink text-ui-sm">{t("explain")}</p>

      {errors.email ? (
        <p className="text-accent-on-dark text-ui-sm">{t("invalidEmail")}</p>
      ) : null}
      {failed ? <p className="text-accent-on-dark text-ui-sm">{failed}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-page text-ink-text text-ui w-full px-4 py-3 transition-opacity duration-200 disabled:opacity-60"
      >
        {t("request")}
      </button>

      {/* Zeigt beim Absenden, welche Adresse gemeint war. */}
      <span className="sr-only">{getValues("email")}</span>
    </form>
  );
}
