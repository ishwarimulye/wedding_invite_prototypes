"use client";

import React, { useState } from "react";
import { Flame, Sparkles } from "lucide-react";
import { LotusSeparator } from "./FloralOrnaments";
import ScrollReveal from "./ScrollReveal";

interface VowItem {
  num: number;
  sanskrit: string;
  title: string;
  promise: string;
}

const SAPTAPADI_VOWS: VowItem[] = [
  {
    num: 1,
    sanskrit: "प्रथमः पदि • Poshan",
    title: "Nourishment & Care",
    promise:
      "We promise to nourish each other in body, mind, and spirit, sharing every meal and quiet morning chai with gratitude.",
  },
  {
    num: 2,
    sanskrit: "द्वितीयः पदि • Shakti",
    title: "Courage & Strength",
    promise:
      "Through life's changing seasons, we will stand as one another's steadying anchor and bravest cheerleader.",
  },
  {
    num: 3,
    sanskrit: "तृतीयः पदि • Samriddhi",
    title: "Harmony & Abundance",
    promise:
      "We will build a warm, generous home filled with music, hospitality, and shared purpose.",
  },
  {
    num: 4,
    sanskrit: "चतुर्थः पदि • Kutumb",
    title: "Family & Joy",
    promise:
      "We honor both families as one, cherishing elders' wisdom and celebrating every festival together.",
  },
  {
    num: 5,
    sanskrit: "पञ्चमः पदि • Santati",
    title: "Wisdom & Legacy",
    promise:
      "We vow to pass down kindness, curiosity, and timeless values to every generation that follows.",
  },
  {
    num: 6,
    sanskrit: "षष्ठः पदि • Arogya",
    title: "Lifetime Companionship",
    promise:
      "We pledge laughter in ordinary days, patience in storms, and gentle care through the years.",
  },
  {
    num: 7,
    sanskrit: "सप्तमः पदि • Sakha",
    title: "Eternal Friendship",
    promise:
      "With these seven steps around the sacred fire, we remain soulmates and best friends for seven lifetimes.",
  },
];

export default function SaptapadiVowsWheel() {
  const [activeVow, setActiveVow] = useState(0);
  const current = SAPTAPADI_VOWS[activeVow];
  const wheelRotation = -(activeVow * (360 / 7));

  return (
    <section
      id="saptapadi"
      className="relative overflow-hidden bg-ivory py-14 px-4 sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-jaali-pattern opacity-35" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <ScrollReveal className="text-center max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-[0.34em] text-gold-dark font-semibold">
            The Seven Sacred Steps
          </p>
          <h2 className="mt-1.5 font-display text-3xl sm:text-4xl font-semibold text-maroon">
            The Saptapadi Wheel
          </h2>
          <LotusSeparator />
        </ScrollReveal>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-12">
          {/* Interactive Rotating Mandala Wheel */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative flex h-[320px] w-[320px] sm:h-[380px] sm:w-[380px] items-center justify-center">
              {/* Outer Rotating Gold Ring */}
              <svg
                viewBox="0 0 360 360"
                style={{ transform: `rotate(${wheelRotation}deg)` }}
                className="absolute inset-0 h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                aria-hidden="true"
              >
                <circle
                  cx="180"
                  cy="180"
                  r="164"
                  fill="none"
                  stroke="#C8943E"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
                <circle
                  cx="180"
                  cy="180"
                  r="134"
                  fill="none"
                  stroke="#4F0E1C"
                  strokeOpacity="0.2"
                  strokeWidth="1.2"
                />
                {SAPTAPADI_VOWS.map((_, i) => {
                  const angle = (i * 360) / 7 - 90;
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 180 + Math.cos(rad) * 62;
                  const y1 = 180 + Math.sin(rad) * 62;
                  const x2 = 180 + Math.cos(rad) * 145;
                  const y2 = 180 + Math.sin(rad) * 145;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#C8943E"
                      strokeOpacity="0.35"
                      strokeWidth="1"
                    />
                  );
                })}
              </svg>

              {/* Center Sacred Agni Medallion */}
              <div className="relative z-10 flex h-28 w-28 sm:h-32 sm:w-32 flex-col items-center justify-center rounded-full border-2 border-gold bg-royal-velvet text-center text-ivory shadow-[0_14px_40px_rgba(79,14,28,0.35)]">
                <Flame className="h-6 w-6 text-gold-light animate-pulse" />
                <span className="mt-1 font-display text-lg font-semibold text-gold-foil">
                  Phera 0{current.num}
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-ivory/75">
                  Agni Sakshi
                </span>
              </div>

              {/* 7 Clickable Phera Nodes */}
              {SAPTAPADI_VOWS.map((vow, idx) => {
                const angle = (idx * 360) / 7 - 90;
                const rad = (angle * Math.PI) / 180;
                const radiusPct = 38;
                const left = 50 + Math.cos(rad) * radiusPct;
                const top = 50 + Math.sin(rad) * radiusPct;
                const isActive = idx === activeVow;

                return (
                  <button
                    key={vow.num}
                    type="button"
                    onClick={() => setActiveVow(idx)}
                    style={{ left: `${left}%`, top: `${top}%` }}
                    aria-label={`Select Phera ${vow.num}: ${vow.title}`}
                    className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 sm:h-14 sm:w-14 flex-col items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "border-gold-light bg-maroon text-gold-light scale-115 shadow-[0_8px_25px_rgba(79,14,28,0.45)]"
                        : "border-gold/65 bg-cream text-maroon hover:border-maroon hover:scale-105"
                    }`}
                  >
                    <span className="font-display text-base sm:text-lg font-bold leading-none">
                      {vow.num}
                    </span>
                    <span className="text-[8px] uppercase tracking-wider opacity-80">
                      Vow
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Vow Display Card */}
          <div className="lg:col-span-6">
            <div
              key={current.num}
              className="animate-fade-up relative overflow-hidden rounded-[2rem] border-2 border-gold/65 bg-cream/85 p-7 sm:p-10 shadow-[0_20px_60px_rgba(79,14,28,0.12)]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-royal-velvet px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
                  <Sparkles className="h-3.5 w-3.5" />
                  {current.sanskrit}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                  {current.num} of 7
                </span>
              </div>

              <h3 className="mt-5 font-display text-3xl sm:text-4xl font-semibold text-maroon">
                {current.title}
              </h3>

              <p className="mt-3 font-display italic text-lg sm:text-xl leading-relaxed text-ink/90">
                &ldquo;{current.promise}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
