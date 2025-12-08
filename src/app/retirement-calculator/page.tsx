"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RetirementCalculator() {
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [startDate, setStartDate] = useState(formatDateForInput(oneYearAgo));
  const [endDate, setEndDate] = useState(formatDateForInput(today));
  const [monthlyAverage, setMonthlyAverage] = useState("");
  const [yearlyBonus, setYearlyBonus] = useState("");
  const [annualLeave, setAnnualLeave] = useState("");
  const [result, setResult] = useState<{
    workDays: number;
    workYears: number;
    workMonths: number;
    averageWage: number;
    retirementPay: number;
    tax: number;
    localTax: number;
    netAmount: number;
  } | null>(null);

  const formatNumber = (value: string) => {
    const number = value.replace(/[^0-9]/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleInputChange = (
    value: string,
    setter: (value: string) => void
  ) => {
    setter(formatNumber(value));
  };

  const parseNumber = (value: string) => {
    return parseInt(value.replace(/,/g, "") || "0");
  };

  const calculateRetirement = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // 근속일수 계산
    const workDays = Math.floor(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    // 근속연수 계산
    const workYears = Math.floor(workDays / 365);
    const remainingDays = workDays % 365;
    const workMonths = Math.floor(remainingDays / 30);

    // 1년 미만 체크
    if (workDays < 365) {
      alert("근속기간이 1년 미만인 경우 퇴직금이 지급되지 않습니다.");
      return;
    }

    // 3개월 평균임금 계산
    const monthlyTotal = parseNumber(monthlyAverage); // 3개월 총액
    const bonus = parseNumber(yearlyBonus);
    const leave = parseNumber(annualLeave);

    // 일 평균임금 = (3개월 총 급여 + 3개월분 상여금 + 3개월분 연차수당) ÷ 90일
    // 3개월분 상여금 = 연간상여금 ÷ 4
    // 3개월분 연차수당 = 연차수당 ÷ 4
    const threeMonthTotal = monthlyTotal + bonus / 4 + leave / 4;
    const averageWage = threeMonthTotal / 90; // 일 평균임금

    // 퇴직금 = 평균임금 × 30일 × (근속일수/365)
    const retirementPay = Math.floor(averageWage * 30 * (workDays / 365));

    // 퇴직소득세 계산 (간단 버전)
    // 근속연수 공제: 5년까지 30만원×연수, 10년까지 50만원×연수, 20년까지 80만원×연수, 20년초과 120만원×연수
    let deduction = 0;
    if (workYears <= 5) {
      deduction = 300000 * workYears;
    } else if (workYears <= 10) {
      deduction = 1500000 + 500000 * (workYears - 5);
    } else if (workYears <= 20) {
      deduction = 4000000 + 800000 * (workYears - 10);
    } else {
      deduction = 12000000 + 1200000 * (workYears - 20);
    }

    // 과세표준 = (퇴직금 - 근속연수공제) × 12 / 근속연수
    const taxBase = Math.max(0, ((retirementPay - deduction) * 12) / workYears);

    // 간이세율 적용 (실제는 더 복잡하지만 MVP용 간소화)
    let tax = 0;
    if (taxBase <= 14000000) {
      tax = taxBase * 0.06;
    } else if (taxBase <= 50000000) {
      tax = 840000 + (taxBase - 14000000) * 0.15;
    } else if (taxBase <= 88000000) {
      tax = 6240000 + (taxBase - 50000000) * 0.24;
    } else if (taxBase <= 150000000) {
      tax = 15360000 + (taxBase - 88000000) * 0.35;
    } else if (taxBase <= 300000000) {
      tax = 37060000 + (taxBase - 150000000) * 0.38;
    } else if (taxBase <= 500000000) {
      tax = 94060000 + (taxBase - 300000000) * 0.4;
    } else if (taxBase <= 1000000000) {
      tax = 174060000 + (taxBase - 500000000) * 0.42;
    } else {
      tax = 384060000 + (taxBase - 1000000000) * 0.45;
    }

    // 연분연승법 적용
    tax = (tax * workYears) / 12;

    // 지방소득세 (소득세의 10%)
    const localTax = tax * 0.1;

    // 실수령액
    const netAmount = retirementPay - tax - localTax;

    setResult({
      workDays,
      workYears,
      workMonths,
      averageWage: Math.floor(averageWage),
      retirementPay,
      tax: Math.floor(tax),
      localTax: Math.floor(localTax),
      netAmount: Math.floor(netAmount),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            💰 퇴직금 계산기
          </h1>
          <p className="text-gray-600">
            근속기간과 평균임금으로 예상 퇴직금을 계산해보세요
          </p>
        </div>

        {/* 입력 폼 */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-center text-emerald-700">
              📊 퇴직금 계산
            </CardTitle>
            <CardDescription className="text-center">
              입사일, 퇴직일, 급여 정보를 입력하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 날짜 입력 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  입사일
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  퇴직일
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* 급여 정보 입력 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                퇴직 전 3개월 급여 총액
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="예: 10,500,000 (3개월 합계)"
                  value={monthlyAverage}
                  onChange={(e) =>
                    handleInputChange(e.target.value, setMonthlyAverage)
                  }
                  className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-right"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  원
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                ※ 월급 × 3개월 합계 금액을 입력하세요
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                연간 상여금 총액
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="예: 7,000,000"
                  value={yearlyBonus}
                  onChange={(e) =>
                    handleInputChange(e.target.value, setYearlyBonus)
                  }
                  className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-right"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  원
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                연차 수당
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="예: 1,500,000"
                  value={annualLeave}
                  onChange={(e) =>
                    handleInputChange(e.target.value, setAnnualLeave)
                  }
                  className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-right"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  원
                </span>
              </div>
            </div>

            {/* 계산 버튼 */}
            <Button
              onClick={calculateRetirement}
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              퇴직금 계산하기
            </Button>
          </CardContent>
        </Card>

        {/* 결과 표시 */}
        {result && (
          <Card className="mb-4 bg-emerald-50 border-emerald-200">
            <CardHeader>
              <CardTitle className="text-center text-emerald-700">
                💵 계산 결과
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">근속기간</span>
                  <span className="font-semibold">
                    {result.workYears}년 {result.workMonths}개월 (
                    {result.workDays}일)
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">평균임금 (일)</span>
                  <span className="font-semibold">
                    {result.averageWage.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">퇴직금</span>
                  <span className="font-bold text-lg text-emerald-600">
                    {result.retirementPay.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">퇴직소득세</span>
                  <span className="text-red-600">
                    -{result.tax.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">지방소득세</span>
                  <span className="text-red-600">
                    -{result.localTax.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between py-3 bg-emerald-100 px-3 rounded-lg">
                  <span className="font-semibold">실수령액</span>
                  <span className="font-bold text-xl text-emerald-700">
                    {result.netAmount.toLocaleString()}원
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ 계산 공식: 평균임금 × 30일 × (근속일수÷365)
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  ※ 실제 퇴직금은 회사 규정에 따라 달라질 수 있습니다
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 안내사항 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-gray-700">
              📌 퇴직금 안내
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-600">
            <p>• 근속기간 1년 이상부터 퇴직금이 지급됩니다</p>
            <p>• 평균임금은 퇴직 전 3개월간의 임금 총액을 기준으로 합니다</p>
            <p>• 상여금과 연차수당도 평균임금에 포함됩니다</p>
            <p>• 퇴직소득세는 근속연수에 따라 공제액이 달라집니다</p>
            <p>• 실제 세금은 개인별 상황에 따라 차이가 있을 수 있습니다</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
