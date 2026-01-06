# Deadlock Client 프로젝트 코딩 및 아키텍처 스타일 가이드

이 문서는 Deadlock Client 프로젝트의 코드 생성 및 리뷰를 위한 가이드라인입니다. Gemini는 모든 코드 제안 시 아래 규칙을 준수해야 합니다.

## 1. 아키텍처 원칙: Feature-based Clean Architecture

도메인 중심 설계(DDD)를 기반으로 UI와 비즈니스 로직을 분리하고, 기술적 세부 사항이 비즈니스 로직을 침범하지 않도록 계층을 분리합니다.

### 디렉토리 구조

```
src/
├── features/           # 기능별 모듈 (Feature-based)
│   └── user/
│       ├── domain/     # 도메인 로직
│       ├── application/# 애플리케이션 로직 (hooks, services)
│       └── presentation/# UI 컴포넌트 (components, pages)
├── shared/            # 공통 모듈
│   ├── types/         # 공통 타입 정의
│   ├── utils/         # 유틸리티 함수
│   ├── hooks/         # 공통 훅
│   └── components/    # 공통 컴포넌트
├── api/               # API 통신 관련
│   ├── client.ts      # API 클라이언트 설정
│   └── endpoints/     # 엔드포인트 정의
└── routes/            # 라우팅
```

### 계층별 규칙

- **Domain 계층** (`features/*/domain/`):
  - 모든 비즈니스 핵심 로직과 타입 정의를 포함합니다.
  - **도메인 순수성**: UI 프레임워크(SolidJS, React 등) 및 외부 라이브러리에 대한 의존성이 전혀 없는 **순수 TypeScript 타입과 함수**여야 합니다.
  - 프레임워크 특정 API(`createSignal`, `createEffect` 등)를 사용하지 않습니다.
  - 예: `types.ts`, `models.ts`, `validators.ts`, `domainLogic.ts`
- **Application 계층** (`features/*/application/`):

  - 비즈니스 유즈케이스를 수행하고 상태 관리를 담당합니다.
  - **커스텀 훅(hooks)**: SolidJS의 반응성 시스템을 활용한 비즈니스 로직 훅을 정의합니다.
  - **서비스(services)**: 외부 API 호출 및 데이터 변환 로직을 담당합니다.
  - **DTO 변환**: API 응답을 도메인 모델로 변환하거나, 도메인 모델을 API 요청 형식으로 변환합니다.
  - 도메인 로직을 호출하고, 상태를 관리하며, 사이드 이펙트를 처리합니다.
  - 예: `useUserProfile.ts`, `userService.ts`, `userAdapter.ts`

- **Presentation 계층** (`features/*/presentation/`):

  - UI 컴포넌트와 페이지를 담당합니다.
  - **컴포넌트 분리**: Presentational 컴포넌트와 Container 컴포넌트를 분리합니다.
  - **컴포넌트 순수성**: Presentation 계층의 컴포넌트는 Application 계층의 훅을 통해 비즈니스 로직에 접근합니다.
  - 직접적인 API 호출이나 복잡한 비즈니스 로직을 포함하지 않습니다.
  - 예: `UserProfile.tsx`, `UserList.tsx`, `UserForm.tsx`

- **Shared 계층** (`shared/`):
  - 특정 도메인에 종속되지 않는 **시스템 전역의 공통 모듈**을 담당합니다.
  - 구성 요소: `types/`, `utils/`, `hooks/`, `components/` 등.
  - 전역적인 유틸리티, 공통 컴포넌트, 공통 타입 정의를 관리합니다.

### 의존성 방향

- 의존성은 항상 **바깥쪽에서 안쪽(Presentation -> Application -> Domain)**으로 향해야 합니다.
- 내부 계층(Domain, Application)은 외부 계층(Presentation, Shared)의 존재를 몰라야 합니다.
- Domain 계층은 순수 TypeScript로 작성되어야 하며, 프레임워크에 의존하지 않아야 합니다.

## 2. 명명 규칙 및 코드 스타일 (Naming & Style)

가독성을 최우선으로 하며, 협업 시 오해를 줄이기 위해 명확한 용어를 사용합니다.

### 컴포넌트 및 파일 명명 규칙

- **컴포넌트 파일**: PascalCase 사용, 확장자는 `.tsx`
  - 예: `UserProfile.tsx`, `UserList.tsx`, `SignupForm.tsx`
- **훅 파일**: `use` 접두사 사용, camelCase, 확장자는 `.ts`
  - 예: `useUserProfile.ts`, `useAuth.ts`, `useApi.ts`
- **유틸리티 파일**: camelCase, 확장자는 `.ts`
  - 예: `formatDate.ts`, `validateEmail.ts`, `apiClient.ts`
- **타입 정의 파일**: camelCase, 확장자는 `.ts`
  - 예: `userTypes.ts`, `apiTypes.ts`

### 변수 및 함수 명명 규칙

- **변수/함수**: camelCase 사용
  - 예: `userName`, `getUserProfile`, `handleSubmit`
- **상수**: SCREAMING_SNAKE_CASE 사용
  - 예: `API_BASE_URL`, `MAX_RETRY_COUNT`, `DEFAULT_PAGE_SIZE`
- **타입/인터페이스**: PascalCase 사용
  - 예: `User`, `UserProfile`, `ApiResponse<T>`

### 줄임말 사용 가이드 (Practical Naming)

무분별한 줄임말은 지양하되, 업계 표준으로 통용되는 기술 용어는 허용합니다.

- **허용하는 표준 약어**:
  - `API`, `ID`, `URL`, `UUID`, `HTTP`, `HTTPS`, `JSON`, `UI`, `UX`, `DOM`, `CSS`, `HTML`
  - 예: `userAPI.ts`, `userId`, `apiUrl` (O)
- **지양하는 모호한 줄임말 (풀네임 권장)**:
  - `req` -> `Request`, `res` -> `Response`, `resp` -> `Response`
  - `cnt` -> `Count`, `num` -> `Number`, `str` -> `String`
  - `btn` -> `Button`, `img` -> `Image`, `txt` -> `Text`
  - `fn` -> `Function`, `cb` -> `Callback`, `val` -> `Value`
- **적용 예시**:
  - `UserReq` (X) -> `UserRequest` (O)
  - `UserRes` (X) -> `UserResponse` (O)
  - `handleBtnClick` (X) -> `handleButtonClick` (O)
  - `getUserCnt` (X) -> `getUserCount` (O)

### 기술 스택 준수

- **TypeScript**: 엄격한 타입 체크를 사용하며, `any` 타입 사용을 최소화합니다.
- **SolidJS 1.9+**: 반응성 시스템(`createSignal`, `createEffect`, `createMemo`)을 적절히 활용합니다.
- **SolidStart 1.1+**: 서버 사이드 렌더링(SSR) 및 라우팅 기능을 활용합니다.
- **TailwindCSS 4.0+**: 유틸리티 퍼스트 CSS 접근 방식을 사용합니다.
- **Node.js 22+**: 최신 ECMAScript 기능을 활용합니다.

## 3. 상태 관리 및 반응성 (State Management & Reactivity)

SolidJS의 반응성 시스템을 활용하여 효율적인 상태 관리를 구현합니다.

### Signal 사용 원칙

- **로컬 컴포넌트 상태**: `createSignal` 사용
  ```typescript
  const [count, setCount] = createSignal(0);
  ```
- **파생 상태**: `createMemo` 사용
  ```typescript
  const doubled = createMemo(() => count() * 2);
  ```
- **사이드 이펙트**: `createEffect` 사용
  ```typescript
  createEffect(() => {
    console.log("Count changed:", count());
  });
  ```

### 비동기 처리

- **비동기 데이터 로딩**: `createResource` 사용
  ```typescript
  const [user, { refetch }] = createResource(() => fetchUser(userId));
  ```
- **에러 처리**: Error Boundary와 함께 적절한 에러 핸들링 구현

## 4. API 통신 및 에러 처리 (API Communication & Error Handling)

### API 클라이언트 구조

- **중앙화된 API 클라이언트**: `src/api/client.ts`에서 Axios 또는 Fetch 기반 클라이언트 설정
- **타입 안전성**: 모든 API 응답에 타입을 정의합니다.
- **에러 핸들링**: 공통 에러 처리 로직을 구현합니다.

### 에러 처리 원칙

- **API 에러**: 공통 에러 타입 정의 및 처리
  ```typescript
  interface ApiError {
    code: string;
    message: string;
    details?: unknown;
  }
  ```
- **비즈니스 에러**: 도메인별 에러 코드 정의
  - 예: `UserErrorCode.NOT_FOUND`, `AuthErrorCode.UNAUTHORIZED`
- **에러 표시**: 사용자 친화적인 에러 메시지 표시
- **에러 복구**: 적절한 재시도 및 폴백 메커니즘 구현

### 응답 타입 정의

- 모든 API 응답은 타입을 정의합니다.
- 공통 응답 래퍼 타입 사용:
  ```typescript
  interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: ApiError;
  }
  ```

## 5. 컴포넌트 설계 원칙

### 컴포넌트 분리

- **Presentational 컴포넌트**: UI 렌더링에만 집중
- **Container 컴포넌트**: 비즈니스 로직과 상태 관리 담당
- **컴포넌트 재사용성**: 공통 컴포넌트는 `shared/components/`에 배치

### Props 타입 정의

- 모든 컴포넌트의 props는 명시적으로 타입을 정의합니다.

  ```typescript
  interface UserProfileProps {
    userId: string;
    onUpdate?: (user: User) => void;
  }

  export function UserProfile(props: UserProfileProps) {
    // ...
  }
  ```

### 이벤트 핸들러 명명

- 이벤트 핸들러는 `handle` 접두사를 사용합니다.
  - 예: `handleSubmit`, `handleClick`, `handleChange`

## 6. 스타일링 규칙

### TailwindCSS 사용

- **유틸리티 클래스 우선**: 인라인 스타일보다 TailwindCSS 유틸리티 클래스 사용
- **커스텀 클래스**: 반복되는 스타일 패턴은 `@apply` 디렉티브로 추출
- **반응형 디자인**: 모바일 퍼스트 접근 방식 사용
  - 예: `flex flex-col md:flex-row`

### 접근성 (Accessibility)

- 시맨틱 HTML 사용
- ARIA 속성 적절히 활용
- 키보드 네비게이션 지원
- 스크린 리더 고려

## 7. 테스트 코드

- 모든 핵심 로직과 컴포넌트에는 테스트를 포함합니다.
- **단위 테스트**: 도메인 로직 및 유틸리티 함수
- **컴포넌트 테스트**: UI 컴포넌트 렌더링 및 상호작용
- **통합 테스트**: 기능별 엔드투엔드 플로우
- 테스트 메서드 명은 `Given_When_Then` 구조를 따르는 한글 이름을 허용합니다.
  - 예: `사용자_프로필_조회_성공_테스트()`, `로그인_실패_시_에러_표시_테스트()`

## 8. 코드 품질 및 성능

### 성능 최적화

- **불필요한 리렌더링 방지**: `createMemo`를 활용한 메모이제이션
- **지연 로딩**: 코드 스플리팅 및 동적 임포트 활용
- **이미지 최적화**: 적절한 이미지 포맷 및 크기 사용

### 코드 품질

- **ESLint/Prettier**: 코드 포맷팅 및 린팅 규칙 준수
- **타입 안전성**: `any` 타입 사용 최소화
- **코드 리뷰**: PR 시 코드 리뷰를 통해 품질 검증
