import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PeerLink | Cedar College",
  description: "Peer Tutoring platform for Cedar College",

  openGraph: {
    title: "PeerLink | Cedar College",
    description: "Peer Tutoring platform for Cedar College",
    url: "https://cedarpeerlink.vercel.app",
    siteName: "PeerLink",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PeerLink App",
      },
    ],
    locale: "en_PK",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "PeerLink | Cedar College",
    description: "Peer Tutoring platform for Cedar College",
    images: ["/og-image.png"],
  },

  icons: {
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  manifest: "/site.webmanifest",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <main className="bg-mainBg min-h-screen">{children}</main>
      </body>
    </html>
  );
}
