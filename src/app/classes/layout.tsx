import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dance Classes & Schedule",
  description:
    "Explore our diverse dance classes at RIGA Dance Academy. Traditional Kandyan, Hip-Hop, Contemporary, Classical Ballet, and Kids Dance training in Battaramulla, Sri Lanka.",
  alternates: {
    canonical: "/classes",
  },
  openGraph: {
    title: "Dance Classes & Schedule | RIGA Dance Academy",
    description:
      "Join world-class dance classes in Battaramulla. From beginners to advanced performers in Kandyan, Hip-Hop, and Contemporary dance styles.",
    url: "/classes",
  },
};

export default function ClassesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
