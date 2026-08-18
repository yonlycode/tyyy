import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'tyyy'; // Remplacez par le nom exact du dépôt
const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? `/${repoName}` : '',
    assetPrefix: isProd ? `/${repoName}/` : '',
  images: {
    unoptimized: true, // Requis pour l'export statique sans serveur Node
  },
  // Active la gestion du trailing slash pour éviter des erreurs 404 sur GitHub Pages
  trailingSlash: true,
};

export default nextConfig;
