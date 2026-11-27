"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RotateCw } from "lucide-react";
import { PostcardStory } from "@/data/inviteData";

export default function FlipPostcardGallery({
  postcards,
}: {
  postcards: PostcardStory[];
}) {
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {postcards.map((card) => {
        const isFlipped = Boolean(flippedIds[card.id]);
        return (
          <button
            key={card.id}
            type="button"
            onClick={() => toggleFlip(card.id)}
            aria-label={`Flip postcard: ${card.title}`}
            className="group perspective-1000 w-full text-left focus:outline-none"
          >
            <div
              className={`relative aspect-[3/4] w-full preserve-3d transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isFlipped ? "rotate-y-180" : "group-hover:-translate-y-1"
              }`}
            >
              {/* Front — Graceful Arched Keepsake Frame */}
              <div className="backface-hidden absolute inset-0 rounded-t-[72px] rounded-b-3xl border border-honey-gold/65 bg-petal-milk p-2.5 shadow-[0_14px_36px_rgba(94,17,41,0.1)]">
                <div className="relative h-full w-full overflow-hidden rounded-t-[64px] rounded-b-2xl border border-honey-gold/35">
                  <Image
                    src={card.src}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-berry-deep/80 via-berry-deep/15 to-transparent" />

                  <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full border border-honey-gold/55 bg-petal-milk/92 px-3 py-1 text-[10px] uppercase tracking-widest text-berry shadow-sm">
                    <RotateCw className="h-2.5 w-2.5 text-honey-gold" />
                    Turn
                  </span>

                  <div className="absolute bottom-4 inset-x-4 text-petal-milk border-t border-honey-gold/45 pt-2.5">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-blush-silk/90">
                      {card.place}
                    </p>
                    <p className="mt-0.5 font-display text-xl font-medium">
                      {card.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Back */}
              <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between rounded-t-[72px] rounded-b-3xl border border-honey-gold/75 bg-blush-silk p-6 shadow-md">
                <div className="pointer-events-none absolute inset-2.5 rounded-t-[62px] rounded-b-2xl border border-honey-gold/30" />
                <div className="relative z-10 flex items-start justify-between border-b border-honey-gold/35 pt-3 pb-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-sage font-medium">
                      {card.stampDate}
                    </p>
                    <p className="font-display text-lg font-medium text-berry">
                      {card.title}
                    </p>
                  </div>
                  <div className="flex h-11 w-11 flex-col items-center justify-center rounded-full border border-dashed border-berry/55 bg-petal-milk text-center">
                    <span className="text-[8px] uppercase tracking-widest text-berry font-semibold">
                      M &amp; K
                    </span>
                    <span className="text-[7px] text-honey-gold font-medium">
                      JDH · 27
                    </span>
                  </div>
                </div>

                <p className="relative z-10 my-auto font-display italic text-base leading-relaxed text-berry-ink">
                  &ldquo;{card.note}&rdquo;
                </p>

                <div className="relative z-10 flex items-center justify-between border-t border-honey-gold/35 pt-3">
                  <span className="font-script text-2xl text-berry">
                    — {card.author}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-muted">
                    Tap to turn
                  </span>
                </div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
