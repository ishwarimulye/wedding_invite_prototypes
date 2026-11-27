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
              {/* Front: Photographic Postcard */}
              <div className="backface-hidden absolute inset-0 overflow-hidden rounded-3xl border border-honey-gold/55 bg-petal-milk p-2.5 shadow-[0_18px_45px_rgba(70,17,37,0.12)]">
                <div className="relative h-full w-full overflow-hidden rounded-2xl">
                  <Image
                    src={card.src}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-berry-deep/85 via-berry-deep/15 to-transparent" />

                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-petal-milk/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-berry shadow-sm">
                    <RotateCw className="h-3 w-3 text-coral-rose" />
                    Flip
                  </span>

                  <div className="absolute bottom-4 inset-x-4 text-petal-milk">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-marigold font-semibold">
                      {card.place}
                    </p>
                    <p className="mt-0.5 font-display text-xl font-semibold">
                      {card.title}
                    </p>
                    <p className="mt-1 text-[11px] text-petal-milk/80">
                      {card.caption}
                    </p>
                  </div>
                </div>
              </div>

              {/* Back: Handwritten Stationery Postcard Reverse */}
              <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-honey-gold/65 bg-blush-silk p-5 shadow-[0_20px_50px_rgba(70,17,37,0.18)]">
                <div className="flex items-start justify-between border-b border-honey-gold/35 pb-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-sage font-semibold">
                      {card.stampDate}
                    </p>
                    <p className="font-display text-lg font-semibold text-berry">
                      {card.title}
                    </p>
                  </div>

                  {/* Decorative Postage Stamp */}
                  <div className="flex h-12 w-10 flex-col items-center justify-center border border-dashed border-coral-rose/70 bg-petal-milk text-center">
                    <span className="text-[9px] uppercase tracking-widest text-berry font-bold">
                      JDH
                    </span>
                    <span className="text-[8px] text-coral-rose">2027</span>
                  </div>
                </div>

                <p className="my-auto font-display italic text-sm sm:text-base leading-relaxed text-berry-ink">
                  &ldquo;{card.handwrittenNote}&rdquo;
                </p>

                <div className="flex items-center justify-between border-t border-honey-gold/35 pt-3">
                  <span className="font-script text-2xl text-berry">
                    — {card.author}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-sage font-semibold">
                    <RotateCw className="h-3 w-3" />
                    Front
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
