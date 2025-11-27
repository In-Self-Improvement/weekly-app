"use client";

import { useCallback } from "react";
import confetti from "canvas-confetti";

export function useConfetti() {
  const fireConfetti = useCallback(() => {
    // 기본 폭죽
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#a855f7", "#ec4899", "#8b5cf6", "#06b6d4", "#10b981"],
    });

    // 양쪽에서 추가 폭죽
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#a855f7", "#ec4899", "#8b5cf6"],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#06b6d4", "#10b981", "#8b5cf6"],
      });
    }, 150);
  }, []);

  // 3개 모두 완료 시 더 화려한 폭죽
  const fireAllCompleteConfetti = useCallback(() => {
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#a855f7", "#ec4899", "#8b5cf6", "#06b6d4", "#10b981"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#a855f7", "#ec4899", "#8b5cf6", "#06b6d4", "#10b981"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return {
    fireConfetti,
    fireAllCompleteConfetti,
  };
}
