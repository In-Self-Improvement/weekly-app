"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PomodoroPage() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleTimerComplete = useCallback(() => {
    setIsActive(false);

    if (!isBreak) {
      // 작업 세션 완료
      setSessions((prev) => prev + 1);
      setIsBreak(true);
      setMinutes(5);
      setSeconds(0);
    } else {
      // 휴식 완료
      setIsBreak(false);
      setMinutes(25);
      setSeconds(0);
    }

    // 알림음 재생 (브라우저 기본 알림)
    const audio = new Audio(
      "data:audio/wav;base64,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"
    );
    audio.play();
  }, [isBreak]);

  useEffect(() => {
    if (isActive && (minutes > 0 || seconds > 0)) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // 타이머 종료
            handleTimerComplete();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, minutes, seconds, handleTimerComplete]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  const skipToBreak = () => {
    setIsActive(false);
    setIsBreak(true);
    setMinutes(5);
    setSeconds(0);
  };

  const skipToWork = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🍅 뽀모도로 타이머
          </h1>
          <p className="text-gray-600">25분 집중, 5분 휴식</p>
        </div>

        {/* 타이머 카드 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              {isBreak ? "☕ 휴식 시간" : "🎯 집중 시간"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {/* 타이머 디스플레이 */}
            <div className="text-7xl font-bold text-gray-800 mb-8 font-mono">
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </div>

            {/* 컨트롤 버튼 */}
            <div className="space-y-3">
              <Button
                onClick={toggleTimer}
                className={`w-full h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
                    : "bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
                }`}
              >
                {isActive ? "⏸ 일시정지" : "▶️ 시작"}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button onClick={resetTimer} variant="outline" className="h-10">
                  🔄 리셋
                </Button>
                <Button
                  onClick={isBreak ? skipToWork : skipToBreak}
                  variant="outline"
                  className="h-10"
                >
                  {isBreak ? "⏭ 작업으로" : "⏭ 휴식으로"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 세션 카운터 */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-gray-600 mb-2">오늘 완료한 세션</p>
              <div className="text-3xl font-bold text-orange-600">
                🍅 × {sessions}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 사용법 */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>💡 25분 집중 후 5분 휴식을 반복하세요</p>
        </div>
      </div>
    </div>
  );
}
