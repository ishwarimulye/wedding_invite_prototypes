"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Heart, Send, Sparkles } from "lucide-react";
import { FloralCorner, LotusSeparator } from "./FloralOrnaments";
import ScrollReveal from "./ScrollReveal";
import { GuestWish, INITIAL_WISHES, WEDDING_EVENTS } from "@/data/weddingData";

const BURST_PETALS = [
  { left: "12%", tx: "-40px", delay: "0s", color: "#E8AEB7" },
  { left: "24%", tx: "35px", delay: "0.1s", color: "#F1D48E" },
  { left: "36%", tx: "-25px", delay: "0.05s", color: "#C8943E" },
  { left: "50%", tx: "15px", delay: "0.15s", color: "#E39BA6" },
  { left: "64%", tx: "-35px", delay: "0.08s", color: "#F6D9DF" },
  { left: "76%", tx: "42px", delay: "0.12s", color: "#F1D48E" },
  { left: "88%", tx: "-20px", delay: "0.04s", color: "#E8AEB7" },
];

export default function RsvpSection({ guestName }: { guestName: string }) {
  const [name, setName] = useState(
    guestName === "Beloved Guest" ? "" : guestName
  );
  const [attending, setAttending] = useState<"yes" | "blessings">("yes");
  const [guestCount, setGuestCount] = useState("2 Guests");
  const [selectedEvents, setSelectedEvents] = useState<string[]>(
    WEDDING_EVENTS.map((e) => e.title)
  );
  const [blessing, setBlessing] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [wishes, setWishes] = useState<GuestWish[]>(INITIAL_WISHES);

  useEffect(() => {
    let active = true;
    fetch("/api/rsvp")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.wishes)) {
          setWishes(data.wishes);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const toggleEvent = (title: string) => {
    setSelectedEvents((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const displayName = name.trim() || guestName || "Beloved Guest";
    const messageText =
      blessing.trim() ||
      (attending === "yes"
        ? "Delighted to celebrate every phera, flower, and melody with you in Udaipur!"
        : "Sending warmest blessings and love for a radiant forever together.");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: displayName,
          attending,
          guestCount,
          selectedEvents,
          blessing: messageText,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.wishes)) {
          setWishes(data.wishes);
        }
      } else {
        setWishes((prev) => [
          {
            id: `wish-${Date.now()}`,
            name: displayName,
            relation:
              attending === "yes"
                ? `Attending • ${guestCount}`
                : "Sending Warm Blessings",
            message: messageText,
            timestamp: "Just now",
          },
          ...prev,
        ]);
      }
    } catch {
      setWishes((prev) => [
        {
          id: `wish-${Date.now()}`,
          name: displayName,
          relation:
            attending === "yes"
              ? `Attending • ${guestCount}`
              : "Sending Warm Blessings",
          message: messageText,
          timestamp: "Just now",
        },
        ...prev,
      ]);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden bg-cream py-24 px-4 sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-jaali-pattern opacity-40" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <ScrollReveal className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.34em] text-gold-dark font-semibold">
            Kindly Respond
          </p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-maroon">
            Grace Us With Your Presence
          </h2>
          <LotusSeparator />
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            Aapke aane se mehfil sajegi — please confirm your attendance by{" "}
            <span className="font-semibold text-maroon">15th January 2027</span>{" "}
            so we can prepare a royal welcome for you.
          </p>
        </ScrollReveal>

        {/* Royal RSVP Card */}
        <ScrollReveal delayMs={120}>
          <div className="mt-12 relative overflow-hidden rounded-[2rem] border-2 border-gold/75 bg-ivory p-6 sm:p-11 shadow-[0_26px_75px_rgba(79,14,28,0.16)]">
            <FloralCorner
              position="top-left"
              className="absolute -top-3 -left-3 h-24 w-24 opacity-80"
            />
            <FloralCorner
              position="top-right"
              className="absolute -top-3 -right-3 h-24 w-24 opacity-80"
            />

            {submitted ? (
              <div className="relative z-10 py-8 text-center animate-fade-up">
                {/* Joyful Floral & Gold Burst */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden h-64"
                  aria-hidden="true"
                >
                  {BURST_PETALS.map((p, idx) => (
                    <span
                      key={idx}
                      style={
                        {
                          left: p.left,
                          animationDelay: p.delay,
                          backgroundColor: p.color,
                          "--tx": p.tx,
                        } as React.CSSProperties
                      }
                      className="animate-burst-drop absolute top-0 h-3.5 w-2.5 rounded-full"
                    />
                  ))}
                </div>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-royal-velvet text-gold-light shadow-lg">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.28em] text-gold-dark font-semibold">
                  RSVP Recorded With Love
                </p>
                <h3 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-maroon">
                  Dhanyavaad, {name.trim() || guestName}!
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm text-muted leading-relaxed">
                  {attending === "yes"
                    ? `We are overjoyed to host ${guestCount} at The Suryagarh Heritage Courtyard, Udaipur. Your blessing is now glowing on our Wishes Wall below.`
                    : "We will miss you in Udaipur, and your heartfelt blessings mean the world to both families."}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setBlessing("");
                  }}
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-gold bg-cream px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-maroon transition hover:bg-parchment"
                >
                  Update Response
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-maroon">
                      Your Full Name / Family Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aarav & Meera Sharma"
                      className="mt-2 w-full rounded-xl border border-gold/60 bg-white/90 px-4 py-3 text-sm text-ink outline-none transition focus:border-maroon"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-maroon">
                      Party Size
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-gold/60 bg-white/90 px-4 py-3 text-sm text-ink outline-none transition focus:border-maroon"
                    >
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4 Guests</option>
                      <option>Family (5+)</option>
                    </select>
                  </div>
                </div>

                {/* Attendance Toggle */}
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-maroon">
                    Will You Join Us in Udaipur?
                  </span>
                  <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttending("yes")}
                      className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3.5 text-sm font-medium transition ${
                        attending === "yes"
                          ? "border-maroon bg-royal-velvet text-gold-light shadow-md"
                          : "border-gold/55 bg-cream/75 text-maroon hover:bg-cream"
                      }`}
                    >
                      <Sparkles className="h-4 w-4" />
                      Joyfully Attending
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttending("blessings")}
                      className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3.5 text-sm font-medium transition ${
                        attending === "blessings"
                          ? "border-maroon bg-royal-velvet text-gold-light shadow-md"
                          : "border-gold/55 bg-cream/75 text-maroon hover:bg-cream"
                      }`}
                    >
                      <Heart className="h-4 w-4" />
                      Sending Blessings From Afar
                    </button>
                  </div>
                </div>

                {/* Ceremonies Attending */}
                {attending === "yes" && (
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-maroon">
                      Ceremonies You&apos;ll Attend
                    </span>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {WEDDING_EVENTS.map((ev) => {
                        const active = selectedEvents.includes(ev.title);
                        return (
                          <button
                            key={ev.id}
                            type="button"
                            onClick={() => toggleEvent(ev.title)}
                            className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                              active
                                ? "border-maroon bg-maroon text-gold-light"
                                : "border-gold/55 bg-cream/75 text-maroon hover:bg-cream"
                            }`}
                          >
                            {ev.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-maroon">
                    Warm Wishes, Blessings or Song Request
                  </label>
                  <textarea
                    rows={3}
                    value={blessing}
                    onChange={(e) => setBlessing(e.target.value)}
                    placeholder="Write a heartfelt blessing for Ananya & Vivaan (or a sangeet song you'd love to dance to)..."
                    className="mt-2 w-full rounded-xl border border-gold/60 bg-white/90 px-4 py-3 text-sm text-ink outline-none transition focus:border-maroon"
                  />
                </div>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="shimmer-btn inline-flex items-center justify-center gap-2.5 rounded-full bg-royal-velvet px-10 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-gold-light shadow-[0_14px_35px_rgba(79,14,28,0.3)] transition hover:scale-[1.03] disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" />
                    {submitting ? "Recording RSVP..." : "Confirm Royal RSVP"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>

        {/* Blessings Wall */}
        <div className="mt-16">
          <h3 className="text-center font-display text-3xl font-semibold text-maroon">
            Blessings From Loved Ones
          </h3>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {wishes.map((wish, idx) => (
              <ScrollReveal key={wish.id} delayMs={idx * 80}>
                <div className="h-full rounded-3xl border border-gold/55 bg-ivory/95 p-6 shadow-sm transition hover:border-gold hover:-translate-y-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-xl font-semibold text-maroon">
                      {wish.name}
                    </span>
                    <Heart className="h-4 w-4 text-crimson fill-crimson/20 shrink-0" />
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-gold-dark mt-0.5">
                    {wish.relation}
                  </p>
                  <p className="mt-3 text-sm italic leading-relaxed text-muted">
                    &ldquo;{wish.message}&rdquo;
                  </p>
                  <p className="mt-3 text-[10px] uppercase tracking-wider text-muted/70">
                    {wish.timestamp}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
