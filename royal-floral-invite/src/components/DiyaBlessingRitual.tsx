"use client";

import React, { useEffect, useState } from "react";
import { Flame, Sparkles } from "lucide-react";
import { LotusSeparator } from "./FloralOrnaments";
import ScrollReveal from "./ScrollReveal";

const BLESSING_CHIPS = [
  "Sada Suhagan Raho",
  "Boundless Joy & Light",
  "Peace & Harmony",
  "Forever Blessed",
];

function BrassDiya({ lit }: { lit: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Golden Halo Glow */}
      {lit && (
        <div className="absolute -top-6 h-12 w-12 rounded-full bg-gold-light/40 blur-md animate-pulse" />
      )}
      <svg width="56" height="52" viewBox="0 0 56 52" fill="none">
        {/* Flame */}
        {lit && (
          <g className="animate-flame-flicker origin-bottom">
            <path
              d="M28 4C33 13 35 20 28 27C21 20 23 13 28 4Z"
              fill="#F6DF9F"
            />
            <path
              d="M28 10C31 16 32 21 28 25C24 21 25 16 28 10Z"
              fill="#EA9A3E"
            />
          </g>
        )}
        {/* Brass Diya Bowl */}
        <path
          d="M8 31C14 31 20 29 28 29C36 29 42 31 48 31C46 41 38 46 28 46C18 46 10 41 8 31Z"
          fill="#C8943E"
          stroke="#F1D48E"
          strokeWidth="1.2"
        />
        <ellipse cx="28" cy="31" rx="16" ry="3.2" fill="#8E611B" />
        <rect x="20" y="46" width="16" height="3" rx="1.5" fill="#9A6B22" />
      </svg>
    </div>
  );
}

export default function DiyaBlessingRitual() {
  const [diyasLit, setDiyasLit] = useState(108);
  const [userLitCount, setUserLitCount] = useState(0);
  const [selectedBlessing, setSelectedBlessing] = useState(BLESSING_CHIPS[0]);
  const [justLit, setJustLit] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/rsvp")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && typeof data?.diyasLit === "number") {
          setDiyasLit(data.diyasLit);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const handleLightDiya = async () => {
    setUserLitCount((n) => Math.min(7, n + 1));
    setDiyasLit((d) => d + 1);
    setJustLit(true);
    window.setTimeout(() => setJustLit(false), 2000);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "light_diya" }),
      });
      if (res.ok) {
        const data = await res.json();
        if (typeof data?.diyasLit === "number") {
          setDiyasLit(data.diyasLit);
        }
      }
    } catch {
      // Keep optimistic count
    }
  };

  return (
    <section className="relative overflow-hidden bg-royal-velvet py-20 px-4 sm:px-8 text-ivory">
      <div className="pointer-events-none absolute inset-0 bg-jaali-pattern opacity-25" />

      <ScrollReveal className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="text-xs uppercase tracking-[0.34em] text-gold-light font-semibold">
          Sacred Courtyard Ritual
        </p>
        <h2 className="mt-2 font-display text-3xl sm:text-5xl font-semibold text-ivory">
          Light a Brass Diya of Blessings
        </h2>

        <LotusSeparator light />

        <p className="mx-auto max-w-xl text-sm text-ivory/80 leading-relaxed">
          Before the pheras begin beside Lake Pichola, ignite a virtual brass
          lamp in the palace reflection pool to bless Ananya &amp; Vivaan&apos;s
          new home.
        </p>

        {/* Row of 7 Interactive Brass Diyas */}
        <div className="mt-10 rounded-3xl border border-gold/45 bg-maroon-deep/70 px-5 py-8 backdrop-blur-md shadow-[0_22px_60px_rgba(0,0,0,0.35)]">
          <div className="flex flex-wrap items-end justify-center gap-4 sm:gap-7">
            {Array.from({ length: 7 }).map((_, i) => (
              <BrassDiya key={i} lit={i < 3 + userLitCount} />
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {BLESSING_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setSelectedBlessing(chip)}
                className={`rounded-full px-3.5 py-1.5 text-xs transition ${
                  selectedBlessing === chip
                    ? "bg-gold-foil text-maroon-deep font-semibold"
                    : "border border-gold/40 bg-ivory/8 text-gold-light hover:bg-ivory/15"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>

          <div className="mt-7 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handleLightDiya}
              className="shimmer-btn inline-flex items-center gap-2.5 rounded-full bg-gold-foil px-8 py-3.5 text-xs font-bold uppercase tracking-[0.22em] text-maroon-deep shadow-[0_12px_30px_rgba(200,148,62,0.35)] transition hover:scale-105 active:scale-95"
            >
              <Flame className="h-4 w-4" />
              Light a Diya · &ldquo;{selectedBlessing}&rdquo;
            </button>

            <p className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-gold-light/90">
              <Sparkles className="h-3.5 w-3.5 text-gold-light" />
              <span>
                <strong className="text-ivory font-semibold">{diyasLit}</strong>{" "}
                Auspicious Diyas Lit{justLit ? " — Lamp Illuminated!" : ""}
              </span>
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
