import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

import JsonLd from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://rigadance.com"),
  title: {
    default: "RIGA Dance Academy | Premier Dance Education in Sri Lanka",
    template: "%s | RIGA Dance Academy",
  },
  description:
    "Sri Lanka's premier dance academy. Master Traditional Kandyan, Hip-Hop, Classical Ballet, Contemporary, and Commercial dance styles with world-class instructors in Colombo.",
  keywords: [
    "RIGA Dance Academy",
    "Dance Academy Sri Lanka",
    "Dance Classes Colombo",
    "Kandyan Dance Lessons",
    "Hip Hop Dance Classes Sri Lanka",
    "Contemporary Dance Academy",
    "Classical Dance Sri Lanka",
    "Dance Studio Rental Colombo",
    "Wedding Dance Choreography Sri Lanka",
    "Kids Dance Academy Colombo",
    "RIGA Crew",
  ],
  authors: [{ name: "RIGA Dance Academy", url: "https://rigadance.com" }],
  creator: "RIGA Dance Academy",
  publisher: "RIGA Dance Academy",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "RIGA Dance Academy | Premier Dance Education in Sri Lanka",
    description:
      "Transform your passion into movement. Join Sri Lanka's leading dance academy for Kandyan, Hip-Hop, Contemporary, and Classical styles.",
    url: "https://rigadance.com",
    siteName: "RIGA Dance Academy",
    images: [
      {
        url: "/images/riga-transparent.png",
        width: 1200,
        height: 630,
        alt: "RIGA Dance Academy - Elevating Dance in Sri Lanka",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RIGA Dance Academy | Premier Dance Education in Sri Lanka",
    description:
      "Transform your passion into movement. Join Sri Lanka's leading dance academy for Kandyan, Hip-Hop, Contemporary, and Classical styles.",
    images: ["/images/riga-transparent.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <JsonLd />
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

