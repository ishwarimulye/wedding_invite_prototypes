"use client";

import React from "react";

/**
 * Fine-line antique gold Rajasthani jali corner ornament curved to hug soft stationery corners.
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
      {/* Flowing Curved Corner Rules */}
      <path
        d="M8 86 V30 C8 16 16 8 30 8 H86"
        stroke={stroke}
        strokeWidth="1.2"
        strokeOpacity="0.8"
      />
      <path
        d="M16 74 V34 C16 22 22 16 34 16 H74"
        stroke={stroke}
        strokeWidth="0.75"
        strokeOpacity="0.55"
      />
      {/* Soft Paisley Leaf Finial */}
      <path
        d="M25 25 C38 25 43 32 36 39 C30 45 23 39 25 25 Z"
        stroke={stroke}
        strokeWidth="1"
        fill={accent}
        fillOpacity="0.1"
      />
      <circle cx="54" cy="16" r="1.6" fill={stroke} fillOpacity="0.75" />
      <circle cx="66" cy="16" r="1.2" fill={stroke} fillOpacity="0.55" />
      <circle cx="16" cy="54" r="1.6" fill={stroke} fillOpacity="0.75" />
      <circle cx="16" cy="66" r="1.2" fill={stroke} fillOpacity="0.55" />
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
              <circle cx={mid} cy="24" r="3.4" fill={marigold} fillOpacity="0.85" />
              <path
                d={`M ${mid} 28 L ${mid - 3.5} 38 L ${mid} 43 L ${mid + 3.5} 38 Z`}
                fill={crimson}
                fillOpacity="0.75"
              />
              <circle cx={mid} cy="47" r="1.6" fill={gold} />
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
  const ringFill = light
    ? "rgba(251, 245, 235, 0.08)"
    : "rgba(139, 30, 63, 0.05)";

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
 * Flowing Arched Rajasthani Jharokha Frame with soft dome silhouette.
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
      className={`relative rounded-t-[180px] rounded-b-[28px] border border-honey-gold/75 bg-blush-silk p-3 sm:p-4 shadow-[0_22px_60px_rgba(94,17,41,0.16)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-t-[168px] rounded-b-[20px] border border-honey-gold/55">
        {children}

        {/* Subtle Scalloped Gold Rim at the Arch */}
        <svg
          viewBox="0 0 400 112"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 w-full h-auto z-10"
        >
          <path
            d="M4 112 C22 70 46 56 76 54 C102 52 120 34 146 28 C168 23 184 12 200 6 C216 12 232 23 254 28 C280 34 298 52 324 54 C354 56 378 70 396 112"
            stroke="#F0C267"
            strokeWidth="1.6"
            strokeOpacity="0.85"
            fill="none"
          />
          <circle cx="200" cy="14" r="3" fill="#F0C267" />
        </svg>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-berry-deep/75 to-transparent" />
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
      <path
        d="M34 58 L30 66 H54 L50 58 Z"
        fill="#A66F3D"
        stroke="#8B1E3F"
        strokeWidth="1"
      />
      <rect x="24" y="66" width="36" height="4" rx="2" fill="#8B1E3F" />
    </svg>
  );
}
