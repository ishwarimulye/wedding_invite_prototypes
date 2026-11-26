"use client";

import React, { useState } from "react";
import { CalendarPlus, Clock, MapPin, Shirt, Sparkles } from "lucide-react";
import { LotusSeparator } from "./FloralOrnaments";
import ScrollReveal from "./ScrollReveal";
import { WEDDING_EVENTS, WeddingEvent } from "@/data/weddingData";

const FILTERS: Array<"All" | "Day 1" | "Day 2" | "Day 3"> = [
  "All",
  "Day 1",
  "Day 2",
  "Day 3",
];

function downloadEventIcs(ev: WeddingEvent) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ananya & Vivaan Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${ev.id}@ananya-vivaan-wedding`,
    `DTSTART:${ev.isoStart}`,
    `DTEND:${ev.isoEnd}`,
    `SUMMARY:${ev.title} — Ananya & Vivaan`,
    `LOCATION:${ev.venue}, Udaipur`,
    `DESCRIPTION:${ev.description} Attire: ${ev.attire}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${ev.id}.ics`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function EventsSection() {
  const [activeDay, setActiveDay] = useState<"All" | "Day 1" | "Day 2" | "Day 3">(
    "All"
  );

  const visibleEvents =
    activeDay === "All"
      ? WEDDING_EVENTS
      : WEDDING_EVENTS.filter((e) => e.day === activeDay);

  return (
    <section
      id="events"
      className="relative overflow-hidden bg-royal-emerald py-24 px-4 sm:px-8 text-ivory"
    >
      <div className="pointer-events-none absolute inset-0 bg-jaali-pattern opacity-25" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.34em] text-gold-light font-semibold">
            The Royal Itinerary
          </p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-ivory">
            Three Days of Floral Splendor
          </h2>
          <LotusSeparator light />
          <p className="text-sm sm:text-base text-ivory/80 leading-relaxed">
            From sunlit marigold courtyards to candlelit Vedic pheras, every
            ceremony awaits your warm presence.
          </p>
        </ScrollReveal>

        {/* Day Filter Tabs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
          {FILTERS.map((day) => {
            const active = activeDay === day;
            return (
              <button
                key={day}
                type="button"
                onClick={() => setActiveDay(day)}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                  active
                    ? "bg-gold-foil text-maroon-deep shadow-[0_8px_25px_rgba(241,212,142,0.3)] scale-105"
                    : "border border-gold/55 bg-ivory/10 text-gold-light hover:bg-ivory/20"
                }`}
              >
                {day === "All"
                  ? "All Ceremonies"
                  : day === "Day 1"
                  ? "Day 1 • Feb 14"
                  : day === "Day 2"
                  ? "Day 2 • Feb 15"
                  : "Day 3 • Feb 16"}
              </button>
            );
          })}
        </div>

        {/* Events Grid */}
        <div className="mt-12 grid gap-7 md:grid-cols-2">
          {visibleEvents.map((ev, idx) => (
            <ScrollReveal key={ev.id} delayMs={idx * 90}>
              <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border-2 border-gold/65 bg-ivory/96 p-6 sm:p-8 text-ink shadow-[0_20px_60px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1.5 hover:border-gold-light">
                {/* Top Jewel Ribbon */}
                <div
                  className="absolute top-0 inset-x-0 h-2"
                  style={{ backgroundColor: ev.accentColor }}
                />

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/60 bg-cream px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-maroon">
                      <Sparkles className="h-3 w-3 text-gold-dark" />
                      {ev.day} • {ev.dateLabel}
                    </span>
                    <span className="text-xs font-medium text-maroon/80">
                      {ev.hindiTag}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-3xl font-semibold text-maroon">
                    {ev.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {ev.description}
                  </p>

                  {/* Metadata Grid */}
                  <div className="mt-5 space-y-2.5 rounded-2xl border border-gold/40 bg-cream/65 p-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-2.5 text-ink">
                      <Clock className="h-4 w-4 shrink-0 text-gold-dark" />
                      <span className="font-medium">{ev.time}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-ink">
                      <MapPin className="h-4 w-4 shrink-0 text-gold-dark" />
                      <span>{ev.venue}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-ink">
                      <Shirt className="h-4 w-4 shrink-0 text-gold-dark" />
                      <span>
                        <strong className="font-semibold text-maroon">Attire:</strong>{" "}
                        {ev.attire}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {ev.highlights.map((hl) => (
                      <span
                        key={hl}
                        className="rounded-full border border-gold/30 bg-parchment/70 px-3 py-1 text-[11px] font-medium text-maroon"
                      >
                        {hl}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gold/35 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
                    Udaipur Palace Wing
                  </span>
                  <button
                    type="button"
                    onClick={() => downloadEventIcs(ev)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-maroon hover:text-gold-dark transition"
                  >
                    <CalendarPlus className="h-3.5 w-3.5" />
                    Save Ceremony
                  </button>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
