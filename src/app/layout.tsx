import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClientThemeProvider from '@/components/ClientThemeProvider';
import BackToTop from '@/components/BackToTop';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'AMIS School',
    description: 'Australian American International School',
};

// Theme is provided by client-side provider to avoid passing non-serializable values from server.

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <ClientThemeProvider>
                    <Header />
                    <main style={{ minHeight: 'calc(100vh - 64px)' }}>{children}</main>
                    <Footer />
                    <BackToTop />
                </ClientThemeProvider>
            </body>
        </html>
    );
}
