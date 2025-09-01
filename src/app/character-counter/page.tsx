"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CountResult {
  charactersWithSpaces: number;
  charactersWithoutSpaces: number;
  lines: number;
  paragraphs: number;
  manuscriptPages: number;
}

export default function CharacterCounterPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<CountResult | null>(null);

  const calculateCount = useCallback(() => {
    if (!text.trim()) {
      setResult(null);
      return;
    }

    // 문자수 (공백 포함)
    const charactersWithSpaces = text.length;

    // 문자수 (공백 제외)
    const charactersWithoutSpaces = text.replace(/\s/g, "").length;

    // 행수 - 줄바꿈으로 분리
    const lines = text.split("\n").length;

    // 단락수 - 연속된 빈 줄로 구분되는 텍스트 블록
    const paragraphs = text
      .split(/\n\s*\n/)
      .filter((paragraph) => paragraph.trim().length > 0).length;

    // 원고지 매수 (400글자 기준)
    const manuscriptPages = Math.ceil(charactersWithoutSpaces / 400);

    setResult({
      charactersWithSpaces,
      charactersWithoutSpaces,
      lines,
      paragraphs,
      manuscriptPages,
    });
  }, [text]);

  const clearText = () => {
    setText("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            📝 글자수 세기
          </h1>
          <p className="text-muted-foreground text-lg">
            텍스트의 글자수, 단어수, 문단수를 정확하게 계산하세요
          </p>
        </div>

        {/* 메인 입력 영역 */}
        <Card className="mb-6 ">
          <CardHeader>
            <CardTitle className="text-center text-foreground text-xl">
              ✏️ 텍스트 입력
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="여기에 글자수를 세고 싶은 텍스트를 입력하세요...

예시:
안녕하세요.
글자수 계산기입니다.

여러 줄과 문단도 정확하게 계산됩니다."
              className="w-full h-64 px-4 py-3 bg-gray-900 text-foreground border border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base leading-relaxed"
              style={{ fontFamily: "monospace" }}
            />

            <div className="flex gap-3 justify-center flex-wrap">
              <Button onClick={calculateCount} className="px-8 py-3">
                📊 글자수 계산하기
              </Button>

              <Button
                onClick={clearText}
                variant="outline"
                className="px-6 py-3 transition-colors duration-300"
              >
                🗑️ 초기화
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 결과 영역 */}
        {result && (
          <Card className="mb-6 ">
            <CardHeader>
              <CardTitle className="text-foreground text-xl">
                📈 계산 결과
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* 문자수 (공백포함) */}
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                  <div className="text-gray-400 text-sm mb-1">
                    ■ 문자수(공백포함)
                  </div>
                  <div className="text-2xl font-bold text-blue-400">
                    {result.charactersWithSpaces.toLocaleString()}
                  </div>
                </div>

                {/* 문자수 (공백제외) */}
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                  <div className="text-gray-400 text-sm mb-1">
                    ■ 문자수(공백제외)
                  </div>
                  <div className="text-2xl font-bold text-green-400">
                    {result.charactersWithoutSpaces.toLocaleString()}
                  </div>
                </div>

                {/* 행수 */}
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                  <div className="text-gray-400 text-sm mb-1">■ 행수</div>
                  <div className="text-2xl font-bold text-yellow-400">
                    {result.lines.toLocaleString()}
                  </div>
                </div>

                {/* 단락수 */}
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-600">
                  <div className="text-gray-400 text-sm mb-1">■ 단락수</div>
                  <div className="text-2xl font-bold text-purple-400">
                    {result.paragraphs.toLocaleString()}
                  </div>
                </div>

                {/* 원고지 매수 */}
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-600 md:col-span-2 lg:col-span-2">
                  <div className="text-gray-400 text-sm mb-1">
                    ■ 원고용지매수(400글자)
                  </div>
                  <div className="text-2xl font-bold text-red-400">
                    {result.manuscriptPages.toLocaleString()}매
                  </div>
                  <div className="text-muted-foreground text-xs mt-1">
                    * 공백 제외 글자수 ÷ 400으로 계산
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 사용 방법 */}
        <Card className="mb-6 ">
          <CardHeader>
            <CardTitle className="text-foreground text-xl">
              💡 사용 방법
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">1.</span>
              <span>
                위 텍스트 상자에 글자수를 세고 싶은 내용을 입력하세요.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">2.</span>
              <span>
                &quot;글자수 계산하기&quot; 버튼을 클릭하면 즉시 결과를 확인할
                수 있습니다.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-400 font-bold">3.</span>
              <span>결과는 즉시 화면에 표시되어 쉽게 확인할 수 있습니다.</span>
            </div>
          </CardContent>
        </Card>

        {/* 기능 설명 */}
        <Card className="">
          <CardHeader>
            <CardTitle className="text-foreground text-xl">
              🔍 계산 항목 설명
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-blue-400 mb-1">
                    문자수(공백포함)
                  </h4>
                  <p className="text-sm">
                    스페이스, 탭, 줄바꿈을 포함한 모든 문자의 개수
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-400 mb-1">
                    문자수(공백제외)
                  </h4>
                  <p className="text-sm">공백을 제외한 실제 글자의 개수</p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-1">행수</h4>
                  <p className="text-sm">줄바꿈으로 구분되는 줄의 개수</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-purple-400 mb-1">단락수</h4>
                  <p className="text-sm">빈 줄로 구분되는 문단의 개수</p>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-1">
                    원고용지매수
                  </h4>
                  <p className="text-sm">
                    400자 원고지 기준 매수 (공백 제외 글자수 ÷ 400)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
