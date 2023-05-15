/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  reactStrictMode: true,
  // productionBrowserSourceMaps: true,
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
