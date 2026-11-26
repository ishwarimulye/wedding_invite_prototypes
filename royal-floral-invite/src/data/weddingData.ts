export interface WeddingEvent {
  id: string;
  day: "Day 1" | "Day 2" | "Day 3";
  dateLabel: string;
  isoStart: string;
  isoEnd: string;
  title: string;
  hindiTag: string;
  time: string;
  venue: string;
  attire: string;
  accentColor: string;
  description: string;
  highlights: string[];
}

export interface StoryMilestone {
  year: string;
  title: string;
  location: string;
  note: string;
}

export interface GuestWish {
  id: string;
  name: string;
  relation: string;
  message: string;
  timestamp: string;
}

export const WEDDING_DETAILS = {
  coupleMonogram: "A & V",
  bride: "Ananya",
  brideFull: "Ananya Malhotra",
  brideParents: "Daughter of Smt. Kavita & Shri Rajeshwar Malhotra",
  groom: "Vivaan",
  groomFull: "Vivaan Singhania",
  groomParents: "Son of Smt. Nandini & Shri Vikramaditya Singhania",
  hashtag: "#AnanyaGotVivaan",
  dateHeadline: "14th – 16th February 2027",
  weddingTargetISO: "2027-02-15T19:00:00+05:30",
  city: "Udaipur, Rajasthan",
  venueName: "The Suryagarh Heritage Courtyard",
  venueAddress: "Lake Pichola Heritage Road, Udaipur, Rajasthan 313001",
  mapsUrl: "https://maps.google.com/?q=Lake+Pichola+Udaipur+Rajasthan",
  welcomeVerse:
    "With hearts brimming with gratitude and joy, our families invite you to share in the warmth, sacred vows, and floral splendor of our forever.",
};

export const STORY_MILESTONES: StoryMilestone[] = [
  {
    year: "January 2023",
    title: "A Rainy Afternoon in Jaipur",
    location: "Rambagh Verandah, Jaipur",
    note: "Two strangers reached for the same vintage poetry book during a sudden winter drizzle — what followed was three hours of masala chai and effortless laughter.",
  },
  {
    year: "November 2025",
    title: "Lanterns Over Lake Pichola",
    location: "Udaipur, Rajasthan",
    note: "Under a canopy of mogra garlands and reflections of palace lamps, Vivaan knelt with his grandmother's kundan ring and asked for every tomorrow.",
  },
  {
    year: "February 2027",
    title: "The Royal Beginning",
    location: "The Suryagarh Courtyard",
    note: "Now we return to the City of Lakes with everyone we adore, ready to begin our forever amidst rose petals, shehnai, and warm blessings.",
  },
];

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: "mehendi-sangeet",
    day: "Day 1",
    dateLabel: "Sunday, 14 Feb 2027",
    isoStart: "20270214T160000",
    isoEnd: "20270214T223000",
    title: "Mehendi & Sangeet Sundowner",
    hindiTag: "मेहंदी और संगीत संध्या",
    time: "4:00 PM Onwards",
    venue: "Champa Bagh Rose Lawn",
    attire: "Pastel Florals, Emerald & Mirrorwork",
    accentColor: "#1E4637",
    description:
      "An afternoon of artisanal henna, rose-petal thandai, folk melodies, and an evening of choreographed joy beneath fairy-lit sandstone arches.",
    highlights: ["Artisanal Organic Mehendi", "Live Manganiyar Folk Troupe", "Royal Sundowner High Tea"],
  },
  {
    id: "haldi-holi",
    day: "Day 2",
    dateLabel: "Monday, 15 Feb 2027",
    isoStart: "20270215T103000",
    isoEnd: "20270215T133000",
    title: "Haldi & Phoolon Ki Holi",
    hindiTag: "हल्दी और फूलों की होली",
    time: "10:30 AM – 1:30 PM",
    venue: "Sunlit Jharokha Courtyard",
    attire: "Marigold Yellow, Ivory & Chikankari",
    accentColor: "#C8943E",
    description:
      "Golden turmeric blessings accompanied by showers of fresh marigold and mogra petals, dhol beats, and chilled saffron lassi in brass kulhads.",
    highlights: ["Shower of Fresh Rose & Marigold", "Dhol & Traditional Geet", "Rajasthani Brunch"],
  },
  {
    id: "shubh-vivah",
    day: "Day 2",
    dateLabel: "Monday, 15 Feb 2027",
    isoStart: "20270215T190000",
    isoEnd: "20270215T233000",
    title: "Baraat & Shubh Vivah",
    hindiTag: "बारात एवं शुभ विवाह",
    time: "7:00 PM Baraat • 8:30 PM Pheras",
    venue: "The Lotus Reflection Mandap",
    attire: "Regal Crimson, Velvet Maroon & Antique Gold",
    accentColor: "#4F0E1C",
    description:
      "A candlelit royal procession followed by sacred Vedic pheras around the jasmine-draped mandap beside the palace reflection pool.",
    highlights: ["Royal Baraat & Vintage Procession", "Varmala Amidst Diya Glow", "Midnight Pheras Under the Stars"],
  },
  {
    id: "grand-reception",
    day: "Day 3",
    dateLabel: "Tuesday, 16 Feb 2027",
    isoStart: "20270216T200000",
    isoEnd: "20270216T235900",
    title: "The Royal Reception Gala",
    hindiTag: "शाही आशीर्वाद समारोह",
    time: "8:00 PM Onwards",
    venue: "Darbar-e-Khas Grand Pavilion",
    attire: "Ivory Silk, Champagne Gold & Black-Tie Heritage",
    accentColor: "#7A192D",
    description:
      "An intimate evening of sitar symphony, gourmet royal dastarkhwan, heartfelt toasts, and warm blessings for the newlyweds.",
    highlights: ["Live Classical Sitar & Violin", "Royal Mewari Tasting Menu", "Family Blessings & Toast"],
  },
];

export const GALLERY_ITEMS = [
  {
    src: "/images/couple-portrait.jpg",
    title: "Ananya & Vivaan",
    caption: "Golden hour beneath the blush rose pergola",
  },
  {
    src: "/images/hero-palace.jpg",
    title: "The Royal Welcome",
    caption: "Candlelit sandstone archway adorned with mogra & roses",
  },
  {
    src: "/images/floral-courtyard.jpg",
    title: "Courtyard of Blooms",
    caption: "Marigold curtains & brass urlis awaiting the Haldi",
  },
  {
    src: "/images/wedding-details.jpg",
    title: "Sacred Traditions",
    caption: "Sindoor, mogra buds, brass diya & heirloom brocade",
  },
  {
    src: "/images/venue-palace.jpg",
    title: "Twilight at the Mandap",
    caption: "Floating petals and heritage reflections in Udaipur",
  },
];

export const INITIAL_WISHES: GuestWish[] = [
  {
    id: "w1",
    name: "Meera & Devansh Kapoor",
    relation: "Family Friends • New Delhi",
    message:
      "Counting down the days to Udaipur! May your home forever smell of mogra and echo with laughter.",
    timestamp: "2 hours ago",
  },
  {
    id: "w2",
    name: "Nani Maa & Nana Ji",
    relation: "Blessings from Jaipur",
    message:
      "Sada suhagan raho. Seeing both families come together with so much warmth fills our hearts with pride.",
    timestamp: "Yesterday",
  },
  {
    id: "w3",
    name: "Aarav & Tanya Sethi",
    relation: "College Squad • Mumbai",
    message:
      "Sangeet dance rehearsals are officially underway! Cannot wait to celebrate #AnanyaGotVivaan.",
    timestamp: "2 days ago",
  },
];
