"use client";

import { useState, useEffect, useCallback } from "react";
import type { Task } from "../_types/taskType";
import { getTodayString } from "../_utils/dateUtil";

const STORAGE_KEY = "only-three-tasks";

interface StoredData {
  date: string;
  tasks: Task[];
}

function generateId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function createEmptyTasks(): Task[] {
  const today = getTodayString();
  return [
    { id: generateId(), text: "", completed: false, createdAt: today },
    { id: generateId(), text: "", completed: false, createdAt: today },
    { id: generateId(), text: "", completed: false, createdAt: today },
  ];
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(createEmptyTasks());
  const [isLoaded, setIsLoaded] = useState(false);

  // 로컬스토리지에서 데이터 로드
  useEffect(() => {
    const today = getTodayString();
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const data: StoredData = JSON.parse(stored);

        // 오늘 날짜의 데이터인 경우에만 로드
        if (data.date === today && data.tasks?.length === 3) {
          setTasks(data.tasks);
        } else {
          // 다른 날짜면 새로운 태스크 생성
          setTasks(createEmptyTasks());
        }
      } catch {
        setTasks(createEmptyTasks());
      }
    }

    setIsLoaded(true);
  }, []);

  // 태스크 변경 시 로컬스토리지에 저장
  useEffect(() => {
    if (!isLoaded) return;

    const data: StoredData = {
      date: getTodayString(),
      tasks,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [tasks, isLoaded]);

  // 태스크 토글
  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : undefined,
            }
          : task
      )
    );
  }, []);

  // 태스크 텍스트 업데이트
  const updateTaskText = useCallback((id: string, text: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text } : task))
    );
  }, []);

  // 완료된 태스크 수
  const completedCount = tasks.filter((t) => t.completed).length;

  // 모든 태스크가 완료되었는지
  const allCompleted = completedCount === 3 && tasks.every((t) => t.text.trim());

  return {
    tasks,
    toggleTask,
    updateTaskText,
    completedCount,
    allCompleted,
    isLoaded,
  };
}
