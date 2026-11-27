"use client";

import React, { useState } from "react";
import { Flower2, Sparkles } from "lucide-react";
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

      <div className="relative z-10 w-full max-w-lg rounded-t-[200px] rounded-b-[2rem] border border-honey-gold/60 bg-petal-milk/94 px-7 py-12 sm:px-12 sm:py-14 text-center shadow-[0_28px_85px_rgba(11,51,48,0.16)] backdrop-blur-md">
        <div className="pointer-events-none absolute inset-3 rounded-t-[188px] rounded-b-[1.5rem] border border-coral-rose/25" />

        <div className="relative z-10 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-berry">
            <Flower2 className="h-3.5 w-3.5 text-coral-rose" />
            Shubh Vivah
          </span>

          <p className="mt-5 font-script text-3xl sm:text-4xl text-coral-rose">
            Dear {guestName},
          </p>

          <p className="mt-1 text-xs uppercase tracking-[0.26em] text-muted">
            Together with our families
          </p>

          <h1 className="mt-4 font-display text-5xl sm:text-6xl font-semibold text-berry leading-tight">
            {INVITE_INFO.bride}{" "}
            <span className="font-script text-5xl sm:text-6xl text-coral-rose font-normal">
              &amp;
            </span>{" "}
            {INVITE_INFO.groom}
          </h1>

          <FloralDivider />

          <p className="max-w-xs text-xs sm:text-sm leading-relaxed text-muted">
            Invite you to share in Mehendi, Sangeet, Haldi &amp; Sunset Pheras
            in <span className="font-medium text-berry">{INVITE_INFO.city}</span>.
          </p>

          <button
            type="button"
            onClick={handleOpen}
            className="animate-pulse-ring mt-8 inline-flex items-center gap-2.5 rounded-full bg-berry-garden px-8 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-petal-milk transition hover:scale-105"
          >
            <Sparkles className="h-4 w-4 text-marigold" />
            Open Invitation
          </button>

          <p className="mt-5 text-[11px] uppercase tracking-[0.24em] text-honey-gold font-medium">
            {INVITE_INFO.dates}
          </p>
        </div>
      </div>
    </div>
  );
}
