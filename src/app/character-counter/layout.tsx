import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '글자수 세기 | 온라인 글자수 계산기 - 무료 글자 세기 도구',
  description: '온라인에서 무료로 글자수, 단어수, 문단수를 정확하게 계산하세요. 공백 포함/제외 옵션, 원고지 매수 계산 기능을 제공하는 글자수 세기 도구입니다.',
  keywords: [
    '글자수 세기',
    '글자수 계산기',
    '문자수 계산',
    '단어수 세기',
    '원고지 매수',
    '글자 카운터',
    '텍스트 분석',
    '글자수 체크',
    '문서 분석',
    '온라인 글자수'
  ],
  openGraph: {
    title: '글자수 세기 | 온라인 글자수 계산기',
    description: '텍스트의 글자수, 단어수, 문단수를 정확하게 계산하는 무료 온라인 도구',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Weekly Apps',
  },
  twitter: {
    card: 'summary',
    title: '글자수 세기 | 온라인 글자수 계산기',
    description: '텍스트의 글자수, 단어수, 문단수를 정확하게 계산하는 무료 온라인 도구',
  },
  alternates: {
    canonical: '/character-counter',
  },
};

export default function CharacterCounterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}