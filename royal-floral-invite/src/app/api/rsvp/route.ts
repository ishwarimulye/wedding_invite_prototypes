import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { GuestWish, INITIAL_WISHES } from "@/data/weddingData";

const DATA_FILE = path.join(process.cwd(), "data", "wishes.json");

// Fallback in-memory store if running in a read-only environment
let memoryWishes: GuestWish[] = [...INITIAL_WISHES];

async function readWishes(): Promise<GuestWish[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      memoryWishes = parsed;
      return parsed;
    }
  } catch {
    // Seed initial file if writable
    try {
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.writeFile(DATA_FILE, JSON.stringify(memoryWishes, null, 2), "utf8");
    } catch {
      // Read-only fallback
    }
  }
  return memoryWishes;
}

export async function GET() {
  const wishes = await readWishes();
  return NextResponse.json({ wishes });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const attending = body?.attending === "blessings" ? "blessings" : "yes";
    const guestCount = String(body?.guestCount ?? "2 Guests").trim();
    const blessing = String(body?.blessing ?? "").trim();

    if (!name) {
      return NextResponse.json(
        { error: "Guest name is required." },
        { status: 400 }
      );
    }

    const newWish: GuestWish = {
      id: `wish-${Date.now()}`,
      name,
      relation:
        attending === "yes"
          ? `Attending • ${guestCount}`
          : "Sending Warm Blessings",
      message:
        blessing ||
        (attending === "yes"
          ? "Delighted to celebrate every phera, flower, and melody with you in Udaipur!"
          : "Sending warmest blessings and love for a radiant forever together."),
      timestamp: "Just now",
    };

    const current = await readWishes();
    const updated = [newWish, ...current].slice(0, 30);
    memoryWishes = updated;

    try {
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf8");
    } catch {
      // Keep memory store updated on read-only hosts
    }

    return NextResponse.json({ wish: newWish, wishes: updated }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to process RSVP." },
      { status: 400 }
    );
  }
}
