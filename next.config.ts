import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // output: 'export', // Temporarily disabled - admin pages have dynamic routes
    // Will configure partial export for client pages only
    images: {
        unoptimized: true, // Keep for compatibility
    },
    eslint: {
        ignoreDuringBuilds: true, // Ignore ESLint errors during build
    },
    typescript: {
        ignoreBuildErrors: true, // Ignore TypeScript errors during build
    },
    experimental: {
        optimizePackageImports: ['@mui/material', '@mui/icons-material'],
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production' ? true : false,
    },
};

export default nextConfig;
