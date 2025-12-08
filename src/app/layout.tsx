import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Script from "next/script";
import HomeNavigation from "@/components/HomeNavigation";
import { generateMetadata as generateSharedMetadata } from "@/shared/metadata";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

export const metadata: Metadata = {
  ...generateSharedMetadata("/"),
  verification: {
    google: "9QHRV7C-9vMcg_dgsaBsMHH6-osb513zfsN0ZhEGSTk",
  },
  other: {
    "naver-site-verification": "5d4f1d71b05a727a4e6081856af0c1117efc5fb8",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
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
