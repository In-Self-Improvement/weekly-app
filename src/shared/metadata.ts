import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://weekly-app.net";

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  openGraph?: {
    title: string;
    description: string;
    url: string;
    images?: string[];
  };
}

export const pageMetadata: Record<string, PageMetadata> = {
  "/": {
    title: "어떤 앱이든 만들어드려요! 필요한 앱 요청하세요!",
    description:
      "계산기, 게임, 도구 등 어떤 앱이든 무료로 만들어드려요! 아이디어만 있으면 OK. 포모도로 타이머, 가계부, 운동 기록기 등 필요한 앱을 요청하고 투표하세요. 개발자가 직접 제작해드립니다.",
    keywords: [
      "앱 개발 요청",
      "무료 앱 제작",
      "커스텀 앱 만들기",
      "앱 아이디어 제안",
      "맞춤형 웹앱",
      "앱 개발 서비스",
      "무료 도구 제작",
      "포모도로 타이머 앱",
      "가계부 앱 만들기",
      "운동 기록 앱",
      "필요한 앱 요청",
      "개발자 직접 제작",
    ],
    openGraph: {
      title: "어떤 앱이든 만들어드려요! 필요한 앱 요청해주세요!",
      description:
        "계산기, 게임, 도구 등 어떤 앱이든 무료로 제작! 아이디어만 제안하면 개발자가 직접 만들어드려요.",
      url: "/",
      images: ["/og-image.png"],
    },
  },
  "/weather": {
    title: "오늘 뭐 입지? 15초 날씨보고 옷차림 추천받기 - 실시간 기온별 코디",
    description:
      "오늘 두껍에 입을까 얇게? 현재 기온 12도에 맞는 옷차림 추천! 아침 출근길 10초만에 고민 해결. 체감온도까지 반영한 실시간 날씨 옷차림 정보.",
    keywords: [
      "오늘 뭐 입지",
      "현재 기온 옷차림",
      "12도 옷차림",
      "15도 옷차림",
      "20도 옷차림",
      "기온별 옷차림 추천",
      "체감온도 옷차림",
      "아침 출근 옷차림",
      "오늘의 날씨 코디",
      "과외며 후드냐",
      "반팔이냐 긴팔이냐",
    ],
    openGraph: {
      title: "오늘 뭐 입지? 기온별 옷차림 추천",
      description:
        "현재 기온에 딱 맞는 옷차림 추천! 체감온도 반영한 실시간 날씨 코디 정보.",
      url: "/weather",
      images: ["/og-image.png"],
    },
  },
  "/ladder": {
    title: "오늘 점심 누가 살까? 사다리타기 게임으로 3초만에 결정!",
    description:
      "치킨 vs 피자, 커피 누가 살까? 청소 당번은? 사다리타기로 공정하게 결정! 친구들과 실시간 게임. 10명까지 참여 가능, 모바일 최적화.",
    keywords: [
      "사다리타기 게임",
      "오늘 점심 누가 살까",
      "사다리타기 앱",
      "램덤 사다리타기",
      "므찌 사다리",
      "주문 사다리타기",
      "친구들과 사다리타기",
      "카카오톡 사다리타기",
      "당번 정하기 게임",
      "공정한 선택 게임",
    ],
    openGraph: {
      title: "오늘 점심 누가 살까? 사다리타기",
      description:
        "치킨 vs 피자, 커피 누가 살까? 사다리타기로 공정하게 결정! 10명까지 참여 가능.",
      url: "/ladder",
      images: ["/og-image.png"],
    },
  },
  "/quickwin": {
    title: "5분만에 오늘의 성취감! 작은 할일로 큰 변화 만들기 - QuickWin",
    description:
      "물 한 잔 마시기, 책상 정리하기 같은 5분 할일로 오늘의 성취감 충전! 지금 바로 할 수 있는 작은 행동들로 매일이 달라집니다. 실천 가능한 할일 리스트 제공.",
    keywords: [
      "5분 할일",
      "오늘의 성취감",
      "작은 할일 큰 변화",
      "지금 바로 할 수 있는 일",
      "하루 5분 습관",
      "스몰 스텝 할일",
      "미니멀 할일 관리",
      "작은 성취 쳋리하기",
      "일상 속 작은 습관",
      "하루 3가지 작은 할일",
    ],
    openGraph: {
      title: "5분만에 오늘의 성취감! QuickWin",
      description:
        "지금 바로 할 수 있는 5분 할일로 성취감 충전! 작은 행동으로 큰 변화를.",
      url: "/quickwin",
      images: ["/og-image.png"],
    },
  },
  "/bmi": {
    title: "내 BMI 정상일까? 30초만에 확인하는 체질량지수 계산기",
    description:
      "키 170cm 몸무게 70kg이면 BMI는? 나는 정상 체중일까 과체중일까? 30초만에 내 건강상태 확인하고 맞춤 운동 조언까지 받아보세요. 2024년 최신 WHO 기준 적용.",
    keywords: [
      "내 bmi 정상",
      "170cm 70kg bmi",
      "키 몸무게 정상 체중",
      "bmi 25 과체중",
      "체질량지수 정상범위",
      "남자 여자 bmi 차이",
      "bmi 계산법",
      "복부비만 계산기",
      "건강체중 계산",
      "다이어트 필요한가",
    ],
    openGraph: {
      title: "내 BMI 정상일까? 30초 체크",
      description:
        "키와 몸무게만 입력하면 끝! 내가 정상체중인지 과체중인지 바로 확인. WHO 최신 기준으로 정확한 건강 진단.",
      url: "/bmi",
      images: ["/og-image.png"],
    },
  },
  "/age": {
    title: "내 만나이 몇살? 2024년 정확한 나이 계산기 - 생일까지 D-데이 포함",
    description:
      "1992년 4월 15일생은 지금 몇살? 만나이와 한국나이 계산, 다음 생일까지 D-데이 계산까지! 지금까지 살아온 일수, 시간, 분, 초 단위까지 정확한 나이 정보를 한 번에.",
    keywords: [
      "내 만나이 몇살",
      "1992년생 나이",
      "2024년 나이계산",
      "생년월일 나이",
      "만나이 계산기",
      "한국나이 계산기",
      "생일까지 며칠",
      "D데이 계산기",
      "나이 직업 계산",
      "나이 계산 방법",
    ],
    openGraph: {
      title: "내 만나이 몇살? 2024년 정확한 나이 계산기",
      description:
        "생년월일만 입력하면 만나이, 한국나이, 생일 D-데이까지 한 번에! 2024년 업데이트.",
      url: "/age",
      images: ["/og-image.png"],
    },
  },
  "/percent": {
    title: "30의 20%는 얼마? 5초만에 퍼센트 계산기 - 할인율부터 팁까지",
    description:
      "30의 20%는 6, 50에서 20%를 빼면? 퍼센트 계산이 헷갈릴 때 5초만에 해결! 할인율, 증가율, 팁 계산기, 점수 퍼센트 계산까지. 수학 숙제에서 쇼핑까지 다 사용!",
    keywords: [
      "30의 20% 얼마",
      "퍼센트 계산기",
      "20% 할인계산",
      "퍼센트 계산법",
      "백분율 계산기",
      "수학 퍼센트 계산",
      "할인율 계산기",
      "증가율 계산",
      "팁 계산기",
      "비율 계산기",
    ],
    openGraph: {
      title: "30의 20%는 얼마? 5초만에 퍼센트 계산",
      description:
        "30의 20%는 6! 퍼센트 계산이 헷갈릴 때 5초만에 해결. 할인율부터 팁까지 모든 계산.",
      url: "/percent",
      images: ["/og-image.png"],
    },
  },
  "/gpa": {
    title: "내 학점 몇점? GPA 평점 계산기 - 4.5 만점 학점 계산",
    description:
      "A+는 4.5점, B+는 3.5점! 과목별 성적과 학점을 입력하면 평균 평점(GPA)을 자동 계산. 취업, 대학원 입학 전 내 학점을 정확히 확인하세요. 4.5 만점 기준.",
    keywords: [
      "내 학점 계산",
      "GPA 계산기",
      "대학 평점 계산",
      "4.5 만점 학점",
      "A+ 학점 몇점",
      "평균평점 계산",
      "취업 학점 계산",
      "대학원 학점 계산",
      "성적 평점 변환",
      "학점 평균 내기",
    ],
    openGraph: {
      title: "내 학점 몇점? GPA 평점 계산기",
      description:
        "과목별 성적과 학점 입력하면 평균 평점 자동 계산! 취업, 대학원 준비 전 정확한 내 학점 확인.",
      url: "/gpa",
      images: ["/og-image.png"],
    },
  },
  "/case-converter": {
    title: "영어 대소문자 변환기 - 대문자 소문자 한번에 변환",
    description:
      "영어 텍스트 대소문자 변환이 필요할 때! UPPER CASE, lower case, Title Case 한번에 변환. 코딩, 문서작업, 영어 공부할 때 유용한 무료 텍스트 변환 도구.",
    keywords: [
      "영어 대소문자 변환",
      "대문자 변환기",
      "소문자 변환기",
      "텍스트 변환 도구",
      "case converter",
      "영어 변환기",
      "문자 변환",
      "코딩 텍스트 변환",
      "영어 문서 변환",
      "uppercase lowercase",
    ],
    openGraph: {
      title: "영어 대소문자 변환기 - 한번에 변환",
      description:
        "UPPER, lower, Title Case 한번에 변환! 코딩, 문서작업에 유용한 무료 텍스트 변환 도구.",
      url: "/case-converter",
      images: ["/og-image.png"],
    },
  },
  "/interest-calculator": {
    title: "이자 계산기 - 예금 적금 대출 이자 정확한 계산",
    description:
      "예금 100만원 연 3% 이자는 얼마? 단리 복리 이자를 정확히 계산하세요. 은행 예금, 적금, 대출 이자 계산으로 똑똑한 금융 계획 세우기. 투자 수익률 미리 확인!",
    keywords: [
      "이자 계산기",
      "예금 이자 계산",
      "적금 이자 계산",
      "대출 이자 계산",
      "단리 복리 계산",
      "은행 이자율",
      "투자 수익률 계산",
      "금융 계산기",
      "예적금 이자",
      "만기 금액 계산",
    ],
    openGraph: {
      title: "이자 계산기 - 예금 적금 대출 이자 계산",
      description:
        "예금 100만원 연 3% 이자는 얼마? 단리 복리 정확히 계산해서 똑똑한 금융 계획 세우기!",
      url: "/interest-calculator",
      images: ["/og-image.png"],
    },
  },
  "/vat-calculator": {
    title: "부가세 계산기 - 공급가액 부가세 포함가 10% 계산",
    description:
      "100만원 + 부가세 10만원 = 110만원! 공급가액에서 부가세 포함가까지, 부가세 포함가에서 공급가액까지 양방향 계산. 사업자 세무 계산에 필수 도구.",
    keywords: [
      "부가세 계산기",
      "부가세 10% 계산",
      "공급가액 계산",
      "부가세 포함가 계산",
      "VAT 계산기",
      "세무 계산기",
      "사업자 부가세",
      "매출세액 계산",
      "부가가치세 계산",
      "세금 계산 도구",
    ],
    openGraph: {
      title: "부가세 계산기 - 10% 부가세 정확 계산",
      description:
        "100만원 + 부가세 10만원 = 110만원! 공급가액↔부가세포함가 양방향 계산으로 사업자 세무 업무 간편하게.",
      url: "/vat-calculator",
      images: ["/og-image.png"],
    },
  },
  "/stock-average-calculator": {
    title: "물타기 계산기 - 주식 코인 평균 매수가 계산기",
    description:
      "삼성전자 50만원에 10주, 45만원에 20주 샀다면 평균 매수가는? 주식 코인 물타기 투자 시 평균 매수가와 손익분기점을 정확히 계산. DCA 분할매수 투자 전략 수립!",
    keywords: [
      "물타기 계산기",
      "주식 평균가 계산",
      "코인 평균가 계산",
      "평균 매수가 계산기",
      "주식 물타기 전략",
      "분할 매수 계산",
      "DCA 계산기",
      "손익분기점 계산",
      "투자 평균가",
      "주식 투자 계산기",
    ],
    openGraph: {
      title: "물타기 계산기 - 주식 코인 평균 매수가 계산",
      description:
        "삼성전자 여러 번 매수했다면 평균가는? 주식 코인 물타기 투자 시 정확한 평균 매수가 계산!",
      url: "/stock-average-calculator",
      images: ["/og-image.png"],
    },
  },
  "/dday": {
    title: "디데이 계산기 - 시험 입시 결혼식까지 남은 날짜 계산",
    description:
      "수능까지 D-100일! 결혼식까지 D-30일! 중요한 날까지 정확히 몇 일 남았는지 계산하고 계획 세우기. 시험, 입시, 결혼, 여행 등 중요한 날짜 카운트다운.",
    keywords: [
      "디데이 계산기",
      "D-day 계산",
      "시험 디데이",
      "수능 디데이",
      "입시 디데이",
      "결혼식 디데이",
      "여행 디데이",
      "남은 날짜 계산",
      "날짜 계산기",
      "중요한 날 계산",
    ],
    openGraph: {
      title: "디데이 계산기 - 중요한 날까지 남은 날짜",
      description:
        "수능까지 D-100일! 결혼식까지 D-30일! 중요한 날까지 정확한 날짜 계산으로 완벽 계획 세우기.",
      url: "/dday",
      images: ["/og-image.png"],
    },
  },
  "/character-counter": {
    title: "글자수 세기 - 공백 포함/제외 글자수 계산기",
    description:
      "이 문장은 몇 글자? 공백 포함 27자, 공백 제외 22자! 논문, 리포트, SNS 글자수 제한 확인할 때 필수. 단어수, 문단수, 원고지 매수까지 한번에 계산.",
    keywords: [
      "글자수 세기",
      "글자수 계산기",
      "공백 포함 글자수",
      "공백 제외 글자수",
      "원고지 매수 계산",
      "단어수 세기",
      "텍스트 분석",
      "논문 글자수",
      "SNS 글자수 제한",
      "문서 글자수",
    ],
    openGraph: {
      title: "글자수 세기 - 공백 포함/제외 계산",
      description:
        "논문, 리포트 글자수 몇 자? 공백 포함/제외, 단어수, 원고지 매수까지 한번에 정확 계산!",
      url: "/character-counter",
      images: ["/og-image.png"],
    },
  },
  "/installment-calculator": {
    title: "할부 계산기 - 카드 무이자 할부 월 상환금 계산",
    description:
      "100만원 12개월 할부하면 월 얼마? 카드사별 무이자 할부, 일반 할부 조건 비교하고 최적의 할부 계획 세우기. 실제 이자 부담과 월 상환금을 미리 확인!",
    keywords: [
      "할부 계산기",
      "카드 할부 계산",
      "무이자 할부 계산",
      "월 상환금 계산",
      "할부 이자 계산",
      "카드사 할부 비교",
      "할부 시뮬레이션",
      "분할결제 계산",
      "할부 조건 비교",
      "할부 이자율",
    ],
    openGraph: {
      title: "할부 계산기 - 카드 할부 월 상환금 계산",
      description:
        "100만원 12개월 할부하면 월 얼마? 카드사별 할부 조건 비교하고 최적의 할부 계획 세우기!",
      url: "/installment-calculator",
      images: ["/og-image.png"],
    },
  },
  "/fraction-calculator": {
    title: "분수 계산기 - 분수 덧셈 뺄셈 곱셈 나눗셈 계산",
    description:
      "1/2 + 1/3 = 5/6! 분수의 사칙연산을 쉽게 계산하고 기약분수로 자동 변환. 수학 숙제, 요리 레시피 계산할 때 헷갈리는 분수 계산을 5초만에 해결!",
    keywords: [
      "분수 계산기",
      "분수 덧셈 계산",
      "분수 뺄셈 계산",
      "분수 곱셈 계산",
      "분수 나눗셈 계산",
      "기약분수 변환",
      "분수 사칙연산",
      "수학 계산기",
      "분수를 소수로",
      "분수 간단히",
    ],
    openGraph: {
      title: "분수 계산기 - 덧셈 뺄셈 곱셈 나눗셈",
      description:
        "1/2 + 1/3 = 5/6! 분수 사칙연산 쉽게 계산하고 기약분수 자동 변환으로 수학 숙제 5초 해결!",
      url: "/fraction-calculator",
      images: ["/og-image.png"],
    },
  },
  "/compound-interest": {
    title: "복리 계산기 - 투자 복리 효과 시뮬레이션",
    description:
      "매월 50만원 20년 투자하면 얼마? 연 5% 복리로 2억이 넘어요! 초기 투자금과 월 적립금으로 복리 효과를 미리 체험. 장기 투자의 마법을 확인하세요!",
    keywords: [
      "복리 계산기",
      "복리 효과 계산",
      "투자 수익률 계산",
      "월 적립 복리",
      "장기 투자 계산",
      "복리 시뮬레이션",
      "투자 계획 계산",
      "재테크 계산기",
      "복리의 마법",
      "연금 계산기",
    ],
    openGraph: {
      title: "복리 계산기 - 투자 복리 효과 시뮬레이션",
      description:
        "매월 50만원 20년 투자하면 2억 넘어요! 복리 효과 미리 체험하고 장기 투자 계획 세우기!",
      url: "/compound-interest",
      images: ["/og-image.png"],
    },
  },
  "/conversion": {
    title: "평수 변환기 - 평 ↔ 제곱미터(㎡) 면적 단위 변환",
    description:
      "32평은 몇 ㎡? 105.8㎡! 평수와 제곱미터를 쉽고 빠르게 양방향 변환. 부동산 평수 계산, 인테리어 면적 계산할 때 필수 도구. 정확한 면적 단위 변환기.",
    keywords: [
      "평수 변환기",
      "평을 제곱미터로",
      "제곱미터를 평으로",
      "32평 몇 제곱미터",
      "면적 단위 변환",
      "부동산 평수 계산",
      "평방미터 변환",
      "㎡ 평 변환",
      "아파트 평수",
      "면적 계산기",
    ],
    openGraph: {
      title: "평수 변환기 - 평 ↔ 제곱미터 변환",
      description:
        "32평은 105.8㎡! 평수와 제곱미터 쉽고 빠른 양방향 변환으로 부동산 면적 계산 간편하게!",
      url: "/conversion",
      images: ["/og-image.png"],
    },
  },
  "/retirement-calculator": {
    title: "퇴직금 계산기 - 예상 퇴직금 실수령액 계산",
    description:
      "내 퇴직금 얼마나 받을까? 근속기간과 평균임금으로 퇴직금을 정확히 계산! 퇴직소득세 자동 계산으로 실수령액까지 확인. 상여금, 연차수당 포함 정확한 계산.",
    keywords: [
      "퇴직금 계산기",
      "퇴직금 계산",
      "예상 퇴직금",
      "퇴직금 실수령액",
      "퇴직소득세 계산",
      "근속연수 계산",
      "평균임금 계산",
      "퇴직금 세금",
      "퇴직연금 계산",
      "퇴직급여 계산",
    ],
    openGraph: {
      title: "퇴직금 계산기 - 실수령액까지 정확 계산",
      description:
        "근속기간과 평균임금으로 퇴직금 예상! 퇴직소득세 자동 계산으로 실수령액 확인.",
      url: "/retirement-calculator",
      images: ["/og-image.png"],
    },
  },
  "/dashboard": {
    title: "매일 쓰는 무료 온라인 계산기 모음 - Weekly Apps",
    description:
      "BMI 계산기, 나이 계산기, 퍼센트 계산기, 할부 계산기 등 생활에 필요한 모든 계산기를 한 곳에서! 회원가입 없이 무료로 바로 사용하세요.",
    keywords: [
      "무료 온라인 계산기",
      "bmi 계산기",
      "나이 계산기",
      "퍼센트 계산기",
      "할부 계산기",
      "이자 계산기",
      "부가세 계산기",
      "주식 평단가 계산기",
      "대출 계산기",
      "지표산기 바로가기",
      "생활 계산기 앱",
      "퇴직금 계산기",
      "복리 계산기",
      "평수 변환기",
    ],
    openGraph: {
      title: "매일 쓰는 무료 온라인 계산기 모음",
      description:
        "BMI, 나이, 퍼센트, 할부, 이자, 부가세 등 30가지+ 계산기. 회원가입 없이 무료로 바로 사용!",
      url: "/dashboard",
      images: ["/og-image.png"],
    },
  },
  "/only-three": {
    title: "하루 딱 3가지만 - OnlyThree | 미니멀 목표 트래커",
    description:
      "하루에 딱 3가지만 적으세요. 선택 마비 없이 가장 중요한 것에 집중하는 미니멀 목표 관리 앱. 스트릭으로 습관 만들기, 오프라인 지원, 무료 사용.",
    keywords: [
      "할일 관리 앱",
      "미니멀 투두리스트",
      "하루 3가지 목표",
      "목표 트래커",
      "습관 만들기",
      "스트릭 앱",
      "집중력 향상",
      "선택 마비 해결",
      "심플 투두",
      "무료 목표 관리",
      "오프라인 투두앱",
      "OnlyThree",
    ],
    openGraph: {
      title: "하루 딱 3가지만 - OnlyThree",
      description:
        "선택 마비 없이 가장 중요한 3가지에만 집중하세요. 미니멀하고 중독성 있는 목표 트래커.",
      url: "/only-three",
      images: ["/og-image.png"],
    },
  },
};

export function generateMetadata(pathname: string): Metadata {
  const pageData = pageMetadata[pathname] || pageMetadata["/"];

  if (!pageData) {
    console.warn(`No metadata found for path: ${pathname}`);
  }

  return {
    title: {
      default: pageData.title,
      template: "%s | Weekly Apps",
    },
    description: pageData.description,
    keywords: pageData.keywords,
    authors: [{ name: "Weekly Apps" }],
    creator: "Weekly Apps",
    publisher: "Weekly Apps",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: pageData.openGraph?.title || pageData.title,
      description: pageData.openGraph?.description || pageData.description,
      url: pageData.openGraph?.url || pathname,
      siteName: "Weekly Apps",
      locale: "ko_KR",
      type: "website",
      images: pageData.openGraph?.images
        ? pageData.openGraph.images.map((img) => ({
            url: img,
            width: 1200,
            height: 630,
            alt: pageData.openGraph?.title || pageData.title,
          }))
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: pageData.openGraph?.title || pageData.title,
      description: pageData.openGraph?.description || pageData.description,
      images: pageData.openGraph?.images,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    // 카카오톡 및 기타 소셜 미디어를 위한 추가 메타데이터
    other: {
      // 카카오톡 App Link 메타태그
      "al:web:url": `${baseUrl}${pathname}`,
      "al:web:should_fallback": "true",
      // 이미지 크기 명시 (일부 플랫폼에서 필요)
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:image:type": "image/png",
      // 추가 소셜 미디어 지원
      "article:publisher": "https://weekly-app.net",
    },
  };
}
