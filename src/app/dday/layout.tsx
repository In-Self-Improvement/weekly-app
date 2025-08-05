import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "디데이 계산기 | Weekly Apps - 중요한 날까지 남은 시간 계산",
  description:
    "디데이 계산기로 시험, 결혼식, 여행 등 중요한 날까지 남은 시간을 정확하게 계산하세요. 진행도 표시와 시간 단위 변환 기능을 제공합니다.",
  keywords:
    "디데이 계산기, D-day 계산, 날짜 계산, 남은 날짜, 시험 디데이, 결혼식 디데이, 여행 계획, 날짜 카운터, 중요한 날",
  openGraph: {
    title: "디데이 계산기 - 중요한 날까지 정확한 계산",
    description:
      "시험, 결혼식, 여행 등 소중한 날까지 남은 시간을 계산하고 계획을 세워보세요. 진행도 표시와 다양한 활용 팁을 제공합니다.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary",
    title: "디데이 계산기 | Weekly Apps",
    description:
      "중요한 날까지 남은 시간을 정확하게 계산하세요. 진행도 표시 기능으로 계획 관리도 가능합니다.",
  },
  alternates: {
    canonical: "/dday",
  },
};

export default function DdayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
