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
import { TrendingUp, Calculator, Calendar, PiggyBank } from "lucide-react";

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
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            💰 복리 계산기
          </h1>
          <p className="text-muted-foreground">
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
              <label className="block text-sm font-medium text-primary mb-2">
                초기 투자금 (원)
              </label>
              <input
                type="number"
                inputMode="decimal"
                placeholder="예: 1000000"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full px-3 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                연 명목이자율 (%)
              </label>
              <input
                type="number"
                inputMode="decimal"
                step="0.1"
                placeholder="예: 5.5"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full px-3 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center text-lg"
              />
              <p className="text-xs text-muted-foreground mt-1">
                복리 주기에 따라 실제 연 수익률이 달라집니다
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                투자 기간 (년)
              </label>
              <input
                type="number"
                inputMode="numeric"
                placeholder="예: 10"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                복리 주기
              </label>
              <select
                value={compound}
                onChange={(e) => setCompound(e.target.value)}
                className="w-full px-3 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center text-lg"
              >
                <option value="1">연복리 (1년에 1번)</option>
                <option value="2">반기복리 (1년에 2번)</option>
                <option value="4">분기복리 (1년에 4번)</option>
                <option value="12">월복리 (1년에 12번)</option>
                <option value="365">일복리 (1년에 365번)</option>
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                복리 주기가 짧을수록 더 많은 수익이 발생합니다
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                월 추가 투자금 (원){" "}
                <span className="text-muted-foreground">(선택사항)</span>
              </label>
              <input
                type="number"
                inputMode="decimal"
                placeholder="예: 100000"
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(e.target.value)}
                className="w-full px-3 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center text-lg"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={calculateCompoundInterest}
                disabled={!principal || !rate || !time}
                className="flex-1 h-12 text-lg font-semibold"
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
                  <div className="bg-muted rounded-lg p-3">
                    <div className="text-sm text-muted-foreground text-center">
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
                        실효이자율:{" "}
                        {(
                          (Math.pow(
                            1 +
                              parseFloat(rate || "0") /
                                100 /
                                parseFloat(compound || "1"),
                            parseFloat(compound || "1")
                          ) -
                            1) *
                          100
                        ).toFixed(3)}
                        %
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
                    <div className="font-semibold text-primary">수익률</div>
                    <div className="text-xl font-bold text-green-600">
                      {(
                        (result.totalInterest / result.principal) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-primary">투자 배수</div>
                    <div className="text-xl font-bold text-blue-600">
                      {(result.finalAmount / result.principal).toFixed(1)}배
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-primary">
                      연평균 수익
                    </div>
                    <div className="text-xl font-bold text-purple-600">
                      {formatMoney(result.totalInterest / parseFloat(time))}원
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-primary">
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
            <Card className="bg-white border border-border">
              <CardHeader>
                <CardTitle className="text-center text-primary flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  연도별 상세 내역
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {result.yearlyBreakdown.map((year) => (
                    <div
                      key={year.year}
                      className="border rounded-lg p-3 bg-muted"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-primary">
                          {year.year}년차
                        </span>
                        <span className="text-sm font-bold text-emerald-600">
                          {formatMoney(year.endAmount)}원
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
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
                <div className="space-y-3 text-sm text-primary">
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

        {/* 상세 설명 및 가이드 */}
        <div className="mt-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-emerald-700 flex items-center justify-center gap-2">
                💰 복리란 무엇인가요?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  🧮 복리의 개념
                </h3>
                <p className="text-muted-foreground text-sm">
                  복리는 원금에 이자를 더한 금액을 다시 원금으로 하여 이자를
                  계산하는 방식입니다. &apos;이자에 대한 이자&apos;가 발생하여
                  시간이 갈수록 기하급수적으로 증가합니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  ⚡ 아인슈타인의 명언
                </h3>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <p className="text-emerald-800 font-medium text-center italic">
                    &quot;복리는 세상에서 가장 강력한 힘이다&quot;
                  </p>
                  <p className="text-emerald-600 text-sm text-center mt-2">
                    - 알베르트 아인슈타인
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-emerald-700">
                📊 단리 vs 복리 비교
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📈</span>
                    <h3 className="font-semibold text-blue-800">
                      단리 (Simple Interest)
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    원금에 대해서만 이자를 계산하는 방식
                  </p>
                  <div className="bg-blue-100 p-3 rounded text-sm">
                    <strong>공식:</strong> 원금 × 이자율 × 기간
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    예: 100만원 × 5% × 10년 = 150만원
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🚀</span>
                    <h3 className="font-semibold text-emerald-800">
                      복리 (Compound Interest)
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    원금과 누적된 이자에 대해 이자를 계산하는 방식
                  </p>
                  <div className="bg-emerald-100 p-3 rounded text-sm">
                    <strong>공식:</strong> 원금 × (1 + 이자율)^기간
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    예: 100만원 × (1.05)^10 = 약 163만원
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-emerald-700">
                🎯 복리 효과 극대화 방법
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  ⏰ 시간의 힘
                </h3>
                <p className="text-muted-foreground text-sm mb-2">
                  복리의 가장 큰 장점은 시간입니다. 시간이 길수록 복리 효과가
                  기하급수적으로 증가합니다.
                </p>
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                  <div className="text-sm text-primary">
                    <strong>72의 법칙:</strong> 72 ÷ 이자율 = 원금이 2배가 되는
                    기간
                    <br />
                    예: 연 6% → 72 ÷ 6 = 12년
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  💰 정기적인 추가 투자
                </h3>
                <p className="text-muted-foreground text-sm">
                  매월 일정 금액을 추가로 투자하면 복리 효과가 더욱 커집니다.
                  이를 &apos;적립식 투자&apos;라고 하며, 달러 코스트 평균법의
                  효과도 얻을 수 있습니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  🔄 복리 계산 주기
                </h3>
                <p className="text-muted-foreground text-sm">
                  복리 계산 주기가 짧을수록 더 많은 수익을 얻을 수 있습니다.
                  연복리 &lt; 반기복리 &lt; 월복리 &lt; 일복리 순으로 수익이
                  증가합니다.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-emerald-700">
                📈 투자 상품별 복리 활용
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🏦</span>
                    <h3 className="font-semibold text-foreground">예적금</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• 안전한 투자처, 원금 보장</li>
                    <li>• 연 2-4% 수준의 이자율</li>
                    <li>• 월복리 또는 일복리 적용</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📊</span>
                    <h3 className="font-semibold text-foreground">펀드</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• 연평균 5-8% 수익률 기대</li>
                    <li>• 배당금 재투자를 통한 복리 효과</li>
                    <li>• 장기투자 시 인플레이션 헤지</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🏢</span>
                    <h3 className="font-semibold text-foreground">주식</h3>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• 배당주 재투자를 통한 복리</li>
                    <li>• 기업 성장과 함께 가치 상승</li>
                    <li>• 장기적으로 가장 높은 수익률</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-emerald-700">
                💡 복리 투자 전략
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  🎯 목표 설정
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• 구체적인 목표 금액과 기간 설정</li>
                  <li>• 현실적인 수익률 기대치 설정</li>
                  <li>• 인플레이션을 고려한 실질 수익률 계산</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  🔄 분산 투자
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• 여러 자산에 분산하여 리스크 관리</li>
                  <li>• 안전자산과 성장자산의 적절한 배분</li>
                  <li>• 정기적인 리밸런싱으로 포트폴리오 조정</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  ⏳ 장기 투자
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• 최소 10년 이상의 장기 투자 마인드</li>
                  <li>• 시장 변동성에 흔들리지 않는 원칙</li>
                  <li>• 중간 인출 없이 복리 효과 극대화</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-emerald-700">
                ❓ 자주 묻는 질문
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Q. 복리와 단리의 차이가 얼마나 클까요?
                </h3>
                <p className="text-muted-foreground text-sm">
                  A. 시간이 길수록 차이가 커집니다. 100만원을 연 5%로 20년 투자
                  시 단리는 200만원, 복리는 약 265만원으로 65만원 차이가 납니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Q. 세금은 어떻게 고려해야 하나요?
                </h3>
                <p className="text-muted-foreground text-sm">
                  A. 이자소득세, 배당소득세 등을 고려해야 합니다. ISA, 연금저축
                  등 세제혜택 상품을 활용하면 세후 수익률을 높일 수 있습니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Q. 인플레이션을 고려해야 하나요?
                </h3>
                <p className="text-muted-foreground text-sm">
                  A. 네, 실질 수익률을 계산해야 합니다. 명목 수익률에서
                  인플레이션율을 빼면 실질 구매력 증가를 알 수 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
