import type { Metadata } from "next";
import { Image } from "@/components/media/Image";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { LoginPanel } from "@/components/auth/LoginPanel";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "login" });
  /* §3: Der Member-Beraich gehoert in keine Suchmaschine. */
  return { title: t("title"), robots: { index: false, follow: false } };
}

/**
 * /login (§3)
 *
 * Eine eigenstaendige, ruhige Seite: Trikotverlauf als Grund, Logo oben,
 * ein Feld in der Mitte. Kein Bahn-Element, keine Navigation, keine
 * Zielgerade — wer sich anmeldet, will sich anmelden.
 */
export default async function LoginPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("login");

  return (
    <div className="gradient-surface relative flex min-h-dvh items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-10 block">
          <Image
            src="/brand/celtic-logo.webp"
            alt={site.name}
            width={180}
            height={160}
            priority
            className="h-16 w-auto"
          />
        </Link>

        <h1 className="text-h2 wdth-100 text-page-text">{t("title")}</h1>

        <div className="mt-8">
          <Suspense>
            <LoginPanel />
          </Suspense>
        </div>

        <p className="mt-10">
          <Link
            href="/"
            className="font-data text-data-xs text-muted-on-ink uppercase transition-colors duration-200 hover:text-white"
          >
            &larr; {t("backToSite")}
          </Link>
        </p>
      </div>
    </div>
  );
}
