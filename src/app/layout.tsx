import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Newsreader, Inter } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-headline",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WorldCoffee24 — Küresel Kahve Piyasa Platformu",
    template: "%s | WorldCoffee24",
  },
  description:
    "Canlı kahve fiyatları, piyasa analizleri, haberler ve eğitim içerikleri. Arabica & Robusta futures, döviz kurları, üretim bölgeleri hava durumu.",
  keywords: [
    "kahve fiyatları",
    "coffee prices",
    "arabica futures",
    "robusta futures",
    "kahve piyasası",
    "coffee market",
    "ICE coffee",
    "kahve borsası",
    "commodity trading",
    "emtia",
  ],
  authors: [{ name: "WorldCoffee24" }],
  creator: "WorldCoffee24",
  metadataBase: new URL("https://worldcoffee24.com"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    alternateLocale: "en_US",
    siteName: "WorldCoffee24",
    title: "WorldCoffee24 — Küresel Kahve Piyasa Platformu",
    description:
      "Canlı kahve fiyatları, piyasa analizleri, haberler ve eğitim içerikleri.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WorldCoffee24 — Küresel Kahve Piyasa Platformu",
    description:
      "Canlı kahve fiyatları, piyasa analizleri, haberler ve eğitim içerikleri.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${newsreader.variable} ${inter.variable}`}>
      <head>
        {/* Material Symbols — ikon fontu */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface font-body antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
