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
}

interface PercentResult {
  type: string;
  value: number;
  formatted: string;
  explanation: string;
}

export default function PercentPage() {
  const [selectedType, setSelectedType] = useState<string>("percentage");
  const [value1, setValue1] = useState<string>("");
  const [value2, setValue2] = useState<string>("");
  const [result, setResult] = useState<PercentResult | null>(null);
  const [error, setError] = useState<string>("");

  const calculationTypes: CalculationType[] = [
    {
      id: "percentage",
      name: "퍼센트 계산",
      description: "A의 B%는 얼마?",
      icon: "📊",
    },
    {
      id: "what_percent",
      name: "비율 계산",
      description: "A는 B의 몇 %?",
      icon: "📈",
    },
    {
      id: "increase",
      name: "증가율 계산",
      description: "A에서 B로 몇 % 증가?",
      icon: "📈",
    },
    {
      id: "decrease",
      name: "감소율 계산",
      description: "A에서 B로 몇 % 감소?",
      icon: "📉",
    },
    {
      id: "whole_from_percent",
      name: "전체값 계산",
      description: "A가 B%라면 전체는?",
      icon: "🔢",
    },
    {
      id: "tip",
      name: "팁 계산",
      description: "금액의 팁은 얼마?",
      icon: "💰",
    },
  ];

  const getPlaceholders = (type: string) => {
    switch (type) {
      case "percentage":
        return {
          placeholder1: "숫자 입력",
          placeholder2: "퍼센트 입력",
          label1: "값",
          label2: "퍼센트 (%)",
        };
      case "what_percent":
        return {
          placeholder1: "부분값",
          placeholder2: "전체값",
          label1: "부분값",
          label2: "전체값",
        };
      case "increase":
        return {
          placeholder1: "이전값",
          placeholder2: "현재값",
          label1: "이전값",
          label2: "현재값",
        };
      case "decrease":
        return {
          placeholder1: "이전값",
          placeholder2: "현재값",
          label1: "이전값",
          label2: "현재값",
        };
      case "whole_from_percent":
        return {
          placeholder1: "부분값",
          placeholder2: "퍼센트",
          label1: "부분값",
          label2: "퍼센트 (%)",
        };
      case "tip":
        return {
          placeholder1: "금액",
          placeholder2: "팁 비율",
          label1: "금액",
          label2: "팁 비율 (%)",
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

    switch (selectedType) {
      case "percentage":
        if (num2 < 0) {
          setError("퍼센트는 0 이상의 값을 입력해주세요.");
          return;
        }
        resultValue = (num1 * num2) / 100;
        formatted = resultValue.toLocaleString();
        explanation = `${num1.toLocaleString()}의 ${num2}%는 ${formatted}입니다.`;
        break;

      case "what_percent":
        if (num2 === 0) {
          setError("전체값은 0이 될 수 없습니다.");
          return;
        }
        resultValue = (num1 / num2) * 100;
        formatted = `${resultValue.toFixed(2)}%`;
        explanation = `${num1.toLocaleString()}은(는) ${num2.toLocaleString()}의 ${formatted}입니다.`;
        break;

      case "increase":
        if (num1 === 0) {
          setError("이전값은 0이 될 수 없습니다.");
          return;
        }
        if (num2 < num1) {
          setError("현재값이 이전값보다 작습니다. 감소율 계산을 사용해주세요.");
          return;
        }
        resultValue = ((num2 - num1) / num1) * 100;
        formatted = `${resultValue.toFixed(2)}%`;
        explanation = `${num1.toLocaleString()}에서 ${num2.toLocaleString()}로 ${formatted} 증가했습니다.`;
        break;

      case "decrease":
        if (num1 === 0) {
          setError("이전값은 0이 될 수 없습니다.");
          return;
        }
        if (num2 > num1) {
          setError("현재값이 이전값보다 큽니다. 증가율 계산을 사용해주세요.");
          return;
        }
        resultValue = ((num1 - num2) / num1) * 100;
        formatted = `${resultValue.toFixed(2)}%`;
        explanation = `${num1.toLocaleString()}에서 ${num2.toLocaleString()}로 ${formatted} 감소했습니다.`;
        break;

      case "whole_from_percent":
        if (num2 === 0) {
          setError("퍼센트는 0이 될 수 없습니다.");
          return;
        }
        resultValue = (num1 * 100) / num2;
        formatted = resultValue.toLocaleString();
        explanation = `${num1.toLocaleString()}이 ${num2}%라면, 전체값은 ${formatted}입니다.`;
        break;

      case "tip":
        if (num1 < 0 || num2 < 0) {
          setError("금액과 팁 비율은 0 이상의 값을 입력해주세요.");
          return;
        }
        const tipAmount = (num1 * num2) / 100;
        const totalAmount = num1 + tipAmount;
        resultValue = tipAmount;
        formatted = `팁: ${tipAmount.toLocaleString()}원`;
        explanation = `${num1.toLocaleString()}원의 ${num2}% 팁은 ${tipAmount.toLocaleString()}원이며, 총 금액은 ${totalAmount.toLocaleString()}원입니다.`;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black p-4">
      <div className="max-w-md mx-auto py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">퍼센트 계산기</h1>
          <p className="text-gray-300">
            다양한 퍼센트 계산을 간편하게 수행하세요
          </p>
        </div>

        {/* 계산 타입 선택 */}
        <Card className="mb-4 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-center text-white">
              🧮 계산 유형 선택
            </CardTitle>
            <CardDescription className="text-center text-gray-300">
              원하는 계산 유형을 선택해주세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {calculationTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelectedType(type.id);
                    resetForm();
                  }}
                  className={`p-3 rounded-lg border text-sm transition-all duration-200 ${
                    selectedType === type.id
                      ? "bg-slate-700 border-slate-500 text-white"
                      : "bg-gray-900 border-gray-600 text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <div className="text-lg mb-1">{type.icon}</div>
                  <div className="font-medium">{type.name}</div>
                  <div className="text-xs opacity-80">{type.description}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 입력 폼 */}
        <Card className="mb-4 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-center text-white">📝 값 입력</CardTitle>
            <CardDescription className="text-center text-gray-300">
              {calculationTypes.find((t) => t.id === selectedType)?.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label
                htmlFor="value1"
                className="block text-sm font-medium text-gray-300 mb-2"
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
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-center text-lg text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="value2"
                className="block text-sm font-medium text-gray-300 mb-2"
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
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-center text-lg text-white placeholder-gray-400"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center p-2 bg-red-900/30 rounded-lg border border-red-800">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={calculatePercent}
                className="flex-1 h-12 text-lg font-semibold bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-600 hover:to-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-white border border-gray-600"
              >
                계산하기
              </Button>

              {result && (
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="h-12 px-4 border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  초기화
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 결과 표시 */}
        {result && (
          <Card className="mb-4 bg-gray-800 border-gray-700">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white">
                📊 계산 결과
              </CardTitle>
              <CardDescription className="text-lg font-semibold text-gray-300">
                {result.formatted}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-600">
                <p className="text-gray-300 text-center">
                  {result.explanation}
                </p>
              </div>

              {selectedType === "tip" && (
                <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-slate-600">
                  <div className="text-sm text-gray-300 text-center">
                    💡 팁 가이드: 일반적으로 서비스에 따라 10-20%가 적절합니다.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* 퍼센트 기본 정보 */}
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-6">
            <div className="text-center text-sm text-gray-300">
              <p className="mb-2">📚 퍼센트 기본 개념</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-gray-900/50 rounded">
                  <span className="font-medium">50% = 0.5</span>
                </div>
                <div className="p-2 bg-gray-900/50 rounded">
                  <span className="font-medium">100% = 1.0</span>
                </div>
                <div className="p-2 bg-gray-900/50 rounded">
                  <span className="font-medium">25% = 1/4</span>
                </div>
                <div className="p-2 bg-gray-900/50 rounded">
                  <span className="font-medium">75% = 3/4</span>
                </div>
              </div>
              <p className="text-xs mt-3 text-gray-400">
                퍼센트(%)는 100을 기준으로 하는 비율을 나타냅니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
