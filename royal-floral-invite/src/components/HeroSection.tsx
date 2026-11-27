"use client";

import React from "react";
import Image from "next/image";
import { CalendarHeart, MapPin } from "lucide-react";
import { FloralCorner, LotusSeparator } from "./FloralOrnaments";
import { WEDDING_DETAILS } from "@/data/weddingData";

export default function HeroSection({ guestName }: { guestName: string }) {
  return (
    <section
      id="top"
      className="relative flex items-center justify-center overflow-hidden bg-royal-velvet pt-10 pb-10 px-4 sm:px-8 text-ivory"
    >
      {/* Royal Velvet & Jaali Shimmer Backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-jaali-pattern opacity-35" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 68% 42%, rgba(200,148,62,0.22) 0%, rgba(79,14,28,0.12) 48%, rgba(30,4,10,0.8) 100%)",
        }}
      />

      {/* Subtle Rising Golden Diya Embers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {[
          { left: "12%", bottom: "15%", delay: "0s" },
          { left: "26%", bottom: "8%", delay: "1.6s" },
          { left: "48%", bottom: "12%", delay: "3.1s" },
          { left: "72%", bottom: "18%", delay: "0.9s" },
          { left: "88%", bottom: "10%", delay: "2.4s" },
        ].map((ember, idx) => (
          <span
            key={idx}
            style={{ left: ember.left, bottom: ember.bottom, animationDelay: ember.delay }}
            className="animate-ember absolute h-1.5 w-1.5 rounded-full bg-gold-light blur-[0.5px]"
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="rounded-[2.25rem] border border-gold/45 bg-maroon-deep/55 p-6 sm:p-10 lg:p-12 backdrop-blur-md shadow-[0_32px_90px_rgba(0,0,0,0.45)]">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Left / Center Royal Invitation Typography */}
            <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/55 bg-ivory/10 px-4 py-1.5 text-xs tracking-[0.22em] uppercase text-gold-light backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-light animate-pulse" />
                Padharo Sa • Welcoming{" "}
                <span className="font-semibold text-ivory">{guestName}</span>
              </div>

              <p className="mt-6 text-xs sm:text-sm uppercase tracking-[0.3em] text-gold-light font-semibold">
                || श्री गणेशाय नमः || • With Blessings of Elders
              </p>

              <div className="mt-5 w-full max-w-xl">
                <h1 className="font-display text-5xl sm:text-7xl lg:text-[5rem] font-semibold leading-[1.03] tracking-tight text-ivory">
                  <span className="block">{WEDDING_DETAILS.bride}</span>
                  <span className="mt-1.5 block font-sans text-xs sm:text-sm font-medium tracking-wide text-gold-light/95">
                    {WEDDING_DETAILS.brideParents}
                  </span>

                  <span className="my-2 block font-script text-4xl sm:text-5xl text-gold-foil font-normal">
                    &amp;
                  </span>

                  <span className="block">{WEDDING_DETAILS.groom}</span>
                  <span className="mt-1.5 block font-sans text-xs sm:text-sm font-medium tracking-wide text-gold-light/95">
                    {WEDDING_DETAILS.groomParents}
                  </span>
                </h1>
              </div>

              <div className="lg:self-start">
                <LotusSeparator light />
              </div>

              <p className="mt-2 max-w-xl text-base sm:text-lg font-display italic leading-relaxed text-ivory/90">
                &ldquo;{WEDDING_DETAILS.welcomeVerse}&rdquo;
              </p>

              {/* Date & Venue Royal Pills */}
              <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <div className="inline-flex items-center gap-2.5 rounded-2xl border border-gold/50 bg-ivory/10 px-4 py-3 backdrop-blur-sm">
                  <CalendarHeart className="h-4 w-4 text-gold-light" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-gold-light/85">
                      Save The Dates
                    </p>
                    <p className="text-sm font-semibold text-ivory">
                      {WEDDING_DETAILS.dateHeadline}
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2.5 rounded-2xl border border-gold/50 bg-ivory/10 px-4 py-3 backdrop-blur-sm">
                  <MapPin className="h-4 w-4 text-gold-light" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-gold-light/85">
                      Royal Destination
                    </p>
                    <p className="text-sm font-semibold text-ivory">
                      {WEDDING_DETAILS.venueName}, {WEDDING_DETAILS.city}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                <a
                  href="#events"
                  className="shimmer-btn inline-flex items-center gap-2 rounded-full bg-gold-foil px-7 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-maroon-deep shadow-[0_12px_30px_rgba(200,148,62,0.35)] transition hover:scale-[1.03]"
                >
                  Explore Celebrations
                </a>
                <a
                  href="#rsvp"
                  className="inline-flex items-center gap-2 rounded-full border border-gold-light/70 bg-ivory/10 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-gold-light backdrop-blur-sm transition hover:bg-ivory/20"
                >
                  RSVP With Love
                </a>
              </div>
            </div>

            {/* Right: Mughal Floral Archway Portrait with Ken Burns Motion */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 rounded-t-[240px] rounded-b-[36px] bg-gradient-to-b from-gold/30 via-transparent to-maroon-deep/50 blur-xl" />

                <div className="relative overflow-hidden rounded-t-[220px] rounded-b-3xl border-2 border-gold/80 bg-ivory/95 p-3 shadow-[0_28px_80px_rgba(0,0,0,0.55)]">
                  <div className="relative overflow-hidden rounded-t-[208px] rounded-b-2xl aspect-[3/4]">
                    <Image
                      src="/images/hero-palace.jpg"
                      alt="Candlelit Rajasthani sandstone palace archway decorated with blush roses and mogra garlands"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 448px"
                      className="object-cover animate-ken-burns"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/75 via-transparent to-transparent" />
                    <div className="absolute bottom-5 inset-x-5 text-center text-ivory">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gold-light">
                        Shubh Vivah
                      </p>
                      <p className="mt-1 font-display text-xl italic">
                        {WEDDING_DETAILS.hashtag}
                      </p>
                    </div>
                  </div>

                  {/* Floral Corner Accents */}
                  <FloralCorner
                    position="top-left"
                    className="absolute -top-3 -left-3 h-24 w-24 sm:h-28 sm:w-28"
                  />
                  <FloralCorner
                    position="top-right"
                    className="absolute -top-3 -right-3 h-24 w-24 sm:h-28 sm:w-28"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
