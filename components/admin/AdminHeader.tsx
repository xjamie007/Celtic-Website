import { getTranslations } from "next-intl/server";

import { SignOutButton } from "@/components/admin/SignOutButton";
import { Wordmark } from "@/components/layout/Wordmark";
import { Link } from "@/i18n/navigation";

export async function AdminHeader({ title }: { title?: string }) {
  const t = await getTranslations("admin");

  return (
    <header className="border-hairline-on-page flex flex-wrap items-center justify-between gap-4 border-b pb-6">
      <div className="flex items-baseline gap-4">
        <Link href="/admin" className="text-ink-text">
          <Wordmark />
        </Link>
        <span className="font-data text-data-xs text-muted-on-page uppercase">
          {title ?? t("title")}
        </span>
      </div>
      <div className="flex items-center gap-5">
        <Link
          href="/admin"
          className="font-data text-data-xs text-muted-on-page hover:text-ink-text uppercase transition-colors duration-200"
        >
          {t("back")}
        </Link>
        <SignOutButton />
      </div>
    </header>
  );
}
