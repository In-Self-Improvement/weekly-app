export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string; // ISO date string (YYYY-MM-DD)
  completedAt?: string; // ISO datetime string
}

export interface DailyRecord {
  date: string; // ISO date string (YYYY-MM-DD)
  tasks: Task[];
  completedCount: number;
}

export interface UserStats {
  currentStreak: number;
  longestStreak: number;
  totalCompletedDays: number;
  lastActiveDate: string;
}
