import "@v1/ui/globals.css";
import { Toaster } from "@v1/ui/toaster";
import { cn } from "@v1/ui/cn";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "VertragX",
  description: "AI-Assisted Industrial Sourcing | Launch 2025",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "VertragX",
    description: "AI-Assisted Industrial Sourcing | Launch 2025",
    images: "/og-image.png",
  },
  // metadataBase: new URL("https://vertragx.com"),
  // alternates: {
  //   canonical: "https://vertragx.com",
  // },
  // viewport: {
  //   width: "device-width",
  //   initialScale: 1,
  //   maximumScale: 1,
  //   userScalable: false,
  // },
  // robots: {
  //   index: true,
  //   follow: true,
  // },
  // manifest: "/manifest.json",
  // authors: [{ name: "VertragX", url: "https://vertragx.com" }],
  // creator: "VertragX",
  // publisher: "VertragX",
  // category: "technology",
  // keywords: ["AI", "Industrial Sourcing", "B2B", "Sourcing", "AI-Assisted"],
  // applicationName: "VertragX",
  // appleWebApp: {
  //   title: "VertragX",
  //   statusBarStyle: "black-translucent",
  // },
  // formatDetection: {
  //   email: false,
  //   address: false,
  // },
  // verification: {
  //   google: "google-site-verification=1234567890",
  // },
  // other: {
  //   "google-site-verification": "1234567890",
  // },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          `${GeistSans.variable} ${GeistMono.variable}`,
          "antialiased",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
