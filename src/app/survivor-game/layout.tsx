import { Metadata } from "next";

export const metadata: Metadata = {
  title: "서바이버 게임 - 5분간 생존하기",
  description:
    "뱀파이어 서바이버 스타일의 웹 게임. 몰려오는 적들을 물리치고 5분간 생존하세요. 무료 브라우저 게임, PC 키보드 조작",
  keywords: [
    "서바이버 게임",
    "뱀파이어 서바이버",
    "생존 게임",
    "웹 게임",
    "브라우저 게임",
    "무료 게임",
    "액션 게임",
    "로그라이크",
  ],
  openGraph: {
    title: "서바이버 게임 - 5분간 생존하기",
    description: "몰려오는 적들을 물리치고 5분간 생존하세요!",
    type: "website",
  },
};

export default function SurvivorGameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
