import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Requis pour l'export statique sans serveur Node
  },
  // Active la gestion du trailing slash pour éviter des erreurs 404 sur GitHub Pages
  trailingSlash: true,
};

export default nextConfig;
