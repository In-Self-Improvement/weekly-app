"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface DifficultySettings {
  playerSpeed: number;
  playerHealth: number;
  enemySpeedMult: number;
  spawnIntervalMult: number;
  enemyHealthMult: number;
}

export interface DifficultyOption {
  id: string;
  name: string;
  description: string;
  icon: string;
  settings: DifficultySettings;
}

interface DifficultyModalProps {
  isOpen: boolean;
  onSelect: (option: DifficultyOption) => void;
}

export default function DifficultyModal({ isOpen, onSelect }: DifficultyModalProps) {
  if (!isOpen) return null;

  const difficultyOptions: DifficultyOption[] = [
    {
      id: "easy",
      name: "쉬움",
      description: "초보자를 위한 난이도. 체력이 높고 적이 느립니다.",
      icon: "😊",
      settings: {
        playerSpeed: 280,
        playerHealth: 150,
        enemySpeedMult: 0.7,
        spawnIntervalMult: 1.3,
        enemyHealthMult: 0.8,
      },
    },
    {
      id: "normal",
      name: "보통",
      description: "적절한 도전감. 2-3번 시도 후 클리어 가능합니다.",
      icon: "😎",
      settings: {
        playerSpeed: 250,
        playerHealth: 120,
        enemySpeedMult: 1.0,
        spawnIntervalMult: 1.0,
        enemyHealthMult: 1.0,
      },
    },
    {
      id: "hard",
      name: "어려움",
      description: "숙련자를 위한 난이도. 완벽한 빌드가 필요합니다.",
      icon: "😈",
      settings: {
        playerSpeed: 220,
        playerHealth: 100,
        enemySpeedMult: 1.3,
        spawnIntervalMult: 0.8,
        enemyHealthMult: 1.2,
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="max-w-4xl w-full p-4">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-purple-400 mb-4">
            난이도 선택
          </h2>
          <p className="text-xl text-gray-300">
            5분간 생존하세요! 원하는 난이도를 선택해주세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {difficultyOptions.map((option, index) => (
            <Card
              key={option.id}
              className="relative overflow-hidden border-4 border-purple-500 bg-gradient-to-br from-gray-900 to-purple-900/50 hover:border-yellow-400 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-400/50"
              onClick={() => onSelect(option)}
            >
              {/* 숫자 키 표시 */}
              <div className="absolute top-3 left-3 w-8 h-8 bg-purple-400 text-black font-bold rounded-full flex items-center justify-center text-lg">
                {index + 1}
              </div>

              <CardHeader className="text-center pb-2">
                <div className="text-7xl mb-4">{option.icon}</div>
                <CardTitle className="text-3xl text-white mb-3">
                  {option.name}
                </CardTitle>
                <CardDescription className="text-gray-300 text-base leading-relaxed">
                  {option.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center pt-2">
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 text-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(option);
                  }}
                >
                  선택하기
                </Button>
              </CardContent>

              {/* 난이도 스탯 표시 */}
              <div className="px-4 pb-4 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>체력:</span>
                  <span className="text-green-400">{option.settings.playerHealth}</span>
                </div>
                <div className="flex justify-between">
                  <span>이동 속도:</span>
                  <span className="text-blue-400">{option.settings.playerSpeed}</span>
                </div>
                <div className="flex justify-between">
                  <span>적 난이도:</span>
                  <span className="text-red-400">
                    {option.id === "easy" ? "낮음" : option.id === "normal" ? "보통" : "높음"}
                  </span>
                </div>
              </div>
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
