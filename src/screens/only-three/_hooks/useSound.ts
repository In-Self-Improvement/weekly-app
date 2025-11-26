"use client";

import { useCallback, useRef } from "react";

export function useSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playCompleteSound = useCallback(() => {
    // 이미 재생 중이면 중단하고 새로 재생
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // 간단한 성공 사운드 (Web Audio API로 생성)
    try {
      const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

      // 상승하는 톤 생성
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch {
      // 오디오 재생 실패 시 무시 (사용자 경험에 영향 없음)
      console.log("Audio playback not available");
    }
  }, []);

  // 모든 태스크 완료 시 더 화려한 사운드
  const playAllCompleteSound = useCallback(() => {
    try {
      const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

      // 팡파레 느낌의 상승 아르페지오
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

      notes.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.1);

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + index * 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.1 + 0.4);

        oscillator.start(audioContext.currentTime + index * 0.1);
        oscillator.stop(audioContext.currentTime + index * 0.1 + 0.4);
      });
    } catch {
      console.log("Audio playback not available");
    }
  }, []);

  return {
    playCompleteSound,
    playAllCompleteSound,
  };
}
