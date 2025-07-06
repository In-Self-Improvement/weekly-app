"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  text: string;
  category: string;
  emoji: string;
}

interface Achievement {
  totalCompleted: number;
  todayCompleted: number;
  streak: number;
  lastCompletedDate: string;
}

const TASK_POOL: Task[] = [
  // 🏠 집안일
  { id: "1", text: "물 한 컵 마시기", category: "home", emoji: "💧" },
  { id: "2", text: "책상 위 정리하기", category: "home", emoji: "📚" },
  { id: "3", text: "쓰레기통 비우기", category: "home", emoji: "🗑️" },
  { id: "4", text: "방 창문 열어서 환기하기", category: "home", emoji: "🪟" },
  { id: "5", text: "설거지 하나 하기", category: "home", emoji: "🍽️" },
  
  // 💪 건강
  { id: "6", text: "1분 스트레칭하기", category: "health", emoji: "🤸" },
  { id: "7", text: "심호흡 10회하기", category: "health", emoji: "🫁" },
  { id: "8", text: "계단 한 층 오르내리기", category: "health", emoji: "🪜" },
  { id: "9", text: "목과 어깨 돌리기", category: "health", emoji: "💪" },
  { id: "10", text: "제자리에서 걷기 30초", category: "health", emoji: "🚶" },
  
  // 🧠 학습
  { id: "11", text: "영단어 5개 찾아보기", category: "learning", emoji: "📖" },
  { id: "12", text: "뉴스 헤드라인 읽기", category: "learning", emoji: "📰" },
  { id: "13", text: "메모 하나 정리하기", category: "learning", emoji: "📝" },
  { id: "14", text: "오늘 배운 것 하나 적기", category: "learning", emoji: "✏️" },
  { id: "15", text: "궁금한 것 하나 검색하기", category: "learning", emoji: "🔍" },
  
  // 📱 디지털
  { id: "16", text: "사진 5장 삭제하기", category: "digital", emoji: "📸" },
  { id: "17", text: "읽지 않은 알림 정리하기", category: "digital", emoji: "🔔" },
  { id: "18", text: "사용하지 않는 앱 하나 삭제", category: "digital", emoji: "📱" },
  { id: "19", text: "스마트폰 화면 닦기", category: "digital", emoji: "🧽" },
  { id: "20", text: "연락처 하나 정리하기", category: "digital", emoji: "👥" },
  
  // 🎨 창의
  { id: "21", text: "낙서 하나 그리기", category: "creative", emoji: "🎨" },
  { id: "22", text: "감사 인사 하나 보내기", category: "creative", emoji: "💌" },
  { id: "23", text: "아이디어 하나 적기", category: "creative", emoji: "💡" },
  { id: "24", text: "좋아하는 노래 하나 듣기", category: "creative", emoji: "🎵" },
  { id: "25", text: "오늘 감사한 일 하나 생각하기", category: "creative", emoji: "🙏" },
];

const CATEGORY_NAMES = {
  home: "집안일",
  health: "건강",
  learning: "학습",
  digital: "디지털",
  creative: "창의"
};

export default function QuickWinPage() {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [achievement, setAchievement] = useState<Achievement>({
    totalCompleted: 0,
    todayCompleted: 0,
    streak: 0,
    lastCompletedDate: ""
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    loadAchievement();
  }, []);

  const loadAchievement = () => {
    const saved = localStorage.getItem("quickwin-achievement");
    if (saved) {
      const parsed = JSON.parse(saved);
      const today = new Date().toDateString();
      
      if (parsed.lastCompletedDate !== today) {
        parsed.todayCompleted = 0;
      }
      
      setAchievement(parsed);
    }
  };

  const saveAchievement = (newAchievement: Achievement) => {
    localStorage.setItem("quickwin-achievement", JSON.stringify(newAchievement));
    setAchievement(newAchievement);
  };

  const getRandomTask = () => {
    const randomIndex = Math.floor(Math.random() * TASK_POOL.length);
    const task = TASK_POOL[randomIndex];
    setCurrentTask(task);
    setIsCompleted(false);
    setShowCelebration(false);
  };

  const completeTask = () => {
    if (!currentTask) return;
    
    const today = new Date().toDateString();
    const isConsecutiveDay = achievement.lastCompletedDate === new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
    
    const newAchievement: Achievement = {
      totalCompleted: achievement.totalCompleted + 1,
      todayCompleted: achievement.todayCompleted + 1,
      streak: achievement.lastCompletedDate === today ? achievement.streak : 
              isConsecutiveDay ? achievement.streak + 1 : 1,
      lastCompletedDate: today
    };
    
    saveAchievement(newAchievement);
    setIsCompleted(true);
    setShowCelebration(true);
    
    setTimeout(() => {
      setShowCelebration(false);
    }, 2000);
  };

  const resetForNewTask = () => {
    setCurrentTask(null);
    setIsCompleted(false);
    setShowCelebration(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            QuickWin 🎯
          </h1>
          <p className="text-gray-600">
            간단한 할일로 성취감을 느껴보세요
          </p>
        </div>

        {/* 성취 통계 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center text-lg text-gray-800 font-bold">오늘의 성취</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-700">{achievement.todayCompleted}</div>
                <div className="text-sm text-gray-600">오늘</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-700">{achievement.totalCompleted}</div>
                <div className="text-sm text-gray-600">전체</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-700">{achievement.streak}</div>
                <div className="text-sm text-gray-600">연속</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 메인 카드 */}
        {!currentTask ? (
          <Card className="mb-4">
            <CardHeader className="text-center">
              <CardTitle className="text-gray-800 font-bold">준비되셨나요?</CardTitle>
              <CardDescription className="text-gray-600">
                오늘 뭐 할지 모르겠다면 여기서 시작해보세요
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={getRandomTask}
                className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-white"
              >
                <span className="text-2xl mr-2">🎲</span>
                할일 받기
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-4">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-xl">
                <span className="text-3xl">{currentTask.emoji}</span>
                {currentTask.text}
              </CardTitle>
              <CardDescription>
                {CATEGORY_NAMES[currentTask.category as keyof typeof CATEGORY_NAMES]} • 5분 이내
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              {!isCompleted ? (
                <div className="space-y-4">
                  <Button 
                    onClick={completeTask}
                    className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-white"
                  >
                    <span className="text-2xl mr-2">✅</span>
                    완료했어요!
                  </Button>
                  <Button 
                    onClick={getRandomTask}
                    variant="outline"
                    className="w-full"
                  >
                    다른 할일 받기
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className={`text-center transition-all duration-500 ${showCelebration ? 'animate-bounce' : ''}`}>
                    <div className="text-4xl mb-2">🎉</div>
                    <div className="text-xl font-bold text-green-600 mb-2">
                      멋져요! 완료했어요!
                    </div>
                    <div className="text-gray-600">
                      오늘 {achievement.todayCompleted}번째 성취를 달성했어요
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button 
                      onClick={getRandomTask}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      또 다른 할일 받기
                    </Button>
                    <Button 
                      onClick={resetForNewTask}
                      variant="outline"
                      className="w-full"
                    >
                      처음으로 돌아가기
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* 힌트 카드 */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300">
          <CardContent className="text-center py-4">
            <div className="text-yellow-800 text-sm">
              💡 <strong>Tip:</strong> 작은 할일부터 시작해서 하루를 활기차게 만들어보세요!
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}