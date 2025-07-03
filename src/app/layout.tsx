import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ToastProvider from "@/components/ToastProvider"; 
import AuthProvider from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yourblog.com'),
  title: {
    default: "Blog Sitesi - Yazılar ve Düşünceler",
    template: "%s | Blog Sitesi"
  },
  description: "Teknoloji, yazılım ve güncel konular hakkında kaliteli içerikler. Modern blog deneyimi için bizi takip edin.",
  keywords: ["blog", "teknoloji", "yazılım", "web development", "next.js", "javascript", "typescript", "türkçe blog"],
  authors: [{ name: "Blog Sitesi Ekibi" }],
  creator: "Blog Sitesi",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://yourblog.com",
    siteName: "Blog Sitesi",
    title: "Blog Sitesi - Yazılar ve Düşünceler",
    description: "Teknoloji, yazılım ve güncel konular hakkında kaliteli içerikler.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blog Sitesi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Sitesi - Yazılar ve Düşünceler",
    description: "Teknoloji, yazılım ve güncel konular hakkında kaliteli içerikler.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ToastProvider />
          {children}
        </AuthProvider></body>
    </html>
  );
}
