/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
};

module.exports = nextConfig;
