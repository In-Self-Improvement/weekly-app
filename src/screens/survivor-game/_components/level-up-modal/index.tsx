"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface UpgradeOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "weapon" | "stat" | "special";
}

interface LevelUpModalProps {
  isOpen: boolean;
  level: number;
  options: UpgradeOption[];
  onSelect: (option: UpgradeOption) => void;
}

export default function LevelUpModal({
  isOpen,
  level,
  options,
  onSelect,
}: LevelUpModalProps) {
  // 키보드 단축키 (1, 2, 3) 지원
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === "1" && options[0]) {
        onSelect(options[0]);
      } else if (key === "2" && options[1]) {
        onSelect(options[1]);
      } else if (key === "3" && options[2]) {
        onSelect(options[2]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, options, onSelect]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="max-w-4xl w-full p-4">
        <div className="text-center mb-6">
          <h2 className="text-5xl font-bold text-yellow-400 mb-2 animate-pulse">
            LEVEL UP!
          </h2>
          <p className="text-2xl text-white">
            레벨 {level} 달성! 능력을 선택하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((option, index) => (
            <Card
              key={option.id}
              className="relative overflow-hidden border-4 border-purple-500 bg-gradient-to-br from-gray-900 to-purple-900/50 hover:border-yellow-400 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/50"
              onClick={() => onSelect(option)}
            >
              {/* 숫자 키 표시 */}
              <div className="absolute top-3 left-3 w-8 h-8 bg-yellow-400 text-black font-bold rounded-full flex items-center justify-center text-lg">
                {index + 1}
              </div>

              <CardHeader className="text-center pb-2">
                <div className="text-6xl mb-3">{option.icon}</div>
                <CardTitle className="text-2xl text-white mb-2">
                  {option.name}
                </CardTitle>
                <CardDescription className="text-gray-300 text-base">
                  {option.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pt-2">
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(option);
                  }}
                >
                  선택하기
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-6 text-gray-400 text-sm">
          클릭하거나 숫자 키 1, 2, 3을 눌러 선택하세요
        </div>
      </div>
    </div>
  );
}
