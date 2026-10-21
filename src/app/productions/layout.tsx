import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dance Productions & Commercial Shows",
  description:
    "Explore theatrical dance productions, commercial entertainment, and collaborative artistic projects by RIGA Dance Academy.",
  alternates: {
    canonical: "/productions",
  },
  openGraph: {
    title: "Productions & Showcases | RIGA Dance Academy",
    description:
      "World-class dance productions combining traditional Sri Lankan heritage with modern visual storytelling.",
    url: "/productions",
  },
};

export default function ProductionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
