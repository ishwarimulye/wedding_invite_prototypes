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
    <div className="rounded-3xl border border-honey-gold/55 bg-petal-milk p-4 sm:p-5 text-berry-ink shadow-inner">
      <div className="flex items-center justify-between border-b border-honey-gold/35 pb-2.5 mb-3 text-[10px] uppercase tracking-[0.22em]">
        <span className="font-semibold text-berry">
          Umaid Heritage Haveli · Plan
        </span>
        <span className="text-sage font-medium">Tap a pavilion</span>
      </div>

      <svg
        viewBox="0 0 400 280"
        className="w-full h-auto select-none"
        role="img"
        aria-label="Illustrated map of Umaid Heritage Haveli ceremony pavilions"
      >
        <rect x="0" y="0" width="400" height="280" rx="16" fill="#FBF5EB" />
        <rect
          x="8"
          y="8"
          width="384"
          height="264"
          rx="14"
          fill="none"
          stroke="#C88A2E"
          strokeOpacity="0.55"
        />
        <rect
          x="13"
          y="13"
          width="374"
          height="254"
          rx="11"
          fill="none"
          stroke="#C88A2E"
          strokeOpacity="0.28"
          strokeDasharray="2 3"
        />

        {/* Central Octagonal Courtyard Lotus Fountain */}
        <g transform="translate(200 142)">
          <circle
            r="22"
            fill="#EFD4C8"
            fillOpacity="0.5"
            stroke="#C88A2E"
            strokeWidth="1"
          />
          <circle
            r="11"
            fill="#FBF5EB"
            stroke="#8B1E3F"
            strokeWidth="0.9"
            strokeOpacity="0.45"
          />
          <circle r="3" fill="#C88A2E" />
        </g>

        {/* Engraved Compass Rose */}
        <g transform="translate(366 32)" opacity="0.72">
          <circle r="10" fill="none" stroke="#C88A2E" strokeWidth="0.8" />
          <path d="M0 -13 L2 -2 L0 13 L-2 -2 Z" fill="#8B1E3F" />
          <text
            x="0"
            y="-15"
            textAnchor="middle"
            fontSize="6.5"
            fontWeight="600"
            fill="#7A4B26"
          >
            N
          </text>
        </g>

        {/* Softly Rounded Pavilion Zones */}
        <rect
          x="30"
          y="34"
          width="144"
          height="92"
          rx="16"
          fill="#F5E6D4"
          stroke="#C88A2E"
          strokeOpacity="0.55"
        />
        <text
          x="102"
          y="53"
          textAnchor="middle"
          fontSize="8"
          fill="#7A4B26"
          letterSpacing="1.4"
        >
          BOUGAINVILLEA LAWN
        </text>

        <rect
          x="224"
          y="34"
          width="144"
          height="92"
          rx="16"
          fill="#F5E6D4"
          stroke="#C88A2E"
          strokeOpacity="0.55"
        />
        <line
          x1="238"
          y1="62"
          x2="354"
          y2="62"
          stroke="#C88A2E"
          strokeOpacity="0.3"
          strokeDasharray="4 4"
        />
        <text
          x="296"
          y="53"
          textAnchor="middle"
          fontSize="8"
          fill="#7A4B26"
          letterSpacing="1.4"
        >
          DARBAR COLONNADE
        </text>

        <rect
          x="30"
          y="156"
          width="144"
          height="96"
          rx="16"
          fill="#F5E6D4"
          stroke="#C88A2E"
          strokeOpacity="0.55"
        />
        <rect
          x="42"
          y="176"
          width="120"
          height="64"
          rx="10"
          fill="none"
          stroke="#C88A2E"
          strokeOpacity="0.26"
        />
        <text
          x="102"
          y="171"
          textAnchor="middle"
          fontSize="8"
          fill="#7A4B26"
          letterSpacing="1.4"
        >
          STEPWELL TERRACE
        </text>

        <rect
          x="204"
          y="156"
          width="164"
          height="96"
          rx="16"
          fill="#F3DCE0"
          stroke="#8B1E3F"
          strokeOpacity="0.4"
        />
        <circle
          cx="268"
          cy="204"
          r="24"
          fill="none"
          stroke="#8B1E3F"
          strokeOpacity="0.24"
        />
        <text
          x="286"
          y="171"
          textAnchor="middle"
          fontSize="8"
          fill="#8B1E3F"
          letterSpacing="1.4"
        >
          LOTUS MANDAP
        </text>

        {/* Soft Garden Paths */}
        <path
          d="M105 104 Q155 126 200 142 Q248 118 295 92 M105 104 Q92 154 105 204 Q150 174 200 142 Q232 174 268 204"
          fill="none"
          stroke="#C88A2E"
          strokeWidth="1.1"
          strokeDasharray="3 4"
          strokeOpacity="0.65"
        />

        {/* Pavilion Pins */}
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
                  r={20}
                  fill="none"
                  stroke="#C88A2E"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              )}
              <circle
                r={isSelected ? 15 : 12}
                fill={isSelected ? "#8B1E3F" : "#FBF5EB"}
                stroke={isSelected ? "#C88A2E" : "#8B1E3F"}
                strokeWidth="1.5"
              />
              <text
                x="0"
                y="3.5"
                textAnchor="middle"
                fontSize="9.5"
                fontWeight="600"
                fill={isSelected ? "#FBF5EB" : "#8B1E3F"}
              >
                {c.code}
              </text>
              <rect
                x="-38"
                y="18"
                width="76"
                height="16"
                rx="8"
                fill={isSelected ? "#8B1E3F" : "#FBF5EB"}
                stroke="#C88A2E"
                strokeOpacity="0.55"
              />
              <text
                x="0"
                y="28.5"
                textAnchor="middle"
                fontSize="7.5"
                fontWeight="500"
                fill={isSelected ? "#FBF5EB" : "#31171F"}
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
