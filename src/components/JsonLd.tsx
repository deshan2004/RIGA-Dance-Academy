export default function JsonLd() {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://riga-dance-academy-rust.vercel.app";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["DanceGroup", "EducationalOrganization", "SportsActivityLocation"],
        "@id": `${baseUrl}/#organization`,
        name: "RIGA Dance Academy",
        alternateName: ["RIGA", "RIGA Dance"],
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/images/riga-transparent.png`,
          caption: "RIGA Dance Academy Logo",
        },
        image: `${baseUrl}/riga.jpeg`,
        description:
          "Sri Lanka's premier dance academy empowering the next generation of dancers with world-class training in Traditional Kandyan, Hip-Hop, Contemporary, Classical Ballet, and Commercial Choreography.",
        telephone: "+94763401285",
        email: "inforigadance@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "123 Dance Studio Road",
          addressLocality: "Battaramulla",
          addressRegion: "Western Province",
          postalCode: "10120",
          addressCountry: "LK",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 6.8972,
          longitude: 79.9192,
        },
        priceRange: "$$",
        sameAs: [
          "https://facebook.com",
          "https://instagram.com",
          "https://wa.me/94763401285",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "RIGA Dance Academy",
        description: "Sri Lanka's next generation of professional dancers starts at RIGA.",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
