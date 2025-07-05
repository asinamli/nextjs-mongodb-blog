import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Vercel'de build sırasında ESLint hatalarını yoksay
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
