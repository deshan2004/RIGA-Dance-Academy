import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Custom Choreography",
  description:
    "Professional choreography for weddings, corporate events, stage shows, and music videos by RIGA Dance Academy in Sri Lanka.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Events & Choreography Services | RIGA Dance Academy",
    description:
      "Make your special occasion unforgettable with custom dance performances and award-winning choreography.",
    url: "/events",
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
