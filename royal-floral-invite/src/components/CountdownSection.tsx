"use client";

import React, { useEffect, useState } from "react";
import { CalendarPlus, Sparkles } from "lucide-react";
import { LotusSeparator } from "./FloralOrnaments";
import ScrollReveal from "./ScrollReveal";
import { WEDDING_DETAILS } from "@/data/weddingData";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateRemaining(targetIso: string): TimeRemaining {
  const diff = Math.max(0, new Date(targetIso).getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function RadialCountdownRing({
  label,
  value,
  max,
  subtext,
}: {
  label: string;
  value: number;
  max: number;
  subtext: string;
}) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(1, Math.max(0.04, value / max));
  const offset = circumference * (1 - progress);

  return (
    <div className="group flex flex-col items-center">
      <div className="relative flex h-36 w-36 sm:h-40 sm:w-40 items-center justify-center">
        {/* Outer Decorative Dotted Halo */}
        <svg
          viewBox="0 0 144 144"
          className="absolute inset-0 h-full w-full -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="72"
            cy="72"
            r={radius + 9}
            fill="none"
            stroke="#C8943E"
            strokeOpacity="0.28"
            strokeWidth="1"
            strokeDasharray="3 5"
          />
          {/* Track Circle */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            fill="#4F0E1C"
            fillOpacity="0.96"
            stroke="#C8943E"
            strokeOpacity="0.24"
            strokeWidth="5"
          />
          {/* Animated Gold Progress Arc */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            fill="none"
            stroke="url(#goldRingGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-700 ease-out"
          />
          <defs>
            <linearGradient id="goldRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F6DF9F" />
              <stop offset="50%" stopColor="#D4A653" />
              <stop offset="100%" stopColor="#9C6A1F" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Numerals */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <span className="font-display text-4xl sm:text-[2.65rem] font-semibold leading-none text-gold-foil tabular-nums">
            {String(value).padStart(2, "0")}
          </span>
          <span className="mt-1.5 text-[10px] uppercase tracking-[0.26em] text-gold-light/90 font-semibold">
            {label}
          </span>
        </div>
      </div>

      <span className="mt-2.5 text-[10px] uppercase tracking-[0.22em] text-muted">
        {subtext}
      </span>
    </div>
  );
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 80,
    hours: 12,
    minutes: 30,
    seconds: 0,
  });

  useEffect(() => {
    const initialTick = window.setTimeout(() => {
      setTimeLeft(calculateRemaining(WEDDING_DETAILS.weddingTargetISO));
    }, 0);
    const timer = window.setInterval(() => {
      setTimeLeft(calculateRemaining(WEDDING_DETAILS.weddingTargetISO));
    }, 1000);
    return () => {
      window.clearTimeout(initialTick);
      window.clearInterval(timer);
    };
  }, []);

  const handleSaveCalendar = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ananya & Vivaan Wedding//EN",
      "BEGIN:VEVENT",
      "UID:ananya-vivaan-royal-wedding@wedding-invite",
      "DTSTAMP:20261126T120000Z",
      "DTSTART:20270214T160000",
      "DTEND:20270216T235900",
      `SUMMARY:${WEDDING_DETAILS.bride} & ${WEDDING_DETAILS.groom} — Royal Wedding Celebration`,
      `LOCATION:${WEDDING_DETAILS.venueName}, ${WEDDING_DETAILS.venueAddress}`,
      `DESCRIPTION:${WEDDING_DETAILS.welcomeVerse}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Ananya-Vivaan-Wedding-Invite.ics";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="countdown"
      className="relative overflow-hidden bg-cream py-20 px-4 sm:px-8 text-maroon border-y border-gold/45"
    >
      <div className="pointer-events-none absolute inset-0 bg-jaali-pattern opacity-45" />

      <ScrollReveal className="relative z-10 mx-auto max-w-5xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-ivory/90 px-4 py-1 text-[11px] uppercase tracking-[0.28em] text-gold-dark font-semibold">
          <Sparkles className="h-3.5 w-3.5 text-maroon" />
          Shubh Muhurat · 15 Feb 2027 · 7:00 PM
        </span>

        <h2 className="mt-4 font-display text-3xl sm:text-5xl font-semibold text-maroon">
          Until We Tie The Sacred Knot
        </h2>

        <LotusSeparator />

        {/* Celestial Gold-Arc Rings Connected by Hairline Rule */}
        <div className="relative mt-10 mx-auto max-w-4xl">
          <div
            className="pointer-events-none hidden md:block absolute top-20 inset-x-16 h-[1px] bg-gradient-to-r from-transparent via-gold/65 to-transparent"
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
            <RadialCountdownRing
              label="Days"
              value={timeLeft.days}
              max={120}
              subtext="Sunrises Left"
            />
            <RadialCountdownRing
              label="Hours"
              value={timeLeft.hours}
              max={24}
              subtext="Of Anticipation"
            />
            <RadialCountdownRing
              label="Minutes"
              value={timeLeft.minutes}
              max={60}
              subtext="Closer Together"
            />
            <RadialCountdownRing
              label="Seconds"
              value={timeLeft.seconds}
              max={60}
              subtext="Ticking Now"
            />
          </div>
        </div>

        <div className="mt-11">
          <button
            type="button"
            onClick={handleSaveCalendar}
            className="shimmer-btn inline-flex items-center gap-2 rounded-full bg-royal-velvet px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-gold-light shadow-lg transition hover:scale-[1.03]"
          >
            <CalendarPlus className="h-4 w-4" />
            Add Wedding Dates to Calendar
          </button>
        </div>
      </ScrollReveal>
    </section>
  );
}
