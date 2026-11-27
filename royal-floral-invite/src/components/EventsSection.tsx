"use client";

import React, { useState } from "react";
import { CalendarPlus, Clock, MapPin, Shirt } from "lucide-react";
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
      className="relative overflow-hidden bg-royal-emerald py-14 px-4 sm:px-8 text-ivory"
    >
      <div className="pointer-events-none absolute inset-0 bg-jaali-pattern opacity-25" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <ScrollReveal className="text-center max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-[0.34em] text-gold-light font-semibold">
            The Royal Itinerary
          </p>
          <h2 className="mt-1.5 font-display text-3xl sm:text-4xl font-semibold text-ivory">
            Three Days of Celebrations
          </h2>
          <LotusSeparator light />
        </ScrollReveal>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((day) => {
            const active = activeDay === day;
            return (
              <button
                key={day}
                type="button"
                onClick={() => setActiveDay(day)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                  active
                    ? "bg-gold-foil text-maroon-deep shadow-md"
                    : "border border-gold/55 bg-ivory/10 text-gold-light hover:bg-ivory/20"
                }`}
              >
                {day === "All"
                  ? "All"
                  : day === "Day 1"
                  ? "Day 1 · Feb 14"
                  : day === "Day 2"
                  ? "Day 2 · Feb 15"
                  : "Day 3 · Feb 16"}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {visibleEvents.map((ev) => (
            <article
              key={ev.id}
              className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-gold/60 bg-ivory/96 p-5 sm:p-6 text-ink shadow-lg"
            >
              <div
                className="absolute top-0 inset-x-0 h-1.5"
                style={{ backgroundColor: ev.accentColor }}
              />

              <div>
                <div className="flex items-center justify-between gap-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-maroon">
                  <span>{ev.dateLabel}</span>
                  <span className="text-gold-dark">{ev.hindiTag}</span>
                </div>

                <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-maroon">
                  {ev.title}
                </h3>

                <div className="mt-3 space-y-1.5 text-xs sm:text-sm text-ink/90">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 shrink-0 text-gold-dark" />
                    <span className="font-medium">{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-dark" />
                    <span>{ev.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shirt className="h-3.5 w-3.5 shrink-0 text-gold-dark" />
                    <span>{ev.attire}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gold/30 flex justify-end">
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
          ))}
        </div>
      </div>
    </section>
  );
}
