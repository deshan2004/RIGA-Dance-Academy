import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Studio Location",
  description:
    "Get in touch with RIGA Dance Academy in Colombo 07, Sri Lanka. Contact us for class enrollment, workshop inquiries, event choreography, and studio rentals.",
  keywords: [
    "contact RIGA Dance Academy",
    "dance studio Colombo address",
    "dance classes phone number Colombo",
    "RIGA dance contact",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us & Studio Location | RIGA Dance Academy",
    description:
      "Get in touch with RIGA Dance Academy in Colombo 07, Sri Lanka for classes, bookings, and studio rentals.",
    url: "https://rigadance.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
