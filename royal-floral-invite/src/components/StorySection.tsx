"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HeartHandshake, Sparkles } from "lucide-react";
import { FloralCorner, LotusSeparator } from "./FloralOrnaments";
import ScrollReveal from "./ScrollReveal";
import { STORY_MILESTONES } from "@/data/weddingData";

export default function StorySection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="story"
      className="relative overflow-hidden bg-ivory py-24 px-4 sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-jaali-pattern opacity-30" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.34em] text-gold-dark font-semibold">
            Our Sacred Journey
          </p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-maroon">
            Two Hearts, One Forever
          </h2>
          <LotusSeparator />
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            Every love story is written in quiet moments of grace. Tap any
            chapter to trace how destiny wove our paths together beneath
            Rajasthani skies.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-12">
          {/* Couple Arched Portrait */}
          <ScrollReveal className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="relative overflow-hidden rounded-t-[200px] rounded-b-3xl border-2 border-gold/75 bg-cream p-3 shadow-[0_26px_65px_rgba(79,14,28,0.2)]">
                <div className="relative overflow-hidden rounded-t-[188px] rounded-b-2xl aspect-[3/4]">
                  <Image
                    src="/images/couple-portrait.jpg"
                    alt="Ananya and Vivaan smiling beneath a blush rose floral pergola"
                    fill
                    sizes="(max-width: 1024px) 100vw, 448px"
                    className="object-cover animate-ken-burns"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/55 via-transparent to-transparent" />
                  <div className="absolute bottom-5 inset-x-5 text-center text-ivory">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/60 bg-maroon-deep/75 px-3.5 py-1 text-[10px] uppercase tracking-[0.22em] text-gold-light backdrop-blur-sm">
                      <Sparkles className="h-3 w-3" />
                      {STORY_MILESTONES[activeIndex].year}
                    </span>
                  </div>
                </div>
                <FloralCorner
                  position="bottom-left"
                  className="absolute -bottom-3 -left-3 h-24 w-24"
                />
                <FloralCorner
                  position="bottom-right"
                  className="absolute -bottom-3 -right-3 h-24 w-24"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Interactive Story Chapters */}
          <div className="lg:col-span-7 space-y-5">
            {STORY_MILESTONES.map((step, index) => {
              const isActive = activeIndex === index;
              return (
                <ScrollReveal key={step.title} delayMs={index * 110}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`w-full text-left relative rounded-3xl border p-6 sm:p-7 transition-all duration-300 ${
                      isActive
                        ? "border-gold bg-royal-velvet text-ivory shadow-[0_20px_50px_rgba(79,14,28,0.24)] -translate-y-0.5"
                        : "border-gold/45 bg-cream/70 text-ink hover:border-gold hover:bg-cream"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                          isActive
                            ? "bg-ivory/15 text-gold-light"
                            : "bg-ivory text-maroon"
                        }`}
                      >
                        <HeartHandshake
                          className={`h-3.5 w-3.5 ${
                            isActive ? "text-gold-light" : "text-gold-dark"
                          }`}
                        />
                        Chapter 0{index + 1} • {step.year}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          isActive ? "text-gold-light" : "text-gold-dark"
                        }`}
                      >
                        {step.location}
                      </span>
                    </div>

                    <h3
                      className={`mt-3.5 font-display text-2xl sm:text-3xl font-semibold ${
                        isActive ? "text-ivory" : "text-maroon"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        isActive ? "text-ivory/85" : "text-muted"
                      }`}
                    >
                      {step.note}
                    </p>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
