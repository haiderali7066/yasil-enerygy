import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "World Sports Summit 2025 — Dubai",
  description:
    "The premier global platform bringing together elite decision makers, world-class athletes, and visionaries under the patronage of Sheikh Hamdan bin Mohammed.",
  keywords: ["World Sports Summit", "Dubai", "Sports", "FIFA", "Athletes", "Sheikh Hamdan"],
  openGraph: {
    title: "World Sports Summit 2025",
    description: "The world's most influential sports gathering — Dubai, UAE.",
    url: "https://www.worldsportssummit.org/",
    siteName: "World Sports Summit",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">{children}</body>
    </html>
  );
}