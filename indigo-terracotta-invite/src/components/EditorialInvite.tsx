"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  CalendarPlus,
  Check,
  MapPin,
} from "lucide-react";
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
    d: Math.floor(diff / (1000 * 60 * 60 * 24)),
    h: Math.floor((diff / (1000 * 60 * 60)) % 24),
    m: Math.floor((diff / (1000 * 60)) % 60),
    s: Math.floor((diff / 1000) % 60),
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

export default function EditorialInvite({ guestName }: { guestName: string }) {
  const [countdown, setCountdown] = useState({ d: 359, h: 10, m: 24, s: 0 });
  const [activeCode, setActiveCode] = useState(CEREMONIES[0].code);

  // RSVP state
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

  const totalConfirmed = entries
    .filter((e) => e.attending === "yes")
    .reduce((acc, e) => acc + e.guests, 0);

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
    <div className="bg-limestone paper-grain text-ink">
      {/* Masthead Line */}
      <header className="mx-auto max-w-6xl px-5 sm:px-10 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo/20 pb-4 text-[11px] uppercase tracking-[0.24em] text-indigo/80">
          <span className="font-medium text-indigo">
            {INVITE_INFO.bride} &amp; {INVITE_INFO.groom}
          </span>
          <span>{INVITE_INFO.dates}</span>
          <span className="hidden sm:inline">{INVITE_INFO.city}</span>
        </div>
      </header>

      {/* Band 1: Asymmetric Split Hero Spread */}
      <section className="mx-auto max-w-6xl px-5 sm:px-10 py-10 sm:py-14">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs uppercase tracking-[0.26em] text-terracotta font-medium">
              Invited: {guestName}
            </p>

            <h1 className="font-editorial text-5xl sm:text-7xl font-normal leading-[1.02] tracking-tight text-indigo">
              {INVITE_INFO.bride}
              <span className="block italic text-terracotta font-normal">
                &amp; {INVITE_INFO.groom}
              </span>
            </h1>

            <p className="text-xs uppercase tracking-[0.18em] text-muted leading-relaxed max-w-md">
              {INVITE_INFO.families}
            </p>

            <p className="text-base sm:text-lg leading-relaxed text-ink/85 max-w-md">
              Request the pleasure of your company in the Blue City as we
              celebrate with afternoon henna, sandstone suppers, and sunset
              pheras.
            </p>

            {/* Compact Inline Ticker */}
            <div className="inline-flex items-baseline gap-4 border-y border-indigo/20 py-3 font-editorial text-2xl sm:text-3xl text-indigo tabular-nums">
              <span>
                {countdown.d}
                <small className="ml-1 font-sans text-[11px] uppercase tracking-widest text-muted">
                  d
                </small>
              </span>
              <span className="text-terracotta">/</span>
              <span>
                {String(countdown.h).padStart(2, "0")}
                <small className="ml-1 font-sans text-[11px] uppercase tracking-widest text-muted">
                  h
                </small>
              </span>
              <span className="text-terracotta">/</span>
              <span>
                {String(countdown.m).padStart(2, "0")}
                <small className="ml-1 font-sans text-[11px] uppercase tracking-widest text-muted">
                  m
                </small>
              </span>
              <span className="text-terracotta">/</span>
              <span>
                {String(countdown.s).padStart(2, "0")}
                <small className="ml-1 font-sans text-[11px] uppercase tracking-widest text-muted">
                  s
                </small>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-1">
              <a
                href="#rsvp"
                className="inline-flex items-center gap-2 bg-indigo px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-limestone transition hover:bg-terracotta"
              >
                Confirm Attendance
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="#schedule"
                className="inline-flex items-center gap-1.5 border-b border-indigo/40 pb-1 text-xs font-medium uppercase tracking-[0.2em] text-indigo transition hover:border-terracotta hover:text-terracotta"
              >
                Three-Day Schedule
                <ArrowDown className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative border border-indigo/25 bg-sand p-2.5 sm:p-3">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/images/jodhpur-hero.jpg"
                  alt="Sunlit Jodhpur sandstone haveli archway with indigo doors and terracotta bougainvillea"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between px-1 text-[11px] uppercase tracking-[0.2em] text-indigo/80">
                <span>{INVITE_INFO.venue}</span>
                <span>{INVITE_INFO.city}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Band 2: Interactive Celebration Switcher (No Repeated Cards) */}
      <section id="schedule" className="bg-indigo text-limestone py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-limestone/20 pb-5">
            <h2 className="font-editorial text-3xl sm:text-4xl font-normal">
              The Celebration <span className="italic text-saffron">Folio</span>
            </h2>
            <span className="text-xs uppercase tracking-[0.24em] text-limestone/70">
              Select a gathering to inspect
            </span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            {/* Left Index Selector */}
            <div className="lg:col-span-5 flex flex-col divide-y divide-limestone/15 border-y border-limestone/15">
              {CEREMONIES.map((c) => {
                const isActive = c.code === activeCeremony.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setActiveCode(c.code)}
                    className={`group flex items-baseline justify-between gap-4 py-5 px-3 text-left transition ${
                      isActive ? "bg-limestone/8" : "hover:bg-limestone/4"
                    }`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`font-editorial text-lg italic ${
                          isActive ? "text-saffron" : "text-limestone/45"
                        }`}
                      >
                        {c.code}
                      </span>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-limestone/65">
                          {c.day}
                        </p>
                        <p
                          className={`mt-1 font-editorial text-2xl ${
                            isActive ? "text-limestone" : "text-limestone/80"
                          }`}
                        >
                          {c.title}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`h-2 w-2 rounded-full transition ${
                        isActive ? "bg-terracotta scale-125" : "bg-transparent"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Active Detail Stage */}
            <div
              key={activeCeremony.code}
              className="lg:col-span-7 border border-limestone/20 bg-indigo-deep/65 p-7 sm:p-9 animate-panel flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.22em] text-saffron">
                  <span>{activeCeremony.time}</span>
                  <span>{activeCeremony.location}</span>
                </div>

                <h3 className="mt-4 font-editorial text-3xl sm:text-4xl text-limestone">
                  {activeCeremony.title}
                </h3>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-limestone/80 max-w-xl">
                  {activeCeremony.note}
                </p>

                {/* Visual Attire Swatches */}
                <div className="mt-7 border-t border-limestone/15 pt-5">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-limestone/60">
                    Suggested Palette · {activeCeremony.dressLabel}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-4">
                    {activeCeremony.swatches.map((swatch) => (
                      <div key={swatch.name} className="flex items-center gap-2">
                        <span
                          className="h-5 w-5 rounded-full border border-limestone/40"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <span className="text-xs text-limestone/85">
                          {swatch.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-limestone/15 pt-4">
                <span className="text-xs text-limestone/60">
                  {activeCeremony.day}
                </span>
                <button
                  type="button"
                  onClick={() => downloadCeremonyIcs(activeCeremony)}
                  className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-saffron hover:text-limestone transition"
                >
                  <CalendarPlus className="h-3.5 w-3.5" />
                  Add to Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Band 3: Venue & Concierge Ledger */}
      <section className="mx-auto max-w-6xl px-5 sm:px-10 py-14 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="border border-indigo/25 bg-sand p-2.5">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/images/jodhpur-table.jpg"
                  alt="Intimate Jodhpur courtyard dinner table with indigo runner and terracotta floral arrangements"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="text-xs uppercase tracking-[0.26em] text-terracotta font-medium">
              Destination Notes
            </p>
            <h2 className="mt-2 font-editorial text-3xl sm:text-4xl text-indigo">
              {INVITE_INFO.venue}
            </h2>

            <dl className="mt-6 divide-y divide-indigo/20 border-y border-indigo/20 text-sm">
              <div className="grid grid-cols-3 gap-4 py-3.5">
                <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                  Address
                </dt>
                <dd className="col-span-2 text-ink">{INVITE_INFO.address}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4 py-3.5">
                <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                  Arrivals
                </dt>
                <dd className="col-span-2 text-ink">
                  Jodhpur Airport (JDH) is 15 minutes away; haveli cars meet all
                  afternoon flights.
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 py-3.5">
                <dt className="text-xs uppercase tracking-[0.18em] text-muted">
                  Climate
                </dt>
                <dd className="col-span-2 text-ink">
                  Crisp desert sunshine by day (26°C); bring a light shawl for
                  evening courtyard dinners (13°C).
                </dd>
              </div>
            </dl>

            <a
              href={INVITE_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-indigo border-b border-indigo/40 pb-1 hover:text-terracotta hover:border-terracotta transition"
            >
              <MapPin className="h-3.5 w-3.5" />
              Open Location in Maps
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Band 4: Compact Split RSVP & Family Sign-Off */}
      <section
        id="rsvp"
        className="border-t border-indigo/20 bg-sand/70 py-14 sm:py-16"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-12">
            {/* Left: Family Note + Live Guest Count */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-terracotta font-medium">
                  Kindly Reply by 10 October
                </p>
                <h2 className="mt-2 font-editorial text-3xl sm:text-4xl text-indigo">
                  Will You Join Us?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Your presence around our courtyard table is all we ask for.
                </p>

                <div className="mt-6 border-l-2 border-terracotta pl-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-indigo font-medium">
                    {totalConfirmed} Guests Confirmed So Far
                  </p>
                  <div className="mt-3 space-y-2.5">
                    {entries.slice(0, 3).map((entry) => (
                      <div key={entry.id} className="text-xs text-muted">
                        <span className="font-medium text-indigo">
                          {entry.name}
                        </span>{" "}
                        — &ldquo;{entry.note}&rdquo;
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="mt-8 text-xs uppercase tracking-[0.22em] text-indigo/75">
                With warmth · Rathore &amp; Mehta Families
              </p>
            </div>

            {/* Right: Minimalist Stationery RSVP Form */}
            <div className="lg:col-span-7 border border-indigo/25 bg-limestone p-6 sm:p-8">
              {saved ? (
                <div className="py-8 text-center animate-panel">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center border border-olive bg-olive text-limestone">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-editorial text-2xl text-indigo">
                    Thank you, {name}
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    {attending === "yes"
                      ? `We look forward to hosting ${guests} in Jodhpur.`
                      : "Your warm wishes have been recorded."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSaved(false)}
                    className="mt-5 text-xs uppercase tracking-[0.2em] text-terracotta underline underline-offset-4"
                  >
                    Edit Response
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRsvp} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.22em] text-muted">
                        Guest / Family Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Aarav & Priya Verma"
                        className="mt-1.5 w-full border-b border-indigo/35 bg-transparent py-2 text-sm text-ink outline-none focus:border-terracotta"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.22em] text-muted">
                        Number of Guests
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="mt-1.5 w-full border-b border-indigo/35 bg-transparent py-2 text-sm text-ink outline-none focus:border-terracotta"
                      >
                        <option value={1}>1 Guest</option>
                        <option value={2}>2 Guests</option>
                        <option value={3}>3 Guests</option>
                        <option value={4}>4 Guests</option>
                        <option value={5}>5+ Family</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setAttending("yes")}
                      className={`px-4 py-2 text-xs uppercase tracking-[0.18em] border transition ${
                        attending === "yes"
                          ? "border-indigo bg-indigo text-limestone"
                          : "border-indigo/30 text-indigo hover:border-indigo"
                      }`}
                    >
                      Joyfully Attending
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttending("no")}
                      className={`px-4 py-2 text-xs uppercase tracking-[0.18em] border transition ${
                        attending === "no"
                          ? "border-terracotta bg-terracotta text-limestone"
                          : "border-indigo/30 text-indigo hover:border-indigo"
                      }`}
                    >
                      Sending Wishes Only
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.22em] text-muted">
                      Short Note or Dietary Preference
                    </label>
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Optional note for the families..."
                      className="mt-1.5 w-full border-b border-indigo/35 bg-transparent py-2 text-sm text-ink outline-none focus:border-terracotta"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full sm:w-auto bg-terracotta px-8 py-3 text-xs font-medium uppercase tracking-[0.22em] text-limestone transition hover:bg-indigo disabled:opacity-60"
                  >
                    {saving ? "Recording..." : "Send RSVP"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
