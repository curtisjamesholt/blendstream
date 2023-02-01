/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: [
      'img.youtube.com',
      'i3.ytimg.com',
      'cdn.discordapp.com',
      'yt3.googleusercontent.com',
      'lh3.googleusercontent.com',
      'envqvxpibtivexqcarug.supabase.co',
    ],
  },
};

module.exports = nextConfig;
