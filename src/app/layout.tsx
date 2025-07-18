import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Weekly Apps - 유용한 앱들을 한 곳에서",
    template: "%s | Weekly Apps",
  },
  description:
    "날씨 확인, 간단한 할 일 관리, 사다리타기 게임 등 다양한 유용한 앱들을 한 곳에서 만나보세요.",
  keywords: [
    "날씨",
    "옷차림",
    "할일관리",
    "사다리타기",
    "게임",
    "유틸리티",
    "생산성",
  ],
  authors: [{ name: "Weekly Apps" }],
  creator: "Weekly Apps",
  publisher: "Weekly Apps",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://weekly-app.net"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Weekly Apps - 유용한 앱들을 한 곳에서",
    description:
      "날씨 확인, 간단한 할 일 관리, 사다리타기 게임 등 다양한 유용한 앱들을 한 곳에서 만나보세요.",
    url: "/",
    siteName: "Weekly Apps",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weekly Apps - 유용한 앱들을 한 곳에서",
    description:
      "날씨 확인, 간단한 할 일 관리, 사다리타기 게임 등 다양한 유용한 앱들을 한 곳에서 만나보세요.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "9QHRV7C-9vMcg_dgsaBsMHH6-osb513zfsN0ZhEGSTk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script 
          src="//cdn.jsdelivr.net/gh/realityripple/emoji/remoji.min.js" 
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
