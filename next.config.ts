import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Necessário para o Dockerfile multi-stage funcionar corretamente
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io", // Uploadthing CDN (legacy)
      },
      {
        protocol: "https",
        hostname: "*.ufs.sh", // Uploadthing CDN (v7+)
      },
    ],
  },
};

export default nextConfig;
