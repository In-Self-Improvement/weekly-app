"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ConversionPage() {
  const [pyeongValue, setPyeongValue] = useState<string>("");
  const [squareMeterValue, setSquareMeterValue] = useState<string>("");
  const [activeInput, setActiveInput] = useState<"pyeong" | "meter">("pyeong");

  // 1평 = 3.3058㎡
  const PYEONG_TO_SQM = 3.3058;

  const convertPyeongToSquareMeter = (pyeong: number): number => {
    return pyeong * PYEONG_TO_SQM;
  };

  const convertSquareMeterToPyeong = (sqm: number): number => {
    return sqm / PYEONG_TO_SQM;
  };

  const handlePyeongChange = (value: string) => {
    setPyeongValue(value);
    setActiveInput("pyeong");

    if (value === "" || isNaN(Number(value))) {
      setSquareMeterValue("");
      return;
    }

    const result = convertPyeongToSquareMeter(Number(value));
    setSquareMeterValue(result.toFixed(2));
  };

  const handleSquareMeterChange = (value: string) => {
    setSquareMeterValue(value);
    setActiveInput("meter");

    if (value === "" || isNaN(Number(value))) {
      setPyeongValue("");
      return;
    }

    const result = convertSquareMeterToPyeong(Number(value));
    setPyeongValue(result.toFixed(2));
  };

  const clearAll = () => {
    setPyeongValue("");
    setSquareMeterValue("");
    setActiveInput("pyeong");
  };

  const commonSizes = [
    { pyeong: 10, label: "10평 (소형)" },
    { pyeong: 15, label: "15평 (중소형)" },
    { pyeong: 20, label: "20평 (중형)" },
    { pyeong: 25, label: "25평" },
    { pyeong: 30, label: "30평 (중대형)" },
    { pyeong: 40, label: "40평 (대형)" },
    { pyeong: 50, label: "50평" },
  ];

  const handleQuickSelect = (pyeong: number) => {
    handlePyeongChange(pyeong.toString());
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            평수 ↔ 제곱미터 변환
          </h1>
          <p className="text-muted-foreground text-lg">
            평수와 제곱미터를 쉽게 변환해보세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 평수 입력 */}
          <Card className="p-6">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                평수
              </h2>
              <p className="text-muted-foreground text-sm">평 단위로 입력</p>
            </div>
            <div className="relative">
              <input
                type="number"
                value={pyeongValue}
                onChange={(e) => handlePyeongChange(e.target.value)}
                placeholder="평수를 입력하세요"
                className={`w-full text-3xl text-center border-2 rounded-lg px-4 py-6 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  activeInput === "pyeong"
                    ? "border-orange-500 bg-orange-50"
                    : "border-input bg-white"
                }`}
                step="0.01"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-muted-foreground font-semibold">
                평
              </span>
            </div>
          </Card>

          {/* 제곱미터 입력 */}
          <Card className="p-6">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                제곱미터
              </h2>
              <p className="text-muted-foreground text-sm">㎡ 단위로 입력</p>
            </div>
            <div className="relative">
              <input
                type="number"
                value={squareMeterValue}
                onChange={(e) => handleSquareMeterChange(e.target.value)}
                placeholder="제곱미터를 입력하세요"
                className={`w-full text-3xl text-center border-2 rounded-lg px-4 py-6 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  activeInput === "meter"
                    ? "border-red-500 bg-red-50"
                    : "border-input bg-white"
                }`}
                step="0.01"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-muted-foreground font-semibold">
                ㎡
              </span>
            </div>
          </Card>
        </div>

        {/* 변환 정보 */}
        <Card className="p-6 mb-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              변환 정보
            </h3>
            <p className="text-primary">
              <span className="font-semibold">1평 = 3.3058㎡</span> (약 3.3㎡)
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              평수는 한국 전통 면적 단위이며, 제곱미터는 국제표준 면적
              단위입니다.
            </p>
          </div>
        </Card>

        {/* 자주 사용하는 평수 */}
        <Card className="p-6 mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
            자주 사용하는 평수
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {commonSizes.map((size) => (
              <Button
                key={size.pyeong}
                onClick={() => handleQuickSelect(size.pyeong)}
                variant="outline"
                className="h-auto py-3 px-2 flex flex-col items-center hover:bg-orange-50 hover:border-orange-300"
              >
                <span className="font-semibold text-orange-600">
                  {size.pyeong}평
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  {convertPyeongToSquareMeter(size.pyeong).toFixed(1)}㎡
                </span>
              </Button>
            ))}
          </div>
        </Card>

        {/* 초기화 버튼 */}
        <div className="text-center mb-8">
          <Button
            onClick={clearAll}
            variant="outline"
            className="px-8 py-3 text-lg hover:bg-muted"
          >
            초기화
          </Button>
        </div>

        {/* 상세 설명 및 가이드 */}
        <div className="mt-8 space-y-6">
          <Card className="p-6">
            <div className="text-center text-orange-700 mb-4">
              <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                🏠 평수와 제곱미터란?
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  📐 평(坪)이란?
                </h3>
                <p className="text-muted-foreground text-sm">
                  평은 한국, 일본, 대만에서 사용하는 전통적인 면적 단위입니다.
                  1평은 약 3.3058㎡로, 사람 두 명이 누울 수 있는 크기의 다다미
                  2장 면적에 해당합니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  🌍 제곱미터(㎡)란?
                </h3>
                <p className="text-muted-foreground text-sm">
                  제곱미터는 국제표준(SI) 면적 단위로 전 세계에서 공통으로
                  사용됩니다. 1m × 1m의 정사각형 면적을 의미하며, 대부분의
                  국가에서 공식적으로 사용하는 단위입니다.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center text-orange-700 mb-4">
              <h2 className="text-xl font-bold">📏 변환 공식</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <div className="text-center">
                  <div className="text-lg font-mono text-orange-800 mb-2">
                    1평 = 3.3058㎡
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white p-3 rounded">
                      <strong>평 → ㎡:</strong> 평수 × 3.3058
                    </div>
                    <div className="bg-white p-3 rounded">
                      <strong>㎡ → 평:</strong> ㎡ ÷ 3.3058
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center text-orange-700 mb-4">
              <h2 className="text-xl font-bold">🏘️ 평수별 크기 감각</h2>
            </div>
            <div className="space-y-3">
              <div className="grid gap-3">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-blue-800">
                      10-15평 (소형)
                    </h3>
                    <span className="text-blue-600 font-bold">33-50㎡</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    원룸, 투룸 - 1~2인 거주에 적합한 크기
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-green-800">
                      20-25평 (중형)
                    </h3>
                    <span className="text-green-600 font-bold">66-83㎡</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    쓰리룸 - 신혼부부, 소가족에게 적합한 크기
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-purple-800">
                      30-40평 (중대형)
                    </h3>
                    <span className="text-purple-600 font-bold">99-132㎡</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    포룸 - 4인 가족이 여유롭게 거주할 수 있는 크기
                  </p>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-orange-800">
                      50평 이상 (대형)
                    </h3>
                    <span className="text-orange-600 font-bold">165㎡+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    대가족 또는 여유로운 주거 공간을 원하는 경우
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center text-orange-700 mb-4">
              <h2 className="text-xl font-bold">🏗️ 건축 관련 용어</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  📊 전용면적 vs 공급면적
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                  <li>
                    <strong>전용면적:</strong> 실제 거주 가능한 면적 (방, 거실,
                    주방, 화장실)
                  </li>
                  <li>
                    <strong>공급면적:</strong> 전용면적 + 공용면적 (계단, 복도,
                    관리실 등)
                  </li>
                  <li>
                    <strong>계약면적:</strong> 일반적으로 공급면적을 기준으로 함
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  🏠 용도별 면적 기준
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                  <li>
                    <strong>주거용:</strong> 평수로 표시하는 경우가 많음
                  </li>
                  <li>
                    <strong>상업용:</strong> 제곱미터로 표시하는 경우가 많음
                  </li>
                  <li>
                    <strong>공공시설:</strong> 제곱미터 사용
                  </li>
                  <li>
                    <strong>토지:</strong> 제곱미터 또는 ㎡ 사용
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center text-orange-700 mb-4">
              <h2 className="text-xl font-bold">💡 활용 팁</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  🏡 부동산 거래 시
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• 전용면적과 공급면적을 구분하여 확인</li>
                  <li>• 실제 사용 가능한 면적 계산</li>
                  <li>• 평당 가격과 ㎡당 가격 비교</li>
                  <li>• 건축법상 용적률, 건폐율 확인</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  🛋️ 인테리어 계획 시
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• 가구 배치를 위한 정확한 면적 측정</li>
                  <li>• 방별 면적 계산으로 적절한 가구 크기 선택</li>
                  <li>• 바닥재, 벽지 등 자재 소요량 계산</li>
                  <li>• 조명 계획을 위한 면적당 밝기 계산</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-center text-orange-700 mb-4">
              <h2 className="text-xl font-bold">❓ 자주 묻는 질문</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Q. 왜 평수를 사용하나요?
                </h3>
                <p className="text-muted-foreground text-sm">
                  A. 한국에서는 전통적으로 평수를 사용해왔고, 일상생활에서 크기
                  감각이 익숙하기 때문입니다. 하지만 공식 문서에서는 제곱미터를
                  함께 표기하는 추세입니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Q. 1평이 정확히 몇 ㎡인가요?
                </h3>
                <p className="text-muted-foreground text-sm">
                  A. 정확히는 3.3058㎡입니다. 일상적으로는 3.3㎡로 간략히
                  계산하기도 하지만, 정확한 계산이 필요한 경우 3.3058을
                  사용하세요.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Q. 아파트 평수는 어떻게 측정하나요?
                </h3>
                <p className="text-muted-foreground text-sm">
                  A. 아파트 평수는 일반적으로 공급면적 기준입니다. 전용면적은
                  실제 거주공간만을, 공급면적은 공용부분까지 포함한 면적입니다.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
