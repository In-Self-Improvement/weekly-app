import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "하루 하나 - 작은 한 걸음으로 빛나는 하루",
  description:
    "무기력함을 극복하고 작은 성취감을 느껴보세요. 간단한 일일 할 일을 통해 조금씩 발전하는 자신을 발견하세요.",
  keywords: [
    "할일관리",
    "동기부여",
    "자기관리",
    "습관형성",
    "무기력",
    "생산성",
    "목표달성",
    "일일할일",
    "작은습관",
    "성취감",
    "자기계발",
    "멘탈케어",
    "todo",
    "motivation",
    "self-care",
    "productivity",
    "habit tracker",
  ],
  openGraph: {
    title: "하루 하나 - 작은 한 걸음으로 빛나는 하루",
    description:
      "무기력함을 극복하고 작은 성취감을 느껴보세요. 간단한 일일 할 일을 통해 조금씩 발전하는 자신을 발견하세요.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "하루 하나 - 작은 한 걸음으로 빛나는 하루",
    description:
      "무기력함을 극복하고 작은 성취감을 느껴보세요. 간단한 일일 할 일을 통해 조금씩 발전하는 자신을 발견하세요.",
  },
};

export default function StepGlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
