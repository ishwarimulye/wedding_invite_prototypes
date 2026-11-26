import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Meera & Kabir • Jodhpur • 20–22 November 2027",
  description:
    "You are warmly invited to the wedding celebrations of Meera Rathore & Kabir Mehta at Umaid Heritage Haveli, Jodhpur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable} antialiased`}>
      <body className="min-h-screen bg-limestone text-ink selection:bg-indigo selection:text-limestone">
        {children}
      </body>
    </html>
  );
}
