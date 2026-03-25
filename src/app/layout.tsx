import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Figtree, Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'PropWise CRM Dashboard',
  description: 'Real estate CRM dashboard for sales pipeline management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(figtree.variable, inter.variable)}
    >
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
