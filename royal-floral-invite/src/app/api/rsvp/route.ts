import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { GuestWish, INITIAL_WISHES } from "@/data/weddingData";

interface RoyalState {
  wishes: GuestWish[];
  diyasLit: number;
}

const DATA_FILE = path.join(process.cwd(), "data", "wishes.json");

let memoryState: RoyalState = {
  wishes: [...INITIAL_WISHES],
  diyasLit: 108,
};

async function readState(): Promise<RoyalState> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      memoryState = { wishes: parsed, diyasLit: memoryState.diyasLit };
      return memoryState;
    }
    if (parsed && Array.isArray(parsed.wishes)) {
      memoryState = {
        wishes: parsed.wishes,
        diyasLit: typeof parsed.diyasLit === "number" ? parsed.diyasLit : 108,
      };
      return memoryState;
    }
  } catch {
    try {
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.writeFile(DATA_FILE, JSON.stringify(memoryState, null, 2), "utf8");
    } catch {
      // Read-only serverless fallback
    }
  }
  return memoryState;
}

async function writeState(state: RoyalState) {
  memoryState = state;
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(state, null, 2), "utf8");
  } catch {
    // Keep memory store updated on read-only hosts
  }
}

export async function GET() {
  const state = await readState();
  return NextResponse.json(state);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const state = await readState();

    // Action: Light an auspicious Diya
    if (body?.action === "light_diya") {
      const updated: RoyalState = {
        ...state,
        diyasLit: state.diyasLit + 1,
      };
      await writeState(updated);
      return NextResponse.json(updated);
    }

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

    const updated: RoyalState = {
      wishes: [newWish, ...state.wishes].slice(0, 30),
      diyasLit: state.diyasLit + 1,
    };
    await writeState(updated);

    return NextResponse.json({ wish: newWish, ...updated }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to process RSVP." },
      { status: 400 }
    );
  }
}
