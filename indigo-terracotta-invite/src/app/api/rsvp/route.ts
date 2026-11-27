import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import {
  INITIAL_RSVPS,
  INITIAL_SONGS,
  RsvpEntry,
  SongOption,
} from "@/data/inviteData";

interface CelebrationState {
  entries: RsvpEntry[];
  petals: number;
  songs: SongOption[];
}

const DATA_FILE = path.join(process.cwd(), "data", "rsvps.json");

let memoryState: CelebrationState = {
  entries: [...INITIAL_RSVPS],
  petals: 148,
  songs: INITIAL_SONGS.map((s) => ({ ...s })),
};

async function readState(): Promise<CelebrationState> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.entries)) {
      memoryState = {
        entries: parsed.entries,
        petals: typeof parsed.petals === "number" ? parsed.petals : 148,
        songs: Array.isArray(parsed.songs) ? parsed.songs : memoryState.songs,
      };
      return memoryState;
    }
  } catch {
    try {
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.writeFile(DATA_FILE, JSON.stringify(memoryState, null, 2), "utf8");
    } catch {
      // Read-only serverless filesystem fallback
    }
  }
  return memoryState;
}

async function writeState(state: CelebrationState) {
  memoryState = state;
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(state, null, 2), "utf8");
  } catch {
    // Keep in-memory state updated on read-only serverless hosts
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

    // Action 1: Toss a petal blessing
    if (body?.action === "petal") {
      const updated: CelebrationState = {
        ...state,
        petals: state.petals + 1,
      };
      await writeState(updated);
      return NextResponse.json(updated);
    }

    // Action 2: Vote for a Sangeet song
    if (body?.action === "vote_song" && typeof body?.songId === "string") {
      const updated: CelebrationState = {
        ...state,
        songs: state.songs.map((s) =>
          s.id === body.songId ? { ...s, votes: s.votes + 1 } : s
        ),
      };
      await writeState(updated);
      return NextResponse.json(updated);
    }

    // Action 3: Submit RSVP
    const name = String(body?.name ?? "").trim();
    const attending = body?.attending === "no" ? "no" : "yes";
    const guests = Math.max(1, Math.min(10, Number(body?.guests ?? 2) || 2));
    const dietary = String(body?.dietary ?? "Pure Vegetarian").trim();
    const note = String(body?.note ?? "").trim();
    const song = String(body?.song ?? "").trim();

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    const entry: RsvpEntry = {
      id: `r-${Date.now()}`,
      name,
      attending,
      guests: attending === "yes" ? guests : 0,
      dietary: attending === "yes" ? dietary : undefined,
      note:
        note ||
        (attending === "yes"
          ? "Delighted to celebrate with you in Jodhpur."
          : "Sending warmest wishes from afar."),
      song: song || undefined,
    };

    const updated: CelebrationState = {
      ...state,
      entries: [entry, ...state.entries].slice(0, 25),
      petals: state.petals + (attending === "yes" ? 3 : 1),
    };
    await writeState(updated);

    return NextResponse.json({ entry, ...updated }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to process request." }, { status: 400 });
  }
}
