import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dance Classes & Weekly Schedule",
  description:
    "Explore dance classes at RIGA Dance Academy Colombo. Beginner to advanced training in Kandyan traditional dance, Hip-Hop, Contemporary, and Classical styles.",
  keywords: [
    "dance classes Colombo",
    "Kandyan dance training Sri Lanka",
    "Hip Hop dance classes Colombo",
    "contemporary dance classes",
    "beginner dance lessons Sri Lanka",
    "weekend dance classes Colombo",
  ],
  alternates: {
    canonical: "/classes",
  },
  openGraph: {
    title: "Dance Classes & Weekly Schedule | RIGA Dance Academy",
    description:
      "Explore dance classes at RIGA Dance Academy Colombo. Kandyan traditional, Hip-Hop, Contemporary, and Classical classes.",
    url: "https://rigadance.com/classes",
  },
};

export default function ClassesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
