import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instructors & Choreographers",
  description:
    "Learn from Sri Lanka's leading dance masters. Expert faculty in Kandyan traditional dance, Hip-Hop, Contemporary, and Classical at RIGA Dance Academy.",
  keywords: [
    "dance instructors Colombo",
    "Kandyan dance teachers",
    "hip hop choreographers Sri Lanka",
    "dance faculty Colombo",
  ],
  alternates: {
    canonical: "/instructors",
  },
  openGraph: {
    title: "Instructors & Choreographers | RIGA Dance Academy",
    description:
      "Learn from Sri Lanka's leading dance masters at RIGA Dance Academy.",
    url: "https://rigadance.com/instructors",
  },
};

export default function InstructorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
