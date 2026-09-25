import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://rigadance.com"),
  title: "RIGA - Sri Lanka's next generation of professional dancers starts at RIGA.",
  description: "Sri Lanka's next generation of professional dancers starts at RIGA. Master Kandyan, Hip-Hop, Classical, and Contemporary dance styles with world-class instructors.",
  keywords: ["RIGA", "RIGA Dance Academy", "Dance Academy Sri Lanka", "Kandyan Dance", "Hip Hop", "Contemporary Dance", "Dance Classes"],
  authors: [{ name: "RIGA Dance Academy" }],
  openGraph: {
    title: "RIGA - Sri Lanka's next generation of professional dancers starts at RIGA.",
    description: "Sri Lanka's next generation of professional dancers starts at RIGA. Master Kandyan, Hip-Hop, Classical, and Contemporary dance styles with world-class instructors.",
    url: "https://rigadance.com",
    siteName: "RIGA Dance Academy",
    images: [
      {
        url: "/images/riga-transparent.png",
        width: 800,
        height: 600,
        alt: "RIGA Dance Academy Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RIGA - Sri Lanka's next generation of professional dancers starts at RIGA.",
    description: "Sri Lanka's next generation of professional dancers starts at RIGA.",
    images: ["/images/riga-transparent.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-academy-black text-academy-white selection:bg-academy-gold selection:text-black min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}

