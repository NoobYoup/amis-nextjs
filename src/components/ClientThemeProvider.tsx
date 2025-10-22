'use client';

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import React from 'react';
import '@mui/material/styles';

export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    primary: { main: '#7cb342' },
                    secondary: { main: '#2e7d32' },
                },
                typography: {
                    fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                },
            }),
        [],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
