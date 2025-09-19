/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  i18n: {
    locales: ['he', 'ar', 'en', 'si', 'ta'],
    defaultLocale: 'he',
    localeDetection: false,
  },
  // For Netlify deployment
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  basePath: '',
};

module.exports = nextConfig;
