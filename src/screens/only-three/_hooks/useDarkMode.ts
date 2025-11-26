"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "only-three-dark-mode";

export function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // 초기 로드 시 저장된 설정 또는 시스템 설정 확인
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored !== null) {
      setIsDarkMode(stored === "true");
    } else {
      // 시스템 설정 확인
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
    }

    setIsLoaded(true);
  }, []);

  // 다크모드 변경 시 DOM 및 localStorage 업데이트
  useEffect(() => {
    if (!isLoaded) return;

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem(STORAGE_KEY, String(isDarkMode));
  }, [isDarkMode, isLoaded]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return {
    isDarkMode,
    toggleDarkMode,
    isLoaded,
  };
}
