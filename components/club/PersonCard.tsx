"use client";

import Image from "next/image";
import { useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Karte fuer Trainer:innen und Vorstand (§8).
 *
 * "Hover → Karte kippt leicht zur Mausposition (max 4°, perspective 1000px),
 * Verlaufskante laeuft am unteren Rand ein."
 *
 * Die Neigung kommt aus zwei Custom Properties, die bei Mausbewegung gesetzt
 * werden; gerechnet wird in CSS. Bei reduzierter Bewegung faellt die
 * Transition global weg (globals.css) und die Karte bleibt stehen.
 *
 * Ohne Foto steht das Monogramm auf dem Trikotverlauf. Das ist keine
 * Notloesung: eine Karte mit grauem Platzhaltermensch sieht aus wie ein
 * Fehler, ein Monogramm sieht aus wie eine Entscheidung — und der Verein hat
 * nicht von allen achtzehn Trainer:innen ein Foto.
 */
export function PersonCard({
  name,
  role,
  bio,
  photo,
  className,
}: {
  name: string;
  role?: string | null;
  bio?: string | null;
  photo?: string | null;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    /* -1 bis 1, gemessen von der Kartenmitte. */
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    node.style.setProperty("--tilt-x", String(-y * 8));
    node.style.setProperty("--tilt-y", String(x * 8));
  };

  const onLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--tilt-x", "0");
    node.style.setProperty("--tilt-y", "0");
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("person-card group relative", className)}
    >
      <div className="person-card-inner border-hairline-on-page relative overflow-hidden border">
        <div className="bg-deep relative aspect-square">
          {photo ? (
            <Image
              src={photo}
              alt={name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
              className="object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="gradient-surface absolute inset-0 flex items-center justify-center"
            >
              <span className="font-display text-h1 wdth-110 text-white/85 font-black">
                {initials}
              </span>
            </span>
          )}
        </div>

        <div className="bg-page relative px-4 py-4">
          <p className="text-ui-lg wdth-100 font-display font-bold">{name}</p>
          {role ? (
            <p className="font-data text-data-xs text-muted-on-page mt-1 uppercase">
              {role}
            </p>
          ) : null}
          {bio ? (
            <p className="text-muted-on-page text-ui-sm mt-3">{bio}</p>
          ) : null}
        </div>

        {/* Die Verlaufskante laeuft am unteren Rand ein. */}
        <span aria-hidden="true" className="person-card-edge gradient-surface" />
      </div>
    </div>
  );
}
