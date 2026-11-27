"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  CalendarPlus,
  Flower2,
  Heart,
  MapPin,
  Music,
  Plane,
  Sparkles,
  Sun,
} from "lucide-react";
import {
  BloomingGarlandCorner,
  DriftingGardenPetals,
  FloralDivider,
} from "./GardenFlorals";
import RevealBlock from "./RevealBlock";
import FlipPostcardGallery from "./FlipPostcardGallery";
import PalaceCourtyardMap from "./PalaceCourtyardMap";
import GuestPassCard from "./GuestPassCard";
import {
  CEREMONIES,
  Ceremony,
  INITIAL_RSVPS,
  INITIAL_SONGS,
  INVITE_INFO,
  POSTCARD_STORIES,
  RsvpEntry,
  SongOption,
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

const BURST_PETALS = [
  { left: "10%", dx: "-45px", delay: "0s", color: "#D66863" },
  { left: "22%", dx: "35px", delay: "0.06s", color: "#E29B4D" },
  { left: "34%", dx: "-20px", delay: "0.02s", color: "#F3D7CF" },
  { left: "48%", dx: "25px", delay: "0.1s", color: "#4B7864" },
  { left: "62%", dx: "-35px", delay: "0.04s", color: "#D66863" },
  { left: "75%", dx: "40px", delay: "0.08s", color: "#E29B4D" },
  { left: "88%", dx: "-25px", delay: "0.03s", color: "#6B213B" },
];

export default function EditorialInvite({ guestName }: { guestName: string }) {
  const [countdown, setCountdown] = useState({
    days: 359,
    hours: 10,
    mins: 24,
    secs: 0,
  });
  const [activeCode, setActiveCode] = useState(CEREMONIES[0].code);

  // Live backend state (RSVPs, Petal Blessings, Sangeet Jukebox Votes)
  const [entries, setEntries] = useState<RsvpEntry[]>(INITIAL_RSVPS);
  const [petalsCount, setPetalsCount] = useState(148);
  const [songs, setSongs] = useState<SongOption[]>(INITIAL_SONGS);
  const [votedSongId, setVotedSongId] = useState<string | null>(null);
  const [burstKey, setBurstKey] = useState(0);

  // RSVP form
  const [name, setName] = useState(guestName === "Beloved Guest" ? "" : guestName);
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState(2);
  const [note, setNote] = useState("");
  const [selectedSong, setSelectedSong] = useState(INITIAL_SONGS[0].title);
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
        if (!mounted || !data) return;
        if (Array.isArray(data.entries)) setEntries(data.entries);
        if (typeof data.petals === "number") setPetalsCount(data.petals);
        if (Array.isArray(data.songs)) setSongs(data.songs);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const activeCeremony =
    CEREMONIES.find((c) => c.code === activeCode) ?? CEREMONIES[0];

  const totalSongVotes = Math.max(
    1,
    songs.reduce((acc, s) => acc + s.votes, 0)
  );

  const handleTossPetal = async () => {
    setBurstKey((k) => k + 1);
    setPetalsCount((c) => c + 1);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "petal" }),
      });
      if (res.ok) {
        const data = await res.json();
        if (typeof data.petals === "number") setPetalsCount(data.petals);
      }
    } catch {
      // Optimistic count already shown
    }
  };

  const handleVoteSong = async (songId: string) => {
    if (votedSongId === songId) return;
    setVotedSongId(songId);
    setSongs((prev) =>
      prev.map((s) => (s.id === songId ? { ...s, votes: s.votes + 1 } : s))
    );
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "vote_song", songId }),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.songs)) setSongs(data.songs);
      }
    } catch {
      // Optimistic vote retained
    }
  };

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
          song: selectedSong,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.entries)) setEntries(data.entries);
        if (typeof data?.petals === "number") setPetalsCount(data.petals);
      }
      setSaved(true);
      setBurstKey((k) => k + 1);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative bg-garden-gradient text-berry-ink">
      <DriftingGardenPetals />

      {/* On-demand Petal Burst Overlay when user clicks "Shower Petals" or submits RSVP */}
      {burstKey > 0 && (
        <div
          key={burstKey}
          className="pointer-events-none fixed inset-x-0 top-16 z-40 h-72 overflow-hidden"
          aria-hidden="true"
        >
          {BURST_PETALS.map((p, i) => (
            <span
              key={i}
              style={
                {
                  left: p.left,
                  animationDelay: p.delay,
                  backgroundColor: p.color,
                  "--dx": p.dx,
                } as React.CSSProperties
              }
              className="animate-confetti absolute top-0 h-3.5 w-3 rounded-full"
            />
          ))}
        </div>
      )}

      {/* Subtle Modern Stationery Masthead */}
      <header className="mx-auto max-w-6xl px-5 sm:px-8 pt-6">
        <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-honey-gold/35 pb-4 text-[11px] uppercase tracking-[0.24em] text-berry/80">
          <span className="font-display text-base font-semibold tracking-wider text-berry normal-case">
            {INVITE_INFO.bride} &amp; {INVITE_INFO.groom}
          </span>
          <div className="flex flex-wrap items-center gap-5 sm:gap-7 font-medium">
            <a href="#postcards" className="hover:text-coral-rose transition">
              Postcards
            </a>
            <a href="#courtyard" className="hover:text-coral-rose transition">
              Courtyard Map
            </a>
            <a href="#sangeet" className="hover:text-coral-rose transition">
              Sangeet Vote
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

      {/* Section 1: Airy Modern Floral Hero + Live Petal Blessing */}
      <section className="relative overflow-hidden px-4 sm:px-8 pt-10 pb-16">
        <div className="relative mx-auto max-w-6xl rounded-[2.5rem] border border-honey-gold/45 bg-petal-milk/90 p-6 sm:p-12 lg:p-14 shadow-[0_24px_80px_rgba(70,17,37,0.08)] backdrop-blur-md">
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
                &ldquo;Tap to shower petals for us, flip our handwritten
                postcards, and explore the Jodhpur palace courtyard below.&rdquo;
              </p>

              {/* Countdown Strip */}
              <div className="mt-6 grid grid-cols-4 gap-3 w-full max-w-md">
                {[
                  { label: "Days", value: countdown.days },
                  { label: "Hours", value: countdown.hours },
                  { label: "Mins", value: countdown.mins },
                  { label: "Secs", value: countdown.secs },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-honey-gold/40 bg-white/80 py-3 px-2 text-center shadow-sm"
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

              {/* Interactive Petal Blessing & RSVP CTAs */}
              <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button
                  type="button"
                  onClick={handleTossPetal}
                  className="inline-flex items-center gap-2 rounded-full bg-berry-garden px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-petal-milk shadow-md transition hover:scale-105 active:scale-95"
                >
                  <Sparkles className="h-3.5 w-3.5 text-marigold" />
                  Shower Petals · {petalsCount}
                </button>
                <a
                  href="#rsvp"
                  className="inline-flex items-center gap-2 rounded-full border border-sage/45 bg-white/85 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-sage transition hover:bg-sage hover:text-petal-milk"
                >
                  <Heart className="h-3.5 w-3.5" />
                  Get Your Guest Pass
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

      {/* Section 2: Unique Feature #1 — 3D Flipping Handwritten Love Postcards */}
      <section id="postcards" className="px-4 sm:px-8 py-14">
        <div className="mx-auto max-w-6xl">
          <RevealBlock className="text-center max-w-2xl mx-auto">
            <p className="font-script text-3xl sm:text-4xl text-sage">
              Tap Any Postcard To Flip
            </p>
            <h2 className="mt-1 font-display text-4xl sm:text-5xl font-semibold text-berry">
              Notes From Meera &amp; Kabir
            </h2>
            <FloralDivider />
            <p className="text-sm text-muted">
              Every photograph carries a handwritten memory on the reverse —
              turn them over to read how our story unfolded.
            </p>
          </RevealBlock>

          <div className="mt-10">
            <FlipPostcardGallery postcards={POSTCARD_STORIES} />
          </div>
        </div>
      </section>

      {/* Section 3: Unique Feature #2 — Interactive Palace Courtyard Map & Celebrations */}
      <section id="courtyard" className="px-4 sm:px-8 py-14">
        <RevealBlock className="mx-auto max-w-6xl rounded-[2.5rem] bg-berry-garden p-6 sm:p-11 text-petal-milk shadow-[0_28px_85px_rgba(61,13,31,0.28)]">
          <div className="text-center max-w-xl mx-auto">
            <p className="font-script text-3xl sm:text-4xl text-marigold">
              Explore The Haveli Grounds
            </p>
            <h2 className="mt-1 font-display text-4xl sm:text-5xl font-semibold">
              Courtyard Map &amp; Ceremonies
            </h2>
          </div>

          <div className="mt-9 grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <PalaceCourtyardMap
                activeCeremony={activeCeremony}
                onSelect={setActiveCode}
              />
            </div>

            <div
              key={activeCeremony.code}
              className="lg:col-span-6 animate-panel-pop rounded-3xl border border-petal-milk/20 bg-petal-milk/96 p-6 sm:p-8 text-berry-ink"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-coral-rose">
                <span>
                  {activeCeremony.day} · {activeCeremony.time}
                </span>
                <span className="text-sage">{activeCeremony.location}</span>
              </div>

              <h3 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-berry">
                {activeCeremony.title}
              </h3>

              <p className="mt-1 font-script text-2xl text-sage">
                {activeCeremony.vibe}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                {activeCeremony.note}
              </p>

              <div className="mt-5 rounded-2xl bg-blush-silk/85 p-4 border border-honey-gold/30">
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

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => downloadCeremonyIcs(activeCeremony)}
                  className="inline-flex items-center gap-2 rounded-full bg-sage px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-petal-milk transition hover:bg-berry"
                >
                  <CalendarPlus className="h-3.5 w-3.5" />
                  Save Ceremony (.ics)
                </button>
                <span className="text-xs text-muted">
                  Pavilion {activeCeremony.code} of 03
                </span>
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* Section 4: Unique Feature #3 — Live Sangeet Jukebox Voting */}
      <section id="sangeet" className="px-4 sm:px-8 py-12">
        <RevealBlock className="mx-auto max-w-5xl rounded-[2.25rem] border border-honey-gold/45 bg-white/85 p-6 sm:p-10 shadow-sm backdrop-blur-sm">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-coral-rose">
                <Music className="h-3.5 w-3.5" />
                Guest-Curated Dancefloor
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-berry">
                Vote For The First Sangeet Anthem
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Help our DJ pick the opening track when the families hit the
                courtyard floor — tap your favorite to cast a live vote.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {songs.map((song) => {
                const pct = Math.round((song.votes / totalSongVotes) * 100);
                const isVoted = votedSongId === song.id;
                return (
                  <button
                    key={song.id}
                    type="button"
                    onClick={() => handleVoteSong(song.id)}
                    className={`relative w-full overflow-hidden rounded-2xl border p-4 text-left transition ${
                      isVoted
                        ? "border-berry bg-blush-silk"
                        : "border-honey-gold/35 bg-petal-milk hover:border-coral-rose/60"
                    }`}
                  >
                    <div
                      className="absolute inset-y-0 left-0 bg-rose-mist/45 transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                    <div className="relative z-10 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-display text-xl font-semibold text-berry">
                          {song.title}
                        </p>
                        <p className="text-xs text-muted">{song.artist}</p>
                      </div>
                      <span className="rounded-full bg-white/90 border border-honey-gold/40 px-3.5 py-1 text-xs font-semibold text-sage">
                        {song.votes} votes · {pct}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* Section 5: Destination & Hospitality Guide */}
      <section id="venue" className="px-4 sm:px-8 py-12">
        <RevealBlock className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-honey-gold/50 bg-white/80 shadow-[0_22px_70px_rgba(70,17,37,0.09)] backdrop-blur-sm">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[400px]">
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
                        November Climate &amp; Attire Tip
                      </p>
                      <p className="text-xs leading-relaxed text-muted">
                        Warm 26°C sunlit afternoons and crisp 13°C evenings — a
                        light cashmere shawl pairs nicely for courtyard dining.
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

      {/* Section 6: Unique Feature #4 — RSVP + Instant Downloadable Keepsake Pass */}
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
              <div className="relative z-10 py-6 text-center animate-panel-pop">
                <p className="font-script text-4xl text-coral-rose">
                  With joy, thank you {name}
                </p>
                <p className="mt-1 text-sm text-muted">
                  Your personalized wedding keepsake pass is ready to download:
                </p>

                <GuestPassCard
                  guestName={name.trim() || guestName}
                  guests={guests}
                  attending={attending}
                />

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
                    Unlock your personalized keepsake pass
                  </p>
                  <h2 className="mt-1 font-display text-4xl sm:text-5xl font-semibold text-berry">
                    RSVP &amp; Guest Pass
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

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-berry">
                      Sangeet Song Request
                    </label>
                    <select
                      value={selectedSong}
                      onChange={(e) => setSelectedSong(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-honey-gold/45 bg-white/90 px-4 py-3 text-sm outline-none focus:border-berry"
                    >
                      {songs.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title} — {s.artist}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-berry">
                      Warm Wish or Dietary Note
                    </label>
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Write a note for Meera & Kabir..."
                      className="mt-1.5 w-full rounded-xl border border-honey-gold/45 bg-white/90 px-4 py-3 text-sm outline-none focus:border-berry"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-berry-garden px-10 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-petal-milk shadow-md transition hover:scale-[1.02] disabled:opacity-60"
                  >
                    <Heart className="h-3.5 w-3.5 text-marigold" />
                    {saving
                      ? "Generating Your Pass..."
                      : "Confirm RSVP & Generate Pass"}
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
                  {entry.song && (
                    <p className="mt-3 text-[11px] text-coral-rose font-medium">
                      ♪ Requested: {entry.song}
                    </p>
                  )}
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
    </div>
  );
}
