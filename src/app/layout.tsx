import type { Metadata } from "next";
import { Figtree, Inter, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "PropWise CRM Dashboard",
  description: "Real estate CRM dashboard for sales pipeline management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(figtree.variable, inter.variable, geistMono.variable)}
    >
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <Toaster
            position="bottom-right"
            gap={8}
            toastOptions={{
              classNames: {
                toast: "!rounded-full !px-4 !py-2.5 !text-sm !font-medium !shadow-dropdown !border-0",
                default: "!bg-[var(--bg-inverted)] !text-[var(--content-inverted)]",
                success: "!bg-green-700 !text-white",
                error: "!bg-red-100 !text-red-900 dark:!bg-red-900 dark:!text-red-100",
                info: "!bg-blue-600 !text-white",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}