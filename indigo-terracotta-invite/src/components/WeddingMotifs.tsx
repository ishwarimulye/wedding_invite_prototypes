"use client";

import React from "react";

/**
 * Fine-line antique gold Rajasthani jali corner ornament for stationery frames.
 */
export function HaveliJaliCorner({
  position = "top-left",
  light = false,
  className = "",
}: {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  light?: boolean;
  className?: string;
}) {
  const stroke = light ? "#F0C267" : "#C88A2E";
  const accent = light ? "#FBF5EB" : "#8B1E3F";
  const flips: Record<string, string> = {
    "top-left": "",
    "top-right": "scale-x-[-1]",
    "bottom-left": "scale-y-[-1]",
    "bottom-right": "scale-x-[-1] scale-y-[-1]",
  };

  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none select-none ${flips[position]} ${className}`}
    >
      {/* Architectural Corner Rules */}
      <path
        d="M6 88 V16 C6 10.5 10.5 6 16 6 H88"
        stroke={stroke}
        strokeWidth="1.2"
        strokeOpacity="0.8"
      />
      <path
        d="M14 78 V22 C14 17.5 17.5 14 22 14 H78"
        stroke={stroke}
        strokeWidth="0.75"
        strokeOpacity="0.55"
      />
      {/* Paisley / Peacock Tear Drop Finial */}
      <path
        d="M22 22 C36 22 42 30 34 38 C28 44 20 38 22 22 Z"
        stroke={stroke}
        strokeWidth="1"
        fill={accent}
        fillOpacity="0.1"
      />
      {/* Corner Lotus Bud */}
      <path
        d="M14 14 C18 14 21 17 21 21 C17 21 14 18 14 14 Z"
        fill={stroke}
        fillOpacity="0.7"
      />
      {/* Delicate Hanging Paisley Drops */}
      <circle cx="52" cy="14" r="1.6" fill={stroke} fillOpacity="0.75" />
      <circle cx="64" cy="14" r="1.2" fill={stroke} fillOpacity="0.55" />
      <circle cx="14" cy="52" r="1.6" fill={stroke} fillOpacity="0.75" />
      <circle cx="14" cy="64" r="1.2" fill={stroke} fillOpacity="0.55" />
    </svg>
  );
}

/**
 * Architectural Toran & Lotus Festoon border along the top of the Patrika card.
 */
export function MarigoldToranBorder({ light = false }: { light?: boolean }) {
  const gold = light ? "#F0C267" : "#C88A2E";
  const crimson = light ? "#FBF5EB" : "#8B1E3F";
  const marigold = "#EA9E38";
  const arches = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div className="w-full overflow-hidden select-none" aria-hidden="true">
      <svg
        viewBox="0 0 840 54"
        fill="none"
        preserveAspectRatio="none"
        className="w-full h-9 sm:h-11"
      >
        <line
          x1="0"
          y1="4"
          x2="840"
          y2="4"
          stroke={gold}
          strokeWidth="1.2"
          strokeOpacity="0.75"
        />
        {arches.map((i) => {
          const x0 = i * 120;
          const mid = x0 + 60;
          const x1 = x0 + 120;
          return (
            <g key={i}>
              {/* Garland Swag */}
              <path
                d={`M ${x0} 4 Q ${mid} 38 ${x1} 4`}
                stroke={gold}
                strokeWidth="1.15"
                strokeOpacity="0.8"
                fill="none"
              />
              <path
                d={`M ${x0 + 12} 4 Q ${mid} 27 ${x1 - 12} 4`}
                stroke={crimson}
                strokeWidth="0.75"
                strokeDasharray="2 3"
                strokeOpacity="0.45"
                fill="none"
              />
              {/* Mango Leaf Drops along Swag */}
              <path
                d={`M ${mid - 26} 18 C ${mid - 29} 26 ${mid - 23} 28 ${mid - 22} 20 Z`}
                fill={gold}
                fillOpacity="0.4"
              />
              <path
                d={`M ${mid + 26} 18 C ${mid + 29} 26 ${mid + 23} 28 ${mid + 22} 20 Z`}
                fill={gold}
                fillOpacity="0.4"
              />
              {/* Center Lotus & Marigold Bell Pendant */}
              <circle cx={mid} cy="24" r="3.4" fill={marigold} fillOpacity="0.85" />
              <path
                d={`M ${mid} 28 L ${mid - 3.5} 38 L ${mid} 43 L ${mid + 3.5} 38 Z`}
                fill={crimson}
                fillOpacity="0.75"
              />
              <circle cx={mid} cy="47" r="1.6" fill={gold} />
              {/* Knot Rosette */}
              {i > 0 && (
                <circle
                  cx={x0}
                  cy="6"
                  r="3"
                  fill={crimson}
                  stroke={gold}
                  strokeWidth="0.9"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/**
 * Fine-line Mangal Kalash & Padma Lotus section divider.
 */
export function KalashLotusDivider({ light = false }: { light?: boolean }) {
  const stroke = light ? "#F0C267" : "#C88A2E";
  const accent = light ? "#FBF5EB" : "#8B1E3F";

  return (
    <div
      className="my-5 flex items-center justify-center gap-4 select-none"
      aria-hidden="true"
    >
      <div
        className="h-[1px] w-16 sm:w-32"
        style={{
          background: `linear-gradient(90deg, transparent, ${stroke})`,
        }}
      />
      <svg width="56" height="32" viewBox="0 0 56 32" fill="none">
        {/* Side Filigree Scrolls */}
        <path
          d="M4 16 C10 16 14 12 18 16 C14 20 10 16 4 16 Z"
          stroke={stroke}
          strokeWidth="1"
          fill={stroke}
          fillOpacity="0.16"
        />
        <path
          d="M52 16 C46 16 42 12 38 16 C42 20 46 16 52 16 Z"
          stroke={stroke}
          strokeWidth="1"
          fill={stroke}
          fillOpacity="0.16"
        />
        {/* Central Lotus Petals */}
        <path
          d="M28 4 C31 11 31 17 28 23 C25 17 25 11 28 4 Z"
          stroke={stroke}
          strokeWidth="1.2"
          fill={accent}
          fillOpacity="0.22"
        />
        <path
          d="M28 23 C21 20 18 14 19 9 C23 11 26 16 28 23 Z"
          stroke={stroke}
          strokeWidth="1.1"
          fill={stroke}
          fillOpacity="0.16"
        />
        <path
          d="M28 23 C35 20 38 14 37 9 C33 11 30 16 28 23 Z"
          stroke={stroke}
          strokeWidth="1.1"
          fill={stroke}
          fillOpacity="0.16"
        />
        <circle cx="28" cy="27" r="1.8" fill={stroke} />
      </svg>
      <div
        className="h-[1px] w-16 sm:w-32"
        style={{
          background: `linear-gradient(90deg, ${stroke}, transparent)`,
        }}
      />
    </div>
  );
}

/**
 * Eight-petaled antique gold wedding crest monogram.
 */
export function RoyalMandapCrest({
  monogram = "M & K",
  light = false,
}: {
  monogram?: string;
  light?: boolean;
}) {
  const stroke = light ? "#F0C267" : "#C88A2E";
  const textFill = light ? "#FBF5EB" : "#8B1E3F";
  const ringFill = light ? "rgba(251, 245, 235, 0.08)" : "rgba(139, 30, 63, 0.05)";

  return (
    <div className="relative inline-flex items-center justify-center w-24 h-24 select-none">
      <svg
        viewBox="0 0 100 100"
        fill="none"
        className="w-full h-full"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="43"
          stroke={stroke}
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        <circle
          cx="50"
          cy="50"
          r="37"
          fill={ringFill}
          stroke={stroke}
          strokeWidth="1.3"
        />
        {/* 8 Cardinal Architectural Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <path
            key={deg}
            d="M50 3 L53 11 L50 13 L47 11 Z"
            fill={stroke}
            fillOpacity="0.72"
            transform={`rotate(${deg} 50 50)`}
          />
        ))}
      </svg>
      <span
        className="absolute font-display text-lg font-semibold tracking-[0.14em]"
        style={{ color: textFill }}
      >
        {monogram}
      </span>
    </div>
  );
}

/**
 * Rajasthani Cusped Jharokha Arch Overlay for framing photography.
 */
export function JharokhaArchFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative border border-honey-gold/70 bg-blush-silk p-3 sm:p-3.5 shadow-[0_20px_55px_rgba(94,17,41,0.16)] ${className}`}
    >
      <div className="relative overflow-hidden border border-honey-gold/45">
        {children}

        {/* Cusped Jharokha Arch Silhouette Overlay in Velvet Cream & Gold */}
        <svg
          viewBox="0 0 400 108"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 w-full h-auto z-10"
        >
          {/* Outer spandrel fill matching inner card frame */}
          <path
            d="M0 0 H400 V108 C392 66 364 48 334 48 C312 48 294 34 274 28 C252 22 222 10 200 2 C178 10 148 22 126 28 C106 34 88 48 66 48 C36 48 8 66 0 108 Z"
            fill="#F5E6D4"
          />
          {/* Scalloped Gold Rim */}
          <path
            d="M0 108 C8 66 36 48 66 48 C88 48 106 34 126 28 C148 22 178 10 200 2 C222 10 252 22 274 28 C294 34 312 48 334 48 C364 48 392 66 400 108"
            stroke="#C88A2E"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M12 106 C20 72 44 56 70 56 C92 56 108 42 128 36 C150 30 178 18 200 10 C222 18 250 30 272 36 C292 42 308 56 330 56 C356 56 380 72 388 106"
            stroke="#8B1E3F"
            strokeWidth="0.9"
            strokeOpacity="0.45"
            fill="none"
          />
          {/* Kalash Finial at Arch Apex */}
          <circle cx="200" cy="14" r="3" fill="#C88A2E" />
        </svg>

        {/* Bottom Caption Rule inside Frame */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-berry-deep/65 to-transparent" />
      </div>
    </div>
  );
}

/**
 * Hand-crafted Brass Shagun Diya with warm animated flame when lit.
 */
export function BrassDiyaSvg({ lit }: { lit: boolean }) {
  return (
    <svg
      width="84"
      height="76"
      viewBox="0 0 84 76"
      fill="none"
      aria-hidden="true"
      className="select-none"
    >
      {/* Flame Glow */}
      {lit && (
        <g>
          <circle cx="42" cy="24" r="18" fill="#EA9E38" fillOpacity="0.22" />
          <path
            d="M42 6 C48 16 50 24 42 31 C34 24 36 16 42 6 Z"
            fill="#F0C267"
            className="animate-sway-bloom"
          />
          <path
            d="M42 13 C45.5 19 46.5 24 42 29 C37.5 24 38.5 19 42 13 Z"
            fill="#FFF7DC"
          />
        </g>
      )}
      {!lit && (
        <path
          d="M42 24 L42 31"
          stroke="#7A4B26"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}

      {/* Brass Oil Bowl */}
      <path
        d="M14 38 C20 53 31 58 42 58 C53 58 64 53 70 38 L52 38 L42 32 L32 38 Z"
        fill="#C88A2E"
        stroke="#8B1E3F"
        strokeWidth="1.2"
      />
      <ellipse
        cx="42"
        cy="38"
        rx="24"
        ry="5.5"
        fill="#F0C267"
        stroke="#8B1E3F"
        strokeWidth="1"
      />
      {/* Stand Base */}
      <path
        d="M34 58 L30 66 H54 L50 58 Z"
        fill="#A66F3D"
        stroke="#8B1E3F"
        strokeWidth="1"
      />
      <rect
        x="24"
        y="66"
        width="36"
        height="4"
        rx="2"
        fill="#8B1E3F"
      />
    </svg>
  );
}
