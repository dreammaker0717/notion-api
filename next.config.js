/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "i.ytimg.com",
      "yt3.ggpht.com",
      "images.unsplash.com",
      "s3.us-west-2.amazonaws.com",
      "images.pexels.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
