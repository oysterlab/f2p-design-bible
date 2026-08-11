import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { bookMetadata } from "../lib/content";
import "./globals.css";

// Both manuscripts render through this layout; the built book supplies its own title.
const title = bookMetadata.title;
const description = bookMetadata.description;

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    requestHeaders.get("host") ||
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto")?.split(",")[0]?.trim() ||
    (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    title,
    description,
    applicationName: title,
    authors: [{ name: "F2P SYSTEM DESIGN" }],
    creator: "F2P SYSTEM DESIGN",
    publisher: "F2P SYSTEM DESIGN",
    category: "게임 디자인",
    keywords: [
      "F2P",
      "모바일 게임 디자인",
      "Game Economy",
      "Meta Progression",
      "Retention",
      "LiveOps",
      "Monetization",
      "웹 ebook",
    ],
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url: origin,
      siteName: "F2P SYSTEM DESIGN",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e5e8ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0d131b" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
