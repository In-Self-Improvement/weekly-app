"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DifficultyModal, {
  DifficultyOption,
  DifficultySettings,
} from "./_components/difficulty-modal";
import LevelUpModal, { UpgradeOption } from "./_components/level-up-modal";

const GameContainer = dynamic(() => import("./_components/game-container"), {
  ssr: false,
});

interface WindowWithHandleLevelUp extends Window {
  handleLevelUp?: (level: number, options: UpgradeOption[]) => void;
  difficultySettings?: DifficultySettings;
}

export default function SurvivorGameScreen() {
  const [showDifficultySelect, setShowDifficultySelect] = useState(true);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [upgradeOptions, setUpgradeOptions] = useState<UpgradeOption[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  const handleLevelUp = useCallback(
    (level: number, options: UpgradeOption[]) => {
      setCurrentLevel(level);
      setUpgradeOptions(options);
      setShowLevelUp(true);
    },
    []
  );

  const handleSelectUpgrade = useCallback((option: UpgradeOption) => {
    setShowLevelUp(false);
    // 게임에 선택 사항 전달 (window 이벤트 사용)
    window.dispatchEvent(
      new CustomEvent("upgradeSelected", { detail: option })
    );
  }, []);

  const handleSelectDifficulty = useCallback((option: DifficultyOption) => {
    // 난이도 설정을 window에 저장
    (window as WindowWithHandleLevelUp).difficultySettings = option.settings;
    setShowDifficultySelect(false);
    setGameStarted(true);
  }, []);

  // 게임에서 레벨업 이벤트를 받기 위한 설정
  useEffect(() => {
    (window as WindowWithHandleLevelUp).handleLevelUp = handleLevelUp;

    // 클린업: 컴포넌트 언마운트 시 제거
    return () => {
      delete (window as WindowWithHandleLevelUp).handleLevelUp;
      delete (window as WindowWithHandleLevelUp).difficultySettings;
    };
  }, [handleLevelUp]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4">
      {/* 난이도 선택 모달 */}
      <DifficultyModal
        isOpen={showDifficultySelect}
        onSelect={handleSelectDifficulty}
      />

      {/* 레벨업 모달 */}
      <LevelUpModal
        isOpen={showLevelUp}
        level={currentLevel}
        options={upgradeOptions}
        onSelect={handleSelectUpgrade}
      />

      <div className="max-w-4xl mx-auto pt-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🧛 서바이버 게임
          </h1>
          <p className="text-gray-300 text-lg">5분간 생존하세요!</p>
        </div>

        {/* 게임 컨테이너 - 난이도 선택 후에만 렌더링 */}
        {gameStarted && (
          <Card className="mb-6 bg-gray-800 border-purple-600">
            <CardContent className="p-6">
              <GameContainer />
            </CardContent>
          </Card>
        )}

        {/* 게임 설명 */}
        <Card className="bg-gray-800 border-purple-600">
          <CardHeader>
            <CardTitle className="text-center text-purple-400">
              🎮 게임 방법
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <div>
              <h3 className="font-semibold text-white mb-2">조작법</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>이동:</strong> WASD 키 또는 방향키
                </li>
                <li>
                  <strong>공격:</strong> 자동 공격 (가장 가까운 적 타겟팅)
                </li>
                <li>
                  <strong>재시작:</strong> 게임 오버 후 R 키
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">게임 목표</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>몰려오는 적들을 피하고 물리치세요</li>
                <li>경험치 오브를 획득하여 레벨업하세요</li>
                <li>5분(300초)간 생존하면 승리!</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">게임 요소</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <span className="inline-block w-4 h-4 bg-blue-500 rounded-full mr-2" />
                  파란 원: 플레이어 (당신)
                </li>
                <li>
                  <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2" />
                  빨간 원: 적
                </li>
                <li>
                  <span className="inline-block w-4 h-4 bg-yellow-500 rounded-full mr-2" />
                  노란 원: 탄환 (기본 무기)
                </li>
                <li>
                  <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2" />
                  초록 원: 경험치 오브
                </li>
                <li>
                  <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2" />
                  빨간 원: 체력 회복 아이템 (15% 확률)
                </li>
              </ul>
            </div>

            <div className="bg-purple-900/30 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-300 mb-2">💡 팁</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>적들은 시간이 지날수록 빠르게 생성됩니다</li>
                <li>경험치를 모아 레벨업하면 능력이 강화됩니다</li>
                <li>적과의 접촉을 최소화하며 경험치를 수집하세요</li>
                <li>화면 중앙 상단의 타이머를 확인하세요</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
