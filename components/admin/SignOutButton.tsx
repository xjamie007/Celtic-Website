"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const t = useTranslations("admin");
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async () => {
        await createClient().auth.signOut();
        router.refresh();
      }}
      className="font-data text-data-xs text-muted-on-page hover:text-ink-text uppercase transition-colors duration-200"
    >
      {t("signOut")}
    </button>
  );
}
