import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://YOUR_DOMAIN_HERE.com.au";
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: "*",
        disallow: ["/admin", "/account", "/login", "/register"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
