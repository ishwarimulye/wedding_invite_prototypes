export interface Ceremony {
  code: string;
  day: string;
  title: string;
  time: string;
  location: string;
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
  coordinates: "26.2389° N · 73.0243° E",
  venue: "Umaid Heritage Haveli",
  address: "Ratanada Palace Road, Jodhpur 342011",
  mapsUrl: "https://maps.google.com/?q=Jodhpur+Rajasthan",
};

export const CEREMONIES: Ceremony[] = [
  {
    code: "01",
    day: "Saturday · Nov 20",
    title: "Phoolon Ki Mehendi",
    time: "1:00 PM — 5:30 PM",
    location: "Neel Baori Courtyard",
    isoStart: "20271120T130000",
    isoEnd: "20271120T173000",
    note: "Afternoon henna, chilled rose-cardamom sherbet, and acoustic folk melodies under bougainvillea shade.",
    dressLabel: "Linen, Olive & Sunwashed Ochre",
    swatches: [
      { name: "Olive", hex: "#465947" },
      { name: "Ochre", hex: "#C68B2C" },
      { name: "Limestone", hex: "#EAE0D0" },
    ],
  },
  {
    code: "02",
    day: "Saturday · Nov 20",
    title: "Sangeet & Courtyard Supper",
    time: "7:30 PM Onwards",
    location: "Darbar Sandstone Terrace",
    isoStart: "20271120T193000",
    isoEnd: "20271120T234500",
    note: "Candlelit music, family dances, and a long-table Marwari harvest supper beneath the November stars.",
    dressLabel: "Midnight Indigo & Burnished Brass",
    swatches: [
      { name: "Indigo", hex: "#14223B" },
      { name: "Brass", hex: "#C68B2C" },
      { name: "Slate", hex: "#384B6E" },
    ],
  },
  {
    code: "03",
    day: "Sunday · Nov 21",
    title: "The Sunset Pheras",
    time: "4:30 PM Baraat · 6:00 PM Vows",
    location: "Surya Jharokha Lawns",
    isoStart: "20271121T163000",
    isoEnd: "20271121T223000",
    note: "Sacred Vedic vows as the desert sun dips behind Mehrangarh silhouette, followed by a warm reception toast.",
    dressLabel: "Terracotta Rose, Ivory Silk & Heritage Weaves",
    swatches: [
      { name: "Terracotta", hex: "#B34738" },
      { name: "Raw Silk", hex: "#F6F1E7" },
      { name: "Saffron", hex: "#C68B2C" },
    ],
  },
];

export const INITIAL_RSVPS: RsvpEntry[] = [
  {
    id: "r1",
    name: "Rohan & Anjali Deshmukh",
    attending: "yes",
    guests: 2,
    note: "Wouldn't miss Jodhpur in November for the world.",
  },
  {
    id: "r2",
    name: "Chacha Ji & Family",
    attending: "yes",
    guests: 4,
    note: "Arriving Friday evening — excited for the courtyard supper!",
  },
];
