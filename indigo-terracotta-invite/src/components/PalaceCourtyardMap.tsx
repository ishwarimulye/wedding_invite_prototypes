"use client";

import React from "react";
import { CEREMONIES, Ceremony } from "@/data/inviteData";

export default function PalaceCourtyardMap({
  activeCeremony,
  onSelect,
}: {
  activeCeremony: Ceremony;
  onSelect: (code: string) => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-petal-milk/25 bg-petal-milk/95 p-4 sm:p-5 text-berry-ink shadow-inner">
      <div className="flex items-center justify-between border-b border-honey-gold/30 pb-2.5 mb-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-sage">
          Interactive Estate Map · Tap A Pavilion
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-coral-rose font-semibold">
          Umaid Heritage Haveli
        </span>
      </div>

      <svg
        viewBox="0 0 400 280"
        className="w-full h-auto select-none"
        role="img"
        aria-label="Interactive illustrated map of Umaid Heritage Haveli wedding pavilions"
      >
        {/* Warm Sandstone Grounds */}
        <rect x="0" y="0" width="400" height="280" rx="18" fill="#FDF6EE" />
        <rect
          x="12"
          y="12"
          width="376"
          height="256"
          rx="14"
          fill="none"
          stroke="#C79652"
          strokeOpacity="0.4"
          strokeDasharray="4 4"
        />

        {/* Heritage Colonnade Wing */}
        <rect
          x="235"
          y="34"
          width="130"
          height="110"
          rx="12"
          fill="#F5E4DA"
          stroke="#C79652"
          strokeWidth="1.2"
        />
        <text
          x="300"
          y="55"
          textAnchor="middle"
          fontSize="8.5"
          fill="#6B213B"
          letterSpacing="1.5"
          fontWeight="600"
        >
          COLONNADE WING
        </text>

        {/* Bougainvillea Garden Lawn */}
        <ellipse
          cx="112"
          cy="108"
          rx="76"
          ry="56"
          fill="#E5EFE9"
          stroke="#4B7864"
          strokeOpacity="0.45"
          strokeWidth="1.2"
        />
        <text
          x="112"
          y="74"
          textAnchor="middle"
          fontSize="8.5"
          fill="#24493A"
          letterSpacing="1.4"
          fontWeight="600"
        >
          GARDEN LAWN
        </text>

        {/* Central Lotus Reflection Pool */}
        <rect
          x="148"
          y="150"
          width="112"
          height="92"
          rx="46"
          fill="#FAE9E4"
          stroke="#D66863"
          strokeOpacity="0.5"
          strokeWidth="1.3"
        />
        <text
          x="204"
          y="233"
          textAnchor="middle"
          fontSize="8.5"
          fill="#6B213B"
          letterSpacing="1.4"
          fontWeight="600"
        >
          LOTUS MANDAP
        </text>

        {/* Dotted Lantern Footpaths */}
        <path
          d="M112 110 Q204 145 295 98 M112 110 Q150 185 204 205 M295 98 Q265 170 204 205"
          fill="none"
          stroke="#C79652"
          strokeWidth="1.6"
          strokeDasharray="4 4"
          strokeOpacity="0.65"
        />

        {/* Welcome Gate Badge */}
        <g transform="translate(54 228)">
          <rect
            x="-32"
            y="-14"
            width="64"
            height="24"
            rx="12"
            fill="#6B213B"
          />
          <text
            x="0"
            y="1.5"
            textAnchor="middle"
            fontSize="7.5"
            fill="#FDF9F5"
            letterSpacing="1.2"
          >
            ENTRY ARCH
          </text>
        </g>

        {/* Interactive Ceremony Pavilion Pins */}
        {CEREMONIES.map((c) => {
          const isSelected = c.code === activeCeremony.code;
          return (
            <g
              key={c.code}
              transform={`translate(${c.mapCoords.x} ${c.mapCoords.y})`}
              onClick={() => onSelect(c.code)}
              className="cursor-pointer"
            >
              {isSelected && (
                <circle
                  r="24"
                  fill="#D66863"
                  fillOpacity="0.22"
                  className="animate-ping"
                />
              )}
              <circle
                r={isSelected ? 17 : 14}
                fill={isSelected ? "#6B213B" : "#FFFFFF"}
                stroke={isSelected ? "#E29B4D" : "#6B213B"}
                strokeWidth="2"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fontSize="10.5"
                fontWeight="700"
                fill={isSelected ? "#FDF9F5" : "#6B213B"}
              >
                {c.code}
              </text>
              <rect
                x="-50"
                y="20"
                width="100"
                height="16"
                rx="8"
                fill={isSelected ? "#24493A" : "#F8EAE4"}
              />
              <text
                x="0"
                y="31"
                textAnchor="middle"
                fontSize="7.5"
                fontWeight="600"
                fill={isSelected ? "#FDF9F5" : "#27151C"}
              >
                {c.title.split(" ").slice(0, 2).join(" ")}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
