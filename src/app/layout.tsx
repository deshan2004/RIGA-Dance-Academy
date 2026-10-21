import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  themeColor: "#090410",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://rigadance.com"),
  title: {
    default: "RIGA Dance Academy | Premier Dance Classes & Troupe in Sri Lanka",
    template: "%s | RIGA Dance Academy",
  },
  description:
    "Sri Lanka's leading dance academy and elite performance troupe. Master Kandyan Traditional, Hip-Hop, Contemporary, Classical, and Commercial dance in Colombo. Book award-winning choreography for weddings and major stage events.",
  keywords: [
    "RIGA Dance Academy",
    "dance classes Sri Lanka",
    "dance academy Colombo",
    "Kandyan dance classes Colombo",
    "Hip Hop dance classes Sri Lanka",
    "contemporary dance Colombo",
    "wedding dance choreography Sri Lanka",
    "Sri Lankan dance troupe for events",
    "commercial dance choreography",
    "dance studio rental Colombo",
    "kids dance academy Sri Lanka",
    "traditional Kandyan dancers for weddings",
    "professional dancers Colombo",
  ],
  authors: [{ name: "RIGA Dance Academy", url: "https://rigadance.com" }],
  creator: "RIGA Dance Academy",
  publisher: "RIGA Dance Academy",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "RIGA Dance Academy | Premier Dance Classes & Troupe in Sri Lanka",
    description:
      "Transform rhythm into art at RIGA Dance Academy. World-class dance training in Kandyan, Hip-Hop, Contemporary, and Classical dance in Colombo, Sri Lanka.",
    url: "https://rigadance.com",
    siteName: "RIGA Dance Academy",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/riga-banner.jpg",
        width: 1200,
        height: 630,
        alt: "RIGA Dance Academy - Sri Lanka",
      },
      {
        url: "/images/riga-troupe-hero.jpg",
        width: 1200,
        height: 630,
        alt: "RIGA Dance Troupe Sri Lanka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RIGA Dance Academy | Premier Dance Classes & Troupe in Sri Lanka",
    description:
      "Sri Lanka's next generation of professional dancers starts at RIGA. Kandyan, Hip-Hop, Contemporary, and wedding choreography in Colombo.",
    images: ["/images/riga-banner.jpg"],
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
  category: "entertainment",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "DanceStudio",
      "@id": "https://rigadance.com/#dancestudio",
      name: "RIGA Dance Academy",
      url: "https://rigadance.com",
      logo: "https://rigadance.com/images/riga-hd-emblem.png",
      image: "https://rigadance.com/images/riga-banner.jpg",
      description:
        "Sri Lanka's premier dance academy and performance troupe. Offering professional training in Kandyan traditional, Hip-Hop, Contemporary, and Classical dance styles.",
      telephone: "+94763401285",
      email: "inforigadance@gmail.com",
      priceRange: "$$",
      currenciesAccepted: "LKR",
      paymentAccepted: "Cash, Credit Card, Bank Transfer",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Dance Studio Road",
        addressLocality: "Colombo",
        addressRegion: "Western Province",
        postalCode: "00700",
        addressCountry: "LK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 6.9064,
        longitude: 79.8708,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "08:00",
          closes: "21:00",
        },
      ],
      sameAs: [
        "https://facebook.com",
        "https://instagram.com",
        "https://wa.me/94763401285",
      ],
    },
    {
      "@type": "PerformingGroup",
      "@id": "https://rigadance.com/#troupe",
      name: "RIGA Dance Troupe",
      url: "https://rigadance.com/crew",
      description:
        "Professional Sri Lankan dance troupe and mega crew performing for concerts, weddings, corporate showcases, and international productions.",
      parentOrganization: {
        "@id": "https://rigadance.com/#dancestudio",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-academy-black text-academy-white selection:bg-academy-gold selection:text-black min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
