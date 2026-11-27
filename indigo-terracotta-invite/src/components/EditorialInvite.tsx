"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarPlus, Check, MapPin, Share2 } from "lucide-react";
import RevealBlock from "./RevealBlock";
import FlipPostcardGallery from "./FlipPostcardGallery";
import PalaceCourtyardMap from "./PalaceCourtyardMap";
import GuestPassCard from "./GuestPassCard";
import {
  CEREMONIES,
  Ceremony,
  INITIAL_RSVPS,
  INVITE_INFO,
  POSTCARD_STORIES,
  RsvpEntry,
} from "@/data/inviteData";

function computeCountdown(iso: string) {
  const diff = Math.max(0, new Date(iso).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    mins: Math.floor((diff / (1000 * 60)) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
}

function downloadCeremonyIcs(c: Ceremony) {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Meera & Kabir Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${c.code}-meera-kabir@jodhpur`,
    `DTSTART:${c.isoStart}`,
    `DTEND:${c.isoEnd}`,
    `SUMMARY:${c.title} — Meera & Kabir`,
    `LOCATION:${c.location}, ${INVITE_INFO.venue}, ${INVITE_INFO.city}`,
    `DESCRIPTION:${c.note} Attire: ${c.attire}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `meera-kabir-${c.code}.ics`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function EditorialInvite({ guestName }: { guestName: string }) {
  const [countdown, setCountdown] = useState({
    days: 359,
    hours: 10,
    mins: 24,
    secs: 0,
  });
  const [activeCode, setActiveCode] = useState(CEREMONIES[0].code);
  const [copiedShare, setCopiedShare] = useState(false);

  const [entries, setEntries] = useState<RsvpEntry[]>(INITIAL_RSVPS);
  const [name, setName] = useState(guestName === "Beloved Guest" ? "" : guestName);
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState(2);
  const [dietary, setDietary] = useState("Pure Vegetarian");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const t0 = window.setTimeout(
      () => setCountdown(computeCountdown(INVITE_INFO.targetISO)),
      0
    );
    const interval = window.setInterval(
      () => setCountdown(computeCountdown(INVITE_INFO.targetISO)),
      1000
    );
    return () => {
      window.clearTimeout(t0);
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    fetch("/api/rsvp")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (mounted && Array.isArray(data?.entries)) {
          setEntries(data.entries);
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const activeCeremony =
    CEREMONIES.find((c) => c.code === activeCode) ?? CEREMONIES[0];

  const handleRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving || !name.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          attending,
          guests,
          dietary,
          note: note.trim(),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.entries)) setEntries(data.entries);
      }
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  const handleCopyInvite = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      window.setTimeout(() => setCopiedShare(false), 2400);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <div className="bg-garden-gradient text-berry-ink">
      {/* Printed Patrika Header */}
      <header className="mx-auto max-w-6xl px-5 sm:px-8 pt-7">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-honey-gold/45 pb-3.5 text-[11px] uppercase tracking-[0.26em] text-berry">
          <span className="font-semibold">{INVITE_INFO.invocation}</span>
          <span className="font-display text-sm sm:text-base font-medium tracking-widest normal-case">
            {INVITE_INFO.brideFirst} &amp; {INVITE_INFO.groomFirst}
          </span>
          <span className="text-sage font-medium">{INVITE_INFO.dates}</span>
        </div>
      </header>

      {/* Section 1: Main Invitation Card */}
      <section className="px-4 sm:px-8 pt-8 pb-14">
        <div className="relative mx-auto max-w-6xl border border-honey-gold/65 bg-petal-milk p-6 sm:p-11 lg:p-14 shadow-[0_22px_65px_rgba(94,17,41,0.1)]">
          <div className="pointer-events-none absolute inset-3 border border-honey-gold/30" />

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start">
              <p className="text-xs uppercase tracking-[0.24em] text-sage font-medium">
                Dear {guestName},
              </p>

              <h1 className="mt-4 font-display text-5xl sm:text-7xl font-medium leading-[1.02] text-berry">
                {INVITE_INFO.brideFirst}
                <span className="mx-3 font-script text-5xl sm:text-6xl text-gold-shimmer font-normal">
                  &amp;
                </span>
                {INVITE_INFO.groomFirst}
              </h1>

              <p className="mt-5 text-sm leading-relaxed text-muted max-w-md">
                {INVITE_INFO.families}
              </p>

              <div className="my-6 h-[1px] w-20 bg-honey-gold/60" />

              <p className="text-xs uppercase tracking-[0.22em] text-berry font-medium">
                {INVITE_INFO.dates} · {INVITE_INFO.venue}, {INVITE_INFO.city}
              </p>

              {/* Understated Countdown */}
              <div className="mt-6 flex items-baseline gap-5 border-y border-honey-gold/40 py-3 font-display text-2xl sm:text-3xl text-berry tabular-nums">
                <span>
                  {countdown.days}
                  <small className="ml-1 font-sans text-[10px] uppercase tracking-widest text-muted">
                    d
                  </small>
                </span>
                <span className="text-honey-gold">·</span>
                <span>
                  {String(countdown.hours).padStart(2, "0")}
                  <small className="ml-1 font-sans text-[10px] uppercase tracking-widest text-muted">
                    h
                  </small>
                </span>
                <span className="text-honey-gold">·</span>
                <span>
                  {String(countdown.mins).padStart(2, "0")}
                  <small className="ml-1 font-sans text-[10px] uppercase tracking-widest text-muted">
                    m
                  </small>
                </span>
                <span className="text-honey-gold">·</span>
                <span>
                  {String(countdown.secs).padStart(2, "0")}
                  <small className="ml-1 font-sans text-[10px] uppercase tracking-widest text-muted">
                    s
                  </small>
                </span>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href="#courtyard"
                  className="border border-berry bg-berry px-7 py-3 text-xs font-medium uppercase tracking-[0.22em] text-petal-milk transition hover:bg-berry-deep"
                >
                  Schedule
                </a>
                <a
                  href="#rsvp"
                  className="border border-honey-gold/75 bg-transparent px-7 py-3 text-xs font-medium uppercase tracking-[0.22em] text-berry transition hover:bg-blush-silk"
                >
                  RSVP
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md border border-honey-gold/60 bg-blush-silk p-3">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src="/images/jodhpur-hero.jpg"
                    alt="Sandstone haveli archway with bougainvillea in Jodhpur"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 448px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Flippable Postcards */}
      <section id="postcards" className="px-4 sm:px-8 py-12">
        <div className="mx-auto max-w-6xl">
          <RevealBlock className="flex flex-wrap items-end justify-between gap-4 border-b border-honey-gold/40 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-sage font-medium">
                Keepsake Notes
              </p>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl font-medium text-berry">
                Four Moments
              </h2>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Click any postcard to read the reverse
            </p>
          </RevealBlock>

          <div className="mt-8">
            <FlipPostcardGallery postcards={POSTCARD_STORIES} />
          </div>
        </div>
      </section>

      {/* Section 3: Estate Map & 4 Ceremonies */}
      <section id="courtyard" className="px-4 sm:px-8 py-12">
        <RevealBlock className="mx-auto max-w-6xl bg-berry-garden p-6 sm:p-11 text-petal-milk shadow-[0_24px_70px_rgba(94,17,41,0.22)]">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-petal-milk/20 pb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-blush-silk/80">
                {INVITE_INFO.venue}
              </p>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl font-medium">
                Ceremonies &amp; Grounds
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {CEREMONIES.map((c) => {
                const active = c.code === activeCeremony.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setActiveCode(c.code)}
                    className={`px-4 py-2 text-xs uppercase tracking-[0.18em] border transition ${
                      active
                        ? "border-petal-milk bg-petal-milk text-berry font-semibold"
                        : "border-petal-milk/30 text-petal-milk hover:border-petal-milk"
                    }`}
                  >
                    {c.code} · {c.shortTitle}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <PalaceCourtyardMap
                activeCeremony={activeCeremony}
                onSelect={setActiveCode}
              />
            </div>

            <div
              key={activeCeremony.code}
              className="lg:col-span-6 animate-panel-pop border border-petal-milk/20 bg-petal-milk p-6 sm:p-8 text-berry-ink"
            >
              <div className="relative mb-5 aspect-[16/9] w-full overflow-hidden border border-honey-gold/40">
                <Image
                  src={activeCeremony.image}
                  alt={activeCeremony.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.2em] text-sage font-medium">
                <span>
                  {activeCeremony.day} · {activeCeremony.time}
                </span>
                <span>{activeCeremony.location}</span>
              </div>

              <h3 className="mt-2 font-display text-3xl font-medium text-berry">
                {activeCeremony.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted">
                {activeCeremony.note}
              </p>

              <div className="mt-5 border-t border-honey-gold/30 pt-4">
                <p className="text-xs text-berry-ink">
                  <span className="uppercase tracking-[0.18em] text-sage font-medium">
                    Attire:
                  </span>{" "}
                  {activeCeremony.attire}
                </p>
                <div className="mt-3 flex flex-wrap gap-4">
                  {activeCeremony.swatches.map((sw) => (
                    <div key={sw.name} className="flex items-center gap-2">
                      <span
                        className="h-3.5 w-3.5 border border-berry/25"
                        style={{ backgroundColor: sw.hex }}
                      />
                      <span className="text-xs text-muted">{sw.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-honey-gold/30 pt-4">
                <button
                  type="button"
                  onClick={() => downloadCeremonyIcs(activeCeremony)}
                  className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-berry hover:text-coral-rose transition"
                >
                  <CalendarPlus className="h-3.5 w-3.5" />
                  Add to Calendar
                </button>
                <span className="text-xs text-muted">
                  {activeCeremony.code} / 04
                </span>
              </div>
            </div>
          </div>

          {/* 4-Ceremony Index Strip */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 border-t border-petal-milk/20 pt-6 text-left">
            {CEREMONIES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => setActiveCode(c.code)}
                className={`border p-4 transition text-left ${
                  c.code === activeCeremony.code
                    ? "border-petal-milk bg-petal-milk/12"
                    : "border-petal-milk/20 hover:border-petal-milk/50"
                }`}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-blush-silk/80">
                  {c.day}
                </p>
                <p className="mt-1 font-display text-xl font-medium text-petal-milk">
                  {c.title}
                </p>
                <p className="mt-0.5 text-xs text-blush-silk/75">{c.location}</p>
              </button>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* Section 4: Stay & Travel Ledger */}
      <section id="venue" className="px-4 sm:px-8 py-12">
        <RevealBlock className="mx-auto max-w-6xl border border-honey-gold/55 bg-petal-milk p-6 sm:p-11">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-honey-gold/45">
                <Image
                  src="/images/jodhpur-table.jpg"
                  alt="Courtyard dining table at Umaid Heritage Haveli"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-xs uppercase tracking-[0.26em] text-sage font-medium">
                Stay &amp; Travel
              </p>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl font-medium text-berry">
                {INVITE_INFO.venue}
              </h2>

              <dl className="mt-5 divide-y divide-honey-gold/35 border-y border-honey-gold/35 text-sm">
                <div className="grid sm:grid-cols-3 gap-2 py-3.5">
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                    Address
                  </dt>
                  <dd className="sm:col-span-2 text-berry-ink">
                    {INVITE_INFO.address}
                  </dd>
                </div>
                <div className="grid sm:grid-cols-3 gap-2 py-3.5">
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                    Check-In
                  </dt>
                  <dd className="sm:col-span-2 text-berry-ink">
                    {INVITE_INFO.checkInWindow}
                  </dd>
                </div>
                <div className="grid sm:grid-cols-3 gap-2 py-3.5">
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                    Arrivals
                  </dt>
                  <dd className="sm:col-span-2 text-berry-ink">
                    {INVITE_INFO.conciergeNote}
                  </dd>
                </div>
                <div className="grid sm:grid-cols-3 gap-2 py-3.5">
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                    Weather
                  </dt>
                  <dd className="sm:col-span-2 text-berry-ink">
                    26°C days, 13°C evenings — pack a shawl for the pheras and
                    dinner.
                  </dd>
                </div>
              </dl>

              <a
                href={INVITE_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 border border-berry px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-berry transition hover:bg-berry hover:text-petal-milk"
              >
                <MapPin className="h-3.5 w-3.5" />
                View Map
              </a>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* Section 5: RSVP & Keepsake Pass */}
      <section id="rsvp" className="px-4 sm:px-8 pt-8 pb-16">
        <div className="mx-auto max-w-6xl space-y-10">
          <RevealBlock className="relative border border-honey-gold/65 bg-petal-milk p-6 sm:p-11">
            <div className="pointer-events-none absolute inset-3 border border-honey-gold/30" />

            {saved ? (
              <div className="relative z-10 py-6 text-center animate-panel-pop">
                <p className="font-script text-4xl text-berry">
                  Thank you, {name}
                </p>
                <p className="mt-1 text-sm text-muted">
                  Your response has been recorded. You may download your
                  invitation pass below.
                </p>

                <GuestPassCard
                  guestName={name.trim() || guestName}
                  guests={guests}
                  attending={attending}
                  dietary={attending === "yes" ? dietary : undefined}
                />

                <button
                  type="button"
                  onClick={() => setSaved(false)}
                  className="mt-6 border border-berry/40 px-5 py-2 text-xs uppercase tracking-[0.2em] text-berry hover:bg-blush-silk"
                >
                  Edit Response
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleRsvp}
                className="relative z-10 mx-auto max-w-3xl space-y-6"
              >
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.26em] text-sage font-medium">
                    Kindly reply by 10 October 2027
                  </p>
                  <h2 className="mt-1 font-display text-4xl sm:text-5xl font-medium text-berry">
                    RSVP
                  </h2>
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-muted">
                      Name / Family
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Aarav & Priya Verma"
                      className="mt-1.5 w-full border-b border-honey-gold/60 bg-transparent py-2.5 text-sm outline-none focus:border-berry"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-muted">
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="mt-1.5 w-full border-b border-honey-gold/60 bg-transparent py-2.5 text-sm outline-none focus:border-berry"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={5}>5+ Family</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.2em] text-muted">
                      Dining
                    </label>
                    <select
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      className="mt-1.5 w-full border-b border-honey-gold/60 bg-transparent py-2.5 text-sm outline-none focus:border-berry"
                    >
                      <option>Pure Vegetarian</option>
                      <option>Jain Meal</option>
                      <option>Standard Menu</option>
                      <option>Vegan / Gluten-Free</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <button
                    type="button"
                    onClick={() => setAttending("yes")}
                    className={`border px-4 py-3 text-xs font-medium uppercase tracking-[0.2em] transition ${
                      attending === "yes"
                        ? "border-berry bg-berry text-petal-milk"
                        : "border-honey-gold/55 text-berry hover:bg-blush-silk"
                    }`}
                  >
                    Attending
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending("no")}
                    className={`border px-4 py-3 text-xs font-medium uppercase tracking-[0.2em] transition ${
                      attending === "no"
                        ? "border-sage bg-sage text-petal-milk"
                        : "border-honey-gold/55 text-berry hover:bg-blush-silk"
                    }`}
                  >
                    Unable to Attend
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-muted">
                    Arrival Time or Note
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Optional flight details or message for the families"
                    className="mt-1.5 w-full border-b border-honey-gold/60 bg-transparent py-2.5 text-sm outline-none focus:border-berry"
                  />
                </div>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="border border-berry bg-berry px-10 py-3.5 text-xs font-medium uppercase tracking-[0.24em] text-petal-milk transition hover:bg-berry-deep disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Confirm & Generate Pass"}
                  </button>
                </div>
              </form>
            )}
          </RevealBlock>

          {/* Guest Notes */}
          <div className="grid gap-5 md:grid-cols-2">
            {entries.slice(0, 4).map((entry) => (
              <div
                key={entry.id}
                className="border border-honey-gold/45 bg-petal-milk p-6"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-xl font-medium text-berry">
                    {entry.name}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-sage">
                    {entry.attending === "yes"
                      ? `${entry.guests} Attending`
                      : "Sending Wishes"}
                  </span>
                </div>
                <p className="mt-2 text-sm italic leading-relaxed text-muted">
                  &ldquo;{entry.note}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-berry-garden py-12 px-4 text-center text-petal-milk">
        <p className="font-script text-4xl text-blush-silk">
          With warm regards
        </p>
        <p className="mt-2 font-display text-2xl font-medium">
          The Rathore &amp; Mehta Families
        </p>

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={handleCopyInvite}
            className="inline-flex items-center gap-2 border border-petal-milk/40 px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-petal-milk transition hover:bg-petal-milk/10"
          >
            {copiedShare ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Share2 className="h-3.5 w-3.5" />
            )}
            {copiedShare ? "Link Copied" : "Share Invitation"}
          </button>
        </div>

        <p className="mt-6 text-[11px] uppercase tracking-[0.24em] text-blush-silk/70">
          {INVITE_INFO.brideFirst} &amp; {INVITE_INFO.groomFirst} ·{" "}
          {INVITE_INFO.dates} · {INVITE_INFO.city}
        </p>
      </footer>
    </div>
  );
}
