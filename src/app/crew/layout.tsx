import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RIGA Dance Crew",
  description:
    "Meet the official RIGA Dance Crew - Sri Lanka's elite performance troupe competing and performing at national and international stages.",
  alternates: {
    canonical: "/crew",
  },
  openGraph: {
    title: "RIGA Dance Crew | Elite Dance Troupe",
    description:
      "Witness high-octane choreography and cutting-edge performances by the official RIGA Dance Crew.",
    url: "/crew",
  },
};

export default function CrewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
