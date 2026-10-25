import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy of RIGA Dance Academy. Learn how we collect, protect, and handle student enrollment data, studio media, and personal information.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | RIGA Dance Academy",
    description:
      "Privacy Policy and student data protection standards at RIGA Dance Academy, Sri Lanka.",
    url: "/privacy-policy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
