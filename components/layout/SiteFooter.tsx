import { getTranslations } from "next-intl/server";

import { footerNav, legalNav, site } from "@/config/site";
import { getFeatures, isPathEnabled } from "@/lib/features";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Wordmark } from "@/components/layout/Wordmark";
import { Link } from "@/i18n/navigation";

const groupLabel = {
  performance: "groupPerformance",
  club: "groupClub",
  more: "groupMore",
} as const;

export async function SiteFooter() {
  const t = await getTranslations("nav");
  const tf = await getTranslations("footer");
  const tA11y = await getTranslations("a11y");
  const { contact, legal } = site;
  const features = await getFeatures();

  /* §2: kein toter Link im Footer. */
  const groups = footerNav
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => isPathEnabled(item.href, features)),
    }))
    .filter((group) => group.items.length > 0);

  const events = site.features.events ? site.events : [];

  return (
    <footer className="bg-ink text-page-text">
      <div className="mx-auto max-w-[1240px] px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_repeat(3,1fr)]">
          {/* ── Kontakt ───────────────────────────────────────────────── */}
          <div>
            <Wordmark variant="footer" className="mb-6" />
            <h2 className="font-data text-data-xs text-muted-on-ink uppercase">
              {tf("contact")}
            </h2>
            <address className="mt-4 space-y-4 not-italic">
              <div>
                <p className="font-data text-data-xs text-muted-on-ink uppercase">
                  {tf("postal")}
                </p>
                <p className="text-ui-sm mt-1">
                  {contact.postal.line1}
                  <br />
                  {contact.postal.line2}
                  <br />
                  {contact.postal.postalCode} {contact.postal.city}
                </p>
              </div>
              <div>
                <p className="font-data text-data-xs text-muted-on-ink uppercase">
                  {tf("stadium")}
                </p>
                <p className="text-ui-sm mt-1">
                  {contact.stadium.name}, {contact.stadium.street}
                  <br />
                  {contact.stadium.postalCode} {contact.stadium.city}
                </p>
              </div>
              <div>
                <p className="font-data text-data-xs text-muted-on-ink uppercase">
                  {tf("clubhouse")}
                </p>
                <p className="text-ui-sm mt-1">
                  {contact.clubhouse.street}
                  <br />
                  {contact.clubhouse.postalCode} {contact.clubhouse.city}
                </p>
              </div>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-data text-ui-sm text-white underline decoration-motion-accent decoration-2 underline-offset-4 transition-colors duration-200 hover:text-accent-on-dark"
                >
                  {contact.email}
                </a>
              </p>
            </address>
          </div>

          {/* ── Navigationsspalten ────────────────────────────────────── */}
          {groups.map((group) => (
            <nav key={group.key} aria-label={tf(groupLabel[group.key])}>
              <h2 className="font-data text-data-xs text-muted-on-ink uppercase">
                {tf(groupLabel[group.key])}
              </h2>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      className="text-ui-sm text-muted-on-ink transition-colors duration-200 hover:text-white"
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ── Vereinsveranstaltungen + Social ───────────────────────────
            §9: vorerst externe Links. Sie stehen als Datensatz in der Config,
            damit sie spaeter ohne Umbau zu Subsites werden koennen. */}
        <div className="border-hairline-on-ink mt-12 grid gap-8 border-t pt-8 md:grid-cols-2">
          {events.length > 0 ? (
          <div>
            <h2 className="font-data text-data-xs text-muted-on-ink uppercase">
              {tf("events")}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {events.map((event) => (
                <li key={event.slug}>
                  <a
                    href={event.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-ui-lg font-bold wdth-96 transition-colors duration-200 hover:text-accent-on-dark"
                  >
                    {event.name}
                    <span className="sr-only"> ({tA11y("externalLink")})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          ) : null}
          <div className="md:justify-self-end">
            <h2 className="font-data text-data-xs text-muted-on-ink uppercase">
              {tf("follow")}
            </h2>
            <SocialLinks className="mt-3" tone="dark" />
          </div>
        </div>

        {/* ── Rechtszeile (§13) ─────────────────────────────────────────── */}
        <div className="border-hairline-on-ink mt-8 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-data text-data-xs text-muted-on-ink">
            {tf("rights", { year: new Date().getFullYear(), rcs: legal.rcs })}
          </p>
          <nav aria-label={tA11y("footerNav")}>
            <ul className="flex gap-6">
              {legalNav.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="font-data text-data-xs text-muted-on-ink uppercase transition-colors duration-200 hover:text-white"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
              {/*
                §3: Der Zugang zum Redaktionsbereich gehoert nicht in die
                Hauptnavigation — er richtet sich an ein Dutzend Personen,
                nicht an Besucher. Hier unten findet ihn, wer ihn sucht, und
                er steht niemandem im Weg.
              */}
              <li>
                <Link
                  href="/login"
                  className="font-data text-data-xs text-muted-on-ink uppercase transition-colors duration-200 hover:text-white"
                >
                  {tf("memberArea")}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
