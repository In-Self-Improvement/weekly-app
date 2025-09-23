'use client';

import { useCallback, useRef } from 'react';

// Web Audio API를 사용한 간단한 사운드 생성
export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  const playSuccessSound = useCallback(() => {
    try {
      const audioContext = getAudioContext();

      // 더 화려한 성공 사운드 (상승하는 음계 + 화음)
      const mainFrequencies = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const harmonyFrequencies = [329.63, 415.30, 523.25, 659.25]; // E4, G#4, C5, E5

      // 메인 멜로디
      mainFrequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.type = 'sine';

        // 볼륨 조절 (부드럽게 페이드 인/아웃)
        gainNode.gain.setValueAtTime(0, audioContext.currentTime + index * 0.12);
        gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + index * 0.12 + 0.03);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + index * 0.12 + 0.25);

        oscillator.start(audioContext.currentTime + index * 0.12);
        oscillator.stop(audioContext.currentTime + index * 0.12 + 0.25);
      });

      // 화음 추가
      harmonyFrequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.type = 'triangle'; // 다른 파형으로 화음 효과

        // 더 부드러운 화음
        gainNode.gain.setValueAtTime(0, audioContext.currentTime + index * 0.12 + 0.06);
        gainNode.gain.linearRampToValueAtTime(0.04, audioContext.currentTime + index * 0.12 + 0.09);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + index * 0.12 + 0.31);

        oscillator.start(audioContext.currentTime + index * 0.12 + 0.06);
        oscillator.stop(audioContext.currentTime + index * 0.12 + 0.31);
      });

    } catch {
      // 사운드 재생 실패 시 무시 (사용자 경험에 영향 없음)
      console.log('Sound playback not available');
    }
  }, [getAudioContext]);

  const playChimeSound = useCallback(() => {
    try {
      const audioContext = getAudioContext();

      // 더 화려한 목표 달성 차임 (벨 소리 + 리버브 효과)
      const frequencies = [880, 1100, 1320, 1760]; // A5, C#6, E6, A6

      frequencies.forEach((freq, index) => {
        // 메인 벨 소리
        const oscillator1 = audioContext.createOscillator();
        const gainNode1 = audioContext.createGain();

        oscillator1.connect(gainNode1);
        gainNode1.connect(audioContext.destination);

        oscillator1.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator1.type = 'sine';

        gainNode1.gain.setValueAtTime(0, audioContext.currentTime + index * 0.3);
        gainNode1.gain.linearRampToValueAtTime(0.06, audioContext.currentTime + index * 0.3 + 0.1);
        gainNode1.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + index * 0.3 + 2);

        oscillator1.start(audioContext.currentTime + index * 0.3);
        oscillator1.stop(audioContext.currentTime + index * 0.3 + 2);

        // 화음 레이어
        const oscillator2 = audioContext.createOscillator();
        const gainNode2 = audioContext.createGain();

        oscillator2.connect(gainNode2);
        gainNode2.connect(audioContext.destination);

        oscillator2.frequency.setValueAtTime(freq * 1.5, audioContext.currentTime);
        oscillator2.type = 'triangle';

        gainNode2.gain.setValueAtTime(0, audioContext.currentTime + index * 0.3 + 0.1);
        gainNode2.gain.linearRampToValueAtTime(0.03, audioContext.currentTime + index * 0.3 + 0.2);
        gainNode2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + index * 0.3 + 1.8);

        oscillator2.start(audioContext.currentTime + index * 0.3 + 0.1);
        oscillator2.stop(audioContext.currentTime + index * 0.3 + 1.8);
      });

      // 마지막에 특별한 효과음 추가
      setTimeout(() => {
        const specialOsc = audioContext.createOscillator();
        const specialGain = audioContext.createGain();

        specialOsc.connect(specialGain);
        specialGain.connect(audioContext.destination);

        specialOsc.frequency.setValueAtTime(2093, audioContext.currentTime); // C7
        specialOsc.type = 'square';

        specialGain.gain.setValueAtTime(0, audioContext.currentTime);
        specialGain.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.05);
        specialGain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);

        specialOsc.start(audioContext.currentTime);
        specialOsc.stop(audioContext.currentTime + 0.3);
      }, 800);

    } catch {
      console.log('Sound playback not available');
    }
  }, [getAudioContext]);

  return {
    playSuccessSound,
    playChimeSound,
  };
}