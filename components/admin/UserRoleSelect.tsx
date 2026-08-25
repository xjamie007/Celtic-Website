"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { setUserRole } from "@/lib/actions/users";

export function UserRoleSelect({
  profileId,
  role,
  isSelf,
}: {
  profileId: string;
  role: "admin" | "editor" | "author";
  isSelf: boolean;
}) {
  const t = useTranslations("admin");
  const router = useRouter();
  const [value, setValue] = useState(role);
  const [failed, setFailed] = useState(false);

  return (
    <span className="flex items-center gap-3">
      <select
        value={value}
        aria-label={t("userChange")}
        /* Die eigene Rolle laesst sich nicht herabstufen. Sonst nimmt sich
           der einzige Administrator versehentlich die Rechte und kommt nicht
           mehr an die Benutzerverwaltung, um sie sich zurueckzugeben. */
        disabled={isSelf}
        onChange={async (event) => {
          const next = event.target.value as typeof role;
          setValue(next);
          setFailed(false);
          const outcome = await setUserRole({ profileId, role: next });
          if (outcome.ok) router.refresh();
          else {
            setValue(role);
            setFailed(true);
          }
        }}
        className="border-hairline-on-page text-ui-sm border bg-transparent px-2 py-1 disabled:opacity-50"
      >
        <option value="admin">{t("roleAdmin")}</option>
        <option value="editor">{t("roleEditor")}</option>
        <option value="author">{t("roleAuthor")}</option>
      </select>
      {isSelf ? (
        <span className="font-data text-data-xs text-muted-on-page uppercase">
          {t("userSelf")}
        </span>
      ) : null}
      {failed ? (
        <span className="text-accent-on-page text-ui-sm">{t("errorGeneric")}</span>
      ) : null}
    </span>
  );
}
