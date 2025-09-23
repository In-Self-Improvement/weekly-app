import { Task } from "../_types/taskType";

// 무기력한 사람들을 위한 간단한 할 일 목록
export const defaultTasks: Task[] = [
  // 운동 카테고리
  {
    id: "exercise-1",
    title: "5분 스트레칭하기",
    description: "목과 어깨를 가볍게 풀어보세요",
    category: "exercise",
    difficulty: "easy",
    duration: 5,
    motivationalMessage: "작은 움직임이 큰 변화의 시작이에요! 🌟",
    isCompleted: false,
  },
  {
    id: "exercise-2",
    title: "계단 한 층 걸어 올라가기",
    description: "엘리베이터 대신 계단을 이용해보세요",
    category: "exercise",
    difficulty: "easy",
    duration: 2,
    motivationalMessage: "한 걸음씩, 천천히 올라가봐요! 💪",
    isCompleted: false,
  },
  {
    id: "exercise-3",
    title: "10분 산책하기",
    description: "집 근처를 가볍게 걸어보세요",
    category: "exercise",
    difficulty: "medium",
    duration: 10,
    motivationalMessage: "바깥 공기가 당신을 기다리고 있어요! 🚶‍♂️",
    isCompleted: false,
  },

  // 정리 카테고리
  {
    id: "cleaning-1",
    title: "책상 위 정리하기",
    description: "책상 위의 물건들을 제자리에 두세요",
    category: "cleaning",
    difficulty: "easy",
    duration: 5,
    motivationalMessage: "깔끔한 공간이 마음도 정리해줄 거예요! ✨",
    isCompleted: false,
  },
  {
    id: "cleaning-2",
    title: "설거지 하나만 하기",
    description: "컵이나 그릇 하나만 씻어보세요",
    category: "cleaning",
    difficulty: "easy",
    duration: 3,
    motivationalMessage: "하나씩 시작하면 모든 게 달라져요! 🧽",
    isCompleted: false,
  },
  {
    id: "cleaning-3",
    title: "침대 정리하기",
    description: "이불을 개고 베개를 정리해보세요",
    category: "cleaning",
    difficulty: "easy",
    duration: 3,
    motivationalMessage: "작은 정리가 하루를 시작하는 힘이 돼요! 🛏️",
    isCompleted: false,
  },

  // 자기관리 카테고리
  {
    id: "selfcare-1",
    title: "물 한 잔 마시기",
    description: "천천히 물을 마시며 잠시 휴식하세요",
    category: "selfcare",
    difficulty: "easy",
    duration: 2,
    motivationalMessage: "당신의 몸이 고마워할 거예요! 💧",
    isCompleted: false,
  },
  {
    id: "selfcare-2",
    title: "3번 깊게 숨쉬기",
    description: "코로 들이마시고 입으로 천천히 내쉬세요",
    category: "selfcare",
    difficulty: "easy",
    duration: 1,
    motivationalMessage: "깊은 숨이 마음을 평온하게 해줄 거예요! 🌸",
    isCompleted: false,
  },
  {
    id: "selfcare-3",
    title: "좋았던 일 하나 생각해보기",
    description: "오늘 있었던 작은 좋은 일을 떠올려보세요",
    category: "selfcare",
    difficulty: "easy",
    duration: 3,
    motivationalMessage: "긍정적인 생각이 하루를 밝게 만들어요! ☀️",
    isCompleted: false,
  },

  // 일/생산성 카테고리
  {
    id: "work-1",
    title: "이메일 하나 확인하기",
    description: "밀린 이메일 중 하나만 확인해보세요",
    category: "work",
    difficulty: "easy",
    duration: 5,
    motivationalMessage: "하나씩 처리하다 보면 모든 게 끝날 거예요! 📧",
    isCompleted: false,
  },
  {
    id: "work-2",
    title: "할 일 목록 작성하기",
    description: "내일 할 일 3가지만 적어보세요",
    category: "work",
    difficulty: "easy",
    duration: 5,
    motivationalMessage: "계획이 있으면 실행도 쉬워져요! 📝",
    isCompleted: false,
  },

  // 취미 카테고리
  {
    id: "hobby-1",
    title: "좋아하는 음악 한 곡 듣기",
    description: "마음에 드는 음악을 틀어보세요",
    category: "hobby",
    difficulty: "easy",
    duration: 4,
    motivationalMessage: "음악이 당신의 마음을 치유해줄 거예요! 🎵",
    isCompleted: false,
  },
  {
    id: "hobby-2",
    title: "사진 한 장 찍기",
    description: "주변의 예쁜 것을 사진으로 남겨보세요",
    category: "hobby",
    difficulty: "easy",
    duration: 2,
    motivationalMessage: "작은 아름다움을 발견하는 눈을 가지셨네요! 📸",
    isCompleted: false,
  },
  {
    id: "hobby-3",
    title: "책 한 페이지 읽기",
    description: "좋아하는 책을 펼쳐 한 페이지만 읽어보세요",
    category: "hobby",
    difficulty: "easy",
    duration: 3,
    motivationalMessage: "한 페이지씩 쌓이면 지식의 탑이 될 거예요! 📚",
    isCompleted: false,
  },
];

// 카테고리별 색상 정의
export const categoryColors = {
  exercise: {
    gradient: "from-green-500 to-teal-600",
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    icon: "💪",
  },
  cleaning: {
    gradient: "from-blue-500 to-cyan-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    icon: "✨",
  },
  selfcare: {
    gradient: "from-pink-500 to-rose-600",
    bg: "bg-pink-50",
    border: "border-pink-200",
    text: "text-pink-700",
    icon: "🌸",
  },
  work: {
    gradient: "from-purple-500 to-indigo-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-700",
    icon: "💼",
  },
  hobby: {
    gradient: "from-orange-500 to-amber-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    icon: "🎨",
  },
};

// 난이도별 색상
export const difficultyColors = {
  easy: "text-green-600",
  medium: "text-yellow-600",
  hard: "text-red-600",
};

// 카테고리별 이름 한국어
export const categoryNames = {
  exercise: "운동",
  cleaning: "정리",
  selfcare: "자기관리",
  work: "일/생산성",
  hobby: "취미",
};
