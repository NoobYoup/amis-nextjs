import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ThemeRegistry from '@/components/theme-registry/theme.registry';

export const metadata: Metadata = {
    title: 'AMIS School',
    description: 'Australian American International School',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi">
            <body>
                <ThemeRegistry>
                    <Header />
                    {children}
                    <Footer />
                    <BackToTop />
                </ThemeRegistry>
            </body>
        </html>
    );
}
