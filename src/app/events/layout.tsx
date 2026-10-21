import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choreography Packages & Troupe Bookings",
  description:
    "Book professional dance choreography and performance troupes for weddings, corporate galas, concerts, and music videos in Sri Lanka. View packages and pricing.",
  keywords: [
    "wedding dance choreography Sri Lanka",
    "dance troupe for weddings Colombo",
    "corporate event dance performances",
    "music video dancers Sri Lanka",
    "custom dance choreography Colombo",
  ],
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Choreography Packages & Troupe Bookings | RIGA Dance Academy",
    description:
      "Book professional dance choreography and performance troupes for weddings, corporate galas, and stage events in Sri Lanka.",
    url: "https://rigadance.com/events",
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
