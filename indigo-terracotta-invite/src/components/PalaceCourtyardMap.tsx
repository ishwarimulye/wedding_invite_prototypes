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
    <div className="border border-honey-gold/45 bg-petal-milk p-4 sm:p-5 text-berry-ink">
      <div className="flex items-center justify-between border-b border-honey-gold/30 pb-2.5 mb-3 text-[10px] uppercase tracking-[0.22em]">
        <span className="font-semibold text-berry">Estate Plan</span>
        <span className="text-muted">Select a pavilion</span>
      </div>

      <svg
        viewBox="0 0 400 280"
        className="w-full h-auto select-none"
        role="img"
        aria-label="Illustrated map of Umaid Heritage Haveli ceremony pavilions"
      >
        <rect x="0" y="0" width="400" height="280" fill="#FBF5EB" />
        <rect
          x="10"
          y="10"
          width="380"
          height="260"
          fill="none"
          stroke="#C88A2E"
          strokeOpacity="0.45"
        />

        {/* Pavilion Zones */}
        <rect
          x="32"
          y="36"
          width="146"
          height="92"
          fill="#F5E6D4"
          stroke="#C88A2E"
          strokeOpacity="0.45"
        />
        <text
          x="105"
          y="55"
          textAnchor="middle"
          fontSize="8"
          fill="#7A4B26"
          letterSpacing="1.5"
        >
          BOUGAINVILLEA LAWN
        </text>

        <rect
          x="222"
          y="36"
          width="146"
          height="92"
          fill="#F5E6D4"
          stroke="#C88A2E"
          strokeOpacity="0.45"
        />
        <text
          x="295"
          y="55"
          textAnchor="middle"
          fontSize="8"
          fill="#7A4B26"
          letterSpacing="1.5"
        >
          DARBAR COLONNADE
        </text>

        <rect
          x="32"
          y="152"
          width="146"
          height="96"
          fill="#F5E6D4"
          stroke="#C88A2E"
          strokeOpacity="0.45"
        />
        <text
          x="105"
          y="170"
          textAnchor="middle"
          fontSize="8"
          fill="#7A4B26"
          letterSpacing="1.5"
        >
          STEPWELL TERRACE
        </text>

        <rect
          x="202"
          y="152"
          width="166"
          height="96"
          fill="#F3DCE0"
          stroke="#8B1E3F"
          strokeOpacity="0.35"
        />
        <text
          x="285"
          y="170"
          textAnchor="middle"
          fontSize="8"
          fill="#8B1E3F"
          letterSpacing="1.5"
        >
          LOTUS MANDAP
        </text>

        {/* Pathways */}
        <path
          d="M105 104 L295 92 M105 104 L105 204 M105 204 L268 204 M295 92 L268 204"
          fill="none"
          stroke="#C88A2E"
          strokeWidth="1"
          strokeDasharray="3 4"
          strokeOpacity="0.6"
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
                y="17"
                width="76"
                height="15"
                fill={isSelected ? "#8B1E3F" : "#FBF5EB"}
                stroke="#C88A2E"
                strokeOpacity="0.4"
              />
              <text
                x="0"
                y="27"
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
