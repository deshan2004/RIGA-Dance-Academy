import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service and studio guidelines for RIGA Dance Academy. Read our enrollment policies, studio rules, costume rental conditions, and liability terms.",
  alternates: {
    canonical: "/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | RIGA Dance Academy",
    description:
      "Official Terms of Service, code of conduct, and studio rules of RIGA Dance Academy, Battaramulla, Sri Lanka.",
    url: "/terms-of-service",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
