"use client";

import { useState } from "react";
import { CreditCard, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardData {
  id: string;
  name: string;
  purchaseAmount: number | null;
  interestFreeMonths: number | null;
  installmentMonths: number | null;
  interestRate: number | null;
}

interface CalculationResult {
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
}

export default function InstallmentCalculatorPage() {
  const [cards, setCards] = useState<CardData[]>([
    {
      id: "card1",
      name: "카드 1",
      purchaseAmount: 1000000,
      interestFreeMonths: 3,
      installmentMonths: 12,
      interestRate: 15,
    },
  ]);

  // 할부 계산 로직
  const calculateInstallment = (card: CardData): CalculationResult => {
    // null 값들을 기본값으로 처리
    const purchaseAmount = card.purchaseAmount ?? 0;
    const interestFreeMonths = card.interestFreeMonths ?? 0;
    const installmentMonths = card.installmentMonths ?? 12;
    const interestRate = card.interestRate ?? 15;

    if (interestFreeMonths >= installmentMonths) {
      // 무이자 기간이 할부 기간보다 길거나 같은 경우
      return {
        monthlyPayment: purchaseAmount / installmentMonths,
        totalInterest: 0,
        totalAmount: purchaseAmount,
      };
    }

    const monthlyRate = interestRate / 100 / 12;
    const interestMonths = installmentMonths - interestFreeMonths;

    // 무이자 기간 동안 상환할 금액
    const interestFreePayment =
      (purchaseAmount / installmentMonths) * interestFreeMonths;

    // 이자가 붙는 나머지 금액
    const remainingAmount = purchaseAmount - interestFreePayment;

    // 이자가 붙는 기간의 월 상환금 계산 (원리금균등상환)
    const interestMonthlyPayment =
      (remainingAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, interestMonths))) /
      (Math.pow(1 + monthlyRate, interestMonths) - 1);

    // 무이자 기간 월 상환금
    const freeMonthlyPayment = purchaseAmount / installmentMonths;

    // 전체 기간 평균 월 상환금
    const avgMonthlyPayment =
      (freeMonthlyPayment * interestFreeMonths +
        interestMonthlyPayment * interestMonths) /
      installmentMonths;

    // 총 이자
    const totalInterest =
      interestMonthlyPayment * interestMonths - remainingAmount;

    return {
      monthlyPayment: avgMonthlyPayment,
      totalInterest: totalInterest,
      totalAmount: purchaseAmount + totalInterest,
    };
  };

  // 카드 추가
  const addCard = () => {
    const newCard: CardData = {
      id: `card${Date.now()}`,
      name: `카드 ${cards.length + 1}`,
      purchaseAmount: null,
      interestFreeMonths: null,
      installmentMonths: null,
      interestRate: null,
    };
    setCards([...cards, newCard]);
  };

  // 카드 삭제
  const removeCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  // 카드 정보 업데이트
  const updateCard = (
    id: string,
    field: keyof CardData,
    value: string | number | null
  ) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    );
  };

  // 전체 합계 계산
  const totalSummary = cards.reduce(
    (acc, card) => {
      const result = calculateInstallment(card);
      return {
        totalPurchase: acc.totalPurchase + (card.purchaseAmount ?? 0),
        totalMonthly: acc.totalMonthly + result.monthlyPayment,
        totalInterest: acc.totalInterest + result.totalInterest,
        totalAmount: acc.totalAmount + result.totalAmount,
      };
    },
    { totalPurchase: 0, totalMonthly: 0, totalInterest: 0, totalAmount: 0 }
  );

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            💳 할부 계산기
          </h1>
          <p className="text-muted-foreground">
            여러 카드의 할부 조건을 비교하고 최적의 선택을 하세요
          </p>
        </div>

        {/* 카드 추가 버튼 */}
        <div className="mb-6">
          <Button
            onClick={addCard}
            className="w-full h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            카드 추가하기
          </Button>
        </div>

        {/* 카드 목록 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {cards.map((card) => {
            const result = calculateInstallment(card);

            return (
              <Card key={card.id}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 flex-1">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <input
                        type="text"
                        value={card.name}
                        onChange={(e) =>
                          updateCard(card.id, "name", e.target.value)
                        }
                        className="bg-transparent border-none text-foreground text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:bg-muted rounded px-2 py-1 flex-1"
                        placeholder="카드명을 입력하세요"
                      />
                    </div>
                    {cards.length > 1 && (
                      <Button
                        onClick={() => removeCard(card.id)}
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* 입력 필드들 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        구매금액 (원)
                      </label>
                      <input
                        type="number"
                        value={card.purchaseAmount ?? ""}
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? null
                              : parseInt(e.target.value);
                          updateCard(
                            card.id,
                            "purchaseAmount",
                            isNaN(value!) ? null : value
                          );
                        }}
                        className="w-full px-3 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="1000000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        무이자 기간 (개월)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={card.interestFreeMonths ?? ""}
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? null
                              : parseInt(e.target.value);
                          updateCard(
                            card.id,
                            "interestFreeMonths",
                            isNaN(value!) ? null : value
                          );
                        }}
                        className="w-full px-3 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        할부 기간 (개월)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={card.installmentMonths ?? ""}
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? null
                              : parseInt(e.target.value);
                          updateCard(
                            card.id,
                            "installmentMonths",
                            isNaN(value!) ? null : value
                          );
                        }}
                        className="w-full px-3 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="12"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        이자율 (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={card.interestRate ?? ""}
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? null
                              : parseFloat(e.target.value);
                          updateCard(
                            card.id,
                            "interestRate",
                            isNaN(value!) ? null : value
                          );
                        }}
                        className="w-full px-3 py-2 bg-background border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="15"
                      />
                    </div>
                  </div>

                  {/* 계산 결과 */}
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                    <h4 className="text-foreground font-semibold mb-3">
                      계산 결과
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          월 상환금:
                        </span>
                        <span className="text-primary font-semibold">
                          {result.monthlyPayment.toLocaleString()}원
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">총 이자:</span>
                        <span className="text-primary font-semibold">
                          {result.totalInterest.toLocaleString()}원
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          실제 총액:
                        </span>
                        <span className="text-foreground font-semibold">
                          {result.totalAmount.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 전체 합계 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-foreground text-xl">
              💰 전체 합계
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-muted-foreground text-sm mb-1">
                  전체 구매금액
                </div>
                <div className="text-foreground font-bold text-lg">
                  {totalSummary.totalPurchase.toLocaleString()}원
                </div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-muted-foreground text-sm mb-1">
                  월 총 상환금
                </div>
                <div className="text-primary font-bold text-lg">
                  {totalSummary.totalMonthly.toLocaleString()}원
                </div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-muted-foreground text-sm mb-1">
                  전체 총 이자
                </div>
                <div className="text-primary font-bold text-lg">
                  {totalSummary.totalInterest.toLocaleString()}원
                </div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-muted-foreground text-sm mb-1">
                  실제 총 지출
                </div>
                <div className="text-foreground font-bold text-lg">
                  {totalSummary.totalAmount.toLocaleString()}원
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
