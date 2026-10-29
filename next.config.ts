import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "samchamp.apachish.ir",
        pathname: "/display-image/**", // club logos
      },
    ],
  },
};

export default nextConfig;
