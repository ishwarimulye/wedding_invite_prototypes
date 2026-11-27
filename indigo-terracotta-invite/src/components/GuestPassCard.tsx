"use client";

import React from "react";
import { Download, Sparkles } from "lucide-react";
import { INVITE_INFO } from "@/data/inviteData";

export default function GuestPassCard({
  guestName,
  guests,
  attending,
}: {
  guestName: string;
  guests: number;
  attending: "yes" | "no";
}) {
  const handleDownloadPass = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 680;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#FCF8F1";
    ctx.fillRect(0, 0, 1200, 680);

    ctx.strokeStyle = "#134E4A";
    ctx.lineWidth = 10;
    ctx.strokeRect(24, 24, 1152, 632);

    ctx.strokeStyle = "#C99242";
    ctx.lineWidth = 2;
    ctx.strokeRect(42, 42, 1116, 596);

    // Left Peacock Teal ribbon
    ctx.fillStyle = "#134E4A";
    ctx.fillRect(42, 42, 310, 596);

    ctx.fillStyle = "#FBECE4";
    ctx.font = "600 20px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("SHUBH VIVAH PASS", 197, 130);

    ctx.fillStyle = "#EA9A3E";
    ctx.font = "italic 58px Georgia, serif";
    ctx.fillText("M & K", 197, 340);

    ctx.fillStyle = "#FCF8F1";
    ctx.font = "500 18px sans-serif";
    ctx.fillText("20 – 22 NOV 2027", 197, 520);
    ctx.fillText("JODHPUR", 197, 552);

    ctx.textAlign = "left";
    ctx.fillStyle = "#E16B5A";
    ctx.font = "600 18px sans-serif";
    ctx.fillText("PERSONALIZED ROYAL KEEPSAKE", 410, 125);

    ctx.fillStyle = "#134E4A";
    ctx.font = "600 56px Georgia, serif";
    ctx.fillText(`${INVITE_INFO.bride} & ${INVITE_INFO.groom}`, 410, 200);

    ctx.strokeStyle = "#E16B5A";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(410, 232);
    ctx.lineTo(1080, 232);
    ctx.stroke();

    ctx.fillStyle = "#5A635E";
    ctx.font = "600 16px sans-serif";
    ctx.fillText("HONORED GUEST", 410, 290);

    ctx.fillStyle = "#1E2422";
    ctx.font = "600 42px Georgia, serif";
    ctx.fillText(guestName, 410, 345);

    ctx.fillStyle = "#2D6A54";
    ctx.font = "600 20px sans-serif";
    ctx.fillText(
      attending === "yes"
        ? `CONFIRMED · ${guests} ${guests === 1 ? "GUEST" : "GUESTS"}`
        : "SENDING WARM BLESSINGS",
      410,
      400
    );

    ctx.fillStyle = "#5A635E";
    ctx.font = "500 19px Georgia, serif";
    ctx.fillText(INVITE_INFO.venue, 410, 500);
    ctx.fillText(INVITE_INFO.address, 410, 532);

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `${guestName.replace(/[^a-z0-9]+/gi, "-")}-Wedding-Pass.png`;
    link.click();
  };

  return (
    <div className="mx-auto mt-6 max-w-xl overflow-hidden rounded-3xl border-2 border-honey-gold/65 bg-white shadow-[0_18px_50px_rgba(11,51,48,0.14)] text-left">
      <div className="grid sm:grid-cols-12">
        <div className="sm:col-span-4 bg-berry-garden p-5 text-petal-milk flex flex-col justify-between">
          <span className="text-[10px] uppercase tracking-[0.22em] text-marigold font-semibold">
            Keepsake Pass
          </span>
          <p className="my-4 font-display text-3xl italic text-petal-milk">
            M &amp; K
          </p>
          <p className="text-[11px] uppercase tracking-widest text-petal-milk/80">
            {INVITE_INFO.dates}
          </p>
        </div>
        <div className="sm:col-span-8 p-5 sm:p-6 flex flex-col justify-between bg-petal-milk">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-coral-rose font-semibold">
              Admit With Warmth
            </p>
            <h4 className="mt-1 font-display text-2xl font-semibold text-berry">
              {guestName}
            </h4>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-sage">
              {attending === "yes"
                ? `Confirmed · ${guests} ${guests === 1 ? "Guest" : "Guests"}`
                : "Warm Blessings Recorded"}
            </p>
            <p className="mt-2 text-xs text-muted">{INVITE_INFO.venue}</p>
          </div>

          <button
            type="button"
            onClick={handleDownloadPass}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-berry-garden px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-petal-milk transition hover:scale-[1.02]"
          >
            <Download className="h-3.5 w-3.5 text-marigold" />
            Download Keepsake Pass (.png)
          </button>
        </div>
      </div>
      <div className="border-t border-honey-gold/30 bg-blush-silk/70 px-5 py-2 text-[11px] text-muted flex items-center justify-center gap-1.5">
        <Sparkles className="h-3 w-3 text-coral-rose" />
        Save your personalized pass to share or keep for arrival in Jodhpur
      </div>
    </div>
  );
}
