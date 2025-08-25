import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "영어 대소문자 변환기 | Weekly Apps",
  description: "영어 텍스트의 대소문자를 간편하게 변환하세요. 첫 글자 대문자, 모두 대문자, 모두 소문자 변환을 지원합니다.",
  keywords: ["대소문자 변환", "영어 대문자", "영어 소문자", "텍스트 변환", "case converter", "uppercase", "lowercase", "capitalize"],
  openGraph: {
    title: "영어 대소문자 변환기",
    description: "영어 텍스트의 대소문자를 간편하게 변환하세요",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "영어 대소문자 변환기",
    description: "영어 텍스트의 대소문자를 간편하게 변환하세요",
  },
};

export default function CaseConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}