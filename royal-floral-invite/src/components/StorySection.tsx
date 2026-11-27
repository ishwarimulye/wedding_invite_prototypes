"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HeartHandshake } from "lucide-react";
import { FloralCorner, LotusSeparator } from "./FloralOrnaments";
import ScrollReveal from "./ScrollReveal";
import { STORY_MILESTONES } from "@/data/weddingData";

export default function StorySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = STORY_MILESTONES[activeIndex];

  return (
    <section
      id="story"
      className="relative overflow-hidden bg-ivory py-14 px-4 sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-jaali-pattern opacity-30" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <ScrollReveal className="text-center max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-[0.34em] text-gold-dark font-semibold">
            Our Journey
          </p>
          <h2 className="mt-1.5 font-display text-3xl sm:text-4xl font-semibold text-maroon">
            Two Hearts, One Forever
          </h2>
          <LotusSeparator />
        </ScrollReveal>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-12 rounded-[2rem] border border-gold/55 bg-cream/65 p-5 sm:p-8 shadow-[0_18px_50px_rgba(79,14,28,0.08)]">
          {/* Compact Couple Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[290px] overflow-hidden rounded-t-[150px] rounded-b-2xl border-2 border-gold/70 bg-ivory p-2 shadow-md">
              <div className="relative overflow-hidden rounded-t-[140px] rounded-b-xl aspect-[3/4]">
                <Image
                  src="/images/couple-portrait.jpg"
                  alt="Ananya and Vivaan beneath a blush rose pergola"
                  fill
                  sizes="290px"
                  className="object-cover"
                />
              </div>
              <FloralCorner
                position="bottom-left"
                className="absolute -bottom-2 -left-2 h-16 w-16"
              />
              <FloralCorner
                position="bottom-right"
                className="absolute -bottom-2 -right-2 h-16 w-16"
              />
            </div>
          </div>

          {/* Concise Story & Interactive Chapter Tabs */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {STORY_MILESTONES.map((step, idx) => (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                    idx === activeIndex
                      ? "bg-royal-velvet text-gold-light shadow-sm"
                      : "border border-gold/50 bg-ivory text-maroon hover:bg-parchment/70"
                  }`}
                >
                  <HeartHandshake className="h-3 w-3" />
                  {step.year}
                </button>
              ))}
            </div>

            <div key={current.title} className="animate-fade-up">
              <p className="text-xs uppercase tracking-[0.22em] text-gold-dark font-semibold">
                {current.location}
              </p>
              <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-semibold text-maroon">
                {current.title}
              </h3>
              <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-muted">
                {current.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
