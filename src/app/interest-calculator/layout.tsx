import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이자 계산기 | 단리 복리 이자 계산 | Weekly Apps",
  description: "단리와 복리 이자를 쉽게 계산해보세요. 예금, 적금, 대출 이자 계산에 활용하세요. 정확한 이자율 계산으로 투자 계획을 세워보세요.",
  keywords: [
    "이자 계산기",
    "단리 계산기", 
    "복리 계산기",
    "이자율 계산",
    "예금 이자",
    "적금 이자",
    "대출 이자",
    "투자 수익률",
    "금융 계산기",
    "이자 시뮬레이션",
    "복리 효과",
    "금리 계산",
    "만기 금액",
    "원리금 계산",
    "금융 도구"
  ],
  openGraph: {
    title: "이자 계산기 - 단리 복리 이자 계산",
    description: "단리와 복리 이자를 쉽게 계산해보세요. 예금, 적금, 대출 이자 계산에 활용하세요.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary",
    title: "이자 계산기 - 단리 복리 이자 계산", 
    description: "단리와 복리 이자를 쉽게 계산해보세요. 예금, 적금, 대출 이자 계산에 활용하세요.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://weekly-apps.vercel.app/interest-calculator",
  },
};

export default function InterestCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}