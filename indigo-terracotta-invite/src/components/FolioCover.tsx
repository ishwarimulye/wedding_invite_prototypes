"use client";

import React, { useState } from "react";
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
    window.setTimeout(onOpen, 650);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-garden-gradient px-4 transition-all duration-700 ${
        opening ? "opacity-0 -translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding Invitation Cover"
    >
      <div className="relative w-full max-w-lg border border-honey-gold/65 bg-petal-milk px-7 py-12 sm:px-12 sm:py-14 text-center shadow-[0_24px_70px_rgba(94,17,41,0.14)]">
        {/* Classic Double Stationery Inner Rule */}
        <div className="pointer-events-none absolute inset-3 border border-honey-gold/35" />

        <div className="relative z-10 flex flex-col items-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-berry">
            {INVITE_INFO.invocation}
          </p>

          <div className="my-5 h-[1px] w-16 bg-honey-gold/55" />

          <p className="font-script text-3xl text-coral-rose">
            Dear {guestName},
          </p>

          <p className="mt-3 text-xs uppercase tracking-[0.24em] text-muted">
            You are invited to the wedding of
          </p>

          <h1 className="mt-4 font-display text-5xl sm:text-6xl font-medium text-berry leading-tight">
            {INVITE_INFO.brideFirst}{" "}
            <span className="font-script text-5xl sm:text-6xl text-gold-shimmer font-normal">
              &amp;
            </span>{" "}
            {INVITE_INFO.groomFirst}
          </h1>

          <p className="mt-4 text-xs uppercase tracking-[0.24em] text-sage font-medium">
            {INVITE_INFO.dates} · {INVITE_INFO.city}
          </p>

          <button
            type="button"
            onClick={handleOpen}
            className="mt-9 border border-berry bg-berry px-9 py-3.5 text-xs font-medium uppercase tracking-[0.24em] text-petal-milk transition hover:bg-berry-deep"
          >
            Open Invitation
          </button>
        </div>
      </div>
    </div>
  );
}
