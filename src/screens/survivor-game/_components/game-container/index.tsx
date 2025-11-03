"use client";

import { useEffect, useRef } from "react";
import type Phaser from "phaser";

export default function GameContainer() {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    // Phaser 게임 초기화 (클라이언트 사이드에서만)
    const initGame = async () => {
      if (typeof window !== "undefined" && !gameRef.current) {
        const Phaser = await import("phaser");
        const { gameConfig } = await import("./gameConfig");

        gameRef.current = new Phaser.Game(gameConfig);
      }
    };

    initGame();

    // 클린업
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div
        id="phaser-game"
        className="border-4 border-purple-600 rounded-lg shadow-2xl max-h-[650px] overflow-hidden"
        style={{ maxHeight: "650px" }}
      />
    </div>
  );
}
