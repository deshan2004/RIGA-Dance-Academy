import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://rigadance.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/dashboard",
          "/dashboard/",
          "/api/",
          "/login",
          "/pending-approval",
          "/verify-email",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
