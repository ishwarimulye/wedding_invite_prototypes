"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { FloralCorner, LotusSeparator, RoyalMonogramCrest } from "./FloralOrnaments";
import { WEDDING_DETAILS } from "@/data/weddingData";

interface InviteEnvelopeProps {
  guestName: string;
  isOpen: boolean;
  onOpen: () => void;
}

export default function InviteEnvelope({
  guestName,
  isOpen,
  onOpen,
}: InviteEnvelopeProps) {
  const [opening, setOpening] = useState(false);

  if (isOpen) return null;

  const handleUnseal = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => {
      onOpen();
    }, 950);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        opening ? "pointer-events-none" : ""
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Royal Wedding Invitation Cover"
    >
      {/* Left & Right Velvet Palace Doors */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 bg-royal-velvet border-r border-gold/45 transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          opening ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="absolute inset-0 bg-jaali-pattern opacity-40" />
      </div>
      <div
        className={`absolute inset-y-0 right-0 w-1/2 bg-royal-velvet border-l border-gold/45 transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          opening ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="absolute inset-0 bg-jaali-pattern opacity-40" />
      </div>

      {/* Central Royal Parchment Invitation Card */}
      <div
        className={`relative z-10 mx-4 w-full max-w-lg transition-all duration-700 ${
          opening ? "scale-110 opacity-0" : "scale-100 opacity-100 animate-fade-up"
        }`}
      >
        <div className="relative overflow-hidden rounded-t-[180px] rounded-b-3xl border-2 border-gold/75 bg-ivory/96 px-6 py-10 sm:px-12 sm:py-12 text-center shadow-[0_32px_95px_rgba(18,3,6,0.78)]">
          {/* Inner hairline gold border */}
          <div className="pointer-events-none absolute inset-3 rounded-t-[168px] rounded-b-2xl border border-gold/50" />

          {/* Floral Corners */}
          <FloralCorner
            position="top-left"
            className="absolute -top-2 -left-2 h-28 w-28 sm:h-36 sm:w-36 opacity-90"
          />
          <FloralCorner
            position="top-right"
            className="absolute -top-2 -right-2 h-28 w-28 sm:h-36 sm:w-36 opacity-90"
          />
          <FloralCorner
            position="bottom-left"
            className="absolute -bottom-3 -left-3 h-24 w-24 opacity-60"
          />
          <FloralCorner
            position="bottom-right"
            className="absolute -bottom-3 -right-3 h-24 w-24 opacity-60"
          />

          <div className="relative z-10 flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-[0.34em] text-maroon font-semibold">
              || श्री गणेशाय नमः ||
            </span>

            <div className="mt-3">
              <RoyalMonogramCrest monogram={WEDDING_DETAILS.coupleMonogram} size="md" />
            </div>

            <p className="mt-3 text-xs uppercase tracking-[0.28em] text-gold-dark font-semibold">
              Padharo Sa • Cordial Invitation
            </p>

            {/* Personalized Guest Greeting */}
            <div className="mt-3 rounded-full border border-gold/45 bg-cream/90 px-5 py-1.5">
              <p className="text-sm sm:text-base font-display italic text-maroon">
                Dear <span className="font-semibold not-italic">{guestName}</span>,
              </p>
            </div>

            <div className="mt-4 space-y-1.5">
              <div>
                <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-wide text-maroon">
                  {WEDDING_DETAILS.bride}
                </h1>
                <p className="mt-0.5 text-xs sm:text-sm font-medium text-maroon/80">
                  {WEDDING_DETAILS.brideParents}
                </p>
              </div>

              <span className="block font-script text-3xl sm:text-4xl text-gold-dark font-normal">
                &amp;
              </span>

              <div>
                <p className="font-display text-4xl sm:text-5xl font-semibold tracking-wide text-maroon">
                  {WEDDING_DETAILS.groom}
                </p>
                <p className="mt-0.5 text-xs sm:text-sm font-medium text-maroon/80">
                  {WEDDING_DETAILS.groomParents}
                </p>
              </div>
            </div>

            <LotusSeparator />

            <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-muted">
              Invite you to grace their royal wedding celebrations amidst floral
              courtyards &amp; candlelit palaces in{" "}
              <span className="font-semibold text-maroon">{WEDDING_DETAILS.city}</span>.
            </p>

            {/* Tactile Wax Seal CTA */}
            <button
              type="button"
              onClick={handleUnseal}
              className="mt-7 group relative flex flex-col items-center focus:outline-none"
            >
              <span className="shimmer-btn animate-seal-pulse flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold-light bg-royal-velvet text-gold-light transition-transform duration-300 group-hover:scale-108">
                <span className="flex h-16 w-16 flex-col items-center justify-center rounded-full border border-gold/60">
                  <Sparkles className="h-4 w-4 text-gold-light mb-0.5" />
                  <span className="font-display text-sm font-semibold tracking-widest">
                    OPEN
                  </span>
                </span>
              </span>
              <span className="mt-3 text-[11px] uppercase tracking-[0.26em] text-maroon font-semibold">
                Tap Royal Seal to Unveil
              </span>
            </button>

            <p className="mt-6 text-[11px] uppercase tracking-[0.26em] text-gold-dark font-medium">
              {WEDDING_DETAILS.dateHeadline}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
