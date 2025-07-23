import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI 계산기 | 체질량지수 계산 - Weekly Apps",
  description: "키와 몸무게로 간단하게 BMI(체질량지수)를 계산하고 건강 상태를 확인하세요. 정확한 BMI 계산기로 비만도 측정이 가능합니다.",
  keywords: "BMI, 체질량지수, BMI 계산기, 비만도 측정, 건강 체크, 체중 관리, 다이어트",
  openGraph: {
    title: "BMI 계산기 | 체질량지수 계산",
    description: "키와 몸무게로 간단하게 BMI를 계산하고 건강 상태를 확인하세요",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary",
    title: "BMI 계산기 | 체질량지수 계산",
    description: "키와 몸무게로 간단하게 BMI를 계산하고 건강 상태를 확인하세요",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/bmi",
  },
};

export default function BMILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}