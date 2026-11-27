"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarPlus, Check, MapPin, Share2 } from "lucide-react";
import RevealBlock from "./RevealBlock";
import FlipPostcardGallery from "./FlipPostcardGallery";
import PalaceCourtyardMap from "./PalaceCourtyardMap";
import GuestPassCard from "./GuestPassCard";
import {
  BrassDiyaSvg,
  HaveliJaliCorner,
  JharokhaArchFrame,
  KalashLotusDivider,
  MarigoldToranBorder,
  RoyalMandapCrest,
} from "./WeddingMotifs";
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

  const [diyaLit, setDiyaLit] = useState(false);
  const [diyaCount, setDiyaCount] = useState(108);

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

  const handleLightDiya = () => {
    if (diyaLit) return;
    setDiyaLit(true);
    setDiyaCount((c) => c + 1);
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

  const countdownUnits = [
    { label: "Days", value: String(countdown.days) },
    { label: "Hours", value: String(countdown.hours).padStart(2, "0") },
    { label: "Mins", value: String(countdown.mins).padStart(2, "0") },
    { label: "Secs", value: String(countdown.secs).padStart(2, "0") },
  ];

  return (
    <div className="bg-garden-gradient text-berry-ink">
      {/* Royal Invocation Header */}
      <header className="mx-auto max-w-6xl px-5 sm:px-8 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-honey-gold/55 pb-3.5 text-[11px] uppercase tracking-[0.26em] text-berry">
          <span className="font-semibold">{INVITE_INFO.invocation}</span>
          <span className="font-display text-sm sm:text-base font-medium tracking-widest normal-case">
            Shubh Vivah · {INVITE_INFO.brideFirst} &amp; {INVITE_INFO.groomFirst}
          </span>
          <span className="text-sage font-medium">{INVITE_INFO.dates}</span>
        </div>
      </header>

      {/* Section 1: Heritage Haveli Patrika & Jharokha Hero */}
      <section className="px-4 sm:px-8 pt-7 pb-10">
        <div className="relative mx-auto max-w-6xl rounded-[34px] border border-honey-gold/75 bg-petal-milk shadow-[0_24px_75px_rgba(94,17,41,0.14)] overflow-hidden">
          <div className="pointer-events-none absolute inset-3.5 rounded-[26px] border border-honey-gold/35 z-10" />

          {/* Corner Jali Brass Borders */}
          <HaveliJaliCorner
            position="top-left"
            className="absolute top-3 left-3 w-16 h-16 sm:w-20 sm:h-20 z-10"
          />
          <HaveliJaliCorner
            position="top-right"
            className="absolute top-3 right-3 w-16 h-16 sm:w-20 sm:h-20 z-10"
          />
          <HaveliJaliCorner
            position="bottom-left"
            className="absolute bottom-3 left-3 w-16 h-16 sm:w-20 sm:h-20 z-10"
          />
          <HaveliJaliCorner
            position="bottom-right"
            className="absolute bottom-3 right-3 w-16 h-16 sm:w-20 sm:h-20 z-10"
          />

          {/* Scalloped Bandhanwar Toran at Top of Card */}
          <div className="relative z-10 px-8 sm:px-14 pt-4">
            <MarigoldToranBorder />
          </div>

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-12 px-7 pb-10 pt-4 sm:px-12 sm:pb-12 lg:px-14">
            <div className="lg:col-span-6 text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="flex items-center gap-3">
                <span className="h-[1px] w-7 bg-honey-gold" />
                <p className="text-xs uppercase tracking-[0.26em] text-sage font-semibold">
                  Shubh Vivah Patrika · Dear {guestName}
                </p>
                <span className="h-[1px] w-7 bg-honey-gold" />
              </div>

              <h1 className="mt-4 font-display text-5xl sm:text-7xl font-medium leading-[1.02] text-berry">
                {INVITE_INFO.brideFirst}
                <span className="mx-3 font-script text-5xl sm:text-6xl text-gold-shimmer font-normal">
                  &amp;
                </span>
                {INVITE_INFO.groomFirst}
              </h1>

              {/* Highlighted Parentage Card */}
              <div className="mt-4 w-full max-w-md rounded-2xl border border-honey-gold/45 bg-blush-silk/55 px-4 py-3 text-center lg:text-left space-y-1.5">
                <p className="text-xs sm:text-sm text-berry-ink">
                  <span className="font-semibold text-berry">{INVITE_INFO.brideFirst}</span>
                  {" — "}
                  <span className="text-sage font-medium">{INVITE_INFO.brideParents}</span>
                </p>
                <div className="h-[1px] w-full bg-honey-gold/25" />
                <p className="text-xs sm:text-sm text-berry-ink">
                  <span className="font-semibold text-berry">{INVITE_INFO.groomFirst}</span>
                  {" — "}
                  <span className="text-sage font-medium">{INVITE_INFO.groomParents}</span>
                </p>
              </div>

              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted max-w-md">
                {INVITE_INFO.families}
              </p>

              <p className="mt-5 inline-block rounded-full border border-honey-gold/45 bg-blush-silk/55 px-5 py-1.5 text-xs uppercase tracking-[0.2em] text-berry font-medium">
                {INVITE_INFO.dates} · {INVITE_INFO.venue}, {INVITE_INFO.city}
              </p>

              {/* Arched Brass-Bordered Keepsake Countdown */}
              <div className="mt-6 grid grid-cols-4 gap-2.5 sm:gap-3.5 w-full max-w-sm">
                {countdownUnits.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-t-full rounded-b-2xl border border-honey-gold/60 bg-blush-silk/75 px-2 pt-4 pb-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]"
                  >
                    <span className="block font-display text-2xl sm:text-3xl font-semibold text-berry tabular-nums leading-none">
                      {item.value}
                    </span>
                    <span className="mt-1.5 block text-[9px] uppercase tracking-[0.22em] text-sage font-medium">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href="#courtyard"
                  className="rounded-full border border-berry bg-berry px-7 py-3 text-xs font-medium uppercase tracking-[0.22em] text-petal-milk transition hover:bg-berry-deep"
                >
                  Wedding Events
                </a>
                <a
                  href="#rsvp"
                  className="rounded-full border border-honey-gold bg-blush-silk/65 px-7 py-3 text-xs font-medium uppercase tracking-[0.22em] text-berry transition hover:bg-blush-silk"
                >
                  RSVP &amp; Pass
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md">
                <JharokhaArchFrame>
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src="/images/jodhpur-hero.jpg"
                      alt="Sandstone haveli archway with bougainvillea in Jodhpur"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 448px"
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20 text-center px-4">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-blush-silk/90">
                        {INVITE_INFO.venue}
                      </p>
                      <p className="font-display text-lg italic text-petal-milk">
                        Jodhpur, Rajasthan
                      </p>
                    </div>
                  </div>
                </JharokhaArchFrame>
              </div>
            </div>
          </div>
        </div>
      </section>

      <KalashLotusDivider />

      {/* Section 2: Flippable Keepsake Postcards */}
      <section id="postcards" className="px-4 sm:px-8 py-8">
        <div className="mx-auto max-w-6xl">
          <RevealBlock className="flex flex-wrap items-end justify-between gap-4 border-b border-honey-gold/45 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-sage font-medium">
                From Our Album
              </p>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl font-medium text-berry">
                Four Keepsake Postcards
              </h2>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">
              Tap any photograph to read the note behind it
            </p>
          </RevealBlock>

          <div className="mt-8">
            <FlipPostcardGallery postcards={POSTCARD_STORIES} />
          </div>
        </div>
      </section>

      <KalashLotusDivider />

      {/* Section 3: Palace Estate Plan & 4 Celebrations */}
      <section id="courtyard" className="px-4 sm:px-8 py-8">
        <RevealBlock className="relative mx-auto max-w-6xl rounded-[34px] border border-honey-gold/50 bg-berry-garden p-6 sm:p-11 text-petal-milk shadow-[0_26px_75px_rgba(94,17,41,0.26)] overflow-hidden">
          <HaveliJaliCorner
            position="top-left"
            light
            className="absolute top-3 left-3 w-14 h-14 opacity-60"
          />
          <HaveliJaliCorner
            position="top-right"
            light
            className="absolute top-3 right-3 w-14 h-14 opacity-60"
          />
          <HaveliJaliCorner
            position="bottom-left"
            light
            className="absolute bottom-3 left-3 w-14 h-14 opacity-60"
          />
          <HaveliJaliCorner
            position="bottom-right"
            light
            className="absolute bottom-3 right-3 w-14 h-14 opacity-60"
          />

          <div className="relative z-10 flex flex-wrap items-end justify-between gap-4 border-b border-honey-gold/35 pb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-honey-gold font-medium">
                {INVITE_INFO.venue} · Wedding Festivities
              </p>
              <h2 className="mt-1 font-display text-3xl sm:text-4xl font-medium">
                Four Celebrations &amp; Courtyard Map
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
                    className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] border transition ${
                      active
                        ? "border-honey-gold bg-petal-milk text-berry font-semibold shadow-sm"
                        : "border-honey-gold/40 text-petal-milk hover:border-petal-milk hover:bg-petal-milk/10"
                    }`}
                  >
                    {c.code} · {c.shortTitle}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 mt-8 grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <PalaceCourtyardMap
                activeCeremony={activeCeremony}
                onSelect={setActiveCode}
              />
            </div>

            <div
              key={activeCeremony.code}
              className="lg:col-span-6 animate-panel-pop rounded-3xl border border-honey-gold/55 bg-petal-milk p-6 sm:p-8 text-berry-ink shadow-md"
            >
              <div className="relative mb-5 aspect-[16/9] w-full overflow-hidden rounded-t-[36px] rounded-b-2xl border border-honey-gold/55">
                <Image
                  src={activeCeremony.image}
                  alt={activeCeremony.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <span className="absolute top-3.5 left-4 rounded-full border border-honey-gold/65 bg-petal-milk/92 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-berry">
                  {activeCeremony.code} · {activeCeremony.shortTitle}
                </span>
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

              <div className="mt-5 border-t border-honey-gold/35 pt-4">
                <p className="text-xs text-berry-ink">
                  <span className="uppercase tracking-[0.18em] text-sage font-medium">
                    Attire &amp; Palette:
                  </span>{" "}
                  {activeCeremony.attire}
                </p>
                <div className="mt-3 flex flex-wrap gap-4">
                  {activeCeremony.swatches.map((sw) => (
                    <div key={sw.name} className="flex items-center gap-2">
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-berry/25"
                        style={{ backgroundColor: sw.hex }}
                      />
                      <span className="text-xs text-muted">{sw.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-honey-gold/35 pt-4">
                <button
                  type="button"
                  onClick={() => downloadCeremonyIcs(activeCeremony)}
                  className="inline-flex items-center gap-2 rounded-full border border-honey-gold/45 bg-blush-silk/65 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-berry hover:bg-blush-silk transition"
                >
                  <CalendarPlus className="h-3.5 w-3.5 text-honey-gold" />
                  Save to Calendar
                </button>
                <span className="text-xs text-muted">
                  Celebration {activeCeremony.code} of 04
                </span>
              </div>
            </div>
          </div>

          {/* 4-Ceremony Index Strip */}
          <div className="relative z-10 mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 border-t border-honey-gold/30 pt-6 text-left">
            {CEREMONIES.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => setActiveCode(c.code)}
                className={`rounded-2xl border p-4 transition text-left ${
                  c.code === activeCeremony.code
                    ? "border-honey-gold bg-petal-milk/14 shadow-sm"
                    : "border-petal-milk/25 hover:border-honey-gold/65"
                }`}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-honey-gold">
                  {c.day}
                </p>
                <p className="mt-1 font-display text-xl font-medium text-petal-milk">
                  {c.title}
                </p>
                <p className="mt-0.5 text-xs text-blush-silk/80">{c.location}</p>
              </button>
            ))}
          </div>
        </RevealBlock>
      </section>

      <KalashLotusDivider />

      {/* Section 4: Stay & Travel + Shagun Diya Ritual */}
      <section id="venue" className="px-4 sm:px-8 py-8 space-y-10">
        <RevealBlock className="mx-auto max-w-6xl rounded-[32px] border border-honey-gold/65 bg-petal-milk p-6 sm:p-11 shadow-[0_18px_50px_rgba(94,17,41,0.08)]">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="relative rounded-t-[110px] rounded-b-3xl border border-honey-gold/65 bg-blush-silk p-3">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[98px] rounded-b-2xl">
                  <Image
                    src="/images/jodhpur-table.jpg"
                    alt="Courtyard dining table at Umaid Heritage Haveli"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-xs uppercase tracking-[0.26em] text-sage font-medium">
                Hospitality &amp; Travel
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
                    Attire Note
                  </dt>
                  <dd className="sm:col-span-2 text-berry-ink">
                    26°C sunny afternoons, 13°C evenings — pack a shawl for the
                    pheras and candlelit dinner.
                  </dd>
                </div>
              </dl>

              <a
                href={INVITE_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-berry px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-berry transition hover:bg-berry hover:text-petal-milk"
              >
                <MapPin className="h-3.5 w-3.5 text-honey-gold" />
                Open Palace Directions
              </a>
            </div>
          </div>
        </RevealBlock>

        {/* Sacred Shagun Diya Blessing Ritual */}
        <RevealBlock className="relative mx-auto max-w-4xl rounded-[32px] border border-honey-gold/65 bg-petal-milk p-7 sm:p-10 text-center shadow-[0_18px_50px_rgba(94,17,41,0.09)]">
          <div className="pointer-events-none absolute inset-3 rounded-[24px] border border-honey-gold/30" />

          <div className="relative z-10 flex flex-col items-center">
            <p className="text-xs uppercase tracking-[0.26em] text-sage font-medium">
              Auspicious Offering
            </p>
            <h3 className="mt-1 font-display text-3xl sm:text-4xl font-medium text-berry">
              Light a Shagun Diya
            </h3>
            <p className="mt-2 max-w-lg text-sm text-muted">
              Offer a traditional blessing of warmth and prosperity before Meera
              and Kabir take their seven steps around the sacred fire.
            </p>

            <div className="my-5 flex flex-col items-center">
              <div
                className={`p-4 rounded-full border transition duration-500 ${
                  diyaLit
                    ? "border-honey-gold bg-blush-silk shadow-[0_0_40px_rgba(234,158,56,0.32)]"
                    : "border-honey-gold/40 bg-petal-milk"
                }`}
              >
                <BrassDiyaSvg lit={diyaLit} />
              </div>

              <p className="mt-3 text-xs uppercase tracking-[0.22em] text-berry font-medium">
                {diyaCount} Diyas Lit in Blessing
              </p>
            </div>

            <button
              type="button"
              onClick={handleLightDiya}
              disabled={diyaLit}
              className={`rounded-full border px-8 py-3 text-xs font-medium uppercase tracking-[0.24em] transition ${
                diyaLit
                  ? "border-honey-gold bg-blush-silk text-berry cursor-default"
                  : "border-berry bg-berry text-petal-milk hover:bg-berry-deep"
              }`}
            >
              {diyaLit ? "Your Diya Is Lit · Shubham Bhavatu" : "Light a Diya"}
            </button>
          </div>
        </RevealBlock>
      </section>

      <KalashLotusDivider />

      {/* Section 5: RSVP & Keepsake Pass */}
      <section id="rsvp" className="px-4 sm:px-8 pt-6 pb-16">
        <div className="mx-auto max-w-6xl space-y-10">
          <RevealBlock className="relative rounded-[34px] border border-honey-gold/75 bg-petal-milk p-6 sm:p-11 shadow-[0_20px_60px_rgba(94,17,41,0.1)]">
            <div className="pointer-events-none absolute inset-3.5 rounded-[26px] border border-honey-gold/30" />

            <HaveliJaliCorner
              position="top-left"
              className="absolute top-3 left-3 w-14 h-14"
            />
            <HaveliJaliCorner
              position="top-right"
              className="absolute top-3 right-3 w-14 h-14"
            />

            {saved ? (
              <div className="relative z-10 py-6 text-center animate-panel-pop">
                <p className="font-script text-4xl text-berry">
                  With gratitude, {name}
                </p>
                <p className="mt-1 text-sm text-muted">
                  Your RSVP has been recorded. Download your personalized palace
                  entry pass below.
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
                  className="mt-6 rounded-full border border-berry/40 px-6 py-2 text-xs uppercase tracking-[0.2em] text-berry hover:bg-blush-silk"
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
                    RSVP &amp; Blessings
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
                      Dining Preference
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
                    className={`rounded-full border px-4 py-3 text-xs font-medium uppercase tracking-[0.2em] transition ${
                      attending === "yes"
                        ? "border-berry bg-berry text-petal-milk"
                        : "border-honey-gold/55 text-berry hover:bg-blush-silk"
                    }`}
                  >
                    Joyfully Attending
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending("no")}
                    className={`rounded-full border px-4 py-3 text-xs font-medium uppercase tracking-[0.2em] transition ${
                      attending === "no"
                        ? "border-sage bg-sage text-petal-milk"
                        : "border-honey-gold/55 text-berry hover:bg-blush-silk"
                    }`}
                  >
                    Sending Warm Wishes
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] text-muted">
                    Arrival Time or Message
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Optional flight details or blessings for Meera & Kabir"
                    className="mt-1.5 w-full border-b border-honey-gold/60 bg-transparent py-2.5 text-sm outline-none focus:border-berry"
                  />
                </div>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-full border border-berry bg-berry px-10 py-3.5 text-xs font-medium uppercase tracking-[0.24em] text-petal-milk transition hover:bg-berry-deep disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Confirm & Receive Palace Pass"}
                  </button>
                </div>
              </form>
            )}
          </RevealBlock>

          {/* Guest Blessings Ledger */}
          <div className="grid gap-5 md:grid-cols-2">
            {entries.slice(0, 4).map((entry) => (
              <div
                key={entry.id}
                className="rounded-3xl border border-honey-gold/50 bg-petal-milk p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2 border-b border-honey-gold/25 pb-2.5">
                  <span className="font-display text-xl font-medium text-berry">
                    {entry.name}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-sage">
                    {entry.attending === "yes"
                      ? `${entry.guests} Attending`
                      : "Sending Wishes"}
                  </span>
                </div>
                <p className="mt-3 text-sm italic leading-relaxed text-muted">
                  &ldquo;{entry.note}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-berry-garden py-14 px-4 text-center text-petal-milk overflow-hidden">
        <HaveliJaliCorner
          position="top-left"
          light
          className="absolute top-3 left-3 w-14 h-14 opacity-50"
        />
        <HaveliJaliCorner
          position="top-right"
          light
          className="absolute top-3 right-3 w-14 h-14 opacity-50"
        />

        <div className="relative z-10 flex flex-col items-center">
          <RoyalMandapCrest monogram="M & K" light />
          <p className="mt-4 font-script text-4xl text-blush-silk">
            With love &amp; warm regards
          </p>
          <p className="mt-1 font-display text-2xl font-medium">
            The Rathore &amp; Mehta Families
          </p>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleCopyInvite}
              className="inline-flex items-center gap-2 rounded-full border border-honey-gold/70 px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-petal-milk transition hover:bg-petal-milk/10"
            >
              {copiedShare ? (
                <Check className="h-3.5 w-3.5 text-honey-gold" />
              ) : (
                <Share2 className="h-3.5 w-3.5 text-honey-gold" />
              )}
              {copiedShare ? "Invitation Link Copied" : "Share Invitation"}
            </button>
          </div>

          <p className="mt-6 text-[11px] uppercase tracking-[0.24em] text-blush-silk/75">
            {INVITE_INFO.brideFirst} &amp; {INVITE_INFO.groomFirst} ·{" "}
            {INVITE_INFO.dates} · {INVITE_INFO.city}
          </p>
        </div>
      </footer>
    </div>
  );
}
