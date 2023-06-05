/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      'static.nftgo.io',
      'images.wrappedpunks.com',
      'api.mpunks.org',
      'metadata.degods.com',
      '*.alchemy.com',
      'res.cloudinary.com',
      '*.ipfs.io',
      'ipfs.io',
      'nft-cdn.alchemy.com',
      'i.seadn.io',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'static.nftgo.io',
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
