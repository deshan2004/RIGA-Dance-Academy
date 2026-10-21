import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Performance Gallery & Media",
  description:
    "Explore photos and media highlights from stage shows, student recitals, and rehearsals at RIGA Dance Academy in Colombo, Sri Lanka.",
  keywords: [
    "dance gallery Sri Lanka",
    "RIGA dance show photos",
    "stage performance gallery Colombo",
    "dance studio photos",
  ],
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Performance Gallery & Media | RIGA Dance Academy",
    description:
      "Stage shows, student recitals, and rehearsal highlights from RIGA Dance Academy.",
    url: "https://rigadance.com/gallery",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
