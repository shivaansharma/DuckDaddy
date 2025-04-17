import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["assets.aceternity.com","pbs.twimg.com"], // Add the allowed domain
   
  },
  typescript: {
    // ⚠️ Allows production builds to complete even with type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // ⚠️ Allows production builds to complete even with ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
