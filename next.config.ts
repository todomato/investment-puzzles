import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export',
  basePath: '/investment-puzzles',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
