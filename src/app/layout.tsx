import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import HomeNavigation from "@/components/HomeNavigation";

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
    "날씨 확인, 할 일 관리, 사다리타기, 평수 변환, BMI 계산, 나이 계산, 복리 계산 등 다양한 유용한 계산기와 유틸리티 앱들을 한 곳에서 만나보세요.",
  keywords: [
    "날씨",
    "옷차림",
    "할일관리",
    "사다리타기",
    "게임",
    "유틸리티",
    "생산성",
    "평수",
    "제곱미터",
    "면적변환",
    "계산기",
    "BMI",
    "나이계산",
    "복리계산",
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
      "날씨 확인, 할 일 관리, 사다리타기, 평수 변환, BMI 계산, 나이 계산, 복리 계산 등 다양한 유용한 계산기와 유틸리티 앱들을 한 곳에서 만나보세요.",
    url: "/",
    siteName: "Weekly Apps",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weekly Apps - 유용한 앱들을 한 곳에서",
    description:
      "날씨 확인, 할 일 관리, 사다리타기, 평수 변환, BMI 계산, 나이 계산, 복리 계산 등 다양한 유용한 계산기와 유틸리티 앱들을 한 곳에서 만나보세요.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7789818762160521"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17402546983"
          strategy="afterInteractive"
        />

        {/* Google Analytics 초기화 */}
        <Script src="/gtag-init.js" strategy="afterInteractive" />

        {/* Emoji 라이브러리 */}
        <Script
          src="//cdn.jsdelivr.net/gh/realityripple/emoji/remoji.min.js"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />

        {children}
        <HomeNavigation />
      </body>
    </html>
  );
}
