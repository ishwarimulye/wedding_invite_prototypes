"use client";

import React from "react";

export function BloomingGarlandCorner({
  position = "top-left",
  className = "",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}) {
  const flips: Record<string, string> = {
    "top-left": "",
    "top-right": "scale-x-[-1]",
    "bottom-left": "scale-y-[-1]",
    "bottom-right": "scale-x-[-1] scale-y-[-1]",
  };

  return (
    <svg
      viewBox="0 0 220 220"
      fill="none"
      className={`pointer-events-none select-none ${flips[position]} ${className}`}
      aria-hidden="true"
    >
      <path
        d="M10 198C18 122 52 62 128 28C158 14 185 12 208 14"
        stroke="#C88A2E"
        strokeWidth="1.8"
        strokeOpacity="0.72"
        strokeLinecap="round"
      />
      <path
        d="M28 168C38 112 70 68 140 44"
        stroke="#587A5F"
        strokeWidth="1.4"
        strokeDasharray="4 4"
        strokeOpacity="0.55"
      />

      <g className="animate-sway-bloom origin-top-left">
        <path
          d="M54 96C34 86 28 66 38 52C56 60 64 78 54 96Z"
          fill="#587A5F"
          fillOpacity="0.82"
        />
        <path
          d="M96 52C86 34 94 18 112 14C118 30 112 46 96 52Z"
          fill="#6E9275"
          fillOpacity="0.8"
        />
        <path
          d="M34 138C16 132 10 114 18 98C34 104 44 120 34 138Z"
          fill="#6E9275"
          fillOpacity="0.78"
        />
        <path
          d="M142 32C140 16 152 6 168 10C166 24 156 32 142 32Z"
          fill="#587A5F"
          fillOpacity="0.78"
        />

        {/* Rose Peony Bloom */}
        <g transform="translate(62 62)">
          <circle cx="0" cy="0" r="28" fill="#F4C0BA" fillOpacity="0.96" />
          <circle cx="-8" cy="-6" r="18" fill="#C95858" fillOpacity="0.88" />
          <circle cx="8" cy="-4" r="16" fill="#FBE0DC" fillOpacity="0.92" />
          <circle cx="0" cy="8" r="15" fill="#8B1E3F" fillOpacity="0.76" />
          <circle cx="-1" cy="-1" r="6" fill="#EA9E38" />
          <circle cx="3" cy="2" r="3" fill="#FBF5EB" />
        </g>

        {/* Marigold Blossom */}
        <g transform="translate(116 32)">
          <circle cx="0" cy="0" r="17" fill="#EA9E38" />
          <circle cx="0" cy="0" r="12" fill="#F6C46D" />
          <circle cx="0" cy="0" r="6" fill="#C67419" />
        </g>

        {/* Blush Rose */}
        <g transform="translate(30 112)">
          <circle cx="0" cy="0" r="16" fill="#F8CFCB" />
          <circle cx="-4" cy="-3" r="10" fill="#C95858" fillOpacity="0.82" />
          <circle cx="3" cy="3" r="6" fill="#8B1E3F" fillOpacity="0.65" />
        </g>

        {/* Mogra Jasmine Buds */}
        <g transform="translate(162 24)">
          <circle cx="0" cy="0" r="9" fill="#FBF5EB" stroke="#C88A2E" strokeWidth="1" />
          <circle cx="14" cy="4" r="7" fill="#FBF5EB" stroke="#C88A2E" strokeWidth="0.9" />
          <circle cx="-11" cy="10" r="6.5" fill="#FBF5EB" stroke="#C88A2E" strokeWidth="0.9" />
          <circle cx="0" cy="0" r="2.5" fill="#EA9E38" />
          <circle cx="14" cy="4" r="2" fill="#EA9E38" />
        </g>
      </g>
    </svg>
  );
}

/**
 * Traditional Indian Marigold, Mango-Leaf & Jasmine Bell Toran (Bandarwal)
 * hung across the top of the wedding invitation to welcome guests.
 */
export function WeddingToranGarland() {
  const swags = [0, 1, 2, 3, 4, 5];
  return (
    <div className="w-full overflow-hidden select-none pointer-events-none" aria-hidden="true">
      <svg
        viewBox="0 0 900 72"
        fill="none"
        className="w-full h-11 sm:h-14 object-cover"
        preserveAspectRatio="none"
      >
        {swags.map((i) => {
          const x0 = i * 150;
          const xm = x0 + 75;
          const x1 = x0 + 150;
          return (
            <g key={i}>
              {/* Draped Jasmine Strand */}
              <path
                d={`M${x0} 4 Q${xm} 42 ${x1} 4`}
                stroke="#C88A2E"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              {/* Mango Leaves */}
              <path
                d={`M${x0 + 28} 12 C${x0 + 22} 26 ${x0 + 26} 34 ${x0 + 34} 38 C${x0 + 38} 28 ${x0 + 36} 18 ${x0 + 28} 12Z`}
                fill="#4E7255"
                fillOpacity="0.88"
              />
              <path
                d={`M${x1 - 28} 12 C${x1 - 22} 26 ${x1 - 26} 34 ${x1 - 34} 38 C${x1 - 38} 28 ${x1 - 36} 18 ${x1 - 28} 12Z`}
                fill="#5E8366"
                fillOpacity="0.88"
              />
              {/* Center Hanging Marigold & Rose Tassel */}
              <line
                x1={xm}
                y1="23"
                x2={xm}
                y2="52"
                stroke="#C88A2E"
                strokeWidth="1.2"
              />
              <circle cx={xm} cy="26" r="7.5" fill="#EA9E38" />
              <circle cx={xm} cy="26" r="4" fill="#F8CA76" />
              <circle cx={xm} cy="40" r="6" fill="#C95858" />
              <circle cx={xm} cy="52" r="4.5" fill="#FBF5EB" stroke="#C88A2E" strokeWidth="1" />
              {/* Small Brass Bell */}
              <path
                d={`M${xm - 4} 57 L${xm + 4} 57 L${xm + 6} 64 L${xm - 6} 64 Z`}
                fill="#C88A2E"
              />
              <circle cx={xm} cy="66" r="2" fill="#8B1E3F" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function FloralDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4" aria-hidden="true">
      <div className="h-[1px] w-14 sm:w-24 bg-gradient-to-r from-transparent to-honey-gold/80" />
      <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="5" fill="#EA9E38" />
        <ellipse cx="18" cy="8" rx="4.5" ry="6.5" fill="#C95858" fillOpacity="0.88" />
        <ellipse cx="18" cy="28" rx="4.5" ry="6.5" fill="#C95858" fillOpacity="0.88" />
        <ellipse cx="8" cy="18" rx="6.5" ry="4.5" fill="#F4C0BA" fillOpacity="0.94" />
        <ellipse cx="28" cy="18" rx="6.5" ry="4.5" fill="#F4C0BA" fillOpacity="0.94" />
      </svg>
      <div className="h-[1px] w-14 sm:w-24 bg-gradient-to-l from-transparent to-honey-gold/80" />
    </div>
  );
}
