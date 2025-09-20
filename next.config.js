/** @type {import('next').NextConfig} */

// Helper function to safely get environment variables
function safeGetEnv(key) {
  try {
    // Try multiple approaches to access environment variables
    const envSources = [
      // Modern approach: globalThis
      () => {
        const g = eval('globalThis');
        return g?.process?.env?.[key];
      },
      // Node.js approach: process
      () => {
        const p = eval('process');
        return p?.env?.[key];
      },
      // Legacy approach: global
      () => {
        try {
          const g = eval('global');
          return g?.process?.env?.[key];
        } catch {
          return undefined;
        }
      },
      // Browser approach: window
      () => {
        const w = eval('window');
        return w?.process?.env?.[key] || w?.env?.[key];
      },
    ];

    for (const getEnv of envSources) {
      try {
        const result = getEnv();
        if (result !== undefined) return result;
      } catch {
        continue; // Try next approach
      }
    }

    return undefined;
  } catch {
    return undefined;
  }
}

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
    removeConsole: safeGetEnv('NODE_ENV') === 'production',
  },

  // API routes
  async headers() {
    return [
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
    ];
  },

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
  webpack: async (
    config,
    { buildId, dev, isServer, defaultLoaders, webpack }
  ) => {
    // Performance optimizations
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

    // External dependencies
    if (isServer) {
      config.externals = [...config.externals, 'mongoose'];
    }

    // Bundle analyzer
    if (safeGetEnv('ANALYZE')) {
      try {
        const { BundleAnalyzerPlugin } = await import(
          'webpack-bundle-analyzer'
        );
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerPort: isServer ? 8888 : 8889,
            openAnalyzer: true,
          })
        );
      } catch (error) {
        // webpack-bundle-analyzer not available, continuing without it
      }
    }

    return config;
  },

  // Page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],

  // Output
  output: 'standalone',
};

export default nextConfig;
