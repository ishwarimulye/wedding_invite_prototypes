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
    <div className="relative overflow-hidden rounded-3xl border border-petal-milk/25 bg-petal-milk/96 p-4 sm:p-5 text-berry-ink shadow-inner">
      <div className="flex items-center justify-between border-b border-honey-gold/30 pb-2.5 mb-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-berry">
          Estate Map · Tap Any Pavilion
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-coral-rose font-semibold">
          4 Ceremonies
        </span>
      </div>

      <svg
        viewBox="0 0 400 280"
        className="w-full h-auto select-none"
        role="img"
        aria-label="Interactive illustrated map of Umaid Heritage Haveli showing all four wedding ceremony pavilions"
      >
        <rect x="0" y="0" width="400" height="280" rx="18" fill="#FCF8F1" />
        <rect
          x="12"
          y="12"
          width="376"
          height="256"
          rx="14"
          fill="none"
          stroke="#C99242"
          strokeOpacity="0.4"
          strokeDasharray="4 4"
        />

        {/* Wing 01: Garden Lawn */}
        <ellipse
          cx="105"
          cy="94"
          rx="74"
          ry="48"
          fill="#E0F1EB"
          stroke="#134E4A"
          strokeOpacity="0.35"
          strokeWidth="1.2"
        />
        <text
          x="105"
          y="62"
          textAnchor="middle"
          fontSize="8"
          fill="#134E4A"
          letterSpacing="1.3"
          fontWeight="600"
        >
          GARDEN LAWN
        </text>

        {/* Wing 02: Colonnade Wing */}
        <rect
          x="224"
          y="32"
          width="142"
          height="94"
          rx="12"
          fill="#FBEDE4"
          stroke="#C99242"
          strokeWidth="1.2"
        />
        <text
          x="295"
          y="50"
          textAnchor="middle"
          fontSize="8"
          fill="#134E4A"
          letterSpacing="1.3"
          fontWeight="600"
        >
          COLONNADE WING
        </text>

        {/* Wing 03: Stepwell Terrace */}
        <rect
          x="36"
          y="156"
          width="138"
          height="92"
          rx="12"
          fill="#FDF2DF"
          stroke="#EA9A3E"
          strokeOpacity="0.6"
          strokeWidth="1.2"
        />
        <text
          x="105"
          y="174"
          textAnchor="middle"
          fontSize="8"
          fill="#8E5B17"
          letterSpacing="1.3"
          fontWeight="600"
        >
          STEPWELL TERRACE
        </text>

        {/* Wing 04: Lotus Mandap */}
        <rect
          x="200"
          y="154"
          width="144"
          height="96"
          rx="42"
          fill="#FCE8E3"
          stroke="#E16B5A"
          strokeOpacity="0.55"
          strokeWidth="1.3"
        />
        <text
          x="272"
          y="172"
          textAnchor="middle"
          fontSize="8"
          fill="#B34436"
          letterSpacing="1.3"
          fontWeight="600"
        >
          LOTUS MANDAP
        </text>

        {/* Lantern Footpaths connecting all 4 wings */}
        <path
          d="M105 104 Q200 112 295 92 M105 104 L105 204 M105 204 Q186 218 268 204 M295 92 Q284 148 268 204"
          fill="none"
          stroke="#C99242"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          strokeOpacity="0.6"
        />

        {/* Interactive Pins for all 4 Ceremonies */}
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
                  r="22"
                  fill="#E16B5A"
                  fillOpacity="0.24"
                  className="animate-ping"
                />
              )}
              <circle
                r={isSelected ? 16 : 13}
                fill={isSelected ? "#134E4A" : "#FFFFFF"}
                stroke={isSelected ? "#EA9A3E" : "#134E4A"}
                strokeWidth="2"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill={isSelected ? "#FCF8F1" : "#134E4A"}
              >
                {c.code}
              </text>
              <rect
                x="-40"
                y="18"
                width="80"
                height="16"
                rx="8"
                fill={isSelected ? "#E16B5A" : "#FBEDE4"}
              />
              <text
                x="0"
                y="29"
                textAnchor="middle"
                fontSize="7.8"
                fontWeight="600"
                fill={isSelected ? "#FCF8F1" : "#1E2422"}
              >
                {c.shortTitle}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
