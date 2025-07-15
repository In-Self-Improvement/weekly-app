import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Weekly Apps - 유용한 앱들을 한 곳에서",
    short_name: "Weekly Apps",
    description:
      "날씨 확인, 간단한 할 일 관리, 사다리타기 게임 등 다양한 유용한 앱들을 한 곳에서 만나보세요.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
