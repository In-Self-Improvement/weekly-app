"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// 최대공약수 구하기
const gcd = (a: number, b: number): number => {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
};

// 분수 간소화
const simplifyFraction = (num: number, den: number) => {
  if (den === 0) return { numerator: 0, denominator: 1 };

  const commonDivisor = gcd(num, den);
  let numerator = num / commonDivisor;
  let denominator = den / commonDivisor;

  // 분모가 음수일 경우 분자로 이동
  if (denominator < 0) {
    numerator = -numerator;
    denominator = -denominator;
  }

  return { numerator, denominator };
};

// 분수 계산 함수들
const addFractions = (
  num1: number,
  den1: number,
  num2: number,
  den2: number
) => {
  const numerator = num1 * den2 + num2 * den1;
  const denominator = den1 * den2;
  return simplifyFraction(numerator, denominator);
};

const subtractFractions = (
  num1: number,
  den1: number,
  num2: number,
  den2: number
) => {
  const numerator = num1 * den2 - num2 * den1;
  const denominator = den1 * den2;
  return simplifyFraction(numerator, denominator);
};

const multiplyFractions = (
  num1: number,
  den1: number,
  num2: number,
  den2: number
) => {
  const numerator = num1 * num2;
  const denominator = den1 * den2;
  return simplifyFraction(numerator, denominator);
};

const divideFractions = (
  num1: number,
  den1: number,
  num2: number,
  den2: number
) => {
  if (num2 === 0) return { numerator: 0, denominator: 1 };
  const numerator = num1 * den2;
  const denominator = den1 * num2;
  return simplifyFraction(numerator, denominator);
};

export default function FractionCalculator() {
  const [num1, setNum1] = useState("");
  const [den1, setDen1] = useState("");
  const [num2, setNum2] = useState("");
  const [den2, setDen2] = useState("");
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState<{
    numerator: number;
    denominator: number;
  } | null>(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    setError("");

    const numerator1 = parseInt(num1);
    const denominator1 = parseInt(den1);
    const numerator2 = parseInt(num2);
    const denominator2 = parseInt(den2);

    // 입력 검증
    if (
      isNaN(numerator1) ||
      isNaN(denominator1) ||
      isNaN(numerator2) ||
      isNaN(denominator2)
    ) {
      setError("모든 필드에 숫자를 입력해주세요.");
      return;
    }

    if (denominator1 === 0 || denominator2 === 0) {
      setError("분모는 0이 될 수 없습니다.");
      return;
    }

    if (operation === "÷" && numerator2 === 0) {
      setError("0으로 나눌 수 없습니다.");
      return;
    }

    let calculatedResult;
    switch (operation) {
      case "+":
        calculatedResult = addFractions(
          numerator1,
          denominator1,
          numerator2,
          denominator2
        );
        break;
      case "-":
        calculatedResult = subtractFractions(
          numerator1,
          denominator1,
          numerator2,
          denominator2
        );
        break;
      case "×":
        calculatedResult = multiplyFractions(
          numerator1,
          denominator1,
          numerator2,
          denominator2
        );
        break;
      case "÷":
        calculatedResult = divideFractions(
          numerator1,
          denominator1,
          numerator2,
          denominator2
        );
        break;
      default:
        return;
    }

    setResult(calculatedResult);
  };

  const handleReset = () => {
    setNum1("");
    setDen1("");
    setNum2("");
    setDen2("");
    setOperation("+");
    setResult(null);
    setError("");
  };

  const formatFraction = (numerator: number, denominator: number) => {
    if (denominator === 1) {
      return numerator.toString();
    }
    return `${numerator}/${denominator}`;
  };

  const convertToDecimal = (numerator: number, denominator: number) => {
    return (numerator / denominator).toFixed(6).replace(/\.?0+$/, "");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block mb-4 px-4 py-2 bg-background text-foreground rounded-lg hover:bg-white/20 transition-colors"
          >
            ← 홈으로
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ➗ 분수 계산기
          </h1>
          <p className="text-muted-foreground">
            분수의 사칙연산을 쉽게 계산하세요
          </p>
        </div>

        <Card className="mb-6 bg-card backdrop-blur border-border">
          <CardHeader>
            <CardTitle className="text-center text-foreground">
              분수 입력
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              각각의 분수를 입력해주세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 첫 번째 분수 */}
            <div className="text-center">
              <label className="block text-foreground mb-2 text-sm">
                첫 번째 분수
              </label>
              <div className="flex items-center justify-center space-x-2">
                <input
                  type="number"
                  inputMode="numeric"
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  placeholder="분자"
                  className="w-20 px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-center text-foreground placeholder:text-muted-foreground"
                />
                <span className="text-foreground text-xl">/</span>
                <input
                  type="number"
                  inputMode="numeric"
                  value={den1}
                  onChange={(e) => setDen1(e.target.value)}
                  placeholder="분모"
                  className="w-20 px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-center text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* 연산자 선택 */}
            <div className="text-center">
              <label className="block text-foreground mb-2 text-sm">연산</label>
              <div className="flex justify-center space-x-2">
                {["+", "-", "×", "÷"].map((op) => (
                  <Button
                    key={op}
                    variant={operation === op ? "default" : "outline"}
                    className={`w-12 h-12 text-lg ${
                      operation === op ? "" : "bg-transparent"
                    }`}
                    onClick={() => setOperation(op)}
                  >
                    {op}
                  </Button>
                ))}
              </div>
            </div>

            {/* 두 번째 분수 */}
            <div className="text-center">
              <label className="block text-foreground mb-2 text-sm">
                두 번째 분수
              </label>
              <div className="flex items-center justify-center space-x-2">
                <input
                  type="number"
                  inputMode="numeric"
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                  placeholder="분자"
                  className="w-20 px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-center text-foreground placeholder:text-muted-foreground"
                />
                <span className="text-foreground text-xl">/</span>
                <input
                  type="number"
                  inputMode="numeric"
                  value={den2}
                  onChange={(e) => setDen2(e.target.value)}
                  placeholder="분모"
                  className="w-20 px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-center text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* 계산 버튼 */}
            <div className="flex space-x-3">
              <Button
                onClick={handleCalculate}
                className="flex-1 h-12 text-lg font-semibold transition-all duration-300"
                disabled={!num1 || !den1 || !num2 || !den2}
              >
                계산하기
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="h-12 px-6"
              >
                초기화
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 오류 메시지 */}
        {error && (
          <Card className="mb-6 bg-destructive/10 border-destructive/20">
            <CardContent className="py-4">
              <p className="text-destructive text-center">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* 결과 */}
        {result && !error && (
          <Card className="mb-6 bg-background backdrop-blur border-input">
            <CardHeader>
              <CardTitle className="text-center text-foreground">
                📊 계산 결과
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-muted-foreground mb-2">입력한 식</p>
                  <p className="text-xl text-foreground">
                    {formatFraction(parseInt(num1), parseInt(den1))} {operation}{" "}
                    {formatFraction(parseInt(num2), parseInt(den2))}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-muted-foreground mb-2">분수 결과</p>
                  <p className="text-3xl font-bold text-foreground">
                    {formatFraction(result.numerator, result.denominator)}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-muted-foreground mb-2">소수 결과</p>
                  <p className="text-xl text-foreground">
                    {convertToDecimal(result.numerator, result.denominator)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 사용법 안내 */}
        <Card className="bg-card backdrop-blur border-border">
          <CardHeader>
            <CardTitle className="text-center text-foreground">
              📚 사용법
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• 각 분수의 분자와 분모를 입력하세요</p>
            <p>• 원하는 연산(+, -, ×, ÷)을 선택하세요</p>
            <p>• 결과는 자동으로 기약분수로 변환됩니다</p>
            <p>• 소수 형태의 결과도 함께 제공됩니다</p>
            <p>• 분모는 0이 될 수 없습니다</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
