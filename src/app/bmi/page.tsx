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

interface BMIResult {
  bmi: number;
  category: string;
  description: string;
  color: string;
  bgColor: string;
  advice: string[];
}

export default function BMIPage() {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [result, setResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState<string>("");

  const getBMICategory = (bmi: number): Omit<BMIResult, 'bmi'> => {
    if (bmi < 18.5) {
      return {
        category: "저체중",
        description: "정상 체중보다 낮습니다",
        color: "text-blue-600",
        bgColor: "bg-blue-50 border-blue-200",
        advice: [
          "균형 잡힌 식단으로 건강한 체중 증가가 필요합니다",
          "단백질과 건강한 지방을 충분히 섭취하세요",
          "전문의와 상담을 받아보시기 바랍니다"
        ]
      };
    } else if (bmi < 23) {
      return {
        category: "정상 체중",
        description: "건강한 체중입니다",
        color: "text-green-600",
        bgColor: "bg-green-50 border-green-200",
        advice: [
          "현재 체중을 유지하세요",
          "규칙적인 운동과 균형 잡힌 식단을 계속하세요",
          "건강한 생활습관을 유지하시기 바랍니다"
        ]
      };
    } else if (bmi < 25) {
      return {
        category: "과체중",
        description: "정상 체중보다 높습니다",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50 border-yellow-200",
        advice: [
          "적당한 체중 감량이 권장됩니다",
          "규칙적인 운동을 시작하세요",
          "식단 조절과 함께 건강한 생활습관을 만들어보세요"
        ]
      };
    } else if (bmi < 30) {
      return {
        category: "비만 1단계",
        description: "비만으로 분류됩니다",
        color: "text-orange-600",
        bgColor: "bg-orange-50 border-orange-200",
        advice: [
          "체중 감량이 필요합니다",
          "전문의와 상담하여 체계적인 관리를 받으세요",
          "식단 조절과 규칙적인 운동이 중요합니다"
        ]
      };
    } else {
      return {
        category: "비만 2단계",
        description: "고도비만으로 분류됩니다",
        color: "text-red-600",
        bgColor: "bg-red-50 border-red-200",
        advice: [
          "즉시 전문의와 상담이 필요합니다",
          "체계적인 치료와 관리가 중요합니다",
          "건강상 위험이 높으므로 전문적인 도움을 받으세요"
        ]
      };
    }
  };

  const calculateBMI = () => {
    setError("");
    
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    // 입력 검증
    if (!height || !weight) {
      setError("키와 몸무게를 모두 입력해주세요.");
      return;
    }

    if (isNaN(heightNum) || isNaN(weightNum) || heightNum <= 0 || weightNum <= 0) {
      setError("키와 몸무게는 0보다 큰 값을 입력해주세요.");
      return;
    }

    if (heightNum < 50 || heightNum > 250) {
      setError("키는 50cm ~ 250cm 사이의 값을 입력해주세요.");
      return;
    }

    if (weightNum < 10 || weightNum > 500) {
      setError("몸무게는 10kg ~ 500kg 사이의 값을 입력해주세요.");
      return;
    }

    // BMI 계산 (키를 미터로 변환)
    const heightInMeters = heightNum / 100;
    const bmi = weightNum / (heightInMeters * heightInMeters);
    
    const categoryData = getBMICategory(bmi);
    
    setResult({
      bmi: Number(bmi.toFixed(1)),
      ...categoryData
    });
  };

  const resetForm = () => {
    setHeight("");
    setWeight("");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            BMI 계산기
          </h1>
          <p className="text-gray-600">
            키와 몸무게를 입력하여 체질량지수(BMI)를 계산하고 건강 상태를 확인하세요
          </p>
        </div>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-center text-purple-700">
              📏 정보 입력
            </CardTitle>
            <CardDescription className="text-center">
              정확한 키와 몸무게를 입력해주세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
                키 (cm)
              </label>
              <input
                id="height"
                type="number"
                inputMode="decimal"
                placeholder="예: 170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg"
              />
            </div>
            
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                몸무게 (kg)
              </label>
              <input
                id="weight"
                type="number"
                inputMode="decimal"
                placeholder="예: 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center p-2 bg-red-50 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={calculateBMI}
                className="flex-1 h-12 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                BMI 계산하기
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
          <Card className={`mb-4 ${result.bgColor}`}>
            <CardHeader className="text-center">
              <CardTitle className={`text-2xl ${result.color}`}>
                BMI {result.bmi}
              </CardTitle>
              <CardDescription className={`text-lg font-semibold ${result.color}`}>
                {result.category}
              </CardDescription>
              <p className="text-sm text-gray-600 mt-2">
                {result.description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  💡 건강 관리 조언:
                </div>
                {result.advice.map((advice, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-3 bg-white/50 rounded-lg"
                  >
                    <span className="text-purple-500 mt-1">•</span>
                    <span className="text-gray-700 text-sm">{advice}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-3 bg-white/50 rounded-lg">
                <div className="text-xs text-gray-500 text-center">
                  <p className="mb-1">📊 BMI 기준 (세계보건기구 아시아-태평양 기준)</p>
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <span>저체중: 18.5 미만</span>
                    <span>정상: 18.5-22.9</span>
                    <span>과체중: 23-24.9</span>
                    <span>비만: 25 이상</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-gradient-to-r from-purple-100 to-pink-100">
          <CardContent className="pt-6">
            <div className="text-center text-sm text-gray-600">
              <p className="mb-2">⚠️ 주의사항</p>
              <p className="text-xs">
                BMI는 참고용이며, 근육량, 골격, 나이 등을 고려하지 않습니다. 
                정확한 건강 상태는 전문의와 상담하시기 바랍니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}