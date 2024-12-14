import type { Metadata, Viewport } from "next";
import "./globals.css";
import type { ReactNode } from "react";
import Navbar from "~/components/ui/navbar";
import { dmMono, spaceGrotesk } from "~/config/font";
import FooterSection from "~/components/footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_BASE_URL
    ? new URL(process.env.NEXT_PUBLIC_BASE_URL)
    : new URL("https://keizerworks.com"),
  title: "keizer Works — BUILD | GROW | CONNECT",
  description:
    "Unleashing Creativity Across Digital Platforms. From stunning websites to immersive games and motion graphics, we bring your vision to life with cutting-edge design and development.",
  keywords: [
    "web development",
    "game development",
    "motion graphics",
    "digital agency",
    "creative studio",
    "design",
    "development",
  ],
  authors: [{ name: "Keizer" }],
  creator: "Keizer",
  publisher: "Keizer",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "keizer Works — BUILD | GROW | CONNECT",
    description: "Unleashing Creativity Across Digital Platforms",
    siteName: "Keizer",
    images: [{ url: "/opengraph-image.png" }], 
  },
  twitter: {
    card: "summary_large_image",
    title: "keizer Works — BUILD | GROW | CONNECT",
    description: "Unleashing Creativity Across Digital Platforms",
    creator: "@keizerHQ",
    images: ["/opengraph-image.png"], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmMono.variable}`}>
      <body className="font-sans antialiased dark bg-background">
        <Navbar />
        {children}
        <FooterSection />
      </body>
    </html>
  );
}
