"use client";

import React from "react";
import Image from "next/image";
import { Compass, ExternalLink, Plane, Sun } from "lucide-react";
import { LotusSeparator } from "./FloralOrnaments";
import ScrollReveal from "./ScrollReveal";
import { WEDDING_DETAILS } from "@/data/weddingData";

export default function VenueSection() {
  return (
    <section
      id="venue"
      className="relative overflow-hidden bg-cream py-14 px-4 sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-jaali-pattern opacity-40" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="text-center max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-[0.34em] text-gold-dark font-semibold">
            The Royal Palace
          </p>
          <h2 className="mt-1.5 font-display text-3xl sm:text-4xl font-semibold text-maroon">
            Welcome to Udaipur
          </h2>
          <LotusSeparator />
        </ScrollReveal>

        <div className="mt-8 overflow-hidden rounded-[2rem] border-2 border-gold/65 bg-ivory shadow-[0_22px_60px_rgba(79,14,28,0.14)]">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[340px] overflow-hidden">
              <Image
                src="/images/venue-palace.jpg"
                alt="Twilight view of royal Udaipur heritage courtyard"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-8 bg-ivory">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-maroon">
                  {WEDDING_DETAILS.venueName}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-muted">
                  {WEDDING_DETAILS.venueAddress}
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-gold/40 bg-cream/70 p-3.5">
                    <p className="flex items-center gap-2 font-display text-base font-semibold text-maroon">
                      <Plane className="h-3.5 w-3.5 text-gold-dark" />
                      Airport Pickups
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      Shuttles await all Udaipur (UDR) arrivals, 40 mins away.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-gold/40 bg-cream/70 p-3.5">
                    <p className="flex items-center gap-2 font-display text-base font-semibold text-maroon">
                      <Sun className="h-3.5 w-3.5 text-gold-dark" />
                      February Weather
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      25°C sunlit days, 12°C lakeside nights — bring a shawl.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href={WEDDING_DETAILS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shimmer-btn inline-flex items-center justify-center gap-2 rounded-full bg-royal-velvet px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light shadow-md transition hover:scale-[1.02]"
                >
                  <Compass className="h-4 w-4" />
                  Open in Google Maps
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
