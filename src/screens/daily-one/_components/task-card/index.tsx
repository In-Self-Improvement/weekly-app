"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSound } from "../../_hooks/useSound";
import { Task } from "../../_types/taskType";
import {
  categoryColors,
  categoryNames,
  difficultyColors,
} from "../../_utils/taskData";

interface TaskCardProps {
  task: Task;
  isCompleted: boolean;
  onComplete: (task: Task) => void;
}

export default function TaskCard({
  task,
  isCompleted,
  onComplete,
}: TaskCardProps) {
  const [isCompleting, setIsCompleting] = useState(false);
  const categoryStyle = categoryColors[task.category];
  const { playSuccessSound } = useSound();

  const handleComplete = async () => {
    if (isCompleted || isCompleting) return;

    setIsCompleting(true);

    // 사운드 재생
    playSuccessSound();

    // 버튼 애니메이션을 위한 약간의 지연
    setTimeout(() => {
      onComplete(task);
      setIsCompleting(false);
    }, 500);
  };

  return (
    <Card
      className={`mb-4 transition-all duration-300 ${
        isCompleted
          ? "opacity-60 border-green-200 bg-green-50"
          : `${categoryStyle.bg} ${categoryStyle.border} hover:shadow-lg transform hover:scale-105`
      }`}
    >
      <CardContent className="p-6">
        {/* 카테고리와 난이도 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl">{categoryStyle.icon}</span>
            <span className={`text-sm font-medium ${categoryStyle.text}`}>
              {categoryNames[task.category]}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`text-xs font-medium ${
                difficultyColors[task.difficulty]
              }`}
            >
              {task.difficulty === "easy"
                ? "쉬움"
                : task.difficulty === "medium"
                ? "보통"
                : "어려움"}
            </span>
            <span className="text-xs text-gray-500">{task.duration}분</span>
          </div>
        </div>

        {/* 제목 */}
        <h3
          className={`text-lg font-semibold mb-2 ${
            isCompleted ? "text-gray-500 line-through" : "text-gray-800"
          }`}
        >
          {task.title}
        </h3>

        {/* 설명 */}
        {task.description && (
          <p
            className={`text-sm mb-4 ${
              isCompleted ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {task.description}
          </p>
        )}

        {/* 동기부여 메시지 */}
        <div
          className={`p-3 rounded-lg mb-4 min-h-[4.5rem] flex items-center ${
            isCompleted ? "bg-green-100" : categoryStyle.bg
          }`}
        >
          <p
            className={`text-sm italic w-full ${
              isCompleted ? "text-green-700" : categoryStyle.text
            }`}
          >
            {isCompleted
              ? "완료했어요! 정말 잘하셨네요! 🎉"
              : task.motivationalMessage}
          </p>
        </div>

        {/* 완료 버튼 */}
        <Button
          onClick={handleComplete}
          disabled={isCompleted || isCompleting}
          className={`w-full h-12 text-base font-semibold shadow-lg transition-all duration-500 ${
            isCompleted
              ? "bg-green-500 text-white cursor-not-allowed"
              : isCompleting
              ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white transform scale-105 animate-pulse"
              : `bg-gradient-to-r ${categoryStyle.gradient} hover:shadow-xl transform hover:scale-105 text-white`
          }`}
        >
          {isCompleted ? (
            <div className="flex items-center justify-center space-x-2">
              <span className="animate-bounce">✅</span>
              <span>완료됨</span>
            </div>
          ) : isCompleting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>완료 중...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2 group">
              <span className="group-hover:animate-bounce">🌟</span>
              <span>완료하기</span>
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
