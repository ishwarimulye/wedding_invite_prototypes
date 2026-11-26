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

export const CEREMONIES: Ceremony[] = [
  {
    code: "01",
    day: "Sat · 20 Nov",
    title: "Phoolon Ki Mehendi",
    vibe: "Marigolds, Henna & Rose Sherbet",
    time: "1:00 PM — 5:30 PM",
    location: "Bougainvillea Garden Lawn",
    image: "/images/jodhpur-hero.jpg",
    isoStart: "20271120T130000",
    isoEnd: "20271120T173000",
    note: "Sunlit afternoon henna, chilled rose-cardamom thandai, live dholak folk songs, and floral bangles under blooming bougainvillea.",
    dressLabel: "Blush Pink, Sage Green & Sunwashed Florals",
    swatches: [
      { name: "Peony Pink", hex: "#E48586" },
      { name: "Garden Sage", hex: "#2B5945" },
      { name: "Marigold", hex: "#EF9C4D" },
    ],
  },
  {
    code: "02",
    day: "Sat · 20 Nov",
    title: "Sangeet & Starlight Supper",
    vibe: "Fairy Lights, Music & Joyful Dances",
    time: "7:30 PM Onwards",
    location: "The Candlelit Courtyard",
    image: "/images/jodhpur-table.jpg",
    isoStart: "20271120T193000",
    isoEnd: "20271120T234500",
    note: "An evening bursting with family performances, clinking glasses, warm brass candles, and a celebratory Rajasthani feast under the stars.",
    dressLabel: "Berry Wine, Honey Gold & Shimmer",
    swatches: [
      { name: "Berry Rose", hex: "#7C1F42" },
      { name: "Honey Gold", hex: "#D59244" },
      { name: "Blush Silk", hex: "#FDECE4" },
    ],
  },
  {
    code: "03",
    day: "Sun · 21 Nov",
    title: "Sunset Pheras & Celebration",
    vibe: "Sacred Vows Amidst Showering Petals",
    time: "4:30 PM Baraat · 6:00 PM Pheras",
    location: "The Lotus Rose Mandap",
    image: "/images/garden-florals.jpg",
    isoStart: "20271121T163000",
    isoEnd: "20271121T223000",
    note: "A lively baraat procession followed by sacred vows inside a mandap overflowing with blush roses, jasmine garlands, and warm blessings.",
    dressLabel: "Coral Rose, Ivory Silk & Heritage Weaves",
    swatches: [
      { name: "Coral Rose", hex: "#DE645E" },
      { name: "Petal Ivory", hex: "#FFF8F4" },
      { name: "Forest Sage", hex: "#2B5945" },
    ],
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
];
