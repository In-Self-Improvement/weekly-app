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
import {
  TrendingUp,
  Calculator,
  Calendar,
  PiggyBank,
} from "lucide-react";

interface CalculationResult {
  principal: number;
  finalAmount: number;
  totalInterest: number;
  yearlyBreakdown: Array<{
    year: number;
    startAmount: number;
    interest: number;
    endAmount: number;
  }>;
}

export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [compound, setCompound] = useState("12"); // 월복리 기본값
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100; // 연 명목이자율
    const t = parseFloat(time);
    const n = parseFloat(compound); // 연간 복리 횟수
    const monthly = parseFloat(monthlyDeposit) || 0;

    if (!P || !r || !t || !n) return;

    const yearlyBreakdown = [];
    let currentAmount = P;

    for (let year = 1; year <= t; year++) {
      const startAmount = currentAmount;

      if (monthly > 0) {
        // 월 추가 투자금이 있는 경우
        // 복리 주기와 월 투자를 모두 고려한 정확한 계산
        const periodsPerYear = n;
        const ratePerPeriod = r / n; // 각 복리 주기당 이자율
        const monthsPerPeriod = 12 / n; // 각 복리 주기당 개월 수

        for (let period = 0; period < periodsPerYear; period++) {
          // 해당 복리 주기 동안 월 투자금 추가
          const monthlyDepositsInPeriod = Math.floor(monthsPerPeriod);
          currentAmount += monthly * monthlyDepositsInPeriod;

          // 복리 적용
          currentAmount = currentAmount * (1 + ratePerPeriod);
        }

        // 남은 월 투자금 처리 (복리 주기가 12의 약수가 아닌 경우)
        const remainingMonths = 12 % n;
        if (remainingMonths > 0) {
          currentAmount += monthly * remainingMonths;
        }
      } else {
        // 월 추가 투자금이 없는 경우 - 표준 복리 공식
        // A = P(1 + r/n)^n (1년간)
        currentAmount = currentAmount * Math.pow(1 + r / n, n);
      }

      const interest = currentAmount - startAmount - monthly * 12;

      yearlyBreakdown.push({
        year,
        startAmount,
        interest,
        endAmount: currentAmount,
      });
    }

    const finalAmount = currentAmount;
    const totalInterest = finalAmount - P - monthly * 12 * t;

    setResult({
      principal: P,
      finalAmount,
      totalInterest,
      yearlyBreakdown,
    });
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(Math.round(amount));
  };

  const reset = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setCompound("12");
    setMonthlyDeposit("");
    setResult(null);
  };

  const getCompoundFrequencyText = (freq: string) => {
    switch (freq) {
      case "1":
        return "연복리";
      case "2":
        return "반기복리";
      case "4":
        return "분기복리";
      case "12":
        return "월복리";
      case "365":
        return "일복리";
      default:
        return "월복리";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            💰 복리 계산기
          </h1>
          <p className="text-gray-600">
            투자의 마법, 복리 효과를 미리 체험해보세요
          </p>
        </div>

        {/* 입력 카드 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center text-emerald-700 flex items-center justify-center gap-2">
              <Calculator className="w-5 h-5" />
              투자 조건 입력
            </CardTitle>
            <CardDescription className="text-center">
              투자 조건을 입력하여 복리 효과를 계산해보세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                초기 투자금 (원)
              </label>
              <input
                type="number"
                inputMode="decimal"
                placeholder="예: 1000000"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                연 명목이자율 (%)
              </label>
              <input
                type="number"
                inputMode="decimal"
                step="0.1"
                placeholder="예: 5.5"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center text-lg"
              />
              <p className="text-xs text-gray-500 mt-1">
                복리 주기에 따라 실제 연 수익률이 달라집니다
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                투자 기간 (년)
              </label>
              <input
                type="number"
                inputMode="numeric"
                placeholder="예: 10"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                복리 주기
              </label>
              <select
                value={compound}
                onChange={(e) => setCompound(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center text-lg"
              >
                <option value="1">연복리 (1년에 1번)</option>
                <option value="2">반기복리 (1년에 2번)</option>
                <option value="4">분기복리 (1년에 4번)</option>
                <option value="12">월복리 (1년에 12번)</option>
                <option value="365">일복리 (1년에 365번)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                복리 주기가 짧을수록 더 많은 수익이 발생합니다
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                월 추가 투자금 (원){" "}
                <span className="text-gray-500">(선택사항)</span>
              </label>
              <input
                type="number"
                inputMode="decimal"
                placeholder="예: 100000"
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center text-lg"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={calculateCompoundInterest}
                disabled={!principal || !rate || !time}
                className="flex-1 h-12 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                계산하기
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
            {/* 요약 결과 */}
            <Card className="bg-white border border-emerald-200">
              <CardHeader>
                <CardTitle className="text-center text-emerald-700 flex items-center justify-center gap-2">
                  <PiggyBank className="w-5 h-5" />
                  투자 결과 요약
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="text-sm font-medium text-blue-700 mb-1">
                        초기 투자금
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {formatMoney(result.principal)}원
                      </div>
                    </div>

                    {parseFloat(monthlyDeposit) > 0 && (
                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <div className="text-sm font-medium text-purple-700 mb-1">
                          총 추가 투자금
                        </div>
                        <div className="text-2xl font-bold text-purple-600">
                          {formatMoney(
                            parseFloat(monthlyDeposit) * 12 * parseFloat(time)
                          )}
                          원
                        </div>
                      </div>
                    )}

                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-sm font-medium text-green-700 mb-1">
                        총 이자 수익
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatMoney(result.totalInterest)}원
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 text-center border-2 border-emerald-200">
                      <div className="text-sm font-medium text-emerald-700 mb-1">
                        최종 금액
                      </div>
                      <div className="text-3xl font-bold text-emerald-600">
                        {formatMoney(result.finalAmount)}원
                      </div>
                    </div>
                  </div>

                  {/* 투자 조건 요약 */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-600 text-center">
                      <div className="font-medium mb-1">투자 조건</div>
                      <div>
                        명목이자율 {rate}% · {time}년 ·{" "}
                        {getCompoundFrequencyText(compound)}
                        {parseFloat(monthlyDeposit) > 0 &&
                          ` · 월 ${formatMoney(
                            parseFloat(monthlyDeposit)
                          )}원 추가`}
                      </div>
                      <div className="text-xs text-emerald-600 mt-1">
                        실효이자율: {(
                          (Math.pow(
                            1 + parseFloat(rate || "0") / 100 / parseFloat(compound || "1"),
                            parseFloat(compound || "1")
                          ) - 1) * 100
                        ).toFixed(3)}%
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 투자 효과 분석 */}
            <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200">
              <CardHeader>
                <CardTitle className="text-center text-yellow-700">
                  📈 투자 효과 분석
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-700">수익률</div>
                    <div className="text-xl font-bold text-green-600">
                      {(
                        (result.totalInterest / result.principal) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-700">투자 배수</div>
                    <div className="text-xl font-bold text-blue-600">
                      {(result.finalAmount / result.principal).toFixed(1)}배
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-700">
                      연평균 수익
                    </div>
                    <div className="text-xl font-bold text-purple-600">
                      {formatMoney(result.totalInterest / parseFloat(time))}원
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-700">
                      월평균 수익
                    </div>
                    <div className="text-xl font-bold text-orange-600">
                      {formatMoney(
                        result.totalInterest / (parseFloat(time) * 12)
                      )}
                      원
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 연도별 상세 내역 */}
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-center text-gray-700 flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  연도별 상세 내역
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {result.yearlyBreakdown.map((year) => (
                    <div
                      key={year.year}
                      className="border rounded-lg p-3 bg-gray-50"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-700">
                          {year.year}년차
                        </span>
                        <span className="text-sm font-bold text-emerald-600">
                          {formatMoney(year.endAmount)}원
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                        <div>
                          <div className="font-medium">기초금액</div>
                          <div>{formatMoney(year.startAmount)}원</div>
                        </div>
                        <div>
                          <div className="font-medium">이자수익</div>
                          <div className="text-green-600">
                            +{formatMoney(year.interest)}원
                          </div>
                        </div>
                        <div>
                          <div className="font-medium">기말금액</div>
                          <div className="font-bold">
                            {formatMoney(year.endAmount)}원
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 복리 투자 팁 */}
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200">
              <CardHeader>
                <CardTitle className="text-center text-indigo-700">
                  💡 복리 투자 팁
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">•</span>
                    <span>
                      <strong>시간이 핵심:</strong> 복리는 시간이 길수록 효과가
                      극대화됩니다
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>
                      <strong>꾸준한 추가 투자:</strong> 매월 일정 금액을 추가
                      투자하면 더 큰 효과를 얻을 수 있습니다
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">•</span>
                    <span>
                      <strong>복리 주기:</strong> 복리 계산 주기가 짧을수록 더
                      많은 수익을 얻을 수 있습니다
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>
                      <strong>인내심:</strong> 중간에 인출하지 않고 장기간
                      투자하는 것이 중요합니다
                    </span>
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
