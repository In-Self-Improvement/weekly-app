"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, Info, Receipt, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function VatCalculatorPage() {
  const [amount, setAmount] = useState<string>("");
  const [mode, setMode] = useState<"add" | "subtract">("add");
  const [result, setResult] = useState<number | null>(null);
  const [vat, setVat] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateVat = () => {
    if (!amount || isNaN(Number(amount))) return;

    setLoading(true);

    // 애니메이션 효과를 위한 약간의 지연
    setTimeout(() => {
      const inputAmount = parseFloat(amount);

      if (mode === "add") {
        // 부가세 포함가격 계산 (공급가액에 부가세 10% 추가)
        const vatAmount = inputAmount * 0.1;
        const totalAmount = inputAmount + vatAmount;
        setVat(vatAmount);
        setResult(totalAmount);
      } else {
        // 부가세 제외가격 계산 (부가세 포함가격에서 공급가액 계산)
        const supplyAmount = inputAmount / 1.1;
        const vatAmount = inputAmount - supplyAmount;
        setVat(vatAmount);
        setResult(supplyAmount);
      }

      setLoading(false);
    }, 500);
  };

  const reset = () => {
    setAmount("");
    setResult(null);
    setVat(null);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(Math.round(num));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-4"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            홈으로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            <Calculator className="w-8 h-8 inline-block mr-2 mb-1" />
            부가세 계산기
          </h1>
          <p className="text-gray-300">
            공급가액과 부가세를 정확하게 계산하세요
          </p>
        </div>

        {/* 계산 모드 선택 */}
        <Card className="mb-6 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-center text-slate-100 text-lg">
              <Receipt className="w-5 h-5 inline-block mr-2" />
              계산 모드 선택
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={mode === "add" ? "default" : "outline"}
                onClick={() => setMode("add")}
                className={`h-12 ${mode === "add"}`}
              >
                부가세 포함
              </Button>
              <Button
                variant={mode === "subtract" ? "default" : "outline"}
                onClick={() => setMode("subtract")}
                className={`h-12 ${mode === "subtract"}`}
              >
                부가세 제외
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 금액 입력 */}
        <Card className="mb-6 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-center text-slate-100">
              {mode === "add" ? "🧮 공급가액 입력" : "💰 부가세 포함 금액 입력"}
            </CardTitle>
            <CardDescription className="text-center text-slate-400">
              {mode === "add"
                ? "부가세가 추가된 최종 금액을 계산합니다"
                : "부가세를 제외한 공급가액을 계산합니다"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="예: 100000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent text-center text-lg text-white placeholder-slate-400"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                  원
                </span>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={calculateVat}
                  disabled={!amount || loading}
                  className="flex-1 h-12 text-lg font-semibold"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      계산중...
                    </div>
                  ) : (
                    "계산하기"
                  )}
                </Button>

                <Button onClick={reset} variant="outline" className="h-12 px-4">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 계산 결과 */}
        {result !== null && vat !== null && (
          <Card className="mb-6 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-600 shadow-xl animate-fade-in">
            <CardHeader>
              <CardTitle className="text-center text-white">
                💸 계산 결과
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <div className="text-center">
                    <p className="text-slate-300 text-sm mb-1">
                      {mode === "add"
                        ? "입력한 공급가액"
                        : "입력한 부가세 포함 금액"}
                    </p>
                    <p className="text-white text-lg font-semibold">
                      {formatNumber(parseFloat(amount))}원
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-800">
                    <p className="text-blue-300 text-xs text-center mb-1">
                      부가세 (10%)
                    </p>
                    <p className="text-blue-100 text-sm font-semibold text-center">
                      {formatNumber(vat)}원
                    </p>
                  </div>

                  <div className="bg-emerald-900/30 p-3 rounded-lg border border-emerald-800">
                    <p className="text-emerald-300 text-xs text-center mb-1">
                      {mode === "add" ? "최종 금액" : "공급가액"}
                    </p>
                    <p className="text-emerald-100 text-sm font-semibold text-center">
                      {formatNumber(result)}원
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 부가세 정보 */}
        <Card className="mb-6 bg-slate-800/30 border-slate-700">
          <CardHeader>
            <CardTitle className="text-center text-slate-200 text-lg">
              <Info className="w-5 h-5 inline-block mr-2" />
              부가세 안내
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start">
                <span className="text-slate-400 mr-2">•</span>
                <span>
                  부가가치세(VAT)는 상품이나 서비스에 부과되는 간접세입니다
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-slate-400 mr-2">•</span>
                <span>한국의 부가세율은 10%입니다</span>
              </div>
              <div className="flex items-start">
                <span className="text-slate-400 mr-2">•</span>
                <span>부가세 포함가 = 공급가액 × 1.1</span>
              </div>
              <div className="flex items-start">
                <span className="text-slate-400 mr-2">•</span>
                <span>공급가액 = 부가세 포함가 ÷ 1.1</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 자주 사용하는 금액 */}
        <Card className="bg-slate-800/30 border-slate-700">
          <CardHeader>
            <CardTitle className="text-center text-slate-200 text-lg">
              💡 자주 사용하는 금액
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {[10000, 50000, 100000, 500000, 1000000, 5000000].map((value) => (
                <Button
                  key={value}
                  onClick={() => setAmount(value.toString())}
                  variant="outline"
                  className="text-xs h-8"
                >
                  {formatNumber(value)}원
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
