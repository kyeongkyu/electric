import type {Metadata} from 'next';
import './globals.css'; // Global styles
import 'katex/dist/katex.min.css';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: '전기스쿨',
  description: '전기이론 및 회로이론 학습앱',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="antialiased font-sans flex flex-col h-[100dvh] w-full" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" themes={['light', 'medium', 'dark']} enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
