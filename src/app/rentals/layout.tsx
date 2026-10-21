import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dance Studio Rentals in Colombo",
  description:
    "Rent fully equipped dance studio space in Colombo for rehearsals, video shoots, workshops, and private practice at RIGA Dance Academy.",
  alternates: {
    canonical: "/rentals",
  },
  openGraph: {
    title: "Dance Studio Space Rental | RIGA Dance Academy",
    description:
      "Premium wooden flooring, sound systems, and full-length mirrors available for hire in Colombo 07.",
    url: "/rentals",
  },
};

export default function RentalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
