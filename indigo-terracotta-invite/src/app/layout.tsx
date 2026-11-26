import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Plus_Jakarta_Sans,
  Sacramento,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const sacramento = Sacramento({
  variable: "--font-sacramento",
  subsets: ["latin"],
  weight: ["400"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Meera & Kabir • A Floral Wedding Celebration in Jodhpur",
  description:
    "Come celebrate with us! Meera & Kabir invite you to three joyful days of flowers, music, and vows at Umaid Heritage Haveli, Jodhpur (20–22 Nov 2027).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${sacramento.variable} ${jakarta.variable} antialiased`}
    >
      <body className="min-h-screen bg-petal-milk text-berry-ink selection:bg-berry selection:text-petal-milk">
        {children}
      </body>
    </html>
  );
}
