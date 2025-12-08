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

type InterestType = "simple" | "compound";

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [compoundPeriod, setCompoundPeriod] = useState("1");
  const [interestType, setInterestType] = useState<InterestType>("simple");
  const [result, setResult] = useState<{
    simple?: number;
    compound?: number;
    totalAmount?: number;
    totalInterest?: number;
  } | null>(null);

  const calculateInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compoundPeriod);

    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r <= 0 || t <= 0) {
      alert("올바른 숫자를 입력해주세요.");
      return;
    }

    if (interestType === "simple") {
      // 단리 계산: I = P * r * t
      const simpleInterest = p * r * t;
      const totalAmount = p + simpleInterest;

      setResult({
        simple: simpleInterest,
        totalAmount: totalAmount,
        totalInterest: simpleInterest,
      });
    } else {
      // 복리 계산: A = P(1 + r/n)^(nt)
      if (isNaN(n) || n <= 0) {
        alert("올바른 복리 계산 주기를 입력해주세요.");
        return;
      }

      const totalAmount = p * Math.pow(1 + r / n, n * t);
      const compoundInterest = totalAmount - p;

      setResult({
        compound: compoundInterest,
        totalAmount: totalAmount,
        totalInterest: compoundInterest,
      });
    }
  };

  const reset = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setCompoundPeriod("1");
    setResult(null);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(Math.round(num));
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            💰 이자 계산기
          </h1>
          <p className="text-muted-foreground">
            단리와 복리 이자를 계산해보세요
          </p>
        </div>

        <Card className="mb-4 ">
          <CardHeader>
            <CardTitle className="text-center text-primary">
              💳 계산 유형 선택
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Button
                variant={interestType === "simple" ? "default" : "outline"}
                onClick={() => setInterestType("simple")}
                className={`h-12 ${interestType === "simple" ? "" : ""}`}
              >
                단리 계산
              </Button>
              <Button
                variant={interestType === "compound" ? "default" : "outline"}
                onClick={() => setInterestType("compound")}
                className={`h-12 ${interestType === "compound" ? "" : ""}`}
              >
                복리 계산
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4 ">
          <CardHeader>
            <CardTitle className="text-center text-primary">
              📊 정보 입력
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              {interestType === "simple" ? "단리 이자 계산" : "복리 이자 계산"}
              을 위한 정보를 입력하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                원금 (원)
              </label>
              <input
                type="number"
                inputMode="numeric"
                placeholder="예: 1000000"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-center text-lg text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                연이율 (%)
              </label>
              <input
                type="number"
                inputMode="decimal"
                placeholder="예: 5.5"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-center text-lg text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                기간 (년)
              </label>
              <input
                type="number"
                inputMode="decimal"
                placeholder="예: 3"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-center text-lg text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {interestType === "compound" && (
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  연간 복리 계산 횟수
                </label>
                <select
                  value={compoundPeriod}
                  onChange={(e) => setCompoundPeriod(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-center text-lg text-foreground"
                >
                  <option value="1">연 1회 (매년)</option>
                  <option value="2">연 2회 (반기)</option>
                  <option value="4">연 4회 (분기)</option>
                  <option value="12">연 12회 (매월)</option>
                  <option value="365">연 365회 (매일)</option>
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 mt-6">
              <Button
                onClick={calculateInterest}
                className="h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                계산하기
              </Button>
              <Button variant="outline" onClick={reset} className="h-12">
                초기화
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card className="mb-4 ">
            <CardHeader>
              <CardTitle className="text-center text-foreground">
                📈 계산 결과
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-sm text-primary mb-1">총 이자</div>
                <div className="text-2xl font-bold text-foreground">
                  {formatNumber(result.totalInterest!)}원
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-primary mb-1">
                  총 금액 (원금 + 이자)
                </div>
                <div className="text-xl font-semibold text-foreground">
                  {formatNumber(result.totalAmount!)}원
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-sm text-primary">원금</div>
                  <div className="text-lg font-medium text-foreground">
                    {formatNumber(parseFloat(principal))}원
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-primary">이자율</div>
                  <div className="text-lg font-medium text-foreground">
                    연 {rate}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-4 ">
          <CardHeader>
            <CardTitle className="text-center text-primary">
              💡 이자 계산 설명
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            {interestType === "simple" ? (
              <>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">
                    단리 이자란?
                  </h4>
                  <p className="text-sm">
                    원금에 대해서만 이자가 계산되는 방식입니다.
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">계산 공식</h4>
                  <p className="text-sm">
                    <strong>이자 = 원금 × 이자율 × 기간</strong>
                    <br />총 금액 = 원금 + 이자
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">
                    복리 이자란?
                  </h4>
                  <p className="text-sm">
                    원금과 이전에 발생한 이자를 합한 금액에 대해 이자가 계산되는
                    방식입니다.
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">계산 공식</h4>
                  <p className="text-sm">
                    <strong>
                      총 금액 = 원금 × (1 + 이자율/복리횟수)^(복리횟수×기간)
                    </strong>
                    <br />
                    이자 = 총 금액 - 원금
                  </p>
                </div>
              </>
            )}
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-primary mb-2">활용 예시</h4>
              <ul className="text-sm space-y-1">
                <li>• 예금 이자 계산</li>
                <li>• 대출 이자 계산</li>
                <li>• 투자 수익률 계산</li>
                <li>• 적금 만기 금액 계산</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
