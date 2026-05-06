import type { Metadata, Viewport } from 'next';
import './globals.css';
import 'katex/dist/katex.min.css';
import { ThemeProvider } from '@/components/theme-provider';
import { PWARegister } from '@/components/PWARegister';

export const metadata: Metadata = {
  title: 'electric',
  applicationName: 'electric',
  description: 'Electric theory and circuit learning app.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'electric',
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: '/icons/electric-icon.svg',
    apple: '/icons/electric-icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased font-sans flex flex-col h-[100dvh] w-full" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" themes={['light', 'medium', 'dark']} enableSystem={false}>
          <PWARegister />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
