"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DdayResult {
  title: string;
  targetDate: Date;
  daysLeft: number;
  isPast: boolean;
  percentage?: number;
  startDate?: Date;
}

export default function DdayPage() {
  const [title, setTitle] = useState<string>("");
  const [targetDate, setTargetDate] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [result, setResult] = useState<DdayResult | null>(null);
  const [error, setError] = useState<string>("");
  const [useStartDate, setUseStartDate] = useState<boolean>(false);

  const calculateDday = () => {
    setError("");

    if (!title.trim()) {
      setError("제목을 입력해주세요.");
      return;
    }

    if (!targetDate) {
      setError("목표 날짜를 입력해주세요.");
      return;
    }

    const target = new Date(targetDate);
    const now = new Date();

    // 시간을 자정으로 설정하여 일자만 비교
    now.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    // 날짜 유효성 검사
    if (isNaN(target.getTime())) {
      setError("올바른 날짜를 입력해주세요.");
      return;
    }

    // D-day 계산
    const timeDiff = target.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    let percentage: number | undefined;
    let start: Date | undefined;

    // 시작일이 있는 경우 진행도 계산
    if (useStartDate && startDate) {
      start = new Date(startDate);
      start.setHours(0, 0, 0, 0);

      if (isNaN(start.getTime())) {
        setError("올바른 시작 날짜를 입력해주세요.");
        return;
      }

      if (start > target) {
        setError("시작 날짜는 목표 날짜보다 이전이어야 합니다.");
        return;
      }

      const totalDays = Math.ceil(
        (target.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );
      const passedDays = Math.ceil(
        (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );

      percentage = Math.max(0, Math.min(100, (passedDays / totalDays) * 100));
    }

    setResult({
      title: title.trim(),
      targetDate: target,
      daysLeft: daysDiff,
      isPast: daysDiff < 0,
      percentage,
      startDate: start,
    });
  };

  const resetForm = () => {
    setTitle("");
    setTargetDate("");
    setStartDate("");
    setResult(null);
    setError("");
    setUseStartDate(false);
  };

  const getDdayDisplay = (daysLeft: number, isPast: boolean) => {
    if (daysLeft === 0) {
      return {
        text: "D-DAY",
        color: "text-red-600",
        bgColor: "bg-red-50 border-red-200",
      };
    } else if (isPast) {
      return {
        text: `D+${Math.abs(daysLeft)}`,
        color: "text-gray-600",
        bgColor: "bg-muted border-border",
      };
    } else {
      const color =
        daysLeft <= 7
          ? "text-red-600"
          : daysLeft <= 30
          ? "text-orange-600"
          : "text-blue-600";
      const bgColor =
        daysLeft <= 7
          ? "bg-red-50 border-red-200"
          : daysLeft <= 30
          ? "bg-orange-50 border-orange-200"
          : "bg-blue-50 border-blue-200";
      return { text: `D-${daysLeft}`, color, bgColor };
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">디데이 계산기</h1>
          <p className="text-gray-300">
            소중한 날까지 남은 시간을 확인하고 계획을 세워보세요
          </p>
        </div>

        <Card className="mb-4 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-center text-white">
              📅 디데이 설정
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              목표 날짜와 제목을 입력해주세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                제목
              </label>
              <input
                id="title"
                type="text"
                placeholder="예: 수능, 결혼식, 여행"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-center text-lg bg-gray-700 text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="targetDate"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                목표 날짜
              </label>
              <input
                id="targetDate"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-center text-lg bg-gray-700 text-white"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="useStartDate"
                type="checkbox"
                checked={useStartDate}
                onChange={(e) => setUseStartDate(e.target.checked)}
                className="rounded border-gray-600 bg-gray-700 text-muted-foreground focus:ring-gray-500"
              />
              <label htmlFor="useStartDate" className="text-sm text-gray-300">
                진행도 표시 (시작일 설정)
              </label>
            </div>

            {useStartDate && (
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  시작 날짜
                </label>
                <input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-center text-lg bg-gray-700 text-white"
                />
              </div>
            )}

            {error && (
              <div className="text-red-400 text-sm text-center p-2 bg-red-900/30 rounded-lg border border-red-700">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={calculateDday}
                className="flex-1 h-12 text-lg font-semibold"
              >
                디데이 계산하기
              </Button>

              {result && (
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="h-12 px-4"
                >
                  초기화
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card className={`mb-4 bg-gray-800 border-gray-700`}>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white font-bold mb-2">
                {result.title}
              </CardTitle>
              <div
                className={`text-4xl font-bold ${
                  getDdayDisplay(result.daysLeft, result.isPast).color
                }`}
              >
                {getDdayDisplay(result.daysLeft, result.isPast).text}
              </div>
              <p className="text-gray-400 mt-2">
                {formatDate(result.targetDate)}
              </p>
            </CardHeader>
            <CardContent>
              {result.percentage !== undefined && result.startDate && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>진행도</span>
                    <span>{result.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      style={{ width: `${Math.min(100, result.percentage)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{formatDate(result.startDate)}</span>
                    <span>{formatDate(result.targetDate)}</span>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {!result.isPast && result.daysLeft > 0 && (
                  <div className="p-3 bg-gray-700/50 rounded-lg">
                    <div className="text-sm font-medium text-gray-300 mb-2">
                      ⏰ 시간 단위로 보기:
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-white">
                          {result.daysLeft}
                        </div>
                        <div className="text-xs text-gray-400">일</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-white">
                          {result.daysLeft * 24}
                        </div>
                        <div className="text-xs text-gray-400">시간</div>
                      </div>
                    </div>
                  </div>
                )}

                {result.daysLeft === 0 && (
                  <div className="p-4 bg-red-900/30 rounded-lg border border-red-700 text-center">
                    <div className="text-2xl mb-2">🎉</div>
                    <div className="text-red-400 font-semibold">
                      오늘이 바로 그 날입니다!
                    </div>
                  </div>
                )}

                {result.isPast && (
                  <div className="p-4 bg-gray-700/30 rounded-lg text-center">
                    <div className="text-gray-400">
                      목표 날짜가 {Math.abs(result.daysLeft)}일 지났습니다
                    </div>
                  </div>
                )}

                {!result.isPast && result.daysLeft > 0 && (
                  <div className="p-3 bg-gray-700/50 rounded-lg">
                    <div className="text-sm font-medium text-gray-300 mb-2">
                      💡 팁:
                    </div>
                    <div className="text-sm text-gray-400">
                      {result.daysLeft <= 7
                        ? "이제 얼마 남지 않았어요! 마지막 점검을 해보세요."
                        : result.daysLeft <= 30
                        ? "한 달이 채 남지 않았어요. 구체적인 계획을 세워보세요."
                        : "아직 시간이 충분해요. 차근차근 준비해보세요."}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <div className="text-center text-sm text-gray-400">
              <p className="mb-2">📱 디데이 활용 팁</p>
              <p className="text-xs text-muted-foreground">
                중요한 날들을 미리 체크하고 계획적으로 준비하세요. 시작일을
                설정하면 현재까지의 진행 상황도 확인할 수 있어요!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 상세 가이드 */}
        <div className="mt-8 space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-center text-white flex items-center justify-center gap-2">
                🎯 디데이 계산기 활용법
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-200 mb-2">
                  📚 시험 준비
                </h3>
                <p className="text-gray-400 text-sm">
                  수능, 자격증 시험 등 중요한 시험일을 설정하고 체계적으로
                  준비하세요. 진행도 기능으로 공부 계획의 달성도를 확인할 수
                  있습니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-200 mb-2">
                  💒 특별한 날
                </h3>
                <p className="text-gray-400 text-sm">
                  결혼식, 생일, 기념일 등 소중한 날들을 미리 체크하고 선물이나
                  이벤트를 차근차근 준비해보세요.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-200 mb-2">
                  ✈️ 여행 계획
                </h3>
                <p className="text-gray-400 text-sm">
                  여행 출발일을 설정하고 항공권 예약, 숙소 예약, 여행 준비물
                  등을 계획적으로 준비할 수 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-center text-white">
                🔍 디데이 색상 의미
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-gray-300 text-sm">
                  빨간색: D-DAY 또는 7일 이내
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-gray-300 text-sm">
                  주황색: 8일~30일 이내
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-gray-300 text-sm">파란색: 31일 이상</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-muted0 rounded"></div>
                <span className="text-gray-300 text-sm">
                  회색색: 지난 날짜 (D+)
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
