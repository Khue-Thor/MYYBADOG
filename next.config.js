/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "static.nftgo.io",
      "images.wrappedpunks.com",
      "api.mpunks.org",
      "metadata.degods.com",
      "*.alchemy.com",
      "res.cloudinary.com",
      "*.ipfs.io",
      "ipfs.io",
      "nft-cdn.alchemy.com",
      "i.seadn.io",
      "logo.nftscan.com",
      "openseauserdata.com",
      "clonex-assets.rtfkt.com",
      "api.wrappedpunks.com",
    ],
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
