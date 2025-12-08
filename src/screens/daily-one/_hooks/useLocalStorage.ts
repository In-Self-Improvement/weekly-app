"use client";

import { useEffect, useState } from "react";

// LocalStorage와 연동하는 커스텀 훅
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 초기값 설정
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // 브라우저 환경에서만 localStorage 접근
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // 값 업데이트 함수
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 함수인 경우 현재 값을 인자로 전달
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      // 브라우저 환경에서만 localStorage에 저장
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // localStorage 변경 감지 (다른 탭에서의 변경사항 동기화)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(
            `Error parsing localStorage value for key "${key}":`,
            error
          );
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }
  }, [key]);

  return [storedValue, setValue] as const;
}

// StepGlow 전용 LocalStorage 키들
export const STORAGE_KEYS = {
  COMPLETED_TASKS: "stepglow_completed_tasks",
  USER_STATS: "stepglow_user_stats",
  DAILY_PROGRESS: "stepglow_daily_progress",
  LAST_VISIT: "stepglow_last_visit",
} as const;
