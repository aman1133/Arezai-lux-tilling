import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Cloudinary (your uploads)
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // if you used Unsplash
      },
      {
        protocol: "https",
        hostname: "www.mastertilingwaterproofing.com.au", // reference images you used
      },
    ],
  },
};

export default nextConfig;
