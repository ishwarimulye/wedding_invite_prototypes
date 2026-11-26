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
      {/* Blooming Outer Corner Garlands */}
      <BloomingGarlandCorner
        position="top-left"
        className="absolute -top-4 -left-4 h-44 w-44 sm:h-64 sm:w-64"
      />
      <BloomingGarlandCorner
        position="top-right"
        className="absolute -top-4 -right-4 h-44 w-44 sm:h-64 sm:w-64"
      />
      <BloomingGarlandCorner
        position="bottom-left"
        className="absolute -bottom-4 -left-4 h-40 w-40 sm:h-56 sm:w-56 opacity-85"
      />
      <BloomingGarlandCorner
        position="bottom-right"
        className="absolute -bottom-4 -right-4 h-40 w-40 sm:h-56 sm:w-56 opacity-85"
      />

      {/* Central Scalloped Blossom Card */}
      <div className="relative z-10 w-full max-w-lg rounded-[2.5rem] border-2 border-coral-rose/45 bg-petal-milk/92 px-6 py-10 sm:px-12 sm:py-12 text-center shadow-[0_28px_80px_rgba(124,31,66,0.16)] backdrop-blur-md">
        <div className="pointer-events-none absolute inset-3 rounded-[2rem] border border-honey-gold/40" />

        <div className="relative z-10 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blush-silk px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-berry">
            <Flower2 className="h-3.5 w-3.5 text-coral-rose" />
            Shubh Vivah
          </span>

          <p className="mt-5 font-script text-3xl sm:text-4xl text-sage">
            Dear {guestName},
          </p>

          <p className="mt-1 text-xs uppercase tracking-[0.26em] text-muted">
            Come celebrate the wedding of
          </p>

          <h1 className="mt-4 font-display text-5xl sm:text-6xl font-semibold text-berry leading-tight">
            {INVITE_INFO.bride}{" "}
            <span className="font-script text-5xl sm:text-6xl text-coral-rose font-normal">
              &amp;
            </span>{" "}
            {INVITE_INFO.groom}
          </h1>

          <FloralDivider />

          <p className="max-w-sm text-sm leading-relaxed text-muted">
            {INVITE_INFO.dates} ·{" "}
            <span className="font-medium text-berry">{INVITE_INFO.city}</span>
          </p>

          <button
            type="button"
            onClick={handleOpen}
            className="animate-pulse-ring mt-8 inline-flex items-center gap-2.5 rounded-full bg-berry-garden px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-petal-milk transition hover:scale-105"
          >
            <Sparkles className="h-4 w-4 text-marigold" />
            Open Wedding Invite
          </button>
        </div>
      </div>
    </div>
  );
}
