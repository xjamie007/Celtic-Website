import { redirect } from "next/navigation";

import { site } from "@/config/site";

/**
 * §9: /shop ist keine Seite, sondern eine Weiterleitung zum Teamshop.
 * Steht als Route statt als externem Link in der Navigation, damit die
 * Adresse celtic.lu/shop bestehen bleibt, auch wenn der Anbieter wechselt —
 * dann aendert sich nur ein Wert in config/site.ts.
 */
export default function ShopPage(): never {
  redirect(site.shopUrl);
}
