"use client";

import React from "react";
import { Download } from "lucide-react";
import { INVITE_INFO } from "@/data/inviteData";

export default function GuestPassCard({
  guestName,
  guests,
  attending,
  dietary,
}: {
  guestName: string;
  guests: number;
  attending: "yes" | "no";
  dietary?: string;
}) {
  const handleDownloadPass = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 680;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#FBF5EB";
    ctx.fillRect(0, 0, 1200, 680);

    ctx.strokeStyle = "#8B1E3F";
    ctx.lineWidth = 8;
    ctx.strokeRect(24, 24, 1152, 632);

    ctx.strokeStyle = "#C88A2E";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(40, 40, 1120, 600);

    ctx.fillStyle = "#8B1E3F";
    ctx.fillRect(40, 40, 300, 600);

    ctx.fillStyle = "#F5E6D4";
    ctx.font = "600 17px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("SHUBH VIVAH", 190, 130);

    ctx.fillStyle = "#F0C267";
    ctx.font = "italic 54px Georgia, serif";
    ctx.fillText("M & K", 190, 335);

    ctx.fillStyle = "#FBF5EB";
    ctx.font = "500 17px sans-serif";
    ctx.fillText(INVITE_INFO.dates.toUpperCase(), 190, 520);
    ctx.fillText("JODHPUR", 190, 550);

    ctx.textAlign = "left";
    ctx.fillStyle = "#7A4B26";
    ctx.font = "600 15px sans-serif";
    ctx.fillText("INVITATION PASS", 400, 122);

    ctx.fillStyle = "#8B1E3F";
    ctx.font = "500 52px Georgia, serif";
    ctx.fillText(
      `${INVITE_INFO.brideFirst} & ${INVITE_INFO.groomFirst}`,
      400,
      192
    );

    ctx.strokeStyle = "#C88A2E";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(400, 224);
    ctx.lineTo(1080, 224);
    ctx.stroke();

    ctx.fillStyle = "#684B52";
    ctx.font = "600 14px sans-serif";
    ctx.fillText("GUEST", 400, 276);

    ctx.fillStyle = "#31171F";
    ctx.font = "500 40px Georgia, serif";
    ctx.fillText(guestName, 400, 328);

    ctx.fillStyle = "#7A4B26";
    ctx.font = "600 18px sans-serif";
    ctx.fillText(
      attending === "yes"
        ? `${guests} ${guests === 1 ? "GUEST" : "GUESTS"}${dietary ? ` · ${dietary.toUpperCase()}` : ""}`
        : "SENDING WISHES",
      400,
      380
    );

    ctx.fillStyle = "#684B52";
    ctx.font = "500 18px Georgia, serif";
    ctx.fillText(INVITE_INFO.venue, 400, 488);
    ctx.fillText(INVITE_INFO.address, 400, 518);
    ctx.fillText(INVITE_INFO.checkInWindow, 400, 548);

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `${guestName.replace(/[^a-z0-9]+/gi, "-")}-Wedding-Pass.png`;
    link.click();
  };

  return (
    <div className="mx-auto mt-6 max-w-xl border border-honey-gold/65 bg-petal-milk text-left shadow-sm">
      <div className="grid sm:grid-cols-12">
        <div className="sm:col-span-4 bg-berry-garden p-6 text-petal-milk flex flex-col justify-between">
          <span className="text-[10px] uppercase tracking-[0.24em] text-blush-silk/85">
            Keepsake Pass
          </span>
          <p className="my-4 font-display text-3xl italic">M &amp; K</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-blush-silk/80">
            {INVITE_INFO.dates}
          </p>
        </div>
        <div className="sm:col-span-8 p-6 flex flex-col justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.24em] text-sage font-medium">
              Honored Guest
            </p>
            <h4 className="mt-1 font-display text-2xl font-medium text-berry">
              {guestName}
            </h4>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted">
              {attending === "yes"
                ? `${guests} ${guests === 1 ? "Guest" : "Guests"}${dietary ? ` · ${dietary}` : ""}`
                : "Warm Wishes Recorded"}
            </p>
            <p className="mt-2 text-xs text-muted">{INVITE_INFO.venue}</p>
          </div>

          <button
            type="button"
            onClick={handleDownloadPass}
            className="mt-5 inline-flex items-center justify-center gap-2 border border-berry bg-berry px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-petal-milk transition hover:bg-berry-deep"
          >
            <Download className="h-3.5 w-3.5" />
            Download Invitation Pass
          </button>
        </div>
      </div>
    </div>
  );
}
