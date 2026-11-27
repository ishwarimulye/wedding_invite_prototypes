"use client";

import React, { useState } from "react";
import { INVITE_INFO } from "@/data/inviteData";
import {
  HaveliJaliCorner,
  MarigoldToranBorder,
  RoyalMandapCrest,
} from "./WeddingMotifs";

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
    window.setTimeout(onOpen, 650);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-garden-gradient px-4 py-6 transition-all duration-700 ${
        opening
          ? "opacity-0 -translate-y-4 pointer-events-none"
          : "opacity-100 translate-y-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding Invitation Cover"
    >
      <div className="relative w-full max-w-lg rounded-t-[170px] rounded-b-[34px] border border-honey-gold/75 bg-petal-milk shadow-[0_28px_80px_rgba(94,17,41,0.18)] overflow-hidden">
        {/* Flowing Arched Inner Rule */}
        <div className="pointer-events-none absolute inset-3 rounded-t-[158px] rounded-b-[24px] border border-honey-gold/40 z-10" />

        {/* Soft Bottom Jali Corners */}
        <HaveliJaliCorner
          position="bottom-left"
          className="absolute bottom-3 left-3 w-14 h-14 z-10"
        />
        <HaveliJaliCorner
          position="bottom-right"
          className="absolute bottom-3 right-3 w-14 h-14 z-10"
        />

        {/* Curved Crimson Arch Canopy at Top */}
        <div className="bg-berry-garden px-10 pt-10 pb-5 text-center border-b border-honey-gold/60">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blush-silk">
            {INVITE_INFO.invocation}
          </p>
          <div className="mt-2">
            <MarigoldToranBorder light />
          </div>
        </div>

        {/* Invitation Cover Body */}
        <div className="relative z-10 flex flex-col items-center px-7 pt-6 pb-10 sm:px-12 sm:pb-12 text-center">
          <RoyalMandapCrest monogram="M & K" />

          <p className="mt-4 font-script text-3xl text-coral-rose">
            Dear {guestName},
          </p>

          <p className="mt-2 text-[11px] uppercase tracking-[0.26em] text-muted">
            With the blessings of both families
          </p>

          <div className="mt-3 space-y-1.5">
            <div>
              <h1 className="font-display text-5xl sm:text-6xl font-medium text-berry leading-tight">
                {INVITE_INFO.brideFirst}
              </h1>
              <p className="mt-0.5 text-xs sm:text-sm font-medium text-sage">
                {INVITE_INFO.brideParents}
              </p>
            </div>

            <span className="block font-script text-4xl sm:text-5xl text-gold-shimmer font-normal">
              &amp;
            </span>

            <div>
              <p className="font-display text-5xl sm:text-6xl font-medium text-berry leading-tight">
                {INVITE_INFO.groomFirst}
              </p>
              <p className="mt-0.5 text-xs sm:text-sm font-medium text-sage">
                {INVITE_INFO.groomParents}
              </p>
            </div>
          </div>

          <p className="mt-3 text-xs uppercase tracking-[0.24em] text-sage font-medium">
            {INVITE_INFO.dates} · {INVITE_INFO.city}
          </p>

          {/* Wax Seal Open Trigger */}
          <button
            type="button"
            onClick={handleOpen}
            className="group mt-7 flex flex-col items-center gap-3 focus:outline-none"
          >
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-honey-gold/90 bg-berry-garden text-petal-milk shadow-[0_12px_30px_rgba(94,17,41,0.28)] transition duration-300 group-hover:scale-105 group-hover:shadow-[0_16px_38px_rgba(200,138,46,0.36)]">
              <span className="pointer-events-none absolute inset-1.5 rounded-full border border-dashed border-honey-gold/75" />
              <span className="font-display text-sm italic tracking-widest text-blush-silk">
                Shubh
                <span className="block -mt-1 text-[10px] not-italic uppercase tracking-[0.22em] text-honey-gold">
                  Vivah
                </span>
              </span>
            </span>
            <span className="rounded-full border border-honey-gold/60 bg-blush-silk/70 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-berry transition group-hover:bg-blush-silk">
              Tap Seal to Open
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
