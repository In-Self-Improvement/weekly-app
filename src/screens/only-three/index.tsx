"use client";

import { useCallback, useRef } from "react";
import Header from "./_components/header";
import TaskList from "./_components/task-list";
import { useDarkMode } from "./_hooks/useDarkMode";
import { useTasks } from "./_hooks/useTasks";
import { useConfetti } from "./_hooks/useConfetti";
import { useSound } from "./_hooks/useSound";

export default function OnlyThreeScreen() {
  const { isDarkMode, toggleDarkMode, isLoaded: darkModeLoaded } = useDarkMode();
  const {
    tasks,
    toggleTask,
    updateTaskText,
    completedCount,
    allCompleted,
    isLoaded: tasksLoaded,
  } = useTasks();

  const { fireConfetti, fireAllCompleteConfetti } = useConfetti();
  const { playCompleteSound, playAllCompleteSound } = useSound();

  // 이전 완료 상태 추적 (3개 모두 완료 감지용)
  const prevAllCompletedRef = useRef(false);

  // 태스크 토글 핸들러 (confetti + 사운드 추가)
  const handleToggleTask = useCallback(
    (id: string) => {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      // 완료로 변경되는 경우에만 효과 재생
      if (!task.completed && task.text.trim()) {
        // 현재 완료된 태스크 수 계산 (토글 후)
        const newCompletedCount = completedCount + 1;
        const willBeAllCompleted = newCompletedCount === 3 && tasks.every((t) => t.text.trim());

        if (willBeAllCompleted && !prevAllCompletedRef.current) {
          // 3개 모두 완료!
          fireAllCompleteConfetti();
          playAllCompleteSound();
          prevAllCompletedRef.current = true;
        } else {
          // 일반 완료
          fireConfetti();
          playCompleteSound();
        }
      } else if (task.completed) {
        // 완료 취소 시
        prevAllCompletedRef.current = false;
      }

      toggleTask(id);
    },
    [tasks, completedCount, toggleTask, fireConfetti, fireAllCompleteConfetti, playCompleteSound, playAllCompleteSound]
  );

  // 로딩 중일 때 깜빡임 방지
  if (!darkModeLoaded || !tasksLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 dark:from-gray-900 dark:to-gray-800" />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="max-w-md mx-auto px-4 py-8">
        <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />

        <TaskList
          tasks={tasks}
          onToggleTask={handleToggleTask}
          onUpdateTaskText={updateTaskText}
        />

        {/* 완료 현황 */}
        <div className="text-center">
          <div className="text-sm text-muted-foreground">
            오늘 {completedCount}/3 완료
          </div>
          {allCompleted && (
            <div className="mt-2 text-lg font-semibold text-green-600 dark:text-green-400 animate-pulse">
              🎉 오늘 목표 달성!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
