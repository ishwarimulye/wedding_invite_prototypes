"use client";

import React, { useEffect, useState } from "react";
import { CalendarPlus } from "lucide-react";
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

  const blocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section
      id="countdown"
      className="relative overflow-hidden bg-cream py-20 px-4 sm:px-8 text-maroon border-y border-gold/40"
    >
      <div className="pointer-events-none absolute inset-0 bg-jaali-pattern opacity-45" />

      <ScrollReveal className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="text-xs uppercase tracking-[0.34em] text-gold-dark font-semibold">
          Counting Every Heartbeat
        </p>
        <h2 className="mt-3 font-display text-3xl sm:text-5xl font-semibold text-maroon">
          Until We Tie The Sacred Knot
        </h2>

        <LotusSeparator />

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {blocks.map((item, idx) => (
            <div
              key={item.label}
              style={{ transitionDelay: `${idx * 90}ms` }}
              className="relative overflow-hidden rounded-t-[90px] rounded-b-2xl border-2 border-gold/65 bg-royal-velvet px-4 py-7 text-ivory shadow-[0_18px_45px_rgba(79,14,28,0.22)] transition duration-300 hover:-translate-y-1"
            >
              <div className="pointer-events-none absolute inset-1.5 rounded-t-[82px] rounded-b-xl border border-gold/35" />
              <span className="block font-display text-4xl sm:text-5xl font-semibold text-gold-foil tabular-nums">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="mt-2 block text-[11px] uppercase tracking-[0.26em] text-gold-light/90">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10">
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
