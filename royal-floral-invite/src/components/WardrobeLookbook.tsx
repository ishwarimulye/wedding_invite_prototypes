"use client";

import React, { useState } from "react";
import { Shirt, Sparkles } from "lucide-react";
import { LotusSeparator } from "./FloralOrnaments";
import ScrollReveal from "./ScrollReveal";

const LOOKBOOK_DAYS = [
  {
    id: "day1",
    tab: "Day 1 · Mehendi & Sangeet",
    theme: "Jewel Emerald & Sunlit Florals",
    mood: "Breezy Chanderi, mirrorwork & hand-painted florals for the Champa Bagh Lawn.",
    hers: "Organza sarees, floral lehengas, fresh mogra gajras & comfortable wedges.",
    his: "Sage or ivory linen bandhgalas, mirror-embroidered Nehru jackets & juttis.",
    swatches: [
      { name: "Palace Emerald", hex: "#1E4637", fabric: "Raw Silk" },
      { name: "Blush Rose", hex: "#D88C98", fabric: "Organza" },
      { name: "Mint Pistachio", hex: "#A8C3A4", fabric: "Chanderi" },
      { name: "Antique Gold", hex: "#C8943E", fabric: "Zari" },
    ],
  },
  {
    id: "day2",
    tab: "Day 2 · Haldi & Shubh Vivah",
    theme: "Marigold Mornings & Velvet Crimson",
    mood: "Sunshine yellow cottons by morning; regal crimson, maroon & antique gold by dusk.",
    hers: "Marigold chikankari for Haldi; silk sarees or zardozi lehengas with shawls for Pheras.",
    his: "White/yellow kurtas by morning; classic ivory sherwanis or velvet bandhgalas at night.",
    swatches: [
      { name: "Marigold", hex: "#E8A43C", fabric: "Kota Doria" },
      { name: "Velvet Maroon", hex: "#4F0E1C", fabric: "Silk Velvet" },
      { name: "Sindoor Crimson", hex: "#7A192D", fabric: "Banarasi" },
      { name: "Champagne", hex: "#F1D48E", fabric: "Tissue" },
    ],
  },
  {
    id: "day3",
    tab: "Day 3 · Royal Reception",
    theme: "Ivory Silk & Champagne Heritage",
    mood: "Understated timeless elegance for the sitar symphony & Darbar-e-Khas banquet.",
    hers: "Champagne tissue sarees, pearl-embellished gowns or heirloom kundan sets.",
    his: "Charcoal tuxedos, ivory jodhpuri suits, or tailored black-tie heritage wear.",
    swatches: [
      { name: "Ivory Silk", hex: "#FCF6EA", fabric: "Kanjeevaram" },
      { name: "Burnished Gold", hex: "#C8943E", fabric: "Brocade" },
      { name: "Rosewood", hex: "#65474B", fabric: "Velvet" },
      { name: "Obsidian", hex: "#271316", fabric: "Wool Silk" },
    ],
  },
];

export default function WardrobeLookbook() {
  const [activeId, setActiveId] = useState(LOOKBOOK_DAYS[0].id);
  const current =
    LOOKBOOK_DAYS.find((d) => d.id === activeId) ?? LOOKBOOK_DAYS[0];

  return (
    <section className="relative bg-cream py-20 px-4 sm:px-8 border-y border-gold/35">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.34em] text-gold-dark font-semibold">
            Curated Style Guide
          </p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-maroon">
            The Royal Wardrobe Lookbook
          </h2>
          <LotusSeparator />
        </ScrollReveal>

        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {LOOKBOOK_DAYS.map((day) => {
            const active = day.id === current.id;
            return (
              <button
                key={day.id}
                type="button"
                onClick={() => setActiveId(day.id)}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                  active
                    ? "bg-royal-velvet text-gold-light shadow-md"
                    : "border border-gold/55 bg-ivory text-maroon hover:bg-parchment/70"
                }`}
              >
                {day.tab}
              </button>
            );
          })}
        </div>

        <div
          key={current.id}
          className="mt-8 animate-fade-up rounded-[2rem] border-2 border-gold/60 bg-ivory p-6 sm:p-10 shadow-[0_18px_50px_rgba(79,14,28,0.1)]"
        >
          <div className="grid items-center gap-8 lg:grid-cols-12">
            {/* Fabric Swatch Palette */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              {current.swatches.map((sw) => (
                <div
                  key={sw.name}
                  className="overflow-hidden rounded-2xl border border-gold/45 bg-cream/60 shadow-sm"
                >
                  <div
                    className="h-20 w-full"
                    style={{ backgroundColor: sw.hex }}
                  />
                  <div className="p-3">
                    <p className="font-display text-base font-semibold text-maroon">
                      {sw.name}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
                      {sw.fabric}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Styling Guidance */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.24em] text-gold-dark font-semibold">
                  <Sparkles className="h-3.5 w-3.5" />
                  Palette Theme
                </span>
                <h3 className="mt-1 font-display text-3xl font-semibold text-maroon">
                  {current.theme}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {current.mood}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-gold/35 bg-cream/65 p-4">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-maroon">
                    <Shirt className="h-3.5 w-3.5 text-gold-dark" />
                    For Ladies
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    {current.hers}
                  </p>
                </div>
                <div className="rounded-2xl border border-gold/35 bg-cream/65 p-4">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-maroon">
                    <Shirt className="h-3.5 w-3.5 text-gold-dark" />
                    For Gentlemen
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    {current.his}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
