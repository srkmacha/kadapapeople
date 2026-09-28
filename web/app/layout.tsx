import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kadapa People | Kadapa in Your Pocket",
  description:
    "Discover Kadapa — local businesses, food, hotels, services, places to visit and useful information for people living in and visiting Kadapa.",
  keywords: [
    "Kadapa",
    "Kadapa People",
    "Kadapa businesses",
    "Kadapa restaurants",
    "Kadapa hotels",
    "Kadapa services",
    "Kadapa tourism",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}