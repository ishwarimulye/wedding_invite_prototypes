import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { INITIAL_RSVPS, RsvpEntry } from "@/data/inviteData";

const DATA_FILE = path.join(process.cwd(), "data", "rsvps.json");
let memoryEntries: RsvpEntry[] = [...INITIAL_RSVPS];

async function readEntries(): Promise<RsvpEntry[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      memoryEntries = parsed;
      return parsed;
    }
  } catch {
    try {
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.writeFile(DATA_FILE, JSON.stringify(memoryEntries, null, 2), "utf8");
    } catch {
      // Read-only serverless filesystem fallback
    }
  }
  return memoryEntries;
}

export async function GET() {
  const entries = await readEntries();
  return NextResponse.json({ entries });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body?.name ?? "").trim();
    const attending = body?.attending === "no" ? "no" : "yes";
    const guests = Math.max(1, Math.min(10, Number(body?.guests ?? 2) || 2));
    const note = String(body?.note ?? "").trim();

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    const entry: RsvpEntry = {
      id: `r-${Date.now()}`,
      name,
      attending,
      guests: attending === "yes" ? guests : 0,
      note:
        note ||
        (attending === "yes"
          ? "Delighted to celebrate with you in Jodhpur."
          : "Sending warmest wishes from afar."),
    };

    const current = await readEntries();
    const updated = [entry, ...current].slice(0, 25);
    memoryEntries = updated;

    try {
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf8");
    } catch {
      // Keep memory updated on read-only hosts
    }

    return NextResponse.json({ entry, entries: updated }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to save RSVP." }, { status: 400 });
  }
}
