import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RIGA Dance Academy",
    short_name: "RIGA",
    description: "Sri Lanka's premier dance academy for Kandyan, Hip-Hop, Classical, and Contemporary dance styles.",
    start_url: "/",
    display: "standalone",
    background_color: "#090410",
    theme_color: "#9333ea",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
