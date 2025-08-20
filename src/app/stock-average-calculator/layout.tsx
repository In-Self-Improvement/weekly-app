import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "물타기 계산기 | 주식 코인 평균 매수가 계산 | Weekly Apps",
  description: "주식과 코인의 평균 매수가를 쉽게 계산하세요. 물타기 투자 전략의 수익률을 미리 확인하고 현명한 투자 결정을 내려보세요.",
  keywords: [
    "물타기 계산기",
    "평균 매수가 계산기",
    "주식 물타기",
    "코인 물타기",
    "주식 평균가",
    "암호화폐 평균가",
    "투자 계산기",
    "매수 평균가",
    "주식 투자 도구",
    "코인 투자 도구",
    "분할 매수",
    "돈코스트 애버리징",
    "DCA 계산기",
    "투자 수익률",
    "주식 수익률 계산"
  ],
  openGraph: {
    title: "물타기 계산기 - 주식 코인 평균 매수가 계산",
    description: "주식과 코인의 평균 매수가를 쉽게 계산하세요. 물타기 투자 전략의 수익률을 미리 확인하고 현명한 투자 결정을 내려보세요.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary",
    title: "물타기 계산기 - 주식 코인 평균 매수가 계산",
    description: "주식과 코인의 평균 매수가를 쉽게 계산하세요. 물타기 투자 전략의 수익률을 미리 확인하고 현명한 투자 결정을 내려보세요.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://weekly-apps.vercel.app/stock-average-calculator",
  },
};

export default function StockAverageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}