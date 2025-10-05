/** @type {import('next').NextConfig} */

const nextConfig = {
  // Performance optimizations
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    webVitalsAttribution: ['CLS', 'LCP'],
    outputFileTracingRoot: undefined,
  },

  // Image optimization
  images: {
    domains: ['localhost'],
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Build optimizations
  compiler: {
    removeConsole: false,
  },

  // API routes
  headers: () => [
    {
      source: '/api/(.*)',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
        {
          key: 'Access-Control-Allow-Methods',
          value: 'GET,POST,PUT,DELETE,OPTIONS',
        },
        {
          key: 'Access-Control-Allow-Headers',
          value: 'Content-Type,Authorization',
        },
      ],
    },
  ],

  // Security
  poweredByHeader: false,
  compress: true,

  // Routing
  skipTrailingSlashRedirect: false,
  skipMiddlewareUrlNormalize: false,

  // Development
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      };
    }

    if (isServer) {
      config.externals = [...(config.externals || []), 'mongoose'];
    }

    return config;
  },

  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

module.exports = nextConfig;
