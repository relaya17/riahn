/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Enable API routes
  experimental: {
    outputFileTracingRoot: undefined,
  },
  // Enable proper routing
  skipTrailingSlashRedirect: false,
  skipMiddlewareUrlNormalize: false,
  // Enable linting and type checking
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Webpack configuration
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...config.externals, 'mongoose'];
    }
    return config;
  },
  // Page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

module.exports = nextConfig;
