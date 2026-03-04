import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Turbo Pack for dev (next dev --turbopack)
  experimental: {
    // optimizePackageImports reduces bundle size by tree-shaking barrel exports
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
