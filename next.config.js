/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // For Netlify deployment
  assetPrefix: '',
  basePath: '',
  // Disable some features for faster build
  swcMinify: true,
  compress: false,
  // Disable API routes for static export
  experimental: {
    outputFileTracingRoot: undefined,
  },
  // Skip API routes for static export
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
  // Disable API routes for static export
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable API routes for static export
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, 'mongoose'];
    }
    return config;
  },
  // Disable API routes for static export
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

module.exports = nextConfig;
