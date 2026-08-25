"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

/**
 * News und Termine (§12).
 *
 * Die Rolle author darf beides, aber nur eigene Beitraege. Erzwungen wird das
 * in der Policy; hier wird der Urheber gesetzt, damit die Policy ihn findet.
 */

/** Nur lb ist Pflicht (§11). Leere Uebersetzungen fallen raus, statt als
 *  leerer String in der Datenbank zu landen und den Rueckfall auszuhebeln. */
const localized = z.object({
  lb: z.string().trim().min(1),
  de: z.string().trim().optional(),
  fr: z.string().trim().optional(),
});

const clean = (value: z.infer<typeof localized>) =>
  Object.fromEntries(
    Object.entries(value).filter(([, text]) => text && text.trim() !== ""),
  );

/** "Nordstadsemi 2026" -> "nordstadsemi-2026" */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

const newsSchema = z.object({
  id: z.string().uuid().optional(),
  title: localized,
  excerpt: localized.partial({ lb: true }).optional(),
  body: localized,
  coverImage: z.string().trim().optional(),
  status: z.enum(["draft", "published"]),
});

export type NewsInput = z.input<typeof newsSchema>;

export async function saveNews(
  input: NewsInput,
): Promise<{ ok: boolean; message?: string }> {
  const parsed = newsSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message };
  }
  const value = parsed.data;

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id ?? "")
    .maybeSingle();

  const row = {
    slug: slugify(value.title.lb),
    title: clean(value.title),
    excerpt: value.excerpt?.lb ? clean(value.excerpt as never) : null,
    body: clean(value.body),
    cover_image: value.coverImage && value.coverImage !== "" ? value.coverImage : null,
    status: value.status,
    /* §12: Veroeffentlicht ohne Datum gibt es nicht — die Bedingung in der
       Datenbank erzwingt es, hier wird es gesetzt. */
    published_at: value.status === "published" ? new Date().toISOString() : null,
    author_id: profile?.id ?? null,
  };

  const { error } = value.id
    ? await supabase.from("news").update(row).eq("id", value.id)
    : await supabase.from("news").insert(row);

  if (error) return { ok: false, message: error.message };

  revalidateTag("news");
  return { ok: true };
}

const eventSchema = z.object({
  id: z.string().uuid().optional(),
  title: localized,
  body: localized.partial({ lb: true }).optional(),
  startsAt: z.string().min(1),
  endsAt: z.string().optional(),
  location: z.string().trim().optional(),
  externalUrl: z.string().trim().url().or(z.literal("")).optional(),
  isClubRace: z.boolean().optional(),
});

export type EventInput = z.input<typeof eventSchema>;

export async function saveEvent(
  input: EventInput,
): Promise<{ ok: boolean; message?: string }> {
  const parsed = eventSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message };
  }
  const value = parsed.data;

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", (await supabase.auth.getUser()).data.user?.id ?? "")
    .maybeSingle();

  const row = {
    slug: slugify(`${value.title.lb}-${value.startsAt}`),
    title: clean(value.title),
    body: value.body?.lb ? clean(value.body as never) : null,
    starts_at: value.startsAt,
    ends_at: value.endsAt && value.endsAt !== "" ? value.endsAt : null,
    location: value.location && value.location !== "" ? value.location : null,
    external_url: value.externalUrl && value.externalUrl !== "" ? value.externalUrl : null,
    is_club_race: value.isClubRace ?? false,
    author_id: profile?.id ?? null,
  };

  const { error } = value.id
    ? await supabase.from("events").update(row).eq("id", value.id)
    : await supabase.from("events").insert(row);

  if (error) return { ok: false, message: error.message };

  revalidateTag("events");
  return { ok: true };
}

export async function deleteContent(
  table: "news" | "events",
  id: string,
): Promise<{ ok: boolean; message?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidateTag(table);
  return { ok: true };
}
