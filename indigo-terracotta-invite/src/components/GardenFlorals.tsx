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
      {/* Golden & Leaf Botanical Stems */}
      <path
        d="M10 198C18 122 52 62 128 28C158 14 185 12 208 14"
        stroke="#D4943A"
        strokeWidth="1.8"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M28 168C38 112 70 68 140 44"
        stroke="#5E8366"
        strokeWidth="1.4"
        strokeDasharray="4 4"
        strokeOpacity="0.55"
      />

      {/* Soft Garden Foliage */}
      <g className="animate-sway-bloom origin-top-left">
        <path
          d="M54 96C34 86 28 66 38 52C56 60 64 78 54 96Z"
          fill="#5E8366"
          fillOpacity="0.82"
        />
        <path
          d="M96 52C86 34 94 18 112 14C118 30 112 46 96 52Z"
          fill="#769A7D"
          fillOpacity="0.8"
        />
        <path
          d="M34 138C16 132 10 114 18 98C34 104 44 120 34 138Z"
          fill="#769A7D"
          fillOpacity="0.78"
        />
        <path
          d="M142 32C140 16 152 6 168 10C166 24 156 32 142 32Z"
          fill="#5E8366"
          fillOpacity="0.78"
        />

        {/* Rani Pink & Blush Peony Hero Bloom */}
        <g transform="translate(62 62)">
          <circle cx="0" cy="0" r="28" fill="#F6C3C0" fillOpacity="0.96" />
          <circle cx="-8" cy="-6" r="18" fill="#D96566" fillOpacity="0.88" />
          <circle cx="8" cy="-4" r="16" fill="#FDE0DC" fillOpacity="0.92" />
          <circle cx="0" cy="8" r="15" fill="#9E2A4B" fillOpacity="0.76" />
          <circle cx="-1" cy="-1" r="6" fill="#F0B254" />
          <circle cx="3" cy="2" r="3" fill="#FFF8F3" />
        </g>

        {/* Auspicious Marigold Blossom */}
        <g transform="translate(116 32)">
          <circle cx="0" cy="0" r="17" fill="#F0B254" />
          <circle cx="0" cy="0" r="12" fill="#F9CA7A" />
          <circle cx="0" cy="0" r="6" fill="#D47E22" />
        </g>

        {/* Blush Rose */}
        <g transform="translate(30 112)">
          <circle cx="0" cy="0" r="16" fill="#FAD2CE" />
          <circle cx="-4" cy="-3" r="10" fill="#D96566" fillOpacity="0.82" />
          <circle cx="3" cy="3" r="6" fill="#9E2A4B" fillOpacity="0.65" />
        </g>

        {/* Cream Mogra Jasmine Buds */}
        <g transform="translate(162 24)">
          <circle cx="0" cy="0" r="9" fill="#FFF8F3" stroke="#D4943A" strokeWidth="1" />
          <circle cx="14" cy="4" r="7" fill="#FFF8F3" stroke="#D4943A" strokeWidth="0.9" />
          <circle cx="-11" cy="10" r="6.5" fill="#FFF8F3" stroke="#D4943A" strokeWidth="0.9" />
          <circle cx="0" cy="0" r="2.5" fill="#F0B254" />
          <circle cx="14" cy="4" r="2" fill="#F0B254" />
        </g>
      </g>
    </svg>
  );
}

export function FloralDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4" aria-hidden="true">
      <div className="h-[1px] w-14 sm:w-24 bg-gradient-to-r from-transparent to-honey-gold/80" />
      <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="5" fill="#F0B254" />
        <ellipse cx="18" cy="8" rx="4.5" ry="6.5" fill="#D96566" fillOpacity="0.88" />
        <ellipse cx="18" cy="28" rx="4.5" ry="6.5" fill="#D96566" fillOpacity="0.88" />
        <ellipse cx="8" cy="18" rx="6.5" ry="4.5" fill="#F6C3C0" fillOpacity="0.94" />
        <ellipse cx="28" cy="18" rx="6.5" ry="4.5" fill="#F6C3C0" fillOpacity="0.94" />
      </svg>
      <div className="h-[1px] w-14 sm:w-24 bg-gradient-to-l from-transparent to-honey-gold/80" />
    </div>
  );
}

const GARDEN_PETALS = [
  { left: "7%", delay: "0s", duration: "11s", color: "#F6C3C0", size: 15, leftDrift: false },
  { left: "18%", delay: "2.4s", duration: "13s", color: "#F0B254", size: 12, leftDrift: true },
  { left: "31%", delay: "1.1s", duration: "12s", color: "#D96566", size: 14, leftDrift: false },
  { left: "46%", delay: "4.2s", duration: "14s", color: "#FAD6D1", size: 16, leftDrift: true },
  { left: "61%", delay: "1.9s", duration: "12.5s", color: "#F4BF6E", size: 13, leftDrift: false },
  { left: "74%", delay: "3.5s", duration: "11.5s", color: "#F6C3C0", size: 15, leftDrift: true },
  { left: "86%", delay: "0.7s", duration: "13.5s", color: "#D96566", size: 13, leftDrift: false },
  { left: "94%", delay: "5.1s", duration: "12s", color: "#F0B254", size: 12, leftDrift: true },
];

export function DriftingGardenPetals() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
      aria-hidden="true"
    >
      {GARDEN_PETALS.map((petal, idx) => (
        <div
          key={idx}
          className={`absolute -top-12 ${
            petal.leftDrift ? "animate-float-petal-left" : "animate-float-petal"
          }`}
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.25}
            viewBox="0 0 20 25"
            fill="none"
          >
            <path
              d="M10 1C15 5 19 12 17 18C15 23 11 24 10 24C9 24 5 23 3 18C1 12 5 5 10 1Z"
              fill={petal.color}
              fillOpacity="0.72"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
