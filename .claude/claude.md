# Sokind Web 프로젝트 컨벤션

## 📁 폴더 구조 및 네이밍 규칙

### 폴더 네이밍

- **UI 포함 폴더** (Screens, Components): `kebab-case` 사용
  - 예: `video-card/`, `sound-wave-sphere/`, `typing-text-view/`
- **일반 폴더**: `camelCase` 사용
  - 예: `themeProvider/`, `reactQuery/`, `globalLayout/`
- **로컬 전용 폴더**: 언더스코어(\_) 접두사 사용
  - 예: `_components/`, `_hooks/`, `_store/`, `_utils/`, `_types/`

### 파일 네이밍

- **컴포넌트/Screen(UI가 포함된 파일)**: `index.tsx` (각 폴더 내)
- **타입 파일**: `{domain}Type.ts`
  - 예: `errorType.ts`, `userType.ts`, `virtualEducationType.ts`
- **훅 파일**: `use{Feature}.ts`
  - 예: `useError.ts`, `useTypingEffect.ts`, `useVirtualEducation.ts`
- **유틸 파일**: `{domain}Util.ts`
  - 예: `errorUtil.ts`, `dateUtil.ts`, `validationUtil.ts`
- **서비스 파일**: `{domain}Service.ts`
  - 예: `userService.ts`, `authService.ts`, `apiService.ts`
- **스토어 파일**: `{domain}Store.ts`
  - 예: `virtualEducationStore.ts`, `userStore.ts`

## 🎯 컴포넌트 가이드라인

### 위치 구분

- **글로벌** (`src/components/`): 여러 화면에서 재사용 가능한 디자인 시스템 컴포넌트
- **로컬** (`_components/`): 특정 화면 전용, 단일 사용 컴포넌트

### 컴포넌트 표준

- 각 컴포넌트는 폴더 내 `index.tsx`로 export
- **최대 300줄 제한** (가독성과 유지보수성)
- 300줄 초과 시 서브 컴포넌트로 분리
- Single Responsibility Principle (SRP) 준수

### 복잡도 관리

- 복잡한 로직은 커스텀 훅으로 추출
- 반복 로직은 유틸 함수로 추출
- 복잡한 상태 관리는 스토어로 분리

## 📱 Screens 컴포넌트 가이드라인

### 역할

- 전체 화면을 나타내는 최상위 컨테이너
- 페이지 레벨 상태 관리 및 비즈니스 로직 포함
- 로컬 및 글로벌 리소스 조합 및 조정

### 리소스 활용

- **로컬**: `_components/`, `_hooks/`, `_store/`, `_utils/`, `_types/`
- **글로벌**: `src/components/`, `src/hooks/`, `src/utils/` 등

## 📝 타입 정의 가이드라인

### 위치 구분

- **글로벌** (`src/types/`): 도메인 간 공유 타입
- **로컬** (`_types/`): 화면별 타입 정의

### 타입 정의 규칙

- `interface`: 객체 구조, Props, API 응답 형태
- `type`: Union, Tuple, 함수 타입, 계산된 타입
- 컴포넌트 Props는 컴포넌트 파일 내부에 정의

## 🎣 훅 가이드라인

### 위치 구분

- **글로벌** (`src/hooks/`): 여러 화면에서 사용하는 로직, 공유 상태 관리
- **로컬** (`_hooks/`): 화면별 비즈니스 로직

### 훅 표준

- 파일명: `use{Feature}.ts` 패턴 필수
- 훅 함수명: 파일명과 동일
- Single Responsibility Principle 준수
- 명확한 객체 형태의 반환값

### 훅 책임

- 컴포넌트 상태 관리 (loading, error, data)
- 비즈니스 로직 캡슐화
- 사이드 이펙트 처리
- 데이터 페칭 및 변환

## 🗄️ 스토어 관리 가이드라인

### 위치 구분

- **글로벌** (`src/store/`): 여러 화면에서 공유하는 상태
- **로컬** (`_store/`): 화면별 상태 관리

### 스토어 표준

- 파일명: `{domain}Store.ts` 패턴
- 명확한 상태 정의
- 직관적인 액션 메서드 네이밍
- 복잡한 로직은 별도 유틸로 추출

## 🔧 유틸리티 함수 가이드라인

### 위치 구분

- **글로벌** (`src/utils/`): 도메인 간 유틸리티, 공유 헬퍼
- **로컬** (`_utils/`): 화면별 유틸리티 함수

### 유틸 표준

- 파일명: `{domain}Util.ts` 패턴
- 순수 함수로만 구성
- 사이드 이펙트 없음
- 명확한 입출력 타입 정의

## 🚨 App Router 페이지 가이드라인

### 중요 제약사항

- `page.tsx`는 순수하게 라우팅 레이어로만 사용
- 비즈니스 로직 구현 절대 금지
- `screens/` 폴더의 Screen 컴포넌트만 import

### 올바른 구조

```tsx
// ✅ 올바른 예시
import VirtualTrainingScreen from "@/screens/educations/virtual/training";
export default function Page() {
  return <VirtualTrainingScreen />;
}

// ❌ 잘못된 예시
import VideoCard from "@/screens/educations/virtual/training/_components/video-chat/videoCard";
```

## 📦 Import 규칙 및 코드 품질

### Import 순서

1. React/Next.js 관련
2. 외부 라이브러리
3. 절대 경로 import (`@/`)
4. 상대 경로 import (종속 하위 폴더만)

### Import 규칙

- 도메인 간 import는 alias 사용 (`@/screens/...`, `@/components/...`)
- 절대 경로 사용 금지 (`src/screens/...` ❌)
- 상대 경로는 종속 하위 import에만 사용

### 스타일링

- Tailwind CSS 우선 사용
- CSS 파일은 예외적인 경우에만 허용
- 조건부 클래스는 `cn()` 유틸리티로 관리

### 코드 품질

- 매직 넘버는 상수로 추출
- 복잡한 조건문은 변수로 추출
- 300줄 컴포넌트 제한 고려 (불가피한 경우 제외)
- Props drilling 방지

## 🌐 다국어 처리

- `next-intl` 라이브러리 사용
- `useTranslations` 훅으로 번역 처리
- 번역 키는 도메인별로 구조화

## ⚙️ TypeScript 설정

- 모든 컴포넌트에 타입 정의 필수
- API 응답은 별도 `types.ts` 파일에 정의
- `any` 타입 사용 금지
- strict 모드 활성화

## 🎨 디자인 시스템

- 커스텀 타이포그래피: `typo-*` 클래스
- 색상 시스템:
  - 텍스트: `text-label-*`
  - 배경: `bg-fill-*`
  - 보더: `border-line-*`
- 일관된 spacing 시스템 사용

## ✅ 코드 리뷰 체크리스트

- [ ] 폴더 네이밍 규칙 준수 (kebab-case, camelCase, \_prefix)
- [ ] 파일 네이밍 패턴 준수
- [ ] 컴포넌트 300줄 제한
- [ ] 적절한 위치 선택 (글로벌 vs 로컬)
- [ ] Single Responsibility Principle 준수
- [ ] Import 순서 및 규칙 준수
- [ ] TypeScript 타입 정의 완전성
- [ ] Tailwind CSS 우선 사용
- [ ] Props drilling 방지
- [ ] 매직 넘버 상수화
