import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "할부 계산기 - Weekly Apps",
  description: "다양한 카드 할부 조건을 비교하고 최적의 할부 계획을 세워보세요",
  keywords: [
    "할부 계산기",
    "카드 할부",
    "무이자 할부",
    "할부 비교",
    "월 상환금 계산",
    "이자 계산기",
    "카드사 비교",
    "할부 시뮬레이션"
  ],
  openGraph: {
    title: "할부 계산기 - Weekly Apps",
    description: "다양한 카드 할부 조건을 비교하고 최적의 할부 계획을 세워보세요",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary",
    title: "할부 계산기 - Weekly Apps", 
    description: "다양한 카드 할부 조건을 비교하고 최적의 할부 계획을 세워보세요",
  },
};

export default function InstallmentCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}