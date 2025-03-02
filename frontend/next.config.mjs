/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "https://crafts-by-aash.vercel.app/"],
    unoptimized: false,
  },
  reactStrictMode: true,
};

export default nextConfig;
