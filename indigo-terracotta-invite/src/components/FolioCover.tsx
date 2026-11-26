"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
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
  const [lifting, setLifting] = useState(false);

  if (isOpen) return null;

  const handleEnter = () => {
    if (lifting) return;
    setLifting(true);
    window.setTimeout(onOpen, 750);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between bg-limestone paper-grain px-6 py-8 sm:px-12 sm:py-10 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        lifting ? "-translate-y-full" : "translate-y-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding Invitation Folio Cover"
    >
      {/* Top Indigo Architectural Rule */}
      <div className="flex items-center justify-between border-b border-indigo/20 pb-4 text-[11px] uppercase tracking-[0.26em] text-indigo/80">
        <span>{INVITE_INFO.city}</span>
        <span>{INVITE_INFO.coordinates}</span>
      </div>

      {/* Center Monogram & Guest Greeting */}
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <div className="relative flex h-24 w-24 items-center justify-center border border-indigo/30 rotate-45">
          <div className="absolute inset-1.5 border border-terracotta/50" />
          <span className="-rotate-45 font-editorial text-2xl tracking-wider text-indigo">
            M<span className="mx-1 text-terracotta italic">/</span>K
          </span>
        </div>

        <p className="mt-10 text-xs uppercase tracking-[0.28em] text-terracotta font-medium">
          For {guestName}
        </p>

        <h1 className="mt-3 font-editorial text-5xl sm:text-6xl font-normal tracking-tight text-indigo">
          {INVITE_INFO.bride}{" "}
          <span className="italic text-terracotta">&amp;</span>{" "}
          {INVITE_INFO.groom}
        </h1>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          Three autumn evenings of courtyard music, marigolds, and sacred vows
          at {INVITE_INFO.venue}.
        </p>

        <button
          type="button"
          onClick={handleEnter}
          className="mt-9 group inline-flex items-center gap-3 border border-indigo bg-indigo px-7 py-3.5 text-xs font-medium uppercase tracking-[0.22em] text-limestone transition hover:bg-terracotta hover:border-terracotta"
        >
          <span>Unfold Invitation</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Bottom Rule */}
      <div className="flex items-center justify-between border-t border-indigo/20 pt-4 text-[11px] uppercase tracking-[0.26em] text-indigo/75">
        <span>{INVITE_INFO.dates}</span>
        <span>{INVITE_INFO.venue}</span>
      </div>
    </div>
  );
}
