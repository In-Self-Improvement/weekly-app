import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '뽀모도로 타이머 - 25분 집중 타이머 | Weekly Apps',
  description: '뽀모도로 기법으로 집중력을 높이세요. 25분 집중, 5분 휴식 타이머. 무료 온라인 뽀모도로 타이머로 생산성을 향상시키세요.',
  keywords: '뽀모도로, 뽀모도로 타이머, 집중 타이머, 생산성, 시간관리, 25분 타이머, 토마토 타이머, pomodoro, 공부 타이머, 업무 타이머',
  openGraph: {
    title: '뽀모도로 타이머 - 25분 집중 타이머',
    description: '뽀모도로 기법으로 집중력과 생산성을 높이세요. 25분 집중, 5분 휴식.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://weekly-app.vercel.app/pomodoro',
    siteName: 'Weekly Apps',
  },
  twitter: {
    card: 'summary_large_image',
    title: '뽀모도로 타이머 - 25분 집중 타이머',
    description: '뽀모도로 기법으로 집중력과 생산성을 높이세요.',
  },
  alternates: {
    canonical: 'https://weekly-app.vercel.app/pomodoro',
  },
};

export default function PomodoroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}