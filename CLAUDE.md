# Weekly Apps 개발 가이드

## 🎨 디자인 시스템 및 컬러 가이드

### 기본 원칙
- **일관성 우선**: 모든 페이지에서 통일된 디자인 패턴 사용
- **접근성 고려**: 충분한 대비와 가독성 확보
- **shadcn 기반**: shadcn/ui 컴포넌트 시스템 활용

### 컬러 시스템

#### 1. 기본 색상 (CSS Variables)
```css
/* Light Mode */
--background: 0 0% 100%        /* 페이지 배경 */
--foreground: 0 0% 3.9%        /* 기본 텍스트 */
--card: 0 0% 100%              /* 카드 배경 */
--card-foreground: 0 0% 3.9%   /* 카드 텍스트 */
--primary: 0 0% 9%             /* 주요 색상 */
--secondary: 0 0% 96.1%        /* 보조 색상 */
--muted: 0 0% 96.1%           /* 약한 색상 */
--border: 0 0% 89.8%          /* 테두리 */
```

#### 2. 페이지별 그라데이션 배경
```css
/* 각 앱별 고유 그라데이션 - body 전체 배경 */
날씨: bg-gradient-to-br from-blue-50 to-indigo-100
QuickWin: bg-gradient-to-br from-green-50 to-teal-100  
사다리타기: bg-gradient-to-br from-purple-50 to-pink-100
BMI: bg-gradient-to-br from-purple-50 to-pink-100
```

#### 3. 카드 그라데이션 (메인 페이지)
```css
/* 메인 페이지 앱 카드 그라데이션 */
날씨: bg-gradient-to-br from-blue-500 to-indigo-600
QuickWin: bg-gradient-to-br from-green-500 to-teal-600
사다리타기: bg-gradient-to-br from-purple-500 to-pink-600
BMI: bg-gradient-to-br from-rose-500 to-orange-600
```

### 컴포넌트 사용 가이드

#### 1. 레이아웃 구조
```tsx
<div className="min-h-screen bg-gradient-to-br from-[색상]-50 to-[색상]-100 p-4">
  <div className="max-w-md mx-auto pt-8">
    {/* 헤더 */}
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        제목
      </h1>
      <p className="text-gray-600">설명</p>
    </div>
    
    {/* 메인 컨텐츠 */}
    <Card>
      {/* 내용 */}
    </Card>
  </div>
</div>
```

#### 2. 카드 컴포넌트
```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// 기본 카드
<Card className="mb-4">
  <CardHeader>
    <CardTitle className="text-center text-[색상]-700">
      🎯 제목
    </CardTitle>
    <CardDescription className="text-center">
      설명
    </CardDescription>
  </CardHeader>
  <CardContent>
    {/* 내용 */}
  </CardContent>
</Card>

// 상태별 카드 (결과 표시)
<Card className={`mb-4 ${bgColor} ${borderColor}`}>
  {/* 내용 */}
</Card>
```

#### 3. 버튼 컴포넌트
```tsx
import { Button } from "@/components/ui/button";

// 주요 액션 버튼
<Button className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-[색상]-500 to-[색상]-600 hover:from-[색상]-600 hover:to-[색상]-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
  버튼 텍스트
</Button>

// 보조 버튼
<Button variant="outline" className="h-12 px-4">
  보조 액션
</Button>
```

#### 4. 입력 필드
```tsx
// 기본 입력 필드 (네이티브 input 사용 권장)
<input
  type="number"
  inputMode="decimal"
  placeholder="예: 170"
  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[색상]-500 focus:border-transparent text-center text-lg"
/>
```

### 상태별 색상 가이드

#### 1. BMI 결과 색상
```tsx
const categoryColors = {
  저체중: {
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200"
  },
  정상: {
    color: "text-green-600", 
    bgColor: "bg-green-50 border-green-200"
  },
  과체중: {
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 border-yellow-200"
  },
  비만: {
    color: "text-orange-600",
    bgColor: "bg-orange-50 border-orange-200"
  },
  고도비만: {
    color: "text-red-600",
    bgColor: "bg-red-50 border-red-200"
  }
};
```

#### 2. 일반적인 상태 색상
```css
성공: text-green-600, bg-green-50, border-green-200
경고: text-yellow-600, bg-yellow-50, border-yellow-200  
오류: text-red-600, bg-red-50, border-red-200
정보: text-blue-600, bg-blue-50, border-blue-200
```

### 반응형 디자인

#### 1. 컨테이너 크기
```css
/* 모바일 우선 */
max-w-md mx-auto    /* 기본 (모바일) */
max-w-lg mx-auto    /* 태블릿 */
max-w-4xl mx-auto   /* 데스크톱 (메인 페이지만) */
```

#### 2. 그리드 레이아웃
```css
/* 메인 페이지 앱 그리드 */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
```

### 새로운 페이지 추가 시 체크리스트

#### 1. 필수 파일
- [ ] `/src/app/[앱이름]/page.tsx` - 메인 컴포넌트
- [ ] `/src/app/[앱이름]/layout.tsx` - SEO 메타데이터

#### 2. 디자인 요소
- [ ] 페이지별 고유 그라데이션 배경 적용
- [ ] shadcn Card, Button 컴포넌트 사용
- [ ] 일관된 헤더 구조 (제목 + 설명)
- [ ] 모바일 우선 반응형 디자인

#### 3. 메인 페이지 연동
- [ ] `/src/app/page.tsx`의 apps 배열에 앱 정보 추가
- [ ] 고유한 그라데이션 색상 설정
- [ ] 적절한 이모지 아이콘 선택

#### 4. SEO 설정
- [ ] 페이지별 title, description 최적화
- [ ] keywords 설정 (CPC 높은 키워드 포함)
- [ ] openGraph, twitter 메타데이터

### 색상 충돌 방지 가이드

#### ❌ 피해야 할 패턴
```tsx
// 배경과 카드가 같은 색상대 사용
<div className="bg-purple-100">
  <Card className="bg-purple-50"> {/* 충돌! */}
```

#### ✅ 권장 패턴
```tsx
// shadcn CSS 변수 활용
<div className="bg-gradient-to-br from-purple-50 to-pink-100">
  <Card> {/* 자동으로 적절한 배경색 적용 */}
    
// 또는 명시적 색상 구분
<div className="bg-purple-100">
  <Card className="bg-white border border-purple-200">
```

### 개발 시 주의사항

1. **항상 shadcn 컴포넌트 우선 사용**
2. **CSS 변수 활용**으로 일관성 유지
3. **배경색과 카드색 대비** 확인
4. **모바일 우선** 설계
5. **접근성** 고려 (충분한 대비, 키보드 네비게이션)

---

## 📱 앱별 특성

### BMI 계산기
- **타겟 키워드**: BMI, 체질량지수, 비만도 측정
- **배경**: purple-pink 그라데이션
- **특징**: 간단한 2입력 계산기, 상세한 건강 조언

### 날씨 앱  
- **배경**: blue-indigo 그라데이션
- **특징**: 위치 기반, 옷차림 추천

### QuickWin
- **배경**: green-teal 그라데이션  
- **특징**: 할일 관리, 성취감

### 사다리타기
- **배경**: purple-pink 그라데이션
- **특징**: 게임, 랜덤 선택