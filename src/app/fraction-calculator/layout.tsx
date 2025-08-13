import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "분수 계산기 | 분수 사칙연산 계산 - Weekly Apps",
  description: "분수의 덧셈, 뺄셈, 곱셈, 나눗셈을 쉽게 계산하세요. 기약분수 자동 변환과 소수 결과를 함께 제공하는 무료 분수 계산기입니다.",
  keywords: [
    "분수 계산기",
    "분수 계산",
    "분수 덧셈",
    "분수 뺄셈", 
    "분수 곱셈",
    "분수 나눗셈",
    "기약분수",
    "분수 변환기",
    "분수 사칙연산",
    "수학 계산기",
    "fraction calculator",
    "분수 간소화",
    "분수를 소수로",
    "수학 도구"
  ],
  authors: [{ name: "Weekly Apps" }],
  creator: "Weekly Apps",
  publisher: "Weekly Apps",
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
  openGraph: {
    title: "분수 계산기 | 분수 사칙연산 계산",
    description: "분수의 덧셈, 뺄셈, 곱셈, 나눗셈을 쉽게 계산하고 기약분수로 자동 변환하세요. 소수 결과도 함께 확인 가능합니다.",
    url: "/fraction-calculator",
    siteName: "Weekly Apps",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image-fraction-calculator.png",
        width: 1200,
        height: 630,
        alt: "분수 계산기 - Weekly Apps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "분수 계산기 | 분수 사칙연산 계산",
    description: "분수의 덧셈, 뺄셈, 곱셈, 나눗셈을 쉽게 계산하고 기약분수로 자동 변환하세요.",
    images: ["/og-image-fraction-calculator.png"],
    creator: "@WeeklyApps",
  },
  alternates: {
    canonical: "/fraction-calculator",
  },
  other: {
    "application-name": "Weekly Apps - 분수 계산기",
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
  },
};

export default function FractionCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}