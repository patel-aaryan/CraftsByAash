/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "https://www.craftsbyaash.com/"],
    unoptimized: false,
  },
  reactStrictMode: true,
};

export default nextConfig;
