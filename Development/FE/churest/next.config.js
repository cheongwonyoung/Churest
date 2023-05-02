/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.cloud.google.com",
      },
      {
        protocol: "http",
        hostname: "news.samsungdisplay.com",
      },


    ],
  },
}

module.exports = nextConfig
