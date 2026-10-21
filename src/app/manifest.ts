import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RIGA Dance Academy",
    short_name: "RIGA Dance",
    description: "Sri Lanka's premier dance academy and performance troupe in Colombo.",
    start_url: "/",
    display: "standalone",
    background_color: "#090410",
    theme_color: "#090410",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
