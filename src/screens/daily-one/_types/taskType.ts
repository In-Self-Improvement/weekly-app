// StepGlow 할 일 관련 타입 정의

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: 'exercise' | 'cleaning' | 'selfcare' | 'work' | 'hobby';
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number; // 예상 소요 시간(분)
  motivationalMessage: string;
  isCompleted: boolean;
  completedAt?: Date;
}

export interface CompletedTask {
  taskId: string;
  completedAt: Date;
  userId?: string; // 추후 Supabase 연동 시 사용
}

export interface DailyProgress {
  date: string; // YYYY-MM-DD
  completedTasks: string[]; // 완료한 task ID들
  totalTasks: number;
  completionRate: number; // 0-100
}

export interface UserStats {
  totalCompleted: number;
  currentStreak: number;
  longestStreak: number;
  favoriteCategory: string;
  lastCompletedDate?: string;
}