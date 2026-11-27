export interface Ceremony {
  code: string;
  day: string;
  title: string;
  shortTitle: string;
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
    shortTitle: "Mehendi",
    vibe: "Henna, Folk Songs & Rose Sherbet",
    time: "1:00 PM — 5:00 PM",
    location: "Bougainvillea Garden Lawn",
    image: "/images/jodhpur-hero.jpg",
    isoStart: "20271120T130000",
    isoEnd: "20271120T170000",
    note: "Sunlit afternoon henna, chilled rose-cardamom thandai, live acoustic dholak folk songs, and fresh floral bangles under blooming bougainvillea.",
    dressLabel: "Mint Sage, Peach & Breezy Florals",
    swatches: [
      { name: "Peacock Teal", hex: "#134E4A" },
      { name: "Peach Coral", hex: "#E16B5A" },
      { name: "Champagne", hex: "#FCF8F1" },
    ],
    mapCoords: { x: 105, y: 104 },
  },
  {
    code: "02",
    day: "Sat · 20 Nov",
    title: "Sangeet & Starlight Supper",
    shortTitle: "Sangeet",
    vibe: "Candlelight, Dances & Courtyard Feast",
    time: "7:30 PM Onwards",
    location: "The Candlelit Colonnade",
    image: "/images/jodhpur-table.jpg",
    isoStart: "20271120T193000",
    isoEnd: "20271120T234500",
    note: "An evening of family performances, clinking glasses, warm brass taper candles, and a curated Rajasthani supper beneath the November stars.",
    dressLabel: "Emerald, Burnished Gold & Silk",
    swatches: [
      { name: "Deep Emerald", hex: "#0B3330" },
      { name: "Honey Gold", hex: "#C99242" },
      { name: "Warm Blush", hex: "#F6D8CD" },
    ],
    mapCoords: { x: 295, y: 92 },
  },
  {
    code: "03",
    day: "Sun · 21 Nov",
    title: "Haldi & Phoolon Ki Holi",
    shortTitle: "Haldi",
    vibe: "Turmeric Blessings & Showering Marigolds",
    time: "10:30 AM — 1:30 PM",
    location: "Sunlit Stepwell Terrace",
    image: "/images/couple-garden.jpg",
    isoStart: "20271121T103000",
    isoEnd: "20271121T133000",
    note: "Joyful morning turmeric rituals accompanied by baskets of fresh marigold and mogra petals, dhol beats, and saffron lassi in clay kulhads.",
    dressLabel: "Marigold Yellow, Sunshine Ochre & Ivory",
    swatches: [
      { name: "Marigold", hex: "#EA9A3E" },
      { name: "Saffron Gold", hex: "#C99242" },
      { name: "Ivory Cotton", hex: "#FCF8F1" },
    ],
    mapCoords: { x: 105, y: 204 },
  },
  {
    code: "04",
    day: "Sun · 21 Nov",
    title: "Baraat, Pheras & Reception",
    shortTitle: "Pheras",
    vibe: "Sacred Vows & Grand Celebration",
    time: "4:30 PM Baraat · 6:00 PM Vows",
    location: "The Lotus Rose Mandap",
    image: "/images/garden-florals.jpg",
    isoStart: "20271121T163000",
    isoEnd: "20271121T230000",
    note: "A lively baraat procession followed by Vedic pheras inside a floral mandap and an intimate champagne reception toast under the stars.",
    dressLabel: "Coral Rose, Ivory Organza & Heritage Weaves",
    swatches: [
      { name: "Coral Rose", hex: "#E16B5A" },
      { name: "Petal Ivory", hex: "#FCF8F1" },
      { name: "Peacock Teal", hex: "#134E4A" },
    ],
    mapCoords: { x: 268, y: 204 },
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
    note: "Cannot wait for the Phoolon Ki Mehendi, Haldi, and sunset pheras!",
    song: "Din Shagna Da",
  },
];
