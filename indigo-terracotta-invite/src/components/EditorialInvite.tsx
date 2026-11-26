"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  CalendarPlus,
  Check,
  Expand,
  Flower2,
  Heart,
  MapPin,
  Plane,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import {
  BloomingGarlandCorner,
  DriftingGardenPetals,
  FloralDivider,
} from "./GardenFlorals";
import RevealBlock from "./RevealBlock";
import {
  CEREMONIES,
  Ceremony,
  GALLERY_MOMENTS,
  INITIAL_RSVPS,
  INVITE_INFO,
  RsvpEntry,
  STORY_MOMENTS,
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
    `DESCRIPTION:${c.note} Dress: ${c.dressLabel}`,
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

const CONFETTI = [
  { left: "15%", dx: "-35px", delay: "0s", color: "#D66863" },
  { left: "30%", dx: "28px", delay: "0.08s", color: "#E29B4D" },
  { left: "48%", dx: "-18px", delay: "0.04s", color: "#4B7864" },
  { left: "65%", dx: "36px", delay: "0.12s", color: "#F3D7CF" },
  { left: "82%", dx: "-25px", delay: "0.06s", color: "#6B213B" },
];

export default function EditorialInvite({ guestName }: { guestName: string }) {
  const [countdown, setCountdown] = useState({
    days: 359,
    hours: 10,
    mins: 24,
    secs: 0,
  });
  const [activeCode, setActiveCode] = useState(CEREMONIES[0].code);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const [entries, setEntries] = useState<RsvpEntry[]>(INITIAL_RSVPS);
  const [name, setName] = useState(guestName === "Beloved Guest" ? "" : guestName);
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState(2);
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
          note: note.trim(),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.entries)) {
          setEntries(data.entries);
        }
      }
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative bg-garden-gradient text-berry-ink">
      <DriftingGardenPetals />

      {/* Subtle Modern Stationery Masthead */}
      <header className="mx-auto max-w-6xl px-5 sm:px-8 pt-6">
        <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-honey-gold/35 pb-4 text-[11px] uppercase tracking-[0.24em] text-berry/80">
          <span className="font-display text-base font-semibold tracking-wider text-berry normal-case">
            {INVITE_INFO.bride} &amp; {INVITE_INFO.groom}
          </span>
          <div className="flex flex-wrap items-center gap-5 sm:gap-7 font-medium">
            <a href="#story" className="hover:text-coral-rose transition">
              Story
            </a>
            <a href="#celebrations" className="hover:text-coral-rose transition">
              Celebrations
            </a>
            <a href="#gallery" className="hover:text-coral-rose transition">
              Gallery
            </a>
            <a href="#venue" className="hover:text-coral-rose transition">
              Venue
            </a>
            <a
              href="#rsvp"
              className="rounded-full bg-berry px-4 py-1.5 text-petal-milk hover:bg-coral-rose transition"
            >
              RSVP
            </a>
          </div>
        </nav>
      </header>

      {/* Section 1: Airy Modern Floral Hero */}
      <section className="relative overflow-hidden px-4 sm:px-8 pt-10 pb-20">
        <div className="relative mx-auto max-w-6xl rounded-[2.5rem] border border-honey-gold/45 bg-petal-milk/88 p-6 sm:p-12 lg:p-14 shadow-[0_24px_80px_rgba(70,17,37,0.08)] backdrop-blur-md">
          <BloomingGarlandCorner
            position="top-left"
            className="absolute -top-3 -left-3 h-32 w-32 sm:h-44 sm:w-44 opacity-90"
          />
          <BloomingGarlandCorner
            position="bottom-right"
            className="absolute -bottom-3 -right-3 h-28 w-28 sm:h-40 sm:w-40 opacity-80"
          />

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start">
              <span className="inline-flex items-center gap-2 rounded-full bg-blush-silk border border-honey-gold/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-sage">
                <Flower2 className="h-3.5 w-3.5 text-coral-rose" />
                Warmly Welcoming {guestName}
              </span>

              <p className="mt-6 font-script text-3xl sm:text-4xl text-sage">
                With the blessings of our families
              </p>

              <h1 className="mt-2 font-display text-5xl sm:text-7xl font-semibold leading-[1.02] text-berry">
                {INVITE_INFO.bride}
                <span className="mx-3 font-script text-5xl sm:text-6xl text-coral-rose font-normal">
                  &amp;
                </span>
                {INVITE_INFO.groom}
              </h1>

              <p className="mt-3 text-xs sm:text-sm text-muted max-w-md leading-relaxed">
                {INVITE_INFO.families}
              </p>

              <div className="lg:self-start">
                <FloralDivider />
              </div>

              <p className="text-base sm:text-lg font-display italic text-berry-ink/90 max-w-md leading-relaxed">
                &ldquo;We joyfully invite you to gather beneath Jodhpur&apos;s
                blooming bougainvillea arches as we begin our forever.&rdquo;
              </p>

              {/* Refined Countdown Strip */}
              <div className="mt-7 grid grid-cols-4 gap-3 w-full max-w-md">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Mins", value: countdown.mins },
                  { label: "Secs", value: countdown.secs },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-honey-gold/40 bg-white/75 py-3.5 px-2 text-center shadow-sm"
                  >
                    <span className="block font-display text-2xl sm:text-3xl font-semibold text-berry tabular-nums">
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-sage font-semibold">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                <a
                  href="#celebrations"
                  className="inline-flex items-center gap-2 rounded-full bg-berry-garden px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-petal-milk shadow-md transition hover:scale-[1.03]"
                >
                  <Sparkles className="h-3.5 w-3.5 text-marigold" />
                  Explore Weekend
                </a>
                <a
                  href="#rsvp"
                  className="inline-flex items-center gap-2 rounded-full border border-sage/45 bg-white/80 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-sage transition hover:bg-sage hover:text-petal-milk"
                >
                  <Heart className="h-3.5 w-3.5" />
                  RSVP With Love
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="overflow-hidden rounded-t-[220px] rounded-b-[2rem] border border-honey-gold/60 bg-blush-silk p-3 shadow-[0_26px_70px_rgba(70,17,37,0.14)]">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[208px] rounded-b-[1.4rem]">
                    <Image
                      src="/images/jodhpur-hero.jpg"
                      alt="Sunlit Jodhpur courtyard archway with coral bougainvillea and cream roses"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 448px"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="animate-float-badge -mt-7 mx-auto w-fit rounded-full border border-honey-gold/60 bg-petal-milk px-7 py-2.5 text-center shadow-lg">
                  <p className="text-[10px] uppercase tracking-[0.26em] text-coral-rose font-semibold">
                    {INVITE_INFO.venue}
                  </p>
                  <p className="font-display text-base font-semibold text-berry">
                    {INVITE_INFO.dates} · {INVITE_INFO.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Our Story ("How Forever Began") */}
      <section id="story" className="px-4 sm:px-8 py-16">
        <div className="mx-auto max-w-6xl">
          <RevealBlock className="text-center max-w-2xl mx-auto">
            <p className="font-script text-3xl sm:text-4xl text-sage">
              From Mumbai to Jodhpur
            </p>
            <h2 className="mt-1 font-display text-4xl sm:text-5xl font-semibold text-berry">
              How Forever Began
            </h2>
            <FloralDivider />
          </RevealBlock>

          <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
            <RevealBlock className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm overflow-hidden rounded-t-[180px] rounded-b-3xl border border-honey-gold/55 bg-blush-silk p-3 shadow-[0_20px_60px_rgba(70,17,37,0.12)]">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[168px] rounded-b-2xl">
                  <Image
                    src="/images/couple-garden.jpg"
                    alt="Meera and Kabir walking hand-in-hand through a sunlit rose and olive garden"
                    fill
                    sizes="(max-width: 1024px) 100vw, 384px"
                    className="object-cover"
                  />
                </div>
              </div>
            </RevealBlock>

            <div className="lg:col-span-7 space-y-5">
              {STORY_MOMENTS.map((item, idx) => (
                <RevealBlock key={item.step} delayMs={idx * 90}>
                  <div className="rounded-3xl border border-honey-gold/35 bg-white/75 p-6 sm:p-7 shadow-sm backdrop-blur-sm transition hover:border-coral-rose/50 hover:shadow-md">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-coral-rose">
                        {item.step} · {item.date}
                      </span>
                      <span className="text-xs font-medium text-sage">
                        {item.place}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-berry">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.text}
                    </p>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Interactive Celebration Storyboard */}
      <section id="celebrations" className="px-4 sm:px-8 py-14">
        <RevealBlock className="mx-auto max-w-6xl rounded-[2.5rem] bg-berry-garden p-6 sm:p-12 text-petal-milk shadow-[0_28px_85px_rgba(61,13,31,0.28)]">
          <div className="text-center max-w-xl mx-auto">
            <p className="font-script text-3xl sm:text-4xl text-marigold">
              Three Joyful Gatherings
            </p>
            <h2 className="mt-1 font-display text-4xl sm:text-5xl font-semibold">
              The Wedding Weekend
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-petal-milk/80">
              Select a ceremony below for timings, dress palette, and calendar
              save.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {CEREMONIES.map((c) => {
              const active = c.code === activeCeremony.code;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setActiveCode(c.code)}
                  className={`rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                    active
                      ? "bg-petal-milk text-berry shadow-lg scale-105"
                      : "border border-petal-milk/35 bg-petal-milk/10 text-petal-milk hover:bg-petal-milk/20"
                  }`}
                >
                  {c.day} · {c.title}
                </button>
              );
            })}
          </div>

          <div
            key={activeCeremony.code}
            className="animate-panel-pop mt-9 grid items-center gap-8 rounded-3xl border border-petal-milk/20 bg-petal-milk/96 p-5 sm:p-9 text-berry-ink lg:grid-cols-12"
          >
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-honey-gold/45 shadow-md">
                <Image
                  src={activeCeremony.image}
                  alt={activeCeremony.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-coral-rose">
                <span>{activeCeremony.time}</span>
                <span>•</span>
                <span className="text-sage">{activeCeremony.location}</span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-semibold text-berry">
                {activeCeremony.title}
              </h3>

              <p className="font-script text-2xl text-sage">
                {activeCeremony.vibe}
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-muted">
                {activeCeremony.note}
              </p>

              <div className="rounded-2xl bg-blush-silk/85 p-4 border border-honey-gold/30">
                <p className="text-[11px] uppercase tracking-[0.2em] text-berry font-semibold">
                  Dress Mood: {activeCeremony.dressLabel}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-4">
                  {activeCeremony.swatches.map((sw) => (
                    <div key={sw.name} className="flex items-center gap-2">
                      <span
                        className="h-5 w-5 rounded-full border border-berry/20 shadow-sm"
                        style={{ backgroundColor: sw.hex }}
                      />
                      <span className="text-xs font-medium text-berry-ink">
                        {sw.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => downloadCeremonyIcs(activeCeremony)}
                className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-petal-milk transition hover:bg-berry"
              >
                <CalendarPlus className="h-3.5 w-3.5" />
                Save This Event
              </button>
            </div>
          </div>

          {/* Weekend At A Glance Strip */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3 border-t border-petal-milk/20 pt-7 text-left">
            {CEREMONIES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => setActiveCode(c.code)}
                className={`rounded-2xl border p-4 transition text-left ${
                  c.code === activeCeremony.code
                    ? "border-marigold bg-petal-milk/15"
                    : "border-petal-milk/15 bg-petal-milk/5 hover:bg-petal-milk/10"
                }`}
              >
                <p className="text-[10px] uppercase tracking-[0.22em] text-marigold">
                  {c.day} · {c.time}
                </p>
                <p className="mt-1 font-display text-xl font-semibold text-petal-milk">
                  {c.title}
                </p>
                <p className="mt-0.5 text-xs text-petal-milk/75">{c.location}</p>
              </button>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* Section 4: Modern Editorial Gallery + Lightbox */}
      <section id="gallery" className="px-4 sm:px-8 py-16">
        <div className="mx-auto max-w-6xl">
          <RevealBlock className="text-center max-w-2xl mx-auto">
            <p className="font-script text-3xl sm:text-4xl text-sage">
              Moments &amp; Mood
            </p>
            <h2 className="mt-1 font-display text-4xl sm:text-5xl font-semibold text-berry">
              A Glimpse of Jodhpur
            </h2>
            <FloralDivider />
          </RevealBlock>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY_MOMENTS.map((item, idx) => (
              <RevealBlock key={item.src} delayMs={idx * 70}>
                <button
                  type="button"
                  onClick={() => setLightboxIdx(idx)}
                  className="group relative w-full overflow-hidden rounded-3xl border border-honey-gold/45 bg-blush-silk text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.caption}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-berry-deep/80 via-transparent to-transparent opacity-80" />
                    <span className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-petal-milk/85 text-berry opacity-0 transition group-hover:opacity-100">
                      <Expand className="h-3.5 w-3.5" />
                    </span>
                    <div className="absolute bottom-4 inset-x-4 text-petal-milk">
                      <p className="font-display text-xl font-semibold">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-petal-milk/85">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </button>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Destination, Stay & Travel Guide */}
      <section id="venue" className="px-4 sm:px-8 py-14">
        <RevealBlock className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-honey-gold/50 bg-white/80 shadow-[0_22px_70px_rgba(70,17,37,0.09)] backdrop-blur-sm">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-6 relative min-h-[320px] sm:min-h-[420px]">
              <Image
                src="/images/jodhpur-table.jpg"
                alt="Candlelit courtyard celebration table at Umaid Heritage Haveli"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-6 p-7 sm:p-11 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-coral-rose font-semibold">
                  Destination &amp; Hospitality
                </p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-berry">
                  {INVITE_INFO.venue}
                </h2>
                <p className="mt-1.5 text-sm text-muted">{INVITE_INFO.address}</p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3.5 rounded-2xl bg-blush-silk/70 p-4 border border-honey-gold/25">
                    <Plane className="h-4 w-4 text-sage mt-1 shrink-0" />
                    <div>
                      <p className="font-display text-lg font-semibold text-berry">
                        Airport Transfers
                      </p>
                      <p className="text-xs leading-relaxed text-muted">
                        Jodhpur Airport (JDH) is 15 minutes from the haveli;
                        courtesy cars await all Friday &amp; Saturday arrivals.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 rounded-2xl bg-blush-silk/70 p-4 border border-honey-gold/25">
                    <Sun className="h-4 w-4 text-coral-rose mt-1 shrink-0" />
                    <div>
                      <p className="font-display text-lg font-semibold text-berry">
                        November Climate &amp; Check-In
                      </p>
                      <p className="text-xs leading-relaxed text-muted">
                        Pleasant 26°C afternoons and 13°C starlit evenings — a
                        light cashmere shawl pairs beautifully for supper.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <a
                  href={INVITE_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-petal-milk transition hover:bg-berry"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Open Directions in Maps
                </a>
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* Section 6: Gracious RSVP, Wishes Wall & Family Sign-Off */}
      <section id="rsvp" className="px-4 sm:px-8 pt-10 pb-20">
        <div className="mx-auto max-w-6xl space-y-12">
          <RevealBlock className="relative overflow-hidden rounded-[2.5rem] border border-honey-gold/55 bg-petal-milk/95 p-6 sm:p-11 shadow-[0_24px_75px_rgba(70,17,37,0.1)]">
            <BloomingGarlandCorner
              position="top-right"
              className="absolute -top-3 -right-3 h-32 w-32 opacity-75"
            />
            <BloomingGarlandCorner
              position="bottom-left"
              className="absolute -bottom-3 -left-3 h-28 w-28 opacity-65"
            />

            {saved ? (
              <div className="relative z-10 py-10 text-center animate-panel-pop">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-56 overflow-hidden"
                  aria-hidden="true"
                >
                  {CONFETTI.map((c, i) => (
                    <span
                      key={i}
                      style={
                        {
                          left: c.left,
                          animationDelay: c.delay,
                          backgroundColor: c.color,
                          "--dx": c.dx,
                        } as React.CSSProperties
                      }
                      className="animate-confetti absolute top-0 h-3 w-2.5 rounded-full"
                    />
                  ))}
                </div>

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage text-petal-milk shadow-md">
                  <Check className="h-7 w-7" />
                </div>
                <p className="mt-4 font-script text-4xl text-coral-rose">
                  With joy, thank you {name}
                </p>
                <p className="mt-2 text-sm text-muted max-w-md mx-auto">
                  {attending === "yes"
                    ? `We look forward to celebrating with ${guests} in Jodhpur! Your blessing now appears below.`
                    : "Thank you for sending your warm blessings from afar."}
                </p>
                <button
                  type="button"
                  onClick={() => setSaved(false)}
                  className="mt-6 rounded-full border border-berry/40 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-berry hover:bg-blush-silk"
                >
                  Update Response
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleRsvp}
                className="relative z-10 mx-auto max-w-3xl space-y-6"
              >
                <div className="text-center">
                  <p className="font-script text-3xl sm:text-4xl text-sage">
                    Kindly reply by 10 October
                  </p>
                  <h2 className="mt-1 font-display text-4xl sm:text-5xl font-semibold text-berry">
                    Grace Us With Your Presence
                  </h2>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-berry">
                      Your Name / Family
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aarav & Priya Verma"
                      className="mt-1.5 w-full rounded-xl border border-honey-gold/45 bg-white/90 px-4 py-3 text-sm outline-none focus:border-berry"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-berry">
                      Party Size
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="mt-1.5 w-full rounded-xl border border-honey-gold/45 bg-white/90 px-4 py-3 text-sm outline-none focus:border-berry"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={5}>5+ Family</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <button
                    type="button"
                    onClick={() => setAttending("yes")}
                    className={`rounded-xl border px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                      attending === "yes"
                        ? "border-berry bg-berry text-petal-milk shadow-md"
                        : "border-honey-gold/40 bg-blush-silk/65 text-berry hover:bg-blush-silk"
                    }`}
                  >
                    Joyfully Attending
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending("no")}
                    className={`rounded-xl border px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                      attending === "no"
                        ? "border-sage bg-sage text-petal-milk shadow-md"
                        : "border-honey-gold/40 bg-blush-silk/65 text-berry hover:bg-blush-silk"
                    }`}
                  >
                    Sending Warm Blessings
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-berry">
                    Blessing, Dietary Note or Sangeet Song
                  </label>
                  <textarea
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Share a warm wish for Meera & Kabir..."
                    className="mt-1.5 w-full rounded-xl border border-honey-gold/45 bg-white/90 px-4 py-3 text-sm outline-none focus:border-berry"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-berry-garden px-10 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-petal-milk shadow-md transition hover:scale-[1.02] disabled:opacity-60"
                  >
                    <Heart className="h-3.5 w-3.5 text-marigold" />
                    {saving ? "Recording RSVP..." : "Send RSVP With Love"}
                  </button>
                </div>
              </form>
            )}
          </RevealBlock>

          {/* Blessings Wall */}
          <div>
            <h3 className="text-center font-display text-3xl font-semibold text-berry">
              Warm Wishes From Loved Ones
            </h3>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {entries.slice(0, 6).map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-3xl border border-honey-gold/35 bg-white/80 p-6 shadow-sm backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-xl font-semibold text-berry">
                      {entry.name}
                    </span>
                    <Heart className="h-4 w-4 text-coral-rose shrink-0" />
                  </div>
                  <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-sage font-semibold">
                    {entry.attending === "yes"
                      ? `Attending · ${entry.guests} Guests`
                      : "Sending Blessings"}
                  </p>
                  <p className="mt-3 text-sm italic leading-relaxed text-muted">
                    &ldquo;{entry.note}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Classy Closing Footer */}
      <footer className="bg-berry-garden py-14 px-4 text-center text-petal-milk">
        <p className="font-script text-4xl text-marigold">
          With love &amp; anticipation
        </p>
        <p className="mt-2 font-display text-2xl sm:text-3xl font-semibold">
          The Rathore &amp; Mehta Families
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.26em] text-petal-milk/70">
          {INVITE_INFO.bride} &amp; {INVITE_INFO.groom} · {INVITE_INFO.dates} ·{" "}
          {INVITE_INFO.city}
        </p>
      </footer>

      {/* Lightbox Modal */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-berry-deep/90 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIdx(null)}
        >
          <div
            className="relative max-w-2xl w-full overflow-hidden rounded-3xl border border-honey-gold/60 bg-petal-milk p-2 shadow-2xl animate-panel-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxIdx(null)}
              aria-label="Close preview"
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-berry-deep/85 text-petal-milk"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src={GALLERY_MOMENTS[lightboxIdx].src}
                alt={GALLERY_MOMENTS[lightboxIdx].caption}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-contain bg-blush-silk"
              />
            </div>
            <div className="px-4 py-3 text-center">
              <p className="font-display text-2xl font-semibold text-berry">
                {GALLERY_MOMENTS[lightboxIdx].title}
              </p>
              <p className="text-xs text-muted">
                {GALLERY_MOMENTS[lightboxIdx].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
