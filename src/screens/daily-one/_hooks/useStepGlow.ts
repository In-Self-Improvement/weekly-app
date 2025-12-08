"use client";

import { useCallback, useMemo } from "react";
import {
  CompletedTask,
  DailyProgress,
  Task,
  UserStats,
} from "../_types/taskType";
import { defaultTasks } from "../_utils/taskData";
import { STORAGE_KEYS, useLocalStorage } from "./useLocalStorage";

export function useStepGlow() {
  // LocalStorage 상태들
  const [completedTasks, setCompletedTasks] = useLocalStorage<CompletedTask[]>(
    STORAGE_KEYS.COMPLETED_TASKS,
    []
  );
  const [userStats, setUserStats] = useLocalStorage<UserStats>(
    STORAGE_KEYS.USER_STATS,
    {
      totalCompleted: 0,
      currentStreak: 0,
      longestStreak: 0,
      favoriteCategory: "selfcare",
    }
  );
  const [dailyProgress, setDailyProgress] = useLocalStorage<DailyProgress[]>(
    STORAGE_KEYS.DAILY_PROGRESS,
    []
  );

  // 오늘 날짜 문자열
  const today = useMemo(() => {
    const now = new Date();
    return now.toISOString().split("T")[0]; // YYYY-MM-DD 형식
  }, []);

  // 오늘 완료한 태스크들
  const todayCompletedTasks = useMemo(() => {
    return completedTasks.filter((task) => {
      const taskDate = new Date(task.completedAt).toISOString().split("T")[0];
      return taskDate === today;
    });
  }, [completedTasks, today]);

  // 오늘의 진행률
  const todayProgress = useMemo(() => {
    return dailyProgress.find((progress) => progress.date === today);
  }, [dailyProgress, today]);

  // 랜덤 할 일 1개 선택 (오늘 완료하지 않은 것들 중에서, 또는 추가 할 일)
  const getTodayTasks = useCallback(
    (allowExtra: boolean = false): Task[] => {
      const completedTaskIds = todayCompletedTasks.map((ct) => ct.taskId);
      let availableTasks;

      if (allowExtra) {
        // 추가 할 일을 원하는 경우 - 완료 여부 상관없이 모든 할 일에서 선택
        availableTasks = defaultTasks;
      } else {
        // 기본 모드 - 완료하지 않은 할 일만 선택
        availableTasks = defaultTasks.filter(
          (task) => !completedTaskIds.includes(task.id)
        );
      }

      // 난이도별로 가중치를 둬서 쉬운 것들을 더 자주 선택
      const weightedTasks: Task[] = [];
      availableTasks.forEach((task) => {
        const weight =
          task.difficulty === "easy" ? 3 : task.difficulty === "medium" ? 2 : 1;
        for (let i = 0; i < weight; i++) {
          weightedTasks.push(task);
        }
      });

      // 랜덤으로 1개 선택
      const shuffled = [...weightedTasks].sort(() => Math.random() - 0.5);

      if (shuffled.length > 0) {
        return [shuffled[0]];
      }

      // 가중치 없이 선택할 수 있는 태스크가 있다면
      if (availableTasks.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableTasks.length);
        return [availableTasks[randomIndex]];
      }

      return [];
    },
    [todayCompletedTasks]
  );

  // 할 일 완료 처리
  const completeTask = useCallback(
    (task: Task) => {
      const newCompletedTask: CompletedTask = {
        taskId: task.id,
        completedAt: new Date(),
      };

      // 완료된 태스크 추가
      setCompletedTasks((prev) => [...prev, newCompletedTask]);

      // 사용자 통계 업데이트
      setUserStats((prev) => {
        const newStats = {
          ...prev,
          totalCompleted: prev.totalCompleted + 1,
          lastCompletedDate: today,
        };

        // 스트릭 계산
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        if (
          prev.lastCompletedDate === yesterdayStr ||
          !prev.lastCompletedDate
        ) {
          newStats.currentStreak = prev.currentStreak + 1;
        } else if (prev.lastCompletedDate !== today) {
          newStats.currentStreak = 1;
        }

        newStats.longestStreak = Math.max(
          newStats.longestStreak,
          newStats.currentStreak
        );

        return newStats;
      });

      // 일일 진행률 업데이트
      setDailyProgress((prev) => {
        const existingIndex = prev.findIndex((p) => p.date === today);
        const newCompletedCount = todayCompletedTasks.length + 1;
        const totalTasks = 1; // 하루에 1개씩 제안

        const newProgress: DailyProgress = {
          date: today,
          completedTasks: [
            ...todayCompletedTasks.map((ct) => ct.taskId),
            task.id,
          ],
          totalTasks,
          completionRate: Math.round((newCompletedCount / totalTasks) * 100),
        };

        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = newProgress;
          return updated;
        } else {
          return [...prev, newProgress];
        }
      });
    },
    [
      today,
      todayCompletedTasks,
      setCompletedTasks,
      setUserStats,
      setDailyProgress,
    ]
  );

  // 태스크가 완료되었는지 확인
  const isTaskCompleted = useCallback(
    (taskId: string): boolean => {
      return todayCompletedTasks.some((ct) => ct.taskId === taskId);
    },
    [todayCompletedTasks]
  );

  // 오늘 완료율
  const todayCompletionRate = useMemo(() => {
    return todayProgress?.completionRate || 0;
  }, [todayProgress]);

  // 연속 완료 일수 계산
  const calculateStreak = useCallback(() => {
    if (dailyProgress.length === 0) return 0;

    const sortedProgress = [...dailyProgress].sort((a, b) =>
      b.date.localeCompare(a.date)
    );
    let streak = 0;
    let currentDate = new Date();

    for (const progress of sortedProgress) {
      const progressDate = new Date(progress.date);
      const diffTime = currentDate.getTime() - progressDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === streak + 1 && progress.completionRate > 0) {
        streak++;
        currentDate = progressDate;
      } else {
        break;
      }
    }

    return streak;
  }, [dailyProgress]);

  return {
    // 상태
    userStats,
    todayProgress,
    todayCompletionRate,

    // 함수
    getTodayTasks,
    completeTask,
    isTaskCompleted,
    calculateStreak,

    // 통계
    todayCompletedCount: todayCompletedTasks.length,
    totalTasksToday: 1,
  };
}
