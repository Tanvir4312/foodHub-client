import type { NextConfig } from "next";
import "./src/env";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_API}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
