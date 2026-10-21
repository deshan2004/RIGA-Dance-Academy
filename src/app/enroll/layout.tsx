import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enroll in Dance Classes",
  description:
    "Join RIGA Dance Academy. Register online for beginner, intermediate, or advanced classes in Kandyan traditional, Hip-Hop, Contemporary, and Classical dance.",
  keywords: [
    "enroll dance classes Colombo",
    "dance class registration Sri Lanka",
    "join RIGA Dance Academy",
    "dance lessons sign up",
  ],
  alternates: {
    canonical: "/enroll",
  },
  openGraph: {
    title: "Enroll in Dance Classes | RIGA Dance Academy",
    description:
      "Join RIGA Dance Academy. Register online for dance classes in Colombo.",
    url: "https://rigadance.com/enroll",
  },
};

export default function EnrollLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
