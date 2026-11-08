import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopvnb.com" },
      { protocol: "https", hostname: "shopvnb.com" },
      { protocol: "https", hostname: "beyono.vn" },
      { protocol: "https", hostname: "www.beyono.vn" },
      { protocol: "https", hostname: "cdn.hstatic.net" },
      { protocol: "https", hostname: "hstatic.net" },
    ],
  },
};

export default nextConfig;
