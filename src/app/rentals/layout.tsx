import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Costume & Studio Space Rentals",
  description:
    "Rent authentic Kandyan, modern, and traditional dance costumes and professional studio rehearsal space in Colombo 07, Sri Lanka.",
  keywords: [
    "dance costume rental Sri Lanka",
    "Kandyan costume hire Colombo",
    "dance studio rental Colombo",
    "rehearsal hall hire Sri Lanka",
  ],
  alternates: {
    canonical: "/rentals",
  },
  openGraph: {
    title: "Costume & Studio Space Rentals | RIGA Dance Academy",
    description:
      "Dance costumes and professional studio space for rent at RIGA Dance Academy Colombo.",
    url: "https://rigadance.com/rentals",
  },
};

export default function RentalsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
