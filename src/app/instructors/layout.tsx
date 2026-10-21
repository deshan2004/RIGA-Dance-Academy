import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instructors & Choreographers",
  description:
    "Meet the renowned dance instructors and choreographers at RIGA Dance Academy. Learn from masters in Kandyan, Hip-Hop, and Contemporary dance.",
  alternates: {
    canonical: "/instructors",
  },
  openGraph: {
    title: "Our Instructors | RIGA Dance Academy",
    description:
      "Learn from Sri Lanka's leading dance educators and celebrated international choreographers.",
    url: "/instructors",
  },
};

export default function InstructorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
