"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StockAverageCalculator() {
  const [firstPrice, setFirstPrice] = useState("");
  const [firstQuantity, setFirstQuantity] = useState("");
  const [secondPrice, setSecondPrice] = useState("");
  const [secondQuantity, setSecondQuantity] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [result, setResult] = useState<{
    totalCost: number;
    totalQuantity: number;
    averagePrice: number;
    profitLossPercentage?: number;
    currentPrice?: number;
  } | null>(null);

  // 자동 계산 함수
  const calculateAverage = useCallback(() => {
    const price1 = parseFloat(firstPrice);
    const quantity1 = parseFloat(firstQuantity);
    const price2 = parseFloat(secondPrice);
    const quantity2 = parseFloat(secondQuantity);

    // 최소 하나의 완전한 매수 정보가 있어야 함
    const validPurchases = [];
    if (!isNaN(price1) && !isNaN(quantity1) && price1 > 0 && quantity1 > 0) {
      validPurchases.push({ price: price1, quantity: quantity1 });
    }
    if (!isNaN(price2) && !isNaN(quantity2) && price2 > 0 && quantity2 > 0) {
      validPurchases.push({ price: price2, quantity: quantity2 });
    }

    if (validPurchases.length === 0) {
      setResult(null);
      return;
    }

    const totalCost = validPurchases.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );
    const totalQuantity = validPurchases.reduce(
      (sum, p) => sum + p.quantity,
      0
    );
    const averagePrice = totalCost / totalQuantity;

    const currentPriceNum = parseFloat(currentPrice);
    let profitLossPercentage = undefined;
    let currentPriceValue = undefined;

    if (!isNaN(currentPriceNum) && currentPriceNum > 0) {
      profitLossPercentage =
        ((currentPriceNum - averagePrice) / averagePrice) * 100;
      currentPriceValue = currentPriceNum;
    }

    setResult({
      totalCost,
      totalQuantity,
      averagePrice,
      profitLossPercentage,
      currentPrice: currentPriceValue,
    });
  }, [firstPrice, firstQuantity, secondPrice, secondQuantity, currentPrice]);

  // 입력값이 변경될 때마다 자동 계산
  useEffect(() => {
    calculateAverage();
  }, [calculateAverage]);

  const reset = () => {
    setFirstPrice("");
    setFirstQuantity("");
    setSecondPrice("");
    setSecondQuantity("");
    setCurrentPrice("");
    setResult(null);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(Math.round(num * 100) / 100);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(Math.round(num));
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            📈 물타기 계산기
          </h1>
          <p className="text-muted-foreground">
            주식/코인 평균 매수가를 계산해보세요
          </p>
        </div>

        <Card className="mb-4 ">
          <CardHeader>
            <CardTitle className="text-center text-primary">
              📊 매수 정보 입력
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              두 번의 매수 정보를 입력하면 자동으로 계산됩니다
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="text-sm font-medium text-primary mb-2">
                1차 매수
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">
                    가격
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="매수가"
                    value={firstPrice}
                    onChange={(e) => setFirstPrice(e.target.value)}
                    className="w-full px-2 py-2 bg-background border border-input rounded text-center text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">
                    수량
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="수량"
                    value={firstQuantity}
                    onChange={(e) => setFirstQuantity(e.target.value)}
                    className="w-full px-2 py-2 bg-background border border-input rounded text-center text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <h4 className="text-sm font-medium text-primary mb-2">
                2차 매수 (물타기)
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">
                    가격
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="매수가"
                    value={secondPrice}
                    onChange={(e) => setSecondPrice(e.target.value)}
                    className="w-full px-2 py-2 bg-background border border-input rounded text-center text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">
                    수량
                  </label>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="수량"
                    value={secondQuantity}
                    onChange={(e) => setSecondQuantity(e.target.value)}
                    className="w-full px-2 py-2 bg-background border border-input rounded text-center text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <h4 className="text-sm font-medium text-primary mb-2">
                현재가 (수익률 계산용)
              </h4>
              <input
                type="number"
                inputMode="decimal"
                placeholder="현재 시세"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded text-center text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          </CardContent>
        </Card>

        <div className="mb-4">
          <Button variant="outline" onClick={reset} className="w-full h-10">
            초기화
          </Button>
        </div>

        {result && (
          <Card className="mb-4 ">
            <CardHeader>
              <CardTitle className="text-center text-foreground">
                📊 계산 결과
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-sm text-primary mb-1">총 투자금액</div>
                  <div className="text-lg font-bold text-foreground">
                    {formatCurrency(result.totalCost)}원
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-primary mb-1">총 보유수량</div>
                  <div className="text-lg font-bold text-foreground">
                    {formatNumber(result.totalQuantity)}개
                  </div>
                </div>
              </div>
              <div className="text-center pt-4 border-t border-border">
                <div className="text-sm text-primary mb-1">평균 매수가</div>
                <div className="text-2xl font-bold text-foreground">
                  {formatNumber(result.averagePrice)}원
                </div>
              </div>

              {result.currentPrice !== undefined &&
                result.profitLossPercentage !== undefined && (
                  <div className="text-center pt-4 border-t border-border">
                    <div className="text-sm text-primary mb-1">
                      현재가 기준 수익률
                    </div>
                    <div
                      className={`text-xl font-bold ${
                        result.profitLossPercentage >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {result.profitLossPercentage >= 0 ? "+" : ""}
                      {formatNumber(result.profitLossPercentage)}%
                    </div>
                    <div className="text-sm text-primary mt-1">
                      현재가: {formatNumber(result.currentPrice)}원
                    </div>
                  </div>
                )}
            </CardContent>
          </Card>
        )}

        <Card className="mb-4 ">
          <CardHeader>
            <CardTitle className="text-center text-primary">
              💡 물타기란?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-primary mb-2">물타기의 개념</h4>
              <p className="text-sm">
                주식이나 코인 가격이 하락했을 때 추가로 매수하여 평균 매수가를
                낮추는 투자 전략입니다.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-primary mb-2">계산 방법</h4>
              <p className="text-sm">
                <strong>평균 매수가 = 총 투자금액 ÷ 총 보유수량</strong>
                <br />각 매수의 (가격 × 수량)을 모두 더한 후 총 수량으로
                나눕니다.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-primary mb-2">주의사항</h4>
              <ul className="text-sm space-y-1">
                <li>• 하락 추세가 지속될 수 있습니다</li>
                <li>• 투자 자금 관리가 중요합니다</li>
                <li>• 기업/프로젝트 펀더멘털을 확인하세요</li>
                <li>• 손절매 기준을 미리 정하세요</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
