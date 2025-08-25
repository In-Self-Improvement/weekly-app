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
import { Copy, Check } from "lucide-react";

export default function CaseConverter() {
  const [inputText, setInputText] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const capitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const conversions = [
    {
      title: "첫 글자만 대문자",
      description: "Capitalize",
      result: inputText ? capitalize(inputText) : "",
      color: "text-blue-600",
      bgColor: "bg-blue-50 border-blue-200",
    },
    {
      title: "모두 대문자",
      description: "UPPERCASE",
      result: inputText.toUpperCase(),
      color: "text-green-600",
      bgColor: "bg-green-50 border-green-200",
    },
    {
      title: "모두 소문자",
      description: "lowercase",
      result: inputText.toLowerCase(),
      color: "text-purple-600",
      bgColor: "bg-purple-50 border-purple-200",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 px-4 py-10">
      <div className="max-w-md mx-auto pt-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            영어 대소문자 변환기
          </h1>
          <p className="text-gray-600">
            영어 텍스트의 대소문자를 간편하게 변환하세요
          </p>
        </div>

        {/* 입력 영역 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center text-indigo-700">
              ✏️ 텍스트 입력
            </CardTitle>
            <CardDescription className="text-center">
              변환할 영어 텍스트를 입력하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              placeholder="영어 텍스트를 입력하세요..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full min-h-[120px] px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg resize-none"
            />
          </CardContent>
        </Card>

        {/* 변환 결과 */}
        {inputText && (
          <div className="space-y-4">
            {conversions.map((conversion, index) => (
              <Card key={index} className={`border ${conversion.bgColor}`}>
                <CardHeader className="pb-3">
                  <CardTitle className={`text-lg ${conversion.color}`}>
                    {conversion.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    {conversion.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 mb-3">
                    <p className="text-lg break-all">
                      {conversion.result || "결과가 없습니다"}
                    </p>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(conversion.result, index)}
                    className={`w-full h-10 transition-all duration-300 ${
                      copiedIndex === index
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-600 hover:bg-gray-700"
                    }`}
                    disabled={!conversion.result}
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        복사됨!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        복사하기
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* 안내 메시지 */}
        {!inputText && (
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="pt-6">
              <div className="text-center text-gray-500">
                <p className="mb-2">🔤</p>
                <p>텍스트를 입력하면 자동으로 변환 결과가 표시됩니다</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
