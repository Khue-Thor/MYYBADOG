/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "static.nftgo.io",
      },
    ],
  },
  reactStrictMode: true,
  // productionBrowserSourceMaps: true,
  experimental: {
    appDir: true,
    serverActions: true,
  },
};

module.exports = nextConfig;
