/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for development
  reactStrictMode: true,

  // Configure image domains for Next.js Image component
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'downloads.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'image.mux.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },

  // Enable experimental features
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Environment variable configuration
  env: {
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
    NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  },
}

export default nextConfig;
