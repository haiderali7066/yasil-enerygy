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
  title: "Yasil Energy Group | UAE Multi-Industry Business Group",
  description:
    "Yasil Energy Group (YEGroup) is a UAE-based multi-disciplinary business group operating in energy, trading, and maintenance sectors, delivering reliable and high-performance solutions across the region.",
  keywords: [
    "Yasil Energy",
    "Yasil Energy Group",
    "UAE business group",
    "energy solutions UAE",
    "oil field equipment trading",
    "facility maintenance UAE",
    "general trading UAE",
  ],
  openGraph: {
    title: "Yasil Energy Group",
    description:
      "Empowering industries, elevating standards. A UAE-based multi-disciplinary group operating in energy, trading, and maintenance.",
    url: "https://www.yasilenergy.com/",
    siteName: "Yasil Energy Group",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yasil Energy Group",
    description:
      "UAE-based multi-industry business group delivering energy, trading, and maintenance solutions.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}