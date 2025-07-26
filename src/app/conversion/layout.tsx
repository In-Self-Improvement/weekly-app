import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '평수 제곱미터 변환기',
  description: '평수와 제곱미터를 쉽고 빠르게 변환하세요. 부동산 평수 계산, 면적 단위 변환기',
  keywords: [
    '평수',
    '제곱미터',
    '면적변환',
    '평수계산기',
    '면적계산기',
    '부동산',
    '평방미터',
    '㎡',
    '평',
    '단위변환'
  ],
  openGraph: {
    title: '평수 ↔ 제곱미터 변환기 | Weekly Apps',
    description: '평수와 제곱미터를 쉽고 빠르게 변환하세요. 부동산 평수 계산, 면적 단위 변환기',
    type: 'website',
  },
  twitter: {
    title: '평수 ↔ 제곱미터 변환기 | Weekly Apps',
    description: '평수와 제곱미터를 쉽고 빠르게 변환하세요. 부동산 평수 계산, 면적 단위 변환기',
  },
};

export default function ConversionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}