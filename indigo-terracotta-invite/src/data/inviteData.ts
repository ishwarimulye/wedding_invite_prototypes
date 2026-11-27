export interface Ceremony {
  code: string;
  day: string;
  title: string;
  vibe: string;
  time: string;
  location: string;
  image: string;
  isoStart: string;
  isoEnd: string;
  note: string;
  dressLabel: string;
  swatches: { name: string; hex: string }[];
  mapCoords: { x: number; y: number };
}

export interface PostcardStory {
  id: string;
  src: string;
  title: string;
  stampDate: string;
  place: string;
  caption: string;
  author: "Meera" | "Kabir";
  handwrittenNote: string;
}

export interface SongOption {
  id: string;
  title: string;
  artist: string;
  votes: number;
}

export interface RsvpEntry {
  id: string;
  name: string;
  attending: "yes" | "no";
  guests: number;
  note: string;
  song?: string;
}

export const INVITE_INFO = {
  bride: "Meera",
  groom: "Kabir",
  families: "Smt. Sunita & Shri Mahendra Rathore · Smt. Kavya & Shri Arjun Mehta",
  dates: "20 – 22 November 2027",
  targetISO: "2027-11-21T16:30:00+05:30",
  city: "Jodhpur, Rajasthan",
  venue: "Umaid Heritage Haveli",
  address: "Ratanada Palace Road, Jodhpur 342011",
  mapsUrl: "https://maps.google.com/?q=Jodhpur+Rajasthan",
};

export const POSTCARD_STORIES: PostcardStory[] = [
  {
    id: "pc1",
    src: "/images/couple-garden.jpg",
    title: "A Quiet Rainy Coffee",
    stampDate: "14 MAR 2023",
    place: "Bandra, Mumbai",
    caption: "Tap to flip for Kabir's note",
    author: "Kabir",
    handwrittenNote:
      "I walked in expecting a polite 20-minute hello. Three hours and two spilled cappuccinos later, I knew I never wanted another umbrella-share with anyone else.",
  },
  {
    id: "pc2",
    src: "/images/jodhpur-hero.jpg",
    title: "The Sandstone Arch",
    stampDate: "19 NOV 2025",
    place: "Balsamand, Jodhpur",
    caption: "Tap to flip for Meera's note",
    author: "Meera",
    handwrittenNote:
      "He pretended we were just stopping for sunset tea — then pulled out his grandmother's ring beneath a cascade of coral bougainvillea. Easiest yes of my life.",
  },
  {
    id: "pc3",
    src: "/images/garden-florals.jpg",
    title: "Where We Say Forever",
    stampDate: "21 NOV 2027",
    place: "The Lotus Mandap",
    caption: "Tap to flip for our promise",
    author: "Meera",
    handwrittenNote:
      "We picked a mandap open to the autumn breeze, overflowing with mogra and peach peonies — all that's missing is your warm laughter in the front row.",
  },
  {
    id: "pc4",
    src: "/images/jodhpur-table.jpg",
    title: "One Long Courtyard Table",
    stampDate: "20 NOV 2027",
    place: "Darbar Colonnade",
    caption: "Tap to flip for Kabir's note",
    author: "Kabir",
    handwrittenNote:
      "No stiff assigned tables or hurried speeches — just brass taper candles, Rajasthani thalis, and our favorite people lingering past midnight.",
  },
];

export const CEREMONIES: Ceremony[] = [
  {
    code: "01",
    day: "Sat · 20 Nov",
    title: "Phoolon Ki Mehendi",
    vibe: "Marigolds, Henna & Afternoon Folk",
    time: "1:00 PM — 5:30 PM",
    location: "Bougainvillea Garden Lawn",
    image: "/images/jodhpur-hero.jpg",
    isoStart: "20271120T130000",
    isoEnd: "20271120T173000",
    note: "Sunlit afternoon henna, chilled rose-cardamom thandai, live acoustic folk songs, and fresh floral bangles under blooming bougainvillea.",
    dressLabel: "Blush Pink, Sage Green & Effortless Florals",
    swatches: [
      { name: "Peony Blush", hex: "#E49A97" },
      { name: "Botanical Sage", hex: "#2B5945" },
      { name: "Honey Marigold", hex: "#E29B4D" },
    ],
    mapCoords: { x: 112, y: 110 },
  },
  {
    code: "02",
    day: "Sat · 20 Nov",
    title: "Sangeet & Starlight Supper",
    vibe: "Candlelight, Music & Courtyard Feast",
    time: "7:30 PM Onwards",
    location: "The Candlelit Colonnade",
    image: "/images/jodhpur-table.jpg",
    isoStart: "20271120T193000",
    isoEnd: "20271120T234500",
    note: "An evening of family performances, clinking glasses, warm brass taper candles, and a curated Rajasthani supper beneath the November sky.",
    dressLabel: "Berry Rose, Champagne Gold & Silk",
    swatches: [
      { name: "Berry Wine", hex: "#6B213B" },
      { name: "Champagne", hex: "#C79652" },
      { name: "Petal Ivory", hex: "#FDF9F5" },
    ],
    mapCoords: { x: 295, y: 98 },
  },
  {
    code: "03",
    day: "Sun · 21 Nov",
    title: "Sunset Pheras & Celebration",
    vibe: "Sacred Vows Amidst Garden Blooms",
    time: "4:30 PM Baraat · 6:00 PM Pheras",
    location: "The Lotus Rose Mandap",
    image: "/images/garden-florals.jpg",
    isoStart: "20271121T163000",
    isoEnd: "20271121T223000",
    note: "A joyful baraat procession followed by Vedic pheras inside a mandap overflowing with blush roses, jasmine garlands, and warm blessings.",
    dressLabel: "Coral Rose, Ivory Organza & Heritage Weaves",
    swatches: [
      { name: "Coral Rose", hex: "#D66863" },
      { name: "Warm Ivory", hex: "#FDF9F5" },
      { name: "Deep Sage", hex: "#24493A" },
    ],
    mapCoords: { x: 204, y: 205 },
  },
];

export const INITIAL_SONGS: SongOption[] = [
  { id: "s1", title: "Din Shagna Da", artist: "Jasleen Royal", votes: 19 },
  { id: "s2", title: "Gal Mitthi Mitthi", artist: "Aisha", votes: 24 },
  { id: "s3", title: "Kesariya", artist: "Arijit Singh", votes: 15 },
  { id: "s4", title: "London Thumakda", artist: "Queen", votes: 22 },
];

export const INITIAL_RSVPS: RsvpEntry[] = [
  {
    id: "r1",
    name: "Rohan & Anjali Deshmukh",
    attending: "yes",
    guests: 2,
    note: "So excited to dance at the Sangeet and celebrate with you in Jodhpur!",
    song: "Gal Mitthi Mitthi",
  },
  {
    id: "r2",
    name: "Chacha Ji & Family",
    attending: "yes",
    guests: 4,
    note: "Arriving Friday evening — counting down the days with big hugs!",
    song: "London Thumakda",
  },
  {
    id: "r3",
    name: "Neha & Siddharth Kapoor",
    attending: "yes",
    guests: 2,
    note: "Cannot wait for the Phoolon Ki Mehendi and sunset pheras!",
    song: "Din Shagna Da",
  },
];
