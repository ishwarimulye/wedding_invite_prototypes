export interface Ceremony {
  code: string;
  day: string;
  title: string;
  shortTitle: string;
  time: string;
  location: string;
  image: string;
  isoStart: string;
  isoEnd: string;
  note: string;
  attire: string;
  swatches: { name: string; hex: string }[];
  mapCoords: { x: number; y: number };
}

export interface PostcardStory {
  id: string;
  src: string;
  title: string;
  stampDate: string;
  place: string;
  author: "Meera" | "Kabir";
  note: string;
}

export interface RsvpEntry {
  id: string;
  name: string;
  attending: "yes" | "no";
  guests: number;
  dietary?: string;
  note: string;
}

export const INVITE_INFO = {
  invocation: "|| श्री गणेशाय नमः ||",
  bride: "Meera Rathore",
  groom: "Kabir Mehta",
  brideFirst: "Meera",
  groomFirst: "Kabir",
  families:
    "Sunita & Mahendra Rathore together with Kavya & Arjun Mehta invite you to celebrate the marriage of their children.",
  dates: "20 – 21 November 2027",
  targetISO: "2027-11-21T16:30:00+05:30",
  city: "Jodhpur, Rajasthan",
  venue: "Umaid Heritage Haveli",
  address: "Ratanada Palace Road, Jodhpur 342011",
  checkInWindow: "Friday, 19 Nov (2:00 PM) – Monday, 22 Nov (11:00 AM)",
  conciergeNote:
    "Airport transfers from Jodhpur Airport (JDH, 15 mins) are arranged for all arriving guests.",
  mapsUrl: "https://maps.google.com/?q=Jodhpur+Rajasthan",
};

export const POSTCARD_STORIES: PostcardStory[] = [
  {
    id: "pc1",
    src: "/images/couple-garden.jpg",
    title: "Mumbai",
    stampDate: "MAR 2023",
    place: "Bandra",
    author: "Kabir",
    note: "A quick coffee before work that somehow lasted until the café closed.",
  },
  {
    id: "pc2",
    src: "/images/jodhpur-hero.jpg",
    title: "The Proposal",
    stampDate: "NOV 2025",
    place: "Jodhpur",
    author: "Meera",
    note: "Quiet tea under the sandstone arches at sunset — and an heirloom ring.",
  },
  {
    id: "pc3",
    src: "/images/garden-florals.jpg",
    title: "The Mandap",
    stampDate: "NOV 2027",
    place: "Haveli Courtyard",
    author: "Meera",
    note: "Where we will take our pheras in the late afternoon light, surrounded by family.",
  },
  {
    id: "pc4",
    src: "/images/jodhpur-table.jpg",
    title: "The Supper",
    stampDate: "NOV 2027",
    place: "Darbar Colonnade",
    author: "Kabir",
    note: "Long tables, brass candles, and unhurried conversation late into the night.",
  },
];

export const CEREMONIES: Ceremony[] = [
  {
    code: "01",
    day: "Saturday, 20 Nov",
    title: "Mehendi",
    shortTitle: "Mehendi",
    time: "1:00 PM – 5:00 PM",
    location: "Bougainvillea Lawn",
    image: "/images/jodhpur-hero.jpg",
    isoStart: "20271120T130000",
    isoEnd: "20271120T170000",
    note: "Henna artists, rose sherbet, and acoustic Rajasthani folk music on the lawn.",
    attire: "Light cottons, sage, blush & florals · Block heels or juttis",
    swatches: [
      { name: "Rose", hex: "#C95858" },
      { name: "Sage", hex: "#587A5F" },
      { name: "Ivory", hex: "#FBF5EB" },
    ],
    mapCoords: { x: 105, y: 104 },
  },
  {
    code: "02",
    day: "Saturday, 20 Nov",
    title: "Sangeet & Dinner",
    shortTitle: "Sangeet",
    time: "7:30 PM Onwards",
    location: "Darbar Colonnade",
    image: "/images/jodhpur-table.jpg",
    isoStart: "20271120T193000",
    isoEnd: "20271120T234500",
    note: "Family performances followed by a candlelit Marwari dinner in the colonnade.",
    attire: "Crimson, antique gold & evening Indian wear",
    swatches: [
      { name: "Crimson", hex: "#8B1E3F" },
      { name: "Gold", hex: "#C88A2E" },
      { name: "Sand", hex: "#F5E6D4" },
    ],
    mapCoords: { x: 295, y: 92 },
  },
  {
    code: "03",
    day: "Sunday, 21 Nov",
    title: "Haldi",
    shortTitle: "Haldi",
    time: "10:30 AM – 1:30 PM",
    location: "Stepwell Terrace",
    image: "/images/couple-garden.jpg",
    isoStart: "20271121T103000",
    isoEnd: "20271121T133000",
    note: "Morning turmeric blessings with marigold garlands and a late brunch.",
    attire: "Marigold yellow, ochre & white cotton",
    swatches: [
      { name: "Marigold", hex: "#EA9E38" },
      { name: "Ochre", hex: "#C88A2E" },
      { name: "Cotton", hex: "#FBF5EB" },
    ],
    mapCoords: { x: 105, y: 204 },
  },
  {
    code: "04",
    day: "Sunday, 21 Nov",
    title: "Baraat, Pheras & Reception",
    shortTitle: "Pheras",
    time: "4:30 PM Baraat · 6:15 PM Pheras · 8:30 PM Dinner",
    location: "Lotus Mandap",
    image: "/images/garden-florals.jpg",
    isoStart: "20271121T163000",
    isoEnd: "20271121T233000",
    note: "Baraat arrival at 4:30 PM, Varmala at dusk, Vedic pheras, and reception dinner.",
    attire: "Traditional Indian formalwear · Bring a light shawl for evening",
    swatches: [
      { name: "Sindoor", hex: "#C95858" },
      { name: "Ivory", hex: "#FBF5EB" },
      { name: "Wine", hex: "#8B1E3F" },
    ],
    mapCoords: { x: 268, y: 204 },
  },
];

export const INITIAL_RSVPS: RsvpEntry[] = [
  {
    id: "r1",
    name: "Rohan & Anjali Deshmukh",
    attending: "yes",
    guests: 2,
    dietary: "Pure Vegetarian",
    note: "Looking forward to celebrating with both families in Jodhpur.",
  },
  {
    id: "r2",
    name: "Neha & Siddharth Kapoor",
    attending: "yes",
    guests: 2,
    dietary: "Jain Meal",
    note: "Arriving Friday afternoon — warm congratulations to you both.",
  },
];
