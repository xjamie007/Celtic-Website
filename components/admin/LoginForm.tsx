"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createClient } from "@/lib/supabase/client";

/**
 * Anmeldung per Magic Link (§12).
 *
 * §2 verlangt React Hook Form und Zod fuer alle Formulare, auch im Admin —
 * das Schema steht hier und validiert im Browser, bevor ueberhaupt eine
 * Anfrage rausgeht.
 */
const schema = z.object({
  email: z.string().trim().email(),
});

type Values = z.infer<typeof schema>;

export function LoginForm() {
  const t = useTranslations("admin");
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async ({ email }: Values) => {
    setFailed(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      setFailed(error.message);
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <p className="border-motion-accent text-ui border-l-2 py-2 pl-4">
        {t("linkSent")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <label className="block">
        <span className="font-data text-data-xs text-muted-on-page uppercase">
          {t("email")}
        </span>
        <input
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? "true" : undefined}
          {...register("email")}
          className="border-hairline-on-page text-ui mt-2 w-full border bg-transparent px-3 py-2"
        />
      </label>

      {errors.email ? (
        <p className="text-accent-on-page text-ui-sm">{t("invalidEmail")}</p>
      ) : null}
      {failed ? <p className="text-accent-on-page text-ui-sm">{failed}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-ink text-page-text text-ui w-full px-4 py-3 transition-opacity duration-200 disabled:opacity-60"
      >
        {t("sendLink")}
      </button>
    </form>
  );
}
