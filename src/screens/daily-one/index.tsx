"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CelebrationAnimation from "./_components/celebration-animation";
import TaskCard from "./_components/task-card";
import { useSound } from "./_hooks/useSound";
import { useStepGlow } from "./_hooks/useStepGlow";
import { Task } from "./_types/taskType";

const DailyOneScreen = () => {
  const [todayTasks, setTodayTasks] = useState<Task[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [previousCompletedCount, setPreviousCompletedCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const {
    userStats,
    getTodayTasks,
    completeTask,
    isTaskCompleted,
    todayCompletedCount,
    totalTasksToday,
    calculateStreak,
  } = useStepGlow();

  const { playChimeSound } = useSound();

  // 클라이언트 사이드에서만 실행
  useEffect(() => {
    setIsClient(true);
    const tasks = getTodayTasks();
    setTodayTasks(tasks);
  }, [getTodayTasks]);

  // 완료 상태 변화 감지
  useEffect(() => {
    if (
      isClient &&
      todayCompletedCount > previousCompletedCount &&
      todayCompletedCount >= totalTasksToday
    ) {
      // 목표 달성 시 축하 애니메이션과 차임 사운드
      setShowCelebration(true);
      playChimeSound();
    }
    setPreviousCompletedCount(todayCompletedCount);
  }, [
    todayCompletedCount,
    previousCompletedCount,
    totalTasksToday,
    playChimeSound,
    isClient,
  ]);

  // 할 일 완료 처리
  const handleCompleteTask = (task: Task) => {
    completeTask(task);
    // 새로운 할 일 목록 갱신
    const newTasks = getTodayTasks();
    setTodayTasks(newTasks);
  };

  // 새로운 할 일 가져오기
  const refreshTasks = (allowExtra: boolean = false) => {
    const newTasks = getTodayTasks(allowExtra);
    setTodayTasks(newTasks);
  };

  // 클라이언트 사이드가 아니면 로딩 표시
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4">
        <div className="max-w-md mx-auto pt-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              하루 하나 ✨
            </h1>
            <p className="text-gray-600">
              작은 한 걸음으로 빛나는 하루를 만들어보세요
            </p>
          </div>
          <Card className="mb-6 bg-white/80 backdrop-blur-sm border-green-200">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎯</div>
                <p className="text-gray-600 mb-4">로딩 중...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentStreak = calculateStreak();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex flex-col">
      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1">
        <div className="max-w-md mx-auto pt-8">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              하루 하나 ✨
            </h1>
            <p className="text-gray-600">
              작은 한 걸음으로 빛나는 하루를 만들어보세요
            </p>
          </div>

          {/* 오늘의 할 일 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-center text-green-700 flex items-center justify-center space-x-2">
                <span>🌟</span>
                <span>오늘의 작은 발걸음</span>
              </CardTitle>
              <CardDescription className="text-center min-h-[4.5rem] flex items-center justify-center">
                <span>
                  {todayCompletedCount === totalTasksToday
                    ? "오늘 할 일을 완료했어요! 정말 잘하셨네요! 🎉"
                    : "천천히 해도 괜찮아요. 마음에 드는 것을 골라서 시작해보세요 ✨"}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {todayTasks.length > 0 ? (
                <div className="space-y-4">
                  {todayTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      isCompleted={isTaskCompleted(task.id)}
                      onComplete={handleCompleteTask}
                    />
                  ))}

                  {/* 리롤 버튼 */}
                  <div className="text-center pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-3">
                      이 할 일이 마음에 안 드시나요?
                    </p>
                    <Button
                      onClick={() =>
                        refreshTasks(todayCompletedCount >= totalTasksToday)
                      }
                      variant="outline"
                      className="text-green-600 border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-300"
                    >
                      🎲 다른 할 일 추천받기
                    </Button>
                  </div>
                </div>
              ) : todayCompletedCount >= totalTasksToday ? (
                <div className="text-center py-12">
                  <div className="text-8xl mb-6">🌟</div>
                  <h2 className="text-3xl font-bold text-green-600 mb-4">
                    정말 잘하셨어요!
                  </h2>
                  <p className="text-lg text-gray-700 mb-2">
                    오늘 하나의 작은 발걸음을 내디뎠네요
                  </p>
                  <p className="text-gray-600 mb-8">
                    이런 작은 실천들이 모여서 큰 변화를 만들어요 ✨
                  </p>

                  <div className="bg-green-50 rounded-xl p-6 mb-8 border border-green-200">
                    <p className="text-sm text-green-700 leading-relaxed">
                      💡 <strong>잠깐!</strong> 무리하지 마세요. 완벽하지 않아도
                      괜찮고, 매일 하지 못해도 괜찮아요. 자신을 사랑하는
                      마음으로 천천히 해보세요
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Button
                      onClick={() => refreshTasks(true)}
                      className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      ✨ 더 하고 싶어요!
                    </Button>
                    <div className="text-sm text-gray-500">
                      무리하지 마세요. 내일 또 만나요! 😊
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎯</div>
                  <p className="text-gray-600 mb-4">
                    오늘의 할 일을 준비하고 있어요
                  </p>
                  <Button
                    onClick={() => refreshTasks()}
                    className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    오늘의 할 일 받기
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 휴식 메시지 */}
          {todayCompletedCount === 0 && (
            <Card className="mb-6 bg-gradient-to-br from-blue-50 to-teal-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">💙</div>
                  <p className="text-blue-700 font-medium mb-2">
                    괜찮아요, 천천히 해도 돼요
                  </p>
                  <p className="text-blue-600 text-sm">
                    오늘은 쉬는 날일 수도 있어요. 준비가 되면 언제든 시작하세요.
                    여기서 기다리고 있을게요 😊
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* 하단 고정 상태바 */}
      <div className="bg-white/90 backdrop-blur-sm border-t border-green-200 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            {/* 오늘 상태 */}
            <div className="text-center">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xl">
                  {todayCompletedCount >= totalTasksToday ? "🎉" : "💚"}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  오늘 {todayCompletedCount}/{totalTasksToday}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {todayCompletedCount >= totalTasksToday
                  ? "목표 달성!"
                  : todayCompletedCount === 0
                  ? "시작해보세요"
                  : "진행 중"}
              </div>
            </div>

            {/* 통계 */}
            <div className="flex space-x-4">
              <div className="text-center">
                <div className="text-lg font-bold text-green-700">
                  {userStats.totalCompleted}
                </div>
                <div className="text-xs text-green-600">총 완료</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-teal-700">
                  {currentStreak}
                </div>
                <div className="text-xs text-teal-600">연속 일수</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 축하 애니메이션 */}
      <CelebrationAnimation
        isVisible={showCelebration}
        onComplete={() => setShowCelebration(false)}
      />
    </div>
  );
};

export default DailyOneScreen;
