import { notFound } from "next/navigation";

/**
 * Faengt jeden Pfad ab, fuer den es (noch) keine Seite gibt, und leitet ihn
 * auf die lokalisierte 404-Seite um.
 *
 * Ohne diese Route zeigt Next seine eigene, englische Standard-404 ausserhalb
 * des Layouts — ohne Navigation, ohne Footer, ohne Sprache. Der Verein zieht
 * von einem alten CMS um; alte Links werden noch jahrelang aufgerufen. Wer
 * auf einem toten Link landet, soll im Haus bleiben und weiterklicken koennen.
 */
export default function CatchAllNotFound(): never {
  notFound();
}
