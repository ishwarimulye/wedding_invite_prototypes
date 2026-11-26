"use client";

import React from "react";
import Image from "next/image";
import { Compass, ExternalLink, Plane, Sparkles, Sun } from "lucide-react";
import { LotusSeparator } from "./FloralOrnaments";
import ScrollReveal from "./ScrollReveal";
import { WEDDING_DETAILS } from "@/data/weddingData";

const HOSPITALITY_NOTES = [
  {
    icon: Plane,
    title: "Airport Concierge",
    detail:
      "Chauffeur-driven palace shuttles await all arrivals at Maharana Pratap Airport (UDR), 40 minutes from the courtyard.",
  },
  {
    icon: Sun,
    title: "February Weather",
    detail:
      "Warm sunlit afternoons (25°C) with crisp, romantic lakeside evenings (12°C) — a light pashmina shawl is ideal for pheras.",
  },
  {
    icon: Sparkles,
    title: "Palace Wardrobe",
    detail:
      "Breezy floral pastels by day and jewel-toned silks, velvets, and heirloom kundan by twilight.",
  },
];

export default function VenueSection() {
  return (
    <section
      id="venue"
      className="relative overflow-hidden bg-cream py-24 px-4 sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-jaali-pattern opacity-40" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.34em] text-gold-dark font-semibold">
            The Royal Palace
          </p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-maroon">
            Welcome to Udaipur
          </h2>
          <LotusSeparator />
        </ScrollReveal>

        <ScrollReveal delayMs={120}>
          <div className="mt-12 overflow-hidden rounded-[2rem] border-2 border-gold/70 bg-ivory shadow-[0_28px_75px_rgba(79,14,28,0.16)]">
            <div className="grid lg:grid-cols-12">
              {/* Palace Visual */}
              <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] overflow-hidden">
                <Image
                  src="/images/venue-palace.jpg"
                  alt="Twilight view of royal Udaipur heritage courtyard with reflection pool and marigold petals"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover animate-ken-burns"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-maroon-deep/25" />
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3 text-ivory">
                  <div>
                    <span className="inline-block rounded-full bg-maroon-deep/85 border border-gold/60 px-3.5 py-1 text-[10px] uppercase tracking-[0.22em] text-gold-light">
                      City of Lakes
                    </span>
                    <p className="mt-2 font-display text-2xl sm:text-3xl font-semibold">
                      {WEDDING_DETAILS.venueName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Palace Details */}
              <div className="lg:col-span-5 flex flex-col justify-between p-7 sm:p-10 bg-ivory">
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-gold-dark font-semibold">
                    Palace Address &amp; Concierge
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-semibold text-maroon">
                    {WEDDING_DETAILS.venueName}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {WEDDING_DETAILS.venueAddress}
                  </p>

                  <div className="mt-6 space-y-4">
                    {HOSPITALITY_NOTES.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.title}
                          className="flex items-start gap-3.5 rounded-2xl border border-gold/40 bg-cream/70 p-4 transition hover:border-gold"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-royal-velvet text-gold-light shadow-sm">
                            <Icon className="h-4 w-4" />
                          </span>
                          <div>
                            <h4 className="font-display text-lg font-semibold text-maroon">
                              {item.title}
                            </h4>
                            <p className="mt-0.5 text-xs leading-relaxed text-muted">
                              {item.detail}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={WEDDING_DETAILS.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shimmer-btn inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-royal-velvet px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light shadow-md transition hover:scale-[1.02]"
                  >
                    <Compass className="h-4 w-4" />
                    Open in Google Maps
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
