import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "images.unsplash.com",
      },

      /* CLOUDINARY */
      {
        protocol: "https",
        hostname:
          "res.cloudinary.com",
      },

      /* PLACEHOLDER / OTHER CDN */
      {
        protocol: "https",
        hostname:
          "plus.unsplash.com",
      },
    ],
  },

  turbopack: {
    root:
      "C:/Users/DELL/Desktop/vyoma-frotnend",
  },
};

export default nextConfig;