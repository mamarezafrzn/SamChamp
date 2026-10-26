import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sampchamp.apachish.ir",
        pathname: "/logos/**",
      },
    ],
  },
};

export default nextConfig;
