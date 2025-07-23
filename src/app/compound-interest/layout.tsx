import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '복리 계산기 - 투자 수익률과 복리 효과 시뮬레이션',
  description: '초기 투자금, 이자율, 투자 기간을 입력하여 복리 효과를 계산하고 연도별 상세 투자 수익을 확인하세요. 월 추가 투자금 포함 시뮬레이션도 가능합니다.',
  keywords: ['복리계산기', '복리계산', '투자계산기', '수익률계산', '복리효과', '투자시뮬레이션', '이자계산', '투자수익', '재테크', '자산관리'],
  openGraph: {
    title: '복리 계산기 - 투자 수익률과 복리 효과 시뮬레이션',
    description: '복리의 마법을 미리 체험해보세요. 투자 조건을 입력하면 연도별 상세 수익을 계산해드립니다.',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
    title: '복리 계산기 - 투자 수익률과 복리 효과 시뮬레이션',
    description: '복리의 마법을 미리 체험해보세요. 투자 조건을 입력하면 연도별 상세 수익을 계산해드립니다.',
  }
};

export default function CompoundInterestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}