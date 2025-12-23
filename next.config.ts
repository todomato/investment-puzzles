import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/investment-puzzles',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
