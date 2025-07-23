'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Cake } from 'lucide-react';

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
  const [birthYear, setBirthYear] = useState('2003');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [result, setResult] = useState<AgeResult | null>(null);

  const calculateAge = () => {
    if (!birthYear || !birthMonth || !birthDay) return;

    const birth = new Date(parseInt(birthYear), parseInt(birthMonth) - 1, parseInt(birthDay));
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
    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    // 다음 생일까지 계산
    let nextBirthdayYear = today.getFullYear();
    let nextBirthday = new Date(nextBirthdayYear, birth.getMonth(), birth.getDate());
    
    if (nextBirthday < today) {
      nextBirthdayYear++;
      nextBirthday = new Date(nextBirthdayYear, birth.getMonth(), birth.getDate());
    }

    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      totalDays,
      nextBirthday: {
        days: daysToNextBirthday,
        date: nextBirthday.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }
    });
  };

  const getAgeStage = (years: number) => {
    if (years < 10) return { stage: '어린이', emoji: '🧒', color: 'text-blue-600' };
    if (years < 20) return { stage: '청소년', emoji: '👦', color: 'text-green-600' };
    if (years < 30) return { stage: '청년', emoji: '👨', color: 'text-purple-600' };
    if (years < 40) return { stage: '장년', emoji: '👨‍💼', color: 'text-orange-600' };
    if (years < 60) return { stage: '중년', emoji: '👨‍🦳', color: 'text-red-600' };
    return { stage: '시니어', emoji: '👴', color: 'text-gray-600' };
  };

  const reset = () => {
    setBirthYear('2003');
    setBirthMonth('');
    setBirthDay('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🎂 나이 계산기
          </h1>
          <p className="text-gray-600">정확한 나이와 생일까지 남은 날을 계산해보세요</p>
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
              <label className="block text-sm font-medium text-gray-700 mb-3">
                생년월일
              </label>
              
              {/* 연도 선택 */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  연도
                </label>
                <select
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-center text-lg"
                >
                  {Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}년
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* 월 선택 */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  월
                </label>
                <select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-center text-lg"
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
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  일
                </label>
                <select
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-center text-lg"
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
                className="flex-1 h-12 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Clock className="w-5 h-5 mr-2" />
                나이 계산
              </Button>
              {result && (
                <Button 
                  onClick={reset}
                  variant="outline" 
                  className="h-12 px-4"
                >
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
                  <div className="text-lg text-gray-600 mb-4">
                    {result.years}년 {result.months}개월 {result.days}일
                  </div>
                  
                  {/* 생애 단계 */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-2xl">{getAgeStage(result.years).emoji}</span>
                    <span className={`text-lg font-semibold ${getAgeStage(result.years).color}`}>
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
                <div className="text-gray-600 mb-4">
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
                    <div className="font-semibold text-gray-700">총 주수</div>
                    <div className="text-xl font-bold text-yellow-600">
                      {Math.floor(result.totalDays / 7).toLocaleString()}주
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-700">총 분</div>
                    <div className="text-xl font-bold text-orange-600">
                      {(result.totalDays * 24 * 60).toLocaleString()}분
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-700">심장박동</div>
                    <div className="text-xl font-bold text-red-500">
                      약 {Math.floor(result.totalDays * 24 * 60 * 70).toLocaleString()}회
                    </div>
                    <div className="text-xs text-gray-500">(분당 70회 기준)</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-700">지구 공전</div>
                    <div className="text-xl font-bold text-green-600">
                      {result.years}바퀴
                    </div>
                    <div className="text-xs text-gray-500">태양 주위를</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}