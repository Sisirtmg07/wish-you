/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // This is the specific part that removes the "N" icon
  devIndicators: false,
};

export default nextConfig;