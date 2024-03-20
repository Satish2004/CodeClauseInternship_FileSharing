/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "fast-mammoth-565.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
