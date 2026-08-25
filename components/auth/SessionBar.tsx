"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { supabaseConfigured } from "@/lib/supabase/env";

/**
 * Schmale Leiste am oberen Rand fuer angemeldete Vorstandsmitglieder (§3).
 *
 * Bewusst clientseitig: die Sitzung serverseitig zu lesen hiesse cookies()
 * aufzurufen, und damit waere jede oeffentliche Seite dynamisch statt
 * vorgerendert (§14). Fuer ein Dutzend Angemeldeter das Caching der ganzen
 * Seite aufzugeben waere der falsche Tausch — die Leiste erscheint eben
 * nach der Hydration.
 */
export function SessionBar() {
  const t = useTranslations("login");
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    if (!supabaseConfigured) return;
    const supabase = createClient();
    let active = true;

    const read = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!active) return;
      if (!user) {
        setName(null);
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("name")
        .eq("user_id", user.id)
        .maybeSingle();
      if (active) setName(profile?.name ?? user.email ?? "");
    };

    void read();
    const { data: sub } = supabase.auth.onAuthStateChange(() => void read());

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (name === null) return null;

  return (
    <div className="bg-ink text-page-text relative z-40">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-2 sm:px-8">
        <span className="font-data text-data-xs text-muted-on-ink uppercase">
          {t("loggedInAs", { name })}
        </span>
        <span className="flex items-center gap-6">
          <Link
            href="/admin"
            className="font-data text-data-xs uppercase transition-colors duration-200 hover:text-accent-on-dark"
          >
            {t("toAdmin")}
          </Link>
          <button
            type="button"
            onClick={async () => {
              await createClient().auth.signOut();
              router.refresh();
            }}
            className="font-data text-data-xs text-muted-on-ink uppercase transition-colors duration-200 hover:text-white"
          >
            {t("logout")}
          </button>
        </span>
      </div>
    </div>
  );
}
