"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { BloomingGarlandCorner, FloralDivider } from "./GardenFlorals";
import { INVITE_INFO } from "@/data/inviteData";

export default function FolioCover({
  guestName,
  isOpen,
  onOpen,
}: {
  guestName: string;
  isOpen: boolean;
  onOpen: () => void;
}) {
  const [opening, setOpening] = useState(false);

  if (isOpen) return null;

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-garden-gradient px-4 transition-all duration-700 ${
        opening ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Floral Wedding Invitation Cover"
    >
      <BloomingGarlandCorner
        position="top-left"
        className="absolute -top-4 -left-4 h-44 w-44 sm:h-64 sm:w-64 opacity-90"
      />
      <BloomingGarlandCorner
        position="top-right"
        className="absolute -top-4 -right-4 h-44 w-44 sm:h-64 sm:w-64 opacity-90"
      />
      <BloomingGarlandCorner
        position="bottom-left"
        className="absolute -bottom-4 -left-4 h-40 w-40 sm:h-56 sm:w-56 opacity-80"
      />
      <BloomingGarlandCorner
        position="bottom-right"
        className="absolute -bottom-4 -right-4 h-40 w-40 sm:h-56 sm:w-56 opacity-80"
      />

      <div className="relative z-10 w-full max-w-lg rounded-t-[200px] rounded-b-[2rem] border-2 border-honey-gold/65 bg-petal-milk/95 px-7 py-11 sm:px-12 sm:py-13 text-center shadow-[0_28px_85px_rgba(110,22,48,0.18)] backdrop-blur-md">
        <div className="pointer-events-none absolute inset-3 rounded-t-[188px] rounded-b-[1.5rem] border border-coral-rose/30" />

        <div className="relative z-10 flex flex-col items-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-berry">
            {INVITE_INFO.invocation}
          </span>

          <p className="mt-2 text-[11px] text-muted max-w-xs leading-relaxed">
            {INVITE_INFO.eldersBlessing}
          </p>

          <p className="mt-4 font-script text-3xl sm:text-4xl text-coral-rose">
            Dear {guestName},
          </p>

          <h1 className="mt-2 font-display text-5xl sm:text-6xl font-semibold text-berry leading-tight">
            {INVITE_INFO.bride}{" "}
            <span className="font-script text-5xl sm:text-6xl text-gold-shimmer font-normal">
              &amp;
            </span>{" "}
            {INVITE_INFO.groom}
          </h1>

          <FloralDivider />

          <p className="max-w-xs text-xs sm:text-sm leading-relaxed text-muted">
            Cordially invite you to Mehendi, Sangeet, Haldi &amp; Sunset Pheras
            in <span className="font-semibold text-berry">{INVITE_INFO.city}</span>.
          </p>

          {/* Wax-Seal Style Open CTA */}
          <button
            type="button"
            onClick={handleOpen}
            className="animate-pulse-ring mt-7 inline-flex items-center gap-2.5 rounded-full border border-marigold/60 bg-berry-garden px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-petal-milk transition hover:scale-105"
          >
            <Sparkles className="h-4 w-4 text-marigold" />
            Unseal Invitation
          </button>

          <p className="mt-5 text-[11px] uppercase tracking-[0.24em] text-honey-gold font-semibold">
            {INVITE_INFO.dates} · {INVITE_INFO.venue}
          </p>
        </div>
      </div>
    </div>
  );
}
