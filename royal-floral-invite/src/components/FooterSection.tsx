"use client";

import React, { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { LotusSeparator, RoyalMonogramCrest } from "./FloralOrnaments";
import { WEDDING_DETAILS } from "@/data/weddingData";

export default function FooterSection() {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareInvite = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 2400);
    } catch {
      // Ignore clipboard error
    }
  };

  return (
    <footer className="relative overflow-hidden bg-royal-velvet py-12 px-4 sm:px-8 text-ivory">
      <div className="pointer-events-none absolute inset-0 bg-jaali-pattern opacity-30" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <RoyalMonogramCrest monogram={WEDDING_DETAILS.coupleMonogram} size="md" />

        <p className="mt-5 font-script text-4xl sm:text-5xl text-gold-light">
          With Warmth &amp; Gratitude
        </p>
        <p className="mt-2 font-display text-2xl sm:text-3xl text-ivory">
          The Malhotra &amp; Singhania Families
        </p>

        <LotusSeparator light />

        <p className="mx-auto max-w-lg text-xs sm:text-sm text-ivory/80 leading-relaxed">
          &ldquo;आपका आना हमारे लिए सबसे बड़ा आशीर्वाद है&rdquo; — Your presence
          is the finest blessing we could ever ask for.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleShareInvite}
            className="shimmer-btn inline-flex items-center gap-2 rounded-full border border-gold/65 bg-ivory/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light backdrop-blur-sm transition hover:bg-ivory/20"
          >
            {copiedLink ? (
              <Check className="h-4 w-4 text-gold-light" />
            ) : (
              <Share2 className="h-4 w-4" />
            )}
            {copiedLink ? "Invitation Link Copied" : "Share This Invitation"}
          </button>
        </div>

        <p className="mt-10 text-xs uppercase tracking-[0.28em] text-gold-light/65">
          {WEDDING_DETAILS.bride} &amp; {WEDDING_DETAILS.groom} •{" "}
          {WEDDING_DETAILS.dateHeadline} • {WEDDING_DETAILS.city}
        </p>
      </div>
    </footer>
  );
}
