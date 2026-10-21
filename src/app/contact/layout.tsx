import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Location",
  description:
    "Contact RIGA Dance Academy in Colombo 07. Call, email, or visit our studio for enrollment queries, class schedules, and workshop details.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact RIGA Dance Academy | Colombo, Sri Lanka",
    description:
      "Get in touch with us at 123 Dance Studio Road, Colombo 07. Call +94 76 340 1285 or email inforigadance@gmail.com.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
