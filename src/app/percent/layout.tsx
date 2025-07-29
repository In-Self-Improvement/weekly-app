import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "퍼센트 계산기 | 백분율 계산 - Weekly Apps",
  description: "다양한 퍼센트 계산을 간편하게! 퍼센트 계산, 비율 계산, 증감률, 팁 계산까지 모든 백분율 계산을 한 번에 해결하세요.",
  keywords: "퍼센트 계산기, 백분율 계산, 비율 계산, 증가율 계산, 감소율 계산, 팁 계산기, 할인율 계산, 수학 계산기",
  openGraph: {
    title: "퍼센트 계산기 | 백분율 계산",
    description: "다양한 퍼센트 계산을 간편하게! 퍼센트, 비율, 증감률, 팁 계산까지 모든 백분율 계산을 한 번에 해결하세요.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary",
    title: "퍼센트 계산기 | 백분율 계산",
    description: "다양한 퍼센트 계산을 간편하게! 퍼센트, 비율, 증감률, 팁 계산까지 모든 백분율 계산을 한 번에 해결하세요.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/percent",
  },
};

export default function PercentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}