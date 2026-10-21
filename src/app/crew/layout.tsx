import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dance Troupe & Mega Crew",
  description:
    "Discover the elite dancers of RIGA Dance Academy. Award-winning Kandyan fusion troupe, Hip-Hop mega crew, and lyrical contemporary performers in Sri Lanka.",
  keywords: [
    "RIGA crew",
    "dance troupe Sri Lanka",
    "professional dancers Colombo",
    "hip hop crew Sri Lanka",
    "Kandyan fusion dance team",
  ],
  alternates: {
    canonical: "/crew",
  },
  openGraph: {
    title: "Dance Troupe & Mega Crew | RIGA Dance Academy",
    description:
      "Award-winning Kandyan fusion troupe, Hip-Hop mega crew, and stage performers representing Sri Lanka.",
    url: "https://rigadance.com/crew",
  },
};

export default function CrewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
