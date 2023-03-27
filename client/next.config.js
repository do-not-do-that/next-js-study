/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 이미지 허용
  images: {
    domains: ["www.gravatar.com", "localhost"],
  },
};

module.exports = nextConfig;
