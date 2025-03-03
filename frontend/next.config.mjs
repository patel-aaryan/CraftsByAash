/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_S3_URL,
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
