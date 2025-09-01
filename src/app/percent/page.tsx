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

interface CalculationType {
  id: string;
  name: string;
  description: string;
  icon: string;
  example: string;
}

interface PercentResult {
  type: string;
  value: number;
  formatted: string;
  explanation: string;
  isIncrease?: boolean;
}

export default function PercentPage() {
  const [selectedType, setSelectedType] = useState<string>("change_rate");
  const [value1, setValue1] = useState<string>("");
  const [value2, setValue2] = useState<string>("");
  const [result, setResult] = useState<PercentResult | null>(null);
  const [error, setError] = useState<string>("");

  const calculationTypes: CalculationType[] = [
    {
      id: "change_rate",
      name: "증감률 계산",
      description: "이전값과 이후값 비교",
      icon: "📈",
      example: "100 → 110 = 10% 증가",
    },
    {
      id: "percentage_of",
      name: "비율 계산",
      description: "A는 B의 몇%?",
      icon: "🧮",
      example: "100 중 10은 10%",
    },
  ];

  const getPlaceholders = (type: string) => {
    switch (type) {
      case "change_rate":
        return {
          placeholder1: "100",
          placeholder2: "110",
          label1: "이전값",
          label2: "이후값",
        };
      case "percentage_of":
        return {
          placeholder1: "100",
          placeholder2: "10",
          label1: "전체값",
          label2: "부분값",
        };
      default:
        return {
          placeholder1: "값 1",
          placeholder2: "값 2",
          label1: "값 1",
          label2: "값 2",
        };
    }
  };

  const calculatePercent = () => {
    setError("");

    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);

    // 입력 검증
    if (!value1 || !value2) {
      setError("모든 값을 입력해주세요.");
      return;
    }

    if (isNaN(num1) || isNaN(num2)) {
      setError("올바른 숫자를 입력해주세요.");
      return;
    }

    let resultValue: number;
    let explanation: string;
    let formatted: string;
    let isIncrease: boolean | undefined;

    switch (selectedType) {
      case "change_rate":
        if (num1 === 0) {
          setError("이전값은 0이 될 수 없습니다.");
          return;
        }

        if (num2 > num1) {
          // 증가
          resultValue = ((num2 - num1) / num1) * 100;
          formatted = `${resultValue.toFixed(1)}% 증가`;
          explanation = `${num1.toLocaleString()}에서 ${num2.toLocaleString()}로 ${resultValue.toFixed(
            1
          )}% 증가했습니다.`;
          isIncrease = true;
        } else if (num2 < num1) {
          // 감소
          resultValue = ((num1 - num2) / num1) * 100;
          formatted = `${resultValue.toFixed(1)}% 감소`;
          explanation = `${num1.toLocaleString()}에서 ${num2.toLocaleString()}로 ${resultValue.toFixed(
            1
          )}% 감소했습니다.`;
          isIncrease = false;
        } else {
          // 변화 없음
          resultValue = 0;
          formatted = "변화 없음";
          explanation = `${num1.toLocaleString()}에서 ${num2.toLocaleString()}로 변화가 없습니다.`;
          isIncrease = undefined;
        }
        break;

      case "percentage_of":
        if (num1 === 0) {
          setError("전체값은 0이 될 수 없습니다.");
          return;
        }
        resultValue = (num2 / num1) * 100;
        formatted = `${resultValue.toFixed(1)}%`;
        explanation = `${num2.toLocaleString()}은(는) ${num1.toLocaleString()}의 ${formatted}입니다.`;
        break;

      default:
        setError("계산 타입을 선택해주세요.");
        return;
    }

    setResult({
      type: selectedType,
      value: resultValue,
      formatted,
      explanation,
      isIncrease,
    });
  };

  const resetForm = () => {
    setValue1("");
    setValue2("");
    setResult(null);
    setError("");
  };

  const placeholders = getPlaceholders(selectedType);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            퍼센트 계산기
          </h1>
          <p className="text-muted-foreground">
            간단한 퍼센트 계산을 도와드립니다
          </p>
        </div>

        {/* 계산 타입 선택 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center text-primary">
              🧮 계산 유형 선택
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {calculationTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelectedType(type.id);
                    resetForm();
                  }}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    selectedType === type.id
                      ? "bg-secondary border-secondary text-primary"
                      : "bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{type.icon}</span>
                        <span className="font-medium">{type.name}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {type.description}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {type.example}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 입력 폼 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center text-primary">
              📝 값 입력
            </CardTitle>
            <CardDescription className="text-center">
              {calculationTypes.find((t) => t.id === selectedType)?.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label
                htmlFor="value1"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {placeholders.label1}
              </label>
              <input
                id="value1"
                type="number"
                inputMode="decimal"
                placeholder={placeholders.placeholder1}
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg"
              />
            </div>

            <div>
              <label
                htmlFor="value2"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {placeholders.label2}
              </label>
              <input
                id="value2"
                type="number"
                inputMode="decimal"
                placeholder={placeholders.placeholder2}
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg"
              />
            </div>

            {error && (
              <div className="text-destructive text-sm text-center p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={calculatePercent}
                className="flex-1 h-12 text-lg font-semibold"
              >
                계산하기
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

        {/* 결과 표시 */}
        {result && (
          <Card
            className={`mb-6 ${
              result.type === "change_rate"
                ? result.isIncrease === true
                  ? "bg-green-50 border-green-200"
                  : result.isIncrease === false
                  ? "bg-red-50 border-red-200"
                  : "bg-muted border-border"
                : "bg-blue-50 border-blue-200"
            }`}
          >
            <CardHeader className="text-center">
              <CardTitle
                className={`text-2xl ${
                  result.type === "change_rate"
                    ? result.isIncrease === true
                      ? "text-green-700"
                      : result.isIncrease === false
                      ? "text-red-700"
                      : "text-gray-700"
                    : "text-blue-700"
                }`}
              >
                {result.type === "change_rate"
                  ? result.isIncrease === true
                    ? "📈"
                    : result.isIncrease === false
                    ? "📉"
                    : "➡️"
                  : "🧮"}{" "}
                계산 결과
              </CardTitle>
              <CardDescription className="text-lg font-semibold">
                {result.formatted}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-white/70 rounded-lg border border-border">
                <p className="text-gray-700 text-center">
                  {result.explanation}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 사용 팁 */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-sm text-gray-600">
              <p className="mb-2">💡 사용 팁</p>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-purple-50 rounded-lg border border-purple-100">
                  <span className="font-medium">증감률</span>: 주가, 매출 등의
                  변화율 계산
                </div>
                <div className="p-2 bg-pink-50 rounded-lg border border-pink-100">
                  <span className="font-medium">비율</span>: 점수, 달성률 등의
                  비율 계산
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
