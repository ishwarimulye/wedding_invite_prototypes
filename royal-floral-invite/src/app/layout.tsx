import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ananya & Vivaan • Shubh Vivah | Royal Wedding Invitation",
  description:
    "Padharo Sa — You are warmly invited to celebrate the royal union of Ananya & Vivaan in Udaipur. 14th – 16th February 2027.",
  openGraph: {
    title: "Ananya & Vivaan • Shubh Vivah Invitation",
    description:
      "14th – 16th February 2027 • The Suryagarh Heritage Courtyard, Udaipur. Tap to open your wedding invitation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${greatVibes.variable} ${jakarta.variable} antialiased`}
    >
      <body className="min-h-screen bg-ivory text-ink selection:bg-maroon selection:text-ivory">
        {children}
      </body>
    </html>
  );
}
