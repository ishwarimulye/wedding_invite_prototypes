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
}

export interface StoryMoment {
  step: string;
  date: string;
  title: string;
  place: string;
  text: string;
}

export interface RsvpEntry {
  id: string;
  name: string;
  attending: "yes" | "no";
  guests: number;
  note: string;
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

export const STORY_MOMENTS: StoryMoment[] = [
  {
    step: "01",
    date: "Spring 2023",
    title: "A Quiet Rainy Coffee",
    place: "Bandra, Mumbai",
    text: "What was supposed to be a twenty-minute introduction over filter coffee stretched past sunset, three refill pots, and a shared umbrella.",
  },
  {
    step: "02",
    date: "Winter 2025",
    title: "The Proposal Under Jasmine",
    place: "Balsamand Lake, Jodhpur",
    text: "Between weathered sandstone arches and strings of mogra, Kabir asked the easiest question Meera had ever answered.",
  },
  {
    step: "03",
    date: "November 2027",
    title: "Homecoming With Everyone We Love",
    place: "Umaid Heritage Haveli",
    text: "Now we gather our closest family and friends for three unhurried days of florals, music, and sacred vows.",
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
  },
];

export const GALLERY_MOMENTS = [
  {
    src: "/images/couple-garden.jpg",
    title: "Meera & Kabir",
    caption: "Sunlit garden walk ahead of the celebrations",
  },
  {
    src: "/images/jodhpur-hero.jpg",
    title: "The Archway Welcome",
    caption: "Cascading bougainvillea over carved sandstone",
  },
  {
    src: "/images/garden-florals.jpg",
    title: "The Floral Mandap",
    caption: "Peonies, mogra & marigolds ready for the vows",
  },
  {
    src: "/images/jodhpur-table.jpg",
    title: "Evening Supper",
    caption: "Taper candles & garden roses beneath the colonnade",
  },
];

export const INITIAL_RSVPS: RsvpEntry[] = [
  {
    id: "r1",
    name: "Rohan & Anjali Deshmukh",
    attending: "yes",
    guests: 2,
    note: "So excited to dance at the Sangeet and celebrate with you in Jodhpur!",
  },
  {
    id: "r2",
    name: "Chacha Ji & Family",
    attending: "yes",
    guests: 4,
    note: "Arriving Friday evening — counting down the days with big hugs!",
  },
  {
    id: "r3",
    name: "Neha & Siddharth Kapoor",
    attending: "yes",
    guests: 2,
    note: "Cannot wait for the Phoolon Ki Mehendi and sunset pheras!",
  },
];
