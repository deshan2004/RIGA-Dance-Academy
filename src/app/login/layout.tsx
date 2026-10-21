import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Portal Login",
  description: "Login to RIGA Dance Academy student and instructor portal.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
