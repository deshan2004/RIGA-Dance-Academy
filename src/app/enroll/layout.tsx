import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enroll Now - Online Admission",
  description:
    "Enroll in RIGA Dance Academy classes today. Register online for beginner, intermediate, and advanced dance courses in Colombo.",
  alternates: {
    canonical: "/enroll",
  },
  openGraph: {
    title: "Enroll in Dance Classes | RIGA Dance Academy",
    description:
      "Begin your dance journey with RIGA Dance Academy. Fast and simple online class registration.",
    url: "/enroll",
  },
};

export default function EnrollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
