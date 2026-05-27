import type { NextConfig } from "next";

const isCapacitorBuild = process.env.CAPACITOR_BUILD === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  assetPrefix: isCapacitorBuild ? "./" : undefined,
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
