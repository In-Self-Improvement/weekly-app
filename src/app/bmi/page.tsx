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

  const getBMICategory = (bmi: number): Omit<BMIResult, "bmi"> => {
    if (bmi < 18.5) {
      return {
        category: "저체중",
        description: "정상 체중보다 낮습니다",
        color: "text-blue-600",
        bgColor: "bg-blue-50 border-blue-200",
        advice: [
          "균형 잡힌 식단으로 건강한 체중 증가가 필요합니다",
          "단백질과 건강한 지방을 충분히 섭취하세요",
          "전문의와 상담을 받아보시기 바랍니다",
        ],
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
          "건강한 생활습관을 유지하시기 바랍니다",
        ],
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
          "식단 조절과 함께 건강한 생활습관을 만들어보세요",
        ],
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
          "식단 조절과 규칙적인 운동이 중요합니다",
        ],
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
          "건강상 위험이 높으므로 전문적인 도움을 받으세요",
        ],
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

    if (
      isNaN(heightNum) ||
      isNaN(weightNum) ||
      heightNum <= 0 ||
      weightNum <= 0
    ) {
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
      ...categoryData,
    });
  };

  const resetForm = () => {
    setHeight("");
    setWeight("");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            BMI 계산기
          </h1>
          <p className="text-muted-foreground">
            키와 몸무게를 입력하여 체질량지수(BMI)를 계산하고 건강 상태를
            확인하세요
          </p>
        </div>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-center text-primary">
              📏 정보 입력
            </CardTitle>
            <CardDescription className="text-center">
              정확한 키와 몸무게를 입력해주세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label
                htmlFor="height"
                className="block text-sm font-medium text-foreground mb-2"
              >
                키 (cm)
              </label>
              <input
                id="height"
                type="number"
                inputMode="decimal"
                placeholder="예: 170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-center text-lg bg-background text-foreground"
              />
            </div>

            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-foreground mb-2"
              >
                몸무게 (kg)
              </label>
              <input
                id="weight"
                type="number"
                inputMode="decimal"
                placeholder="예: 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-center text-lg bg-background text-foreground"
              />
            </div>

            {error && (
              <div className="text-destructive text-sm text-center p-2 bg-destructive/10 rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={calculateBMI}
                className="flex-1 h-12 text-lg font-semibold"
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
              <CardDescription
                className={`text-lg font-semibold ${result.color}`}
              >
                {result.category}
              </CardDescription>
              <p className="text-sm text-gray-600 mt-2">{result.description}</p>
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
                <div className="text-xs text-muted-foreground text-center">
                  <p className="mb-1">
                    📊 BMI 기준 (세계보건기구 아시아-태평양 기준)
                  </p>
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

        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-sm text-muted-foreground">
              <p className="mb-2">⚠️ 주의사항</p>
              <p className="text-xs">
                BMI는 참고용이며, 근육량, 골격, 나이 등을 고려하지 않습니다.
                정확한 건강 상태는 전문의와 상담하시기 바랍니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 상세 설명 및 가이드 */}
        <div className="mt-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-rose-700 flex items-center justify-center gap-2">
                📏 BMI란 무엇인가요?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  📊 체질량지수 (Body Mass Index)
                </h3>
                <p className="text-gray-600 text-sm">
                  BMI는 신장과 체중을 이용하여 지방의 양을 추정하는 비만
                  측정법입니다. 세계보건기구(WHO)에서 제시한 국제적 기준으로
                  건강상태를 평가하는 지표입니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  🧮 계산 공식
                </h3>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                  <p className="text-center text-lg font-mono text-purple-800">
                    BMI = 체중(kg) ÷ 신장(m)²
                  </p>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    예: 키 170cm, 체중 65kg → 65 ÷ 1.7² = 22.5
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-rose-700">
                📋 BMI 분류 기준
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-blue-800">저체중</h3>
                    <span className="text-blue-600 font-bold">18.5 미만</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    체중이 부족한 상태입니다. 영양 상태를 점검하고 균형 잡힌
                    식단과 적절한 운동이 필요합니다.
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-green-800">정상 체중</h3>
                    <span className="text-green-600 font-bold">
                      18.5 - 22.9
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    건강한 체중 범위입니다. 현재 상태를 유지하기 위해 규칙적인
                    운동과 균형 잡힌 식단을 지속하세요.
                  </p>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-yellow-800">과체중</h3>
                    <span className="text-yellow-600 font-bold">
                      23.0 - 24.9
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    정상보다 약간 높은 상태입니다. 식단 조절과 운동량 증가를
                    통해 체중 관리가 필요합니다.
                  </p>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-orange-800">
                      비만 1단계
                    </h3>
                    <span className="text-orange-600 font-bold">
                      25.0 - 29.9
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    건강에 영향을 줄 수 있는 상태입니다. 체계적인 식단 관리와
                    운동 계획이 필요합니다.
                  </p>
                </div>

                <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-red-800">고도 비만</h3>
                    <span className="text-red-600 font-bold">30.0 이상</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    각종 질병의 위험이 높은 상태입니다. 전문의와 상담하여
                    체계적인 관리가 필요합니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-rose-700">
                💡 건강한 체중 관리 방법
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  🍎 균형 잡힌 식단
                </h3>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• 규칙적인 식사 시간 유지하기</li>
                  <li>• 다양한 영양소를 골고루 섭취하기</li>
                  <li>• 과식하지 않고 적정량 먹기</li>
                  <li>• 물을 충분히 마시기 (하루 1.5-2L)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  🏃‍♂️ 규칙적인 운동
                </h3>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• 주 3-5회, 30분 이상 유산소 운동</li>
                  <li>• 근력 운동으로 기초대사량 증가</li>
                  <li>• 일상 활동량 늘리기 (계단 이용, 걷기)</li>
                  <li>• 자신에게 맞는 운동 강도 선택</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  😴 충분한 휴식
                </h3>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• 하루 7-8시간 충분한 수면</li>
                  <li>• 스트레스 관리하기</li>
                  <li>• 규칙적인 생활 리듬 유지</li>
                  <li>• 금연, 금주 등 건강한 생활습관</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-rose-700">
                🎯 체중별 목표 설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  📉 체중 감량이 필요한 경우
                </h3>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• 주 0.5-1kg씩 천천히 감량</li>
                  <li>• 극단적인 다이어트는 피하기</li>
                  <li>• 칼로리 섭취량을 점진적으로 줄이기</li>
                  <li>• 운동과 식단 조절을 병행하기</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  📈 체중 증량이 필요한 경우
                </h3>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• 건강한 방법으로 체중 늘리기</li>
                  <li>• 단백질과 좋은 지방 섭취 늘리기</li>
                  <li>• 근력 운동으로 근육량 증가</li>
                  <li>• 소량씩 자주 먹기</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-rose-700">
                ❓ 자주 묻는 질문
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Q. BMI만으로 건강을 판단할 수 있나요?
                </h3>
                <p className="text-gray-600 text-sm">
                  A. BMI는 참고 지표일 뿐입니다. 근육량, 골격, 나이, 성별 등을
                  고려하지 않으므로 정확한 건강 상태는 전문의와 상담하시기
                  바랍니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Q. 아시아인 기준이 다른 이유는?
                </h3>
                <p className="text-gray-600 text-sm">
                  A. 아시아인은 서구인에 비해 같은 BMI에서도 체지방률이 높고
                  내장지방이 많아 질병 위험도가 높습니다. 따라서 더 낮은 기준을
                  적용합니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Q. 임신 중에도 BMI를 사용할 수 있나요?
                </h3>
                <p className="text-gray-600 text-sm">
                  A. 임신 중에는 BMI 기준이 다르며, 임신 전 체중을 기준으로 적정
                  체중 증가량을 산부인과 전문의와 상담하여 결정하는 것이
                  좋습니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
