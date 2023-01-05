/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.youtube.com', 'i3.ytimg.com', 'cdn.discordapp.com'],
  },
};

module.exports = nextConfig;
