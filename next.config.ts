import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export', // Enable static HTML export
    images: {
        unoptimized: true, // Required for static export
    },
    eslint: {
        ignoreDuringBuilds: true, // Ignore ESLint errors during build
    },
    experimental: {
        optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production' ? true : false,
    },
};

export default nextConfig;
