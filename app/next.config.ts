import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Obligatoire pour Capacitor : export statique (WebView sans serveur Next)
  output: "export",
  trailingSlash: true,
  images: {
    // En mode export statique, les images doivent être non optimisées
    unoptimized: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
