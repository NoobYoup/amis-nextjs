'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SessionProvider } from 'next-auth/react';
import NextAppDirEmotionCacheProvider from './theme-registry/emotion.cache';
import theme from './theme-registry/theme';
import BackToTop from './BackToTop';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <SessionProvider>
                    {children}
                    <BackToTop />
                </SessionProvider>
            </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
}
