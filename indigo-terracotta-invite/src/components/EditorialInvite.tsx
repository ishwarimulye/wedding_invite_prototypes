"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  CalendarPlus,
  Check,
  Flower2,
  Heart,
  MapPin,
  Sparkles,
} from "lucide-react";
import {
  BloomingGarlandCorner,
  DriftingGardenPetals,
  FloralDivider,
} from "./GardenFlorals";
import {
  CEREMONIES,
  Ceremony,
  INITIAL_RSVPS,
  INVITE_INFO,
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
  { left: "15%", dx: "-35px", delay: "0s", color: "#DE645E" },
  { left: "30%", dx: "28px", delay: "0.08s", color: "#EF9C4D" },
  { left: "48%", dx: "-18px", delay: "0.04s", color: "#4E8068" },
  { left: "65%", dx: "36px", delay: "0.12s", color: "#F4A8A3" },
  { left: "82%", dx: "-25px", delay: "0.06s", color: "#7C1F42" },
];

export default function EditorialInvite({ guestName }: { guestName: string }) {
  const [countdown, setCountdown] = useState({
    days: 359,
    hours: 10,
    mins: 24,
    secs: 0,
  });
  const [activeCode, setActiveCode] = useState(CEREMONIES[0].code);

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

      {/* Part 1: Lively Floral Garden Hero */}
      <section className="relative overflow-hidden px-4 sm:px-8 pt-10 pb-14">
        <div className="relative mx-auto max-w-6xl rounded-[2.5rem] border-2 border-coral-rose/35 bg-petal-milk/90 p-6 sm:p-10 lg:p-12 shadow-[0_24px_70px_rgba(124,31,66,0.1)] backdrop-blur-sm">
          <BloomingGarlandCorner
            position="top-left"
            className="absolute -top-3 -left-3 h-32 w-32 sm:h-44 sm:w-44"
          />
          <BloomingGarlandCorner
            position="bottom-right"
            className="absolute -bottom-3 -right-3 h-28 w-28 sm:h-40 sm:w-40 opacity-85"
          />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-12">
            {/* Left Celebration Copy & Live Countdown */}
            <div className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start">
              <span className="inline-flex items-center gap-2 rounded-full bg-blush-silk border border-coral-rose/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-berry">
                <Flower2 className="h-3.5 w-3.5 text-coral-rose" />
                Welcoming {guestName}
              </span>

              <p className="mt-5 font-script text-3xl sm:text-4xl text-sage">
                Together with our families
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

              <p className="text-base sm:text-lg font-display italic text-berry-ink/90 max-w-md">
                &ldquo;Flowers are blooming, music is tuned, and our courtyard
                awaits your laughter in {INVITE_INFO.city}.&rdquo;
              </p>

              {/* Lively Countdown Pills */}
              <div className="mt-6 grid grid-cols-4 gap-2.5 sm:gap-3 w-full max-w-md">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Mins", value: countdown.mins },
                  { label: "Secs", value: countdown.secs },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-coral-rose/35 bg-blush-silk/85 py-3 px-2 text-center shadow-sm"
                  >
                    <span className="block font-display text-2xl sm:text-3xl font-bold text-berry tabular-nums">
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-sage font-semibold">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <a
                  href="#celebrations"
                  className="inline-flex items-center gap-2 rounded-full bg-berry-garden px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-petal-milk shadow-md transition hover:scale-105"
                >
                  <Sparkles className="h-3.5 w-3.5 text-marigold" />
                  See Celebrations
                </a>
                <a
                  href="#rsvp"
                  className="inline-flex items-center gap-2 rounded-full border border-sage/45 bg-petal-milk px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-sage transition hover:bg-sage hover:text-petal-milk"
                >
                  <Heart className="h-3.5 w-3.5" />
                  RSVP Now
                </a>
              </div>
            </div>

            {/* Right Floral Arch Photograph */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="overflow-hidden rounded-t-[200px] rounded-b-[2rem] border-2 border-coral-rose/50 bg-blush-silk p-3 shadow-[0_24px_60px_rgba(124,31,66,0.16)]">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[188px] rounded-b-[1.4rem]">
                    <Image
                      src="/images/jodhpur-hero.jpg"
                      alt="Sunlit courtyard archway with coral bougainvillea and cream garden roses"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 448px"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Floating Floral Date Badge */}
                <div className="animate-float-badge -mt-7 mx-auto w-fit rounded-full border border-honey-gold/60 bg-petal-milk px-6 py-2.5 text-center shadow-lg">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-coral-rose font-semibold">
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

      {/* Part 2: Interactive Celebration Storyboard (Compact Tabs + Visual Stage) */}
      <section id="celebrations" className="px-4 sm:px-8 py-10">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-berry-garden p-6 sm:p-10 lg:p-12 text-petal-milk shadow-[0_26px_75px_rgba(78,17,41,0.28)]">
          <div className="text-center max-w-xl mx-auto">
            <p className="font-script text-3xl sm:text-4xl text-marigold">
              Three Joyful Gatherings
            </p>
            <h2 className="mt-1 font-display text-3xl sm:text-5xl font-semibold">
              Tap Each Celebration
            </h2>
          </div>

          {/* Floral Ceremony Pill Switcher */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {CEREMONIES.map((c) => {
              const active = c.code === activeCeremony.code;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setActiveCode(c.code)}
                  className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
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

          {/* Active Ceremony Stage */}
          <div
            key={activeCeremony.code}
            className="animate-panel-pop mt-8 grid items-center gap-8 rounded-3xl border border-petal-milk/20 bg-petal-milk/96 p-5 sm:p-8 text-berry-ink lg:grid-cols-12"
          >
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-coral-rose/40 shadow-md">
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

              {/* Dress Palette Swatches */}
              <div className="rounded-2xl bg-blush-silk/85 p-4 border border-coral-rose/25">
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
                className="inline-flex items-center gap-2 rounded-full bg-sage px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-petal-milk transition hover:bg-berry"
              >
                <CalendarPlus className="h-3.5 w-3.5" />
                Save This Event
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Part 3: Compact Venue, Wishes & Quick RSVP Finale */}
      <section id="rsvp" className="px-4 sm:px-8 pt-8 pb-16">
        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-12">
          {/* Left: Venue & Live Blessings */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-[2rem] border-2 border-sage/30 bg-petal-milk/95 p-6 sm:p-8 shadow-sm">
            <div>
              <span className="text-xs uppercase tracking-[0.24em] text-coral-rose font-semibold">
                The Celebration Venue
              </span>
              <h2 className="mt-2 font-display text-3xl font-semibold text-berry">
                {INVITE_INFO.venue}
              </h2>
              <p className="mt-1.5 text-sm text-muted">{INVITE_INFO.address}</p>

              <a
                href={INVITE_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-sage/45 bg-blush-silk/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-sage transition hover:bg-sage hover:text-petal-milk"
              >
                <MapPin className="h-3.5 w-3.5" />
                Directions on Maps
              </a>

              {/* Live Wishes Preview */}
              <div className="mt-7 border-t border-coral-rose/25 pt-5">
                <p className="text-xs uppercase tracking-[0.22em] text-berry font-semibold">
                  Warm Wishes &amp; Guests ({entries.length})
                </p>
                <div className="mt-3 space-y-3">
                  {entries.slice(0, 3).map((entry) => (
                    <div
                      key={entry.id}
                      className="rounded-2xl bg-blush-silk/75 p-3.5 text-xs border border-coral-rose/20"
                    >
                      <div className="flex items-center justify-between font-semibold text-berry">
                        <span>{entry.name}</span>
                        <span className="text-sage">
                          {entry.attending === "yes"
                            ? `${entry.guests} Attending`
                            : "Sending Love"}
                        </span>
                      </div>
                      <p className="mt-1 italic text-muted">
                        &ldquo;{entry.note}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-6 font-script text-2xl text-sage">
              With love, Rathore &amp; Mehta Families
            </p>
          </div>

          {/* Right: Joyful Floral RSVP Card */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-[2rem] border-2 border-coral-rose/45 bg-petal-milk/95 p-6 sm:p-9 shadow-[0_20px_60px_rgba(124,31,66,0.1)]">
            <BloomingGarlandCorner
              position="top-right"
              className="absolute -top-3 -right-3 h-28 w-28 opacity-75"
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
                  Yay! Thank you, {name}
                </p>
                <p className="mt-2 text-sm text-muted max-w-md mx-auto">
                  {attending === "yes"
                    ? `We can't wait to celebrate with ${guests} in Jodhpur! Your note is now glowing in our wishes box.`
                    : "Your sweet wishes mean the world to us."}
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
              <form onSubmit={handleRsvp} className="relative z-10 space-y-5">
                <div>
                  <span className="text-xs uppercase tracking-[0.24em] text-coral-rose font-semibold">
                    Be Part Of Our Joy
                  </span>
                  <h3 className="mt-1 font-display text-3xl sm:text-4xl font-semibold text-berry">
                    Quick RSVP &amp; Blessing
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-berry">
                      Your Name / Family
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aarav & Priya"
                      className="mt-1.5 w-full rounded-xl border border-coral-rose/40 bg-white/85 px-4 py-2.5 text-sm outline-none focus:border-berry"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-berry">
                      Guests Joining
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="mt-1.5 w-full rounded-xl border border-coral-rose/40 bg-white/85 px-4 py-2.5 text-sm outline-none focus:border-berry"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={5}>5+ Family</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending("yes")}
                    className={`rounded-xl border px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                      attending === "yes"
                        ? "border-berry bg-berry text-petal-milk shadow-md"
                        : "border-coral-rose/35 bg-blush-silk/65 text-berry hover:bg-blush-silk"
                    }`}
                  >
                    Yes, Celebrating With You!
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending("no")}
                    className={`rounded-xl border px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                      attending === "no"
                        ? "border-sage bg-sage text-petal-milk shadow-md"
                        : "border-coral-rose/35 bg-blush-silk/65 text-berry hover:bg-blush-silk"
                    }`}
                  >
                    Sending Love From Afar
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-berry">
                    Your Blessing or Sangeet Song Pick
                  </label>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Write a warm note for Meera & Kabir..."
                    className="mt-1.5 w-full rounded-xl border border-coral-rose/40 bg-white/85 px-4 py-2.5 text-sm outline-none focus:border-berry"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-full bg-berry-garden py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-petal-milk shadow-md transition hover:scale-[1.01] disabled:opacity-60"
                >
                  {saving ? "Sending Love..." : "Send RSVP With Love"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
