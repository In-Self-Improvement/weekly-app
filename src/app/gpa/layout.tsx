import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "학점 계산기 | GPA 계산 - Weekly Apps",
  description: "과목별 성적과 학점을 입력하여 평균 평점(GPA)을 자동으로 계산하세요. 간단한 GPA 계산기로 학업 성취도를 확인할 수 있습니다.",
  keywords: "학점 계산기, GPA, GPA 계산기, 평점 계산, 학점 평균, 성적 계산, 대학 성적, 학업 성취도, 평균 평점",
  openGraph: {
    title: "학점 계산기 | GPA 계산",
    description: "과목별 성적과 학점을 입력하여 평균 평점(GPA)을 자동으로 계산하세요",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary",
    title: "학점 계산기 | GPA 계산",
    description: "과목별 성적과 학점을 입력하여 평균 평점(GPA)을 자동으로 계산하세요",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/gpa",
  },
};

export default function GPALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}