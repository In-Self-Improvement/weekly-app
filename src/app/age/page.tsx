"use client";

import { useState } from "react";
import { Cake, CalendarDays, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  nextBirthday: {
    days: number;
    date: string;
  };
}

export default function AgePage() {
  const [birthYear, setBirthYear] = useState("2003");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [result, setResult] = useState<AgeResult | null>(null);

  const calculateAge = () => {
    if (!birthYear || !birthMonth || !birthDay) return;

    const birth = new Date(
      parseInt(birthYear),
      parseInt(birthMonth) - 1,
      parseInt(birthDay)
    );
    const today = new Date();

    // 나이 계산
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // 총 일수 계산
    const totalDays = Math.floor(
      (today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)
    );

    // 다음 생일까지 계산
    let nextBirthdayYear = today.getFullYear();
    let nextBirthday = new Date(
      nextBirthdayYear,
      birth.getMonth(),
      birth.getDate()
    );

    if (nextBirthday < today) {
      nextBirthdayYear++;
      nextBirthday = new Date(
        nextBirthdayYear,
        birth.getMonth(),
        birth.getDate()
      );
    }

    const daysToNextBirthday = Math.ceil(
      (nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    setResult({
      years,
      months,
      days,
      totalDays,
      nextBirthday: {
        days: daysToNextBirthday,
        date: nextBirthday.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
    });
  };

  const getAgeStage = (years: number) => {
    if (years < 10)
      return { stage: "어린이", emoji: "🧒", color: "text-blue-600" };
    if (years < 20)
      return { stage: "청소년", emoji: "👦", color: "text-green-600" };
    if (years < 30)
      return { stage: "청년", emoji: "👨", color: "text-purple-600" };
    if (years < 40)
      return { stage: "장년", emoji: "👨‍💼", color: "text-orange-600" };
    if (years < 60)
      return { stage: "중년", emoji: "👨‍🦳", color: "text-red-600" };
    return { stage: "시니어", emoji: "👴", color: "text-muted-foreground" };
  };

  const reset = () => {
    setBirthYear("2003");
    setBirthMonth("");
    setBirthDay("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            🎂 나이 계산기
          </h1>
          <p className="text-muted-foreground">
            정확한 나이와 생일까지 남은 날을 계산해보세요
          </p>
        </div>

        {/* 입력 카드 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center text-cyan-700 flex items-center justify-center gap-2">
              <CalendarDays className="w-5 h-5" />
              생년월일 입력
            </CardTitle>
            <CardDescription className="text-center">
              생년월일을 선택해주세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-3">
                생년월일
              </label>

              {/* 연도 선택 */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  연도
                </label>
                <select
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className="w-full px-3 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-center text-lg"
                >
                  {Array.from(
                    { length: new Date().getFullYear() - 1900 + 1 },
                    (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <option key={year} value={year}>
                          {year}년
                        </option>
                      );
                    }
                  )}
                </select>
              </div>

              {/* 월 선택 */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  월
                </label>
                <select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                  className="w-full px-3 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-center text-lg"
                >
                  <option value="">월 선택</option>
                  {Array.from({ length: 12 }, (_, i) => {
                    const month = i + 1;
                    return (
                      <option key={month} value={month}>
                        {month}월
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* 일 선택 */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-muted-foreground mb-1">
                  일
                </label>
                <select
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  className="w-full px-3 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-center text-lg"
                >
                  <option value="">일 선택</option>
                  {Array.from({ length: 31 }, (_, i) => {
                    const day = i + 1;
                    return (
                      <option key={day} value={day}>
                        {day}일
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={calculateAge}
                disabled={!birthYear || !birthMonth || !birthDay}
                className="flex-1 h-12 text-lg font-semibold"
              >
                <Clock className="w-5 h-5 mr-2" />
                나이 계산
              </Button>
              {result && (
                <Button onClick={reset} variant="outline" className="h-12 px-4">
                  초기화
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 결과 표시 */}
        {result && (
          <div className="space-y-4">
            {/* 기본 나이 정보 */}
            <Card className="bg-white border border-cyan-200">
              <CardHeader>
                <CardTitle className="text-center text-cyan-700 flex items-center justify-center gap-2">
                  <Cake className="w-5 h-5" />
                  현재 나이
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-cyan-600 mb-2">
                    {result.years}세
                  </div>
                  <div className="text-lg text-muted-foreground mb-4">
                    {result.years}년 {result.months}개월 {result.days}일
                  </div>

                  {/* 생애 단계 */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-2xl">
                      {getAgeStage(result.years).emoji}
                    </span>
                    <span
                      className={`text-lg font-semibold ${
                        getAgeStage(result.years).color
                      }`}
                    >
                      {getAgeStage(result.years).stage}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-cyan-50 rounded-lg p-3">
                      <div className="font-semibold text-cyan-700">총 일수</div>
                      <div className="text-2xl font-bold text-cyan-600">
                        {result.totalDays.toLocaleString()}일
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="font-semibold text-blue-700">총 시간</div>
                      <div className="text-2xl font-bold text-blue-600">
                        {(result.totalDays * 24).toLocaleString()}시간
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 다음 생일 정보 */}
            <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200">
              <CardHeader>
                <CardTitle className="text-center text-pink-700">
                  🎉 다음 생일까지
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">
                  {result.nextBirthday.days}일
                </div>
                <div className="text-muted-foreground mb-4">
                  {result.nextBirthday.date}
                </div>

                {result.nextBirthday.days === 0 && (
                  <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4">
                    <div className="text-2xl mb-2">🎂🎉</div>
                    <div className="font-bold text-yellow-700">
                      오늘이 생일입니다!
                    </div>
                    <div className="text-yellow-600">
                      생일을 축하드립니다! 🎈
                    </div>
                  </div>
                )}

                {result.nextBirthday.days === 1 && (
                  <div className="bg-purple-100 border border-purple-300 rounded-lg p-4">
                    <div className="text-2xl mb-2">🎂✨</div>
                    <div className="font-bold text-purple-700">
                      내일이 생일이에요!
                    </div>
                    <div className="text-purple-600">
                      미리 생일 축하드려요! 🎁
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 재미있는 통계 */}
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200">
              <CardHeader>
                <CardTitle className="text-center text-yellow-700">
                  📊 재미있는 통계
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-primary">총 주수</div>
                    <div className="text-xl font-bold text-yellow-600">
                      {Math.floor(result.totalDays / 7).toLocaleString()}주
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-primary">총 분</div>
                    <div className="text-xl font-bold text-orange-600">
                      {(result.totalDays * 24 * 60).toLocaleString()}분
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-primary">심장박동</div>
                    <div className="text-xl font-bold text-red-500">
                      약{" "}
                      {Math.floor(
                        result.totalDays * 24 * 60 * 70
                      ).toLocaleString()}
                      회
                    </div>
                    <div className="text-xs text-muted-foreground">
                      (분당 70회 기준)
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-primary">지구 공전</div>
                    <div className="text-xl font-bold text-green-600">
                      {result.years}바퀴
                    </div>
                    <div className="text-xs text-muted-foreground">
                      태양 주위를
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 상세 설명 및 가이드 */}
        <div className="mt-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-cyan-700 flex items-center justify-center gap-2">
                🎂 나이 계산기란?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  📅 정확한 나이 계산
                </h3>
                <p className="text-muted-foreground text-sm">
                  생년월일을 입력하면 현재까지의 정확한 나이를 년, 월, 일 단위로
                  계산해드립니다. 단순히 년도 차이가 아닌 실제 경과한 시간을
                  기준으로 계산합니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  🎉 생일 정보
                </h3>
                <p className="text-muted-foreground text-sm">
                  다음 생일까지 남은 날짜와 함께 생일 축하 메시지도 제공합니다.
                  오늘이 생일이거나 내일이 생일인 경우 특별한 메시지를 확인하실
                  수 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-cyan-700">
                📊 제공하는 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-100">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📅</span>
                    <h3 className="font-semibold text-foreground">
                      기본 나이 정보
                    </h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• 현재 나이 (년, 월, 일)</li>
                    <li>• 생애 단계 (유아, 아동, 청소년, 성인 등)</li>
                    <li>• 태어난 후 총 일수</li>
                    <li>• 총 시간 수</li>
                  </ul>
                </div>

                <div className="p-4 bg-pink-50 rounded-lg border border-pink-100">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🎂</span>
                    <h3 className="font-semibold text-foreground">
                      생일 관련 정보
                    </h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• 다음 생일까지 남은 날짜</li>
                    <li>• 다음 생일 날짜</li>
                    <li>• 생일 축하 메시지 (당일/전날)</li>
                    <li>• 생일 카운트다운</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📈</span>
                    <h3 className="font-semibold text-foreground">
                      재미있는 통계
                    </h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• 총 주수 (Week)</li>
                    <li>• 총 분수 (Minute)</li>
                    <li>• 예상 심장박동 수</li>
                    <li>• 지구 공전 횟수</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-cyan-700">
                🎯 생애 단계별 특징
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="text-2xl">👶</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      유아기 (0-2세)
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      급속한 신체 발달과 기본적인 운동 능력, 언어 능력이
                      발달하는 시기
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                  <span className="text-2xl">🧒</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      아동기 (3-12세)
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      학습 능력이 발달하고 사회성을 기르며 기본적인 지식을
                      습득하는 시기
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <span className="text-2xl">🎓</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      청소년기 (13-19세)
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      신체적 변화와 함께 정체성을 찾아가며 진로를 고민하는 시기
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
                  <span className="text-2xl">💼</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      청년기 (20-39세)
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      사회에 진출하여 경력을 쌓고 가정을 꾸리는 등 활발한 활동의
                      시기
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                  <span className="text-2xl">👔</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      중년기 (40-64세)
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      인생 경험이 풍부해지고 사회적으로 안정된 위치에서 활동하는
                      시기
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg border border-border">
                  <span className="text-2xl">👴</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      노년기 (65세 이상)
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      풍부한 인생 경험을 바탕으로 여유로운 삶을 즐기는 지혜의
                      시기
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-cyan-700">
                💡 나이 계산 활용법
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  📋 공식 서류 작성
                </h3>
                <p className="text-muted-foreground text-sm">
                  정확한 나이 정보가 필요한 각종 서류 작성이나 보험 가입 시
                  활용할 수 있습니다. 개월 수까지 정확히 계산해서 제공합니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  🎉 기념일 관리
                </h3>
                <p className="text-muted-foreground text-sm">
                  가족이나 친구들의 생일을 미리 확인하여 축하 준비를 할 수
                  있습니다. 중요한 사람들의 기념일을 놓치지 않도록 도와줍니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  📊 인생 계획 수립
                </h3>
                <p className="text-muted-foreground text-sm">
                  현재 생애 단계를 확인하고 앞으로의 인생 계획을 세울 때 참고할
                  수 있습니다. 각 단계별 특징을 고려한 목표 설정에 도움이
                  됩니다.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-cyan-700">
                ❓ 자주 묻는 질문
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Q. 한국 나이와 만 나이의 차이는?
                </h3>
                <p className="text-muted-foreground text-sm">
                  A. 이 계산기는 만 나이를 기준으로 합니다. 만 나이는 태어난
                  날부터 계산하여 생일이 지나야 한 살씩 증가하는 국제적
                  기준입니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Q. 윤년은 어떻게 계산하나요?
                </h3>
                <p className="text-muted-foreground text-sm">
                  A. 윤년(2월 29일)을 자동으로 고려하여 정확한 일수를
                  계산합니다. 4년마다 오는 윤년도 정확히 반영됩니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Q. 통계 수치는 어떻게 계산되나요?
                </h3>
                <p className="text-muted-foreground text-sm">
                  A. 심장박동은 평균 분당 70회, 기타 통계는 일반적인 과학적
                  기준을 바탕으로 계산한 추정치입니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
