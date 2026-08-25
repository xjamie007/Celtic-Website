import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Locale-bewusste Navigation. Im gesamten Projekt wird dieses Link benutzt,
 * nie next/link direkt — sonst faellt die Sprache beim Klick heraus.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
