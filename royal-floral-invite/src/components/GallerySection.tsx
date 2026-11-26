"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Expand, X } from "lucide-react";
import { LotusSeparator } from "./FloralOrnaments";
import ScrollReveal from "./ScrollReveal";
import { GALLERY_ITEMS } from "@/data/weddingData";

export default function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-royal-velvet py-24 px-4 sm:px-8 text-ivory"
    >
      <div className="pointer-events-none absolute inset-0 bg-jaali-pattern opacity-25" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.34em] text-gold-light font-semibold">
            Glimpses of Royalty
          </p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-ivory">
            A Visual Prelude
          </h2>
          <LotusSeparator light />
          <p className="text-sm sm:text-base text-ivory/80 leading-relaxed">
            Petals, sandstone arches, heirloom brocade, and warm twilight lamps
            waiting to welcome you.
          </p>
        </ScrollReveal>

        {/* Curated Editorial Masonry Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <ScrollReveal
              key={item.src}
              delayMs={idx * 80}
              className={idx === 0 ? "sm:row-span-2" : ""}
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`group relative w-full overflow-hidden rounded-3xl border-2 border-gold/60 bg-maroon-deep text-left shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition duration-500 hover:-translate-y-1.5 hover:border-gold-light ${
                  idx === 0 ? "min-h-[380px] h-full" : ""
                }`}
              >
                <div
                  className={`relative w-full overflow-hidden ${
                    idx === 0 ? "aspect-[3/4] sm:h-full" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/90 via-maroon-deep/15 to-transparent opacity-80 transition group-hover:opacity-95" />

                  <span className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-gold/70 bg-maroon-deep/70 text-gold-light opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                    <Expand className="h-4 w-4" />
                  </span>

                  <div className="absolute bottom-5 inset-x-5 text-ivory">
                    <p className="font-display text-2xl font-semibold text-gold-light">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-ivory/90">{item.caption}</p>
                  </div>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-maroon-deep/92 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative max-w-3xl w-full overflow-hidden rounded-3xl border-2 border-gold/75 bg-ivory p-2 shadow-2xl animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close image preview"
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-maroon-deep/90 text-gold-light transition hover:bg-maroon"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src={GALLERY_ITEMS[selectedIndex].src}
                alt={GALLERY_ITEMS[selectedIndex].caption}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-contain bg-maroon-deep/15"
              />
            </div>
            <div className="px-4 py-3 text-center">
              <p className="font-display text-2xl font-semibold text-maroon">
                {GALLERY_ITEMS[selectedIndex].title}
              </p>
              <p className="text-xs text-muted">
                {GALLERY_ITEMS[selectedIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
