"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  {
    id: "14",
    text: "오늘 배운 것 하나 적기",
    category: "learning",
    emoji: "✏️",
  },
  {
    id: "15",
    text: "궁금한 것 하나 검색하기",
    category: "learning",
    emoji: "🔍",
  },

  // 📱 디지털
  { id: "16", text: "사진 5장 삭제하기", category: "digital", emoji: "📸" },
  {
    id: "17",
    text: "읽지 않은 알림 정리하기",
    category: "digital",
    emoji: "🔔",
  },
  {
    id: "18",
    text: "사용하지 않는 앱 하나 삭제",
    category: "digital",
    emoji: "📱",
  },
  { id: "19", text: "스마트폰 화면 닦기", category: "digital", emoji: "🧽" },
  { id: "20", text: "연락처 하나 정리하기", category: "digital", emoji: "👥" },

  // 🎨 창의
  { id: "21", text: "낙서 하나 그리기", category: "creative", emoji: "🎨" },
  {
    id: "22",
    text: "감사 인사 하나 보내기",
    category: "creative",
    emoji: "💌",
  },
  { id: "23", text: "아이디어 하나 적기", category: "creative", emoji: "💡" },
  {
    id: "24",
    text: "좋아하는 노래 하나 듣기",
    category: "creative",
    emoji: "🎵",
  },
  {
    id: "25",
    text: "오늘 감사한 일 하나 생각하기",
    category: "creative",
    emoji: "🙏",
  },
];

const CATEGORY_NAMES = {
  home: "집안일",
  health: "건강",
  learning: "학습",
  digital: "디지털",
  creative: "창의",
};

export default function QuickWinPage() {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [achievement, setAchievement] = useState<Achievement>({
    totalCompleted: 0,
    todayCompleted: 0,
    streak: 0,
    lastCompletedDate: "",
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
    localStorage.setItem(
      "quickwin-achievement",
      JSON.stringify(newAchievement)
    );
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
    const isConsecutiveDay =
      achievement.lastCompletedDate ===
      new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();

    const newAchievement: Achievement = {
      totalCompleted: achievement.totalCompleted + 1,
      todayCompleted: achievement.todayCompleted + 1,
      streak:
        achievement.lastCompletedDate === today
          ? achievement.streak
          : isConsecutiveDay
          ? achievement.streak + 1
          : 1,
      lastCompletedDate: today,
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
          <h1 className="text-3xl font-bold text-foreground mb-2">
            QuickWin 🎯
          </h1>
          <p className="text-muted-foreground">
            간단한 할일로 성취감을 느껴보세요
          </p>
        </div>

        {/* 성취 통계 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center text-lg text-foreground font-bold">
              오늘의 성취
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-700">
                  {achievement.todayCompleted}
                </div>
                <div className="text-sm text-muted-foreground">오늘</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-700">
                  {achievement.totalCompleted}
                </div>
                <div className="text-sm text-muted-foreground">전체</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-700">
                  {achievement.streak}
                </div>
                <div className="text-sm text-muted-foreground">연속</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 메인 카드 */}
        {!currentTask ? (
          <Card className="mb-4">
            <CardHeader className="text-center">
              <CardTitle className="text-foreground font-bold">
                준비되셨나요?
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                오늘 뭐 할지 모르겠다면 여기서 시작해보세요
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                onClick={getRandomTask}
                className="w-full h-16 text-lg font-semibold"
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
                {
                  CATEGORY_NAMES[
                    currentTask.category as keyof typeof CATEGORY_NAMES
                  ]
                }{" "}
                • 5분 이내
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              {!isCompleted ? (
                <div className="space-y-4">
                  <Button
                    onClick={completeTask}
                    className="w-full h-16 text-lg font-semibold"
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
                  <div
                    className={`text-center transition-all duration-500 ${
                      showCelebration ? "animate-bounce" : ""
                    }`}
                  >
                    <div className="text-4xl mb-2">🎉</div>
                    <div className="text-xl font-bold text-green-600 mb-2">
                      멋져요! 완료했어요!
                    </div>
                    <div className="text-muted-foreground">
                      오늘 {achievement.todayCompleted}번째 성취를 달성했어요
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button onClick={getRandomTask} className="w-full">
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
        <Card>
          <CardContent className="text-center py-4">
            <div className="text-yellow-800 text-sm">
              💡 <strong>Tip:</strong> 작은 할일부터 시작해서 하루를 활기차게
              만들어보세요!
            </div>
          </CardContent>
        </Card>

        {/* 상세 설명 및 가이드 */}
        <div className="mt-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-green-700 flex items-center justify-center gap-2">
                🎯 QuickWin이란?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  🚀 즉석 성취감
                </h3>
                <p className="text-muted-foreground text-sm">
                  5분 이내로 완료할 수 있는 간단한 할일들을 랜덤하게 제공합니다.
                  작은 성취를 통해 하루를 긍정적으로 시작하고 동기부여를
                  얻으세요.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  📈 습관 형성
                </h3>
                <p className="text-muted-foreground text-sm">
                  매일 작은 일들을 꾸준히 완료하며 자연스럽게 좋은 습관을
                  만들어갑니다. 연속 달성 기록을 통해 지속적인 동기를 부여받을
                  수 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-green-700">
                📋 카테고리별 할일
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🏠</span>
                    <h3 className="font-semibold text-foreground">집안일</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    집 정리, 청소, 환기 등 생활 환경을 개선하는 간단한 일들
                  </p>
                  <div className="text-xs text-muted-foreground">
                    예: 물 한 컵 마시기, 책상 정리하기, 쓰레기통 비우기
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">💪</span>
                    <h3 className="font-semibold text-foreground">건강</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    몸과 마음의 건강을 위한 간단한 운동과 휴식 활동
                  </p>
                  <div className="text-xs text-muted-foreground">
                    예: 1분 스트레칭, 심호흡 10회, 목과 어깨 돌리기
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🧠</span>
                    <h3 className="font-semibold text-foreground">학습</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    지식 습득과 정보 정리를 위한 짧고 유익한 활동들
                  </p>
                  <div className="text-xs text-muted-foreground">
                    예: 영단어 5개 찾기, 뉴스 읽기, 메모 정리하기
                  </div>
                </div>

                <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-100">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">📱</span>
                    <h3 className="font-semibold text-foreground">디지털</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    디지털 기기와 데이터를 정리하고 관리하는 활동
                  </p>
                  <div className="text-xs text-muted-foreground">
                    예: 사진 정리하기, 알림 정리하기, 불필요한 앱 삭제
                  </div>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🎨</span>
                    <h3 className="font-semibold text-foreground">창의</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    창의성과 감성을 기르는 표현 활동과 소통
                  </p>
                  <div className="text-xs text-muted-foreground">
                    예: 낙서하기, 감사 인사 보내기, 아이디어 적기
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-green-700">
                🏆 성취 통계 가이드
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">📊 오늘</h3>
                <p className="text-muted-foreground text-sm">
                  오늘 하루 완료한 할일의 개수입니다. 매일 자정에 초기화되어
                  새로운 하루를 시작할 수 있습니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">🎯 전체</h3>
                <p className="text-muted-foreground text-sm">
                  QuickWin을 시작한 이후 총 완료한 할일의 개수입니다. 누적된
                  성취를 통해 자신의 발전을 확인할 수 있습니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">🔥 연속</h3>
                <p className="text-muted-foreground text-sm">
                  연속으로 할일을 완료한 날짜입니다. 꾸준함의 지표로, 습관
                  형성에 큰 도움이 됩니다.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-green-700">
                💡 효과적인 사용법
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  🌅 하루 시작하기
                </h3>
                <p className="text-muted-foreground text-sm">
                  아침에 일어나자마자 QuickWin으로 간단한 할일 하나를
                  완료해보세요. 작은 성취감이 하루를 긍정적으로 시작하게
                  도와줍니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  ⏰ 짬짬이 활용
                </h3>
                <p className="text-muted-foreground text-sm">
                  잠깐의 여유 시간이 생겼을 때 활용해보세요. 대기 시간, 휴식
                  시간 등을 생산적으로 보낼 수 있습니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  🎯 목표 설정
                </h3>
                <p className="text-muted-foreground text-sm">
                  하루에 몇 개의 할일을 완료할지 목표를 정해보세요. 작은
                  목표부터 시작해서 점차 늘려가는 것이 좋습니다.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center text-green-700">
                ❓ 자주 묻는 질문
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Q. 할일이 마음에 안 들어요
                </h3>
                <p className="text-muted-foreground text-sm">
                  A. &apos;다른 할일 받기&apos; 버튼을 눌러 새로운 할일을 받을
                  수 있습니다. 자신에게 맞는 할일을 찾아보세요.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Q. 데이터가 사라져요
                </h3>
                <p className="text-muted-foreground text-sm">
                  A. 브라우저의 로컬 저장소에 데이터가 저장됩니다. 브라우저
                  데이터를 삭제하거나 다른 기기에서는 초기화됩니다.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Q. 얼마나 자주 해야 하나요?
                </h3>
                <p className="text-muted-foreground text-sm">
                  A. 본인의 페이스에 맞춰 사용하세요. 매일 하나씩이라도 꾸준히
                  하는 것이 가장 중요합니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
