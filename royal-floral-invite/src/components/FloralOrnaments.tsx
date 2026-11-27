"use client";

import React from "react";

export function LotusSeparator({ light = false }: { light?: boolean }) {
  const stroke = light ? "#E8C784" : "#C69749";
  const accent = light ? "#F6DFA4" : "#7A1F31";

  return (
    <div className="flex items-center justify-center gap-3 my-4 select-none" aria-hidden="true">
      <div
        className="h-[1px] w-16 sm:w-28"
        style={{
          background: `linear-gradient(90deg, transparent, ${stroke})`,
        }}
      />
      <svg
        width="44"
        height="26"
        viewBox="0 0 44 26"
        fill="none"
        className="shrink-0"
      >
        <path
          d="M22 3C24.5 9 25 14 22 20C19 14 19.5 9 22 3Z"
          stroke={stroke}
          strokeWidth="1.3"
          fill={accent}
          fillOpacity="0.16"
        />
        <path
          d="M22 20C16 17 13 12 13 7C17 9 20 14 22 20Z"
          stroke={stroke}
          strokeWidth="1.2"
          fill={stroke}
          fillOpacity="0.14"
        />
        <path
          d="M22 20C28 17 31 12 31 7C27 9 24 14 22 20Z"
          stroke={stroke}
          strokeWidth="1.2"
          fill={stroke}
          fillOpacity="0.14"
        />
        <path
          d="M22 20C14 20 8 17 5 12C11 12 17 15 22 20Z"
          stroke={stroke}
          strokeWidth="1.1"
        />
        <path
          d="M22 20C30 20 36 17 39 12C33 12 27 15 22 20Z"
          stroke={stroke}
          strokeWidth="1.1"
        />
        <circle cx="22" cy="23" r="1.7" fill={stroke} />
      </svg>
      <div
        className="h-[1px] w-16 sm:w-28"
        style={{
          background: `linear-gradient(90deg, ${stroke}, transparent)`,
        }}
      />
    </div>
  );
}

export function FloralCorner({
  position = "top-left",
  className = "",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}) {
  const transforms: Record<string, string> = {
    "top-left": "",
    "top-right": "scale-x-[-1]",
    "bottom-left": "scale-y-[-1]",
    "bottom-right": "scale-x-[-1] scale-y-[-1]",
  };

  return (
    <svg
      viewBox="0 0 180 180"
      fill="none"
      className={`pointer-events-none select-none ${transforms[position]} ${className}`}
      aria-hidden="true"
    >
      {/* Gold Filigree Vine */}
      <path
        d="M12 162C14 102 36 52 96 24C122 12 146 11 168 12"
        stroke="#C69749"
        strokeWidth="1.4"
        strokeOpacity="0.7"
      />
      <path
        d="M26 144C30 98 54 58 106 36"
        stroke="#C69749"
        strokeWidth="0.9"
        strokeDasharray="3 4"
        strokeOpacity="0.65"
      />
      {/* Botanical Sage Leaves */}
      <path
        d="M44 82C30 74 26 60 32 48C44 54 50 68 44 82Z"
        fill="#385743"
        fillOpacity="0.78"
        stroke="#C69749"
        strokeWidth="0.8"
      />
      <path
        d="M78 46C70 32 76 18 89 14C94 26 90 40 78 46Z"
        fill="#385743"
        fillOpacity="0.75"
        stroke="#C69749"
        strokeWidth="0.8"
      />
      <path
        d="M28 118C14 114 8 102 12 90C24 94 32 104 28 118Z"
        fill="#4A6B56"
        fillOpacity="0.72"
        stroke="#C69749"
        strokeWidth="0.8"
      />
      <path
        d="M114 28C112 15 122 6 135 8C134 20 125 28 114 28Z"
        fill="#4A6B56"
        fillOpacity="0.7"
        stroke="#C69749"
        strokeWidth="0.8"
      />

      {/* Blush Rose Bloom */}
      <g transform="translate(52 52)">
        <circle cx="0" cy="0" r="22" fill="#E9B8BE" fillOpacity="0.92" />
        <circle cx="-6" cy="-5" r="14" fill="#D88C98" fillOpacity="0.82" />
        <circle cx="6" cy="-3" r="13" fill="#F4D3D7" fillOpacity="0.9" />
        <circle cx="0" cy="6" r="12" fill="#C96F7E" fillOpacity="0.75" />
        <path
          d="M-7 -2C-4 -9 6 -9 8 -1C9 5 2 9 -4 6C-8 4 -8 -1 -3 -3C0 -4 3 -2 2 1"
          stroke="#7A1F31"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </g>

      {/* Cream Mogra / Jasmine Cluster */}
      <g transform="translate(96 28)">
        <circle cx="0" cy="0" r="11" fill="#FFFDF7" stroke="#C69749" strokeWidth="0.9" />
        <circle cx="13" cy="6" r="8.5" fill="#FDF6E4" stroke="#C69749" strokeWidth="0.8" />
        <circle cx="-11" cy="8" r="7.5" fill="#FFFDF7" stroke="#C69749" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="2.6" fill="#D8A64E" />
        <circle cx="13" cy="6" r="2" fill="#D8A64E" />
        <circle cx="-11" cy="8" r="1.8" fill="#D8A64E" />
      </g>

      {/* Marigold Bud */}
      <g transform="translate(26 98)">
        <circle cx="0" cy="0" r="12" fill="#E8A43C" fillOpacity="0.92" />
        <circle cx="0" cy="0" r="8" fill="#F2BE63" />
        <circle cx="0" cy="0" r="4" fill="#C97D1E" />
      </g>

      {/* Tiny Gold Berries */}
      <circle cx="136" cy="20" r="3" fill="#E8C784" />
      <circle cx="148" cy="17" r="2.2" fill="#C69749" />
      <circle cx="18" cy="136" r="2.8" fill="#E8C784" />
      <circle cx="15" cy="148" r="2" fill="#C69749" />
    </svg>
  );
}

export function RoyalMonogramCrest({
  monogram = "A & V",
  size = "md",
}: {
  monogram?: string;
  size?: "sm" | "md" | "lg";
}) {
  const dims =
    size === "lg"
      ? "w-28 h-28 text-2xl"
      : size === "sm"
      ? "w-14 h-14 text-xs"
      : "w-20 h-20 text-lg";

  return (
    <div className={`relative inline-flex items-center justify-center ${dims}`}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        className="absolute inset-0 w-full h-full animate-sway"
        aria-hidden="true"
      >
        <circle
          cx="60"
          cy="60"
          r="54"
          stroke="#C69749"
          strokeWidth="1.2"
          strokeDasharray="4 3"
        />
        <circle cx="60" cy="60" r="46" stroke="#E8C784" strokeWidth="1.5" />
        {/* Top & Bottom Lotus Petals */}
        <path d="M60 4C63 10 63 14 60 18C57 14 57 10 60 4Z" fill="#E8C784" />
        <path d="M60 102C63 106 63 110 60 116C57 110 57 106 60 102Z" fill="#E8C784" />
        <path d="M4 60C10 57 14 57 18 60C14 63 10 63 4 60Z" fill="#E8C784" />
        <path d="M102 60C106 57 110 57 116 60C110 63 106 63 102 60Z" fill="#E8C784" />
      </svg>
      <span className="font-display font-semibold tracking-wider text-gold-foil">
        {monogram}
      </span>
    </div>
  );
}
