import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '나이 계산기 - 정확한 나이와 생일까지 남은 날 계산',
  description: '생년월일을 입력하면 정확한 나이(년, 월, 일)와 다음 생일까지 남은 날짜를 계산해드립니다. 총 살아온 일수, 시간, 심장박동수 등 재미있는 통계도 확인하세요.',
  keywords: ['나이계산기', '나이계산', '생일계산', '나이', '생년월일', '생일까지', '만나이', '한국나이', '나이변환', '생일계산기'],
  openGraph: {
    title: '나이 계산기 - 정확한 나이와 생일까지 남은 날 계산',
    description: '생년월일을 입력하면 정확한 나이와 다음 생일까지 남은 날짜를 계산해드립니다.',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
    title: '나이 계산기 - 정확한 나이와 생일까지 남은 날 계산',
    description: '생년월일을 입력하면 정확한 나이와 다음 생일까지 남은 날짜를 계산해드립니다.',
  }
};

export default function AgeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}