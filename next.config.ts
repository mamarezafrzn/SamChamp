import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "samchamp.apachish.ir",
        pathname: "/logos/**",
      },
    ],
  },
};

export default nextConfig;
