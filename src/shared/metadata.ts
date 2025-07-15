import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://weekly-apps.vercel.app";

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  openGraph?: {
    title: string;
    description: string;
    url: string;
    images?: string[];
  };
}

export const pageMetadata: Record<string, PageMetadata> = {
  "/": {
    title: "Weekly Apps - 유용한 앱들을 한 곳에서",
    description:
      "날씨 확인, 간단한 할 일 관리, 사다리타기 게임 등 다양한 유용한 앱들을 한 곳에서 만나보세요.",
    keywords: [
      "날씨",
      "옷차림",
      "할일관리",
      "사다리타기",
      "게임",
      "유틸리티",
      "생산성",
    ],
    openGraph: {
      title: "Weekly Apps - 유용한 앱들을 한 곳에서",
      description:
        "날씨 확인, 간단한 할 일 관리, 사다리타기 게임 등 다양한 유용한 앱들을 한 곳에서 만나보세요.",
      url: "/",
    },
  },
  "/weather": {
    title: "날씨 & 옷차림 추천",
    description:
      "현재 위치의 실시간 날씨 정보와 기온에 맞는 옷차림을 추천받으세요. 오늘 입을 옷을 고민하지 마세요!",
    keywords: [
      "날씨",
      "옷차림 추천",
      "기온",
      "옵습",
      "실시간 날씨",
      "오늘 날씨",
      "올숍",
      "옷입기",
    ],
    openGraph: {
      title: "날씨 & 옷차림 추천 - Weekly Apps",
      description:
        "현재 위치의 실시간 날씨 정보와 기온에 맞는 옷차림을 추천받으세요.",
      url: "/weather",
    },
  },
  "/ladder": {
    title: "사다리타기 게임 - 공정한 선택을 위한 도구",
    description:
      "공정한 선택을 위한 사다리타기 게임입니다. 주문 선택, 역할 배정, 순서 정하기 등에 사용해보세요!",
    keywords: [
      "사다리타기",
      "선택 게임",
      "공정한 선택",
      "주문 게임",
      "사다리 게임",
      "선택 도구",
      "운임 게임",
    ],
    openGraph: {
      title: "사다리타기 게임 - 공정한 선택을 위한 도구",
      description:
        "공정한 선택을 위한 사다리타기 게임입니다. 주문 선택, 역할 배정, 순서 정하기 등에 사용해보세요!",
      url: "/ladder",
    },
  },
  "/quickwin": {
    title: "QuickWin - 간단한 할일로 성취감 얻기",
    description:
      "짧은 시간 내에 완료할 수 있는 간단한 할일들로 성취감을 느껴보세요. 작은 실천이 큰 변화를 만듭니다!",
    keywords: [
      "할일 관리",
      "성취감",
      "생산성",
      "습관 만들기",
      "일상 개선",
      "간단한 할일",
      "자기계발",
    ],
    openGraph: {
      title: "QuickWin - 간단한 할일로 성취감 얻기",
      description:
        "짧은 시간 내에 완료할 수 있는 간단한 할일들로 성취감을 느껴보세요.",
      url: "/quickwin",
    },
  },
};

export function generateMetadata(pathname: string): Metadata {
  const pageData = pageMetadata[pathname] || pageMetadata["/"];

  return {
    title: {
      default: pageData.title,
      template: "%s | Weekly Apps",
    },
    description: pageData.description,
    keywords: pageData.keywords,
    authors: [{ name: "Weekly Apps" }],
    creator: "Weekly Apps",
    publisher: "Weekly Apps",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: pageData.openGraph?.title || pageData.title,
      description: pageData.openGraph?.description || pageData.description,
      url: pageData.openGraph?.url || pathname,
      siteName: "Weekly Apps",
      locale: "ko_KR",
      type: "website",
      images: pageData.openGraph?.images,
    },
    twitter: {
      card: "summary_large_image",
      title: pageData.openGraph?.title || pageData.title,
      description: pageData.openGraph?.description || pageData.description,
      images: pageData.openGraph?.images,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
