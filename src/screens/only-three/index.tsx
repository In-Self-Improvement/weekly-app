"use client";

import Header from "./_components/header";
import TaskList from "./_components/task-list";
import { useDarkMode } from "./_hooks/useDarkMode";
import { useTasks } from "./_hooks/useTasks";

export default function OnlyThreeScreen() {
  const { isDarkMode, toggleDarkMode, isLoaded: darkModeLoaded } = useDarkMode();
  const {
    tasks,
    toggleTask,
    updateTaskText,
    completedCount,
    isLoaded: tasksLoaded,
  } = useTasks();

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
          onToggleTask={toggleTask}
          onUpdateTaskText={updateTaskText}
        />

        {/* 간단한 완료 현황 */}
        <div className="text-center text-sm text-muted-foreground">
          오늘 {completedCount}/3 완료
        </div>
      </div>
    </div>
  );
}
