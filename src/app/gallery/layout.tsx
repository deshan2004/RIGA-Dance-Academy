import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Gallery - Photos & Videos",
  description:
    "Browse photos and videos of dance classes, student performances, crew competitions, and workshops at RIGA Dance Academy.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Media Gallery | RIGA Dance Academy",
    description:
      "Explore highlights, recitals, and behind-the-scenes moments from RIGA Dance Academy.",
    url: "/gallery",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
