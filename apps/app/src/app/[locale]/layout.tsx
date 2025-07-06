import "@v1/ui/globals.css";
import { Toaster } from "@v1/ui/toaster";
import { cn } from "@v1/ui/cn";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  metadataBase: new URL("https://app.vertragx.com"),
  title: "VertragX",
  description: "AI-Assisted Industrial Sourcing | Launch 2025",
  applicationName: "VertragX",
  authors: [{ name: "VertragX Team", url: "https://app.vertragx.com" }],
  generator: "Next.js",
  keywords: ["AI", "Industrial Sourcing", "B2B", "Sourcing", "AI-Assisted"],
  creator: "VertragX Team",
  publisher: "VertragX",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://app.vertragx.com",
  },
  icons: {
    icon: "/logo-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    url: "https://app.vertragx.com",
    title: "VertragX",
    description: "AI-Assisted Industrial Sourcing | Launch 2025",
    siteName: "VertragX",
    images: "/og-image.png",
  },
  twitter: {
    card: "summary_large_image",
    site: "@vertragx",
    creator: "@vertragx",
    title: "VertragX",
    description: "AI-Assisted Industrial Sourcing | Launch 2025",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
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
