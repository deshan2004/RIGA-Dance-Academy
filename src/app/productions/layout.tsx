import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dance Productions & Concerts",
  description:
    "Experience grand theatrical showcases, live concert productions, and cinematic dance projects created by RIGA Dance Academy in Sri Lanka.",
  keywords: [
    "dance productions Sri Lanka",
    "theatrical dance shows Colombo",
    "concert dance acts",
    "cinematic dance Sri Lanka",
  ],
  alternates: {
    canonical: "/productions",
  },
  openGraph: {
    title: "Dance Productions & Concerts | RIGA Dance Academy",
    description:
      "Grand theatrical showcases and cinematic dance productions by RIGA Dance Academy.",
    url: "https://rigadance.com/productions",
  },
};

export default function ProductionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
