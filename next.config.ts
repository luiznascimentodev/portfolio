import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Necessário para o Dockerfile multi-stage funcionar corretamente
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io", // Uploadthing CDN (Milestone 5)
      },
    ],
  },
};

export default nextConfig;
