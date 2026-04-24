# 🧭 Frontend Team Wiki

이 문서는 프론트엔드 팀의 기술, 규칙, 결정사항, 운영 방식을 기록하고 공유하기 위한 위키입니다.
모든 변경 사항은 문서화 및 날짜 기록을 원칙으로 합니다.

> 최초 작성: 2026-04-10

---

## 📌 1. 프로젝트 개요

### 🎯 1-1 목적

- CS 퀴즈 / 면접 준비 플랫폼 **hellocs.site** 의 클라이언트 애플리케이션 개발 및 유지보수
- 웹과 모바일(iOS/Android) 두 플랫폼 동시 지원을 단일 모노레포로 관리

### 👥 1-2 대상 사용자

| 구분 | 대상 |
|---|---|
| 주요 사용자 | CS 취업 준비 중인 개발자 |
| 보조 사용자 | 이미 취업한 뒤 지식 점검을 원하는 개발자 |

### ⚙️ 1-3 주요 기능

- **퀴즈 풀기**: OX / 객관식 / 단답형 3가지 유형의 CS 퀴즈 (회당 5문항)
- **음성 답변 (Voice Quiz)**: 모바일 마이크 녹음 → STT 변환으로 단답형 답변 입력
- **채점 및 피드백**: 퀴즈 제출 후 AI 채점 + 오답 상세 확인
- **학습 스트릭**: 연속 학습일 달력 시각화
- **랭킹**: 전체 사용자 점수 순위
- **온보딩**: 이름 → 관심사 → 퀴즈 레벨 → 완료 4단계
- **소셜 로그인**: 카카오 OAuth

---

## 🧑‍💻 2. 기술 스택

### 🧩 2-1 Web 기본 스택

| 구분 | 기술 | 버전 |
|---|---|---|
| Framework | React | 19 |
| Language | TypeScript | ~5.9 |
| Build Tool | Vite | 8 |
| Routing | Stackflow (`@stackflow/react`) | 1.x |
| Styling | TailwindCSS + tailwind-merge + CVA | 4.2 |
| Client State | Zustand | 5 |
| Server State | TanStack React Query | 5 |
| HTTP Client | Ky | 1.x |
| Animation | Motion (Framer Motion) | 12 |
| Package Manager | pnpm | 9.15 |

### 🧩 2-2 Mobile 기본 스택

| 구분 | 기술 | 버전 |
|---|---|---|
| Framework | React Native (Expo) | 54 |
| Language | TypeScript | catalog 공유 |
| Navigation | expo-router | 6 |
| WebView | react-native-webview | 13.15 |
| Bridge | @webview-bridge/react-native | 1.7 |
| 음성 녹음 | expo-av | 16 |
| Package Manager | npm | - |

### 🧩 2-3 공통 / 인프라

| 구분 | 기술 |
|---|---|
| API 타입 자동생성 | openapi-typescript (OpenAPI → TypeScript) |
| CI/CD | GitHub Actions (self-hosted runner) |
| 서빙 | Docker + Nginx 1.27 |
| 모니터링 | Grafana (Nginx 프록시) |
| Lint | ESLint 9 + typescript-eslint |
| Commit | commitlint (커스텀 emoji 타입) |

---

## 🏗️ 3. 아키텍처 및 구조

### 3-1 모노레포 구조

```
Deadlock-Client/
├── web/          # React 19 + Vite 웹 앱 (pnpm)
├── mobile/       # React Native Expo 앱 (npm)
└── CLAUDE.md
```

두 앱은 별도 패키지 매니저와 `node_modules`를 사용한다. 타입 공유는 없고, 브릿지 인터페이스(`AppBridgeType`)를 통해 Web ↔ Native 계약을 맞춘다.

### 3-2 Web 디렉토리 구조

```
web/src/
├── app/            # Stackflow 설정, 라우트 정의, 인증 쉘
├── pages/          # 각 라우트 Activity 컴포넌트
│   ├── home/
│   ├── login/
│   ├── onboarding/
│   ├── quiz/
│   ├── ranking/
│   ├── streak/
│   ├── user/
│   └── interview/
├── components/     # UI 컴포넌트 (feature별 + common/)
├── model/          # Zustand 스토어 + 커스텀 훅
│   ├── auth/       # useAuthStore
│   ├── quiz/       # useQuizStore, useQuizSolve, useVoiceQuiz
│   └── user/       # useUserStore
├── api/            # API 레이어
│   ├── config/     # ky 클라이언트, 엔드포인트, 자동생성 타입
│   ├── auth/
│   ├── quiz/
│   ├── ranking/
│   ├── streak/
│   └── user/
└── assets/         # 아이콘 SVG 컴포넌트
```

### 3-3 Routing (Stackflow)

- 각 페이지 = **Activity** 단위. `stackflow-route.tsx`에서 `name / component / path` 를 등록.
- URL 동기화: `historySyncPlugin` — 브라우저 히스토리와 Activity 스택 자동 연동.
- 기본 fallback Activity: `LoginPage`
- 진입점: `HomePage` (인증 완료 후)
- 모든 Activity는 `lazy()` 로드로 코드 스플리팅 적용.

```ts
// 새 페이지 추가 예시
{ name: "NewPage", component: lazy(() => import("@/pages/new/NewPage")), path: "/new" }
```

### 3-4 상태 관리

| 상태 유형 | 도구 | 위치 |
|---|---|---|
| 인증 토큰 | Zustand (`useAuthStore`) | `model/auth/` |
| 퀴즈 풀이 흐름 (OX→객관식→단답형 순서) | Zustand (`useQuizSolveStore`) | `model/quiz/` |
| 서버 데이터 캐시 | React Query | `api/*/api.query.ts` |
| 유저 프로필 | Zustand (`useUserStore`) | `model/user/` |

### 3-5 API 통신 방식

```
api/config/
├── api-client.ts         # ky 인스턴스 (baseApiClient, authApiClient)
├── api-client-handler.ts # 응답 파싱 유틸
├── api-client-method.ts  # GET/POST/PATCH/DELETE 래퍼
├── api-endpoints.ts      # END_POINTS 상수
└── api-models.ts         # openapi-typescript 자동생성 타입
```

- **인증 흐름**: `beforeRequest` 훅에서 `Authorization: Bearer <token>` 주입
- **토큰 갱신**: 401 응답 시 `afterResponse` 훅에서 `/auth/reissue` 자동 호출, 동시 요청 중복 방지(Promise 공유)
- **기능별 쿼리**: `api/*/api.query.ts` 에서 `queryOptions` / `mutationOptions` 로 export

---

## 🔗 4. 브릿지 / 외부 연동 구조

### 4-1 Web ↔ Native 구조

모바일 앱은 WebView로 웹 앱을 래핑한다. 네이티브 기능(마이크, 로그인 상태)은 **`@webview-bridge`** 라이브러리를 통해 Web에서 호출한다.

```
Web (React)                  Native (React Native)
─────────────────────────── ──────────────────────────────
window.bridge.xxx()   ─────▶  bridge/index.ts 구현체 실행
                      ◀─────  Promise 결과 반환
```

### 4-2 현재 브릿지 인터페이스

```ts
interface AppBridgeType extends Bridge {
  isLoggedIn: boolean;
  logout: () => Promise<void>;
  startRecording: () => Promise<{ status: "success" | "error"; errorMessage?: string }>;
  stopRecording: () => Promise<{ status: "success" | "error"; text?: string; errorMessage?: string }>;
}
```

| 메서드 | 설명 |
|---|---|
| `isLoggedIn` | 네이티브에서 관리하는 로그인 상태 |
| `logout()` | 네이티브 측 로그인 상태 초기화 |
| `startRecording()` | iOS/Android 마이크 권한 요청 + 녹음 시작 (expo-av) |
| `stopRecording()` | 녹음 종료 + STT 변환 후 텍스트 반환 |

### 4-3 새 네이티브 기능 추가 절차

1. `mobile/bridge/index.ts`의 `AppBridgeType` 인터페이스에 메서드 추가
2. `bridge()` 구현체 내부에 로직 작성
3. 웹에서 `window.bridge.newMethod()` 호출

### 4-4 딥링크 / 네비게이션 처리

- `webview/createHandleShouldStartLoad.ts`: `onShouldStartLoadWithRequest` 핸들러
  - `intent:` 스킴 → `browser_fallback_url` 파싱 후 `window.location` 이동
  - `kakaotalk://`, `kakaokompass://` 등 → `Linking.openURL()` 로 앱 실행
  - `kauth.kakao.com` → WebView 내 처리 (카카오 OAuth 플로우)
  - HTTP/HTTPS → WebView 처리
  - 그 외 커스텀 스킴 → 네이티브 위임

### 4-5 음성 녹음 (STT) 흐름

```
Web: window.bridge.startRecording()
       ↓
Native: 마이크 권한 요청 → expo-av 녹음 시작
       ↓ (사용자가 완료 시)
Web: window.bridge.stopRecording()
       ↓
Native: 녹음 종료 → STT 서버 전송 → 텍스트 반환
       ↓
Web: 반환된 텍스트를 단답형 입력값으로 사용
```

> ⚠️ 현재 STT 서버 전송 로직은 미구현 (mock 텍스트 반환 중). `bridge/audioRecorder.ts`의 `sendAudioToServer` 함수 구현 필요.

---

## 📏 5. 코드 규칙 및 컨벤션

### 5-1 커밋 메시지

```
emoji [type] 한글 설명
```

| type | 사용 상황 |
|---|---|
| `feat` | 신규 기능 |
| `fix` | 버그 수정 |
| `refactor` | 리팩토링 |
| `chore` | 빌드/설정 변경 |
| `docs` | 문서 |
| `style` | 스타일(코드 변경 없음) |
| `test` | 테스트 |
| `perf` | 성능 개선 |
| `rename` | 파일/변수명 변경 |
| `remove` | 코드/파일 삭제 |

예시: `✨ [feat] 퀴즈 타이머 추가`

### 5-2 파일 / 컴포넌트 네이밍

| 대상 | 규칙 | 예시 |
|---|---|---|
| 컴포넌트 파일 | PascalCase | `QuizSolvePage.tsx` |
| 훅 파일 | camelCase, `use` 접두사 | `useQuizStore.ts` |
| API 파일 | camelCase, 동사+명사 | `postQuizList.ts` |
| 상수 | UPPER_SNAKE_CASE | `QUIZ_SOLVE_TOTAL_COUNT` |
| 경로 alias | `@/*` → `src/*` | `@/components/common/Button` |

### 5-3 디렉토리 규칙

- **pages**: Stackflow Activity만 배치. 페이지 로직은 model/ 또는 components/로 분리.
- **components**: feature명 폴더 하위에 관련 컴포넌트 배치. 재사용 공통 컴포넌트는 `common/`.
- **model**: Zustand store + 관련 커스텀 훅을 feature별로 묶음.
- **api**: `api.model.ts` (응답 타입) / `api.query.ts` (queryOptions) / 개별 fetch 함수 파일로 구분.

### 5-4 스타일링 규칙

- 유틸리티 클래스: TailwindCSS 4.2
- 클래스 병합: `cn()` 유틸 (tailwind-merge + clsx)
- 컴포넌트 variants: CVA (`class-variance-authority`) 사용

```ts
// CVA 예시
const buttonVariant = cva("base-class", {
  variants: { size: { large: "...", medium: "..." } },
  defaultVariants: { size: "large" },
});
```

### 5-5 ESLint Import 순서 (강제)

```
@/app → @/pages → @/components → @/api → @/model → 나머지
```

### 5-6 상태 관리 규칙

- 서버 데이터(목록, 상세): React Query
- UI 흐름 상태(퀴즈 단계, 선택값): Zustand
- 전역 인증 토큰: Zustand (`useAuthStore`)
- Zustand store는 `model/<feature>/` 하위에 위치

---

## ⚠️ 6. 기술적 의사결정 (ADR)

### ADR-001: Stackflow 채택 (vs React Router / TanStack Router)

| 항목 | 내용 |
|---|---|
| **결정** | Stackflow 사용 |
| **이유** | 모바일 앱 같은 Activity 스택 기반 네비게이션 UX 구현 (push/pop 슬라이드 트랜지션), WebView 내에서도 네이티브 느낌의 화면 전환 필요 |
| **대안** | React Router v7, TanStack Router |
| **트레이드오프** | 생태계가 작고 레퍼런스 부족. URL 동기화는 `historySyncPlugin`으로 별도 구성 필요 |

### ADR-002: Ky HTTP 클라이언트 채택 (vs fetch / axios)

| 항목 | 내용 |
|---|---|
| **결정** | Ky 사용 |
| **이유** | fetch 기반으로 번들 크기 최소화, 훅(beforeRequest / afterResponse)으로 토큰 주입/갱신 처리가 깔끔함 |
| **대안** | axios, 순수 fetch |
| **트레이드오프** | axios 대비 인터셉터 API가 달라 팀 러닝 커브 존재 |

### ADR-003: @webview-bridge 채택 (vs postMessage 직접 구현)

| 항목 | 내용 |
|---|---|
| **결정** | @webview-bridge 라이브러리 사용 |
| **이유** | postMessage 기반 수동 구현 대비 TypeScript 타입 안전성 확보, Promise 기반 비동기 호출 자동 처리 |
| **대안** | `window.ReactNativeWebView.postMessage` 직접 구현 |
| **트레이드오프** | 라이브러리 의존성 추가, 내부 직렬화 방식에 종속 |

### ADR-004: OpenAPI TypeScript 자동 생성

| 항목 | 내용 |
|---|---|
| **결정** | `openapi-typescript`로 백엔드 OpenAPI spec → TypeScript 타입 자동 생성 |
| **이유** | 수동 타입 관리 시 API 변경 때마다 누락 위험, 백엔드 스펙과 항상 동기화 |
| **명령어** | `pnpm generate:api-models` |
| **출력** | `src/api/config/api-models.ts` |

---

## 🗂️ 7. 참고 자료

### 공식 문서

| 기술 | 문서 |
|---|---|
| Stackflow | https://stackflow.so |
| TanStack Query | https://tanstack.com/query/latest |
| Zustand | https://zustand.docs.pmnd.rs |
| Ky | https://github.com/sindresorhus/ky |
| TailwindCSS 4 | https://tailwindcss.com/docs |
| CVA | https://cva.style |
| @webview-bridge | https://github.com/gronxb/webview-bridge |
| openapi-typescript | https://openapi-ts.dev |
| Expo | https://docs.expo.dev |

### 서비스 URL

| 환경 | URL |
|---|---|
| 프로덕션 웹 | https://hellocs.site |
| API | https://api.hellocs.site |
| API Docs (Swagger) | https://api.hellocs.site/v3/api-docs |
| Grafana | https://hellocs.site/grafana/ |

---

## ✨ 8. 사용 팁 및 규칙

### 8-1 개발 시작

```bash
# Web
cd web && pnpm install && pnpm dev        # http://localhost:5173

# Mobile
cd mobile && npm install && npm start     # Expo dev server
```

### 8-2 API 타입 재생성

백엔드 API가 변경됐을 때 실행:
```bash
cd web && pnpm generate:api-models
```
`.env`에 `API_SWAGGER_URL` 설정 필요.

### 8-3 새 페이지 추가 체크리스트

- [ ] `src/pages/<feature>/<PageName>.tsx` 생성
- [ ] `src/app/stackflow-route.tsx`에 `{ name, component, path }` 등록
- [ ] 필요 시 `src/api/<feature>/`, `src/model/<feature>/` 추가

### 8-4 새 브릿지 기능 추가 체크리스트

- [ ] `mobile/bridge/index.ts`의 `AppBridgeType`에 메서드 시그니처 추가
- [ ] `bridge()` 구현체에 실제 로직 작성
- [ ] 웹에서 `window.bridge.xxx()` 호출로 검증

### 8-5 협업 주의사항

- `api-models.ts`는 **자동생성 파일** — 직접 수정 금지, `pnpm generate:api-models`로만 갱신
- 커밋 메시지 형식 미준수 시 `commitlint` 훅이 거부함
- `main` 브랜치 push 시 GitHub Actions가 자동 빌드 + 배포 트리거됨 (web 경로 변경 시)
- ESLint import 순서 위반 시 CI에서 실패 — 로컬에서 `pnpm lint` 먼저 확인

### 8-6 Vite 개발 프록시

로컬 개발 시 아래 경로는 `https://hellocs.site`로 프록시됨:
- `/api/`
- `/v3/`
- `/swagger-ui/`

---

## 📚 9. 기술 심화 / 논문 참고 내용

> 이 섹션은 프로젝트에서 적용한 기술 개념을 학술적 관점에서 기술한다.
> 실제 구현 파일과 연결해 이론과 실천의 연결고리를 확인할 수 있다.

---

### 9-1 WebView 기반 하이브리드 앱 아키텍처

#### 개념

네이티브 앱과 웹 앱의 이분법 대신, **WebView를 쉘(Shell)로 사용하고 웹 앱이 UI 전체를 담당**하는 하이브리드 아키텍처. 단일 코드베이스로 iOS/Android를 동시 지원하면서, 웹의 빠른 배포 주기를 유지할 수 있다.

#### 이 프로젝트의 구현

```
[React Native Shell]
  └─ LinearGradient 배경
  └─ SafeAreaView
  └─ <WebView source={{ uri: WEBVIEW_URL }} />  ← 웹 앱 전체 렌더링
       └─ @webview-bridge로 Native API 노출
```

- 네이티브 역할: 마이크, 로그인 상태, 딥링크, 스플래시 화면
- 웹 역할: 전체 UI/UX, 라우팅, 비즈니스 로직

#### 학술적 맥락

| 접근 방식 | 예시 | 특징 |
|---|---|---|
| 네이티브 앱 | Swift, Kotlin | 최고 성능, 플랫폼별 개발 비용 |
| 크로스 플랫폼 네이티브 | React Native, Flutter | 단일 코드, 네이티브 렌더링 |
| **WebView 하이브리드** | **이 프로젝트** | **웹 배포 속도 + 네이티브 기능** |
| PWA | Service Worker 기반 | 설치 없이 앱 유사 경험 |

> 관련 키워드: Hybrid Mobile Application Architecture, WebView Bridge Pattern, Cross-Platform Development

---

### 9-2 JavaScript Bridge 통신 패턴과 타입 안전성

#### 문제

WebView와 Native 사이의 통신은 전통적으로 `postMessage(string)` — 단방향 문자열 메시지로 이루어졌다. 이 방식은:
- 응답을 추적할 수단이 없음 (Fire-and-forget)
- 타입 정보 소실 (직렬화/역직렬화)
- 에러 처리 불명확

#### 이 프로젝트의 해결책 (`@webview-bridge`)

```
요청 흐름:
Web: window.bridge.startRecording()
  → 라이브러리가 고유 messageId 부여 + JSON 직렬화 → postMessage
  → Native: messageId로 응답 매핑 → Promise resolve

타입 계약:
interface AppBridgeType extends Bridge {
  startRecording: () => Promise<{ status: "success" | "error" }>
}
// Web과 Native가 동일 인터페이스 타입을 공유
```

#### 학술적 맥락

- **RPC (Remote Procedure Call)** 개념의 WebView 내 적용: 로컬 함수 호출처럼 보이지만 직렬화 → 채널 전송 → 역직렬화 과정을 거침
- **타입 안전 IPC(Inter-Process Communication)**: 컴파일 타임에 인터페이스 불일치를 감지
- Promise 기반 비동기 처리로 **콜백 지옥(Callback Hell)** 문제 해결

> 관련 키워드: JavaScript Bridge, Type-Safe IPC, WebView Communication, RPC Pattern

---

### 9-3 유한 상태 머신(FSM)으로 모델링한 퀴즈 풀이 흐름

#### 개념

**FSM(Finite State Machine)**: 유한한 상태(State)와 상태 간 전이(Transition)로 시스템을 모델링하는 계산 이론의 기본 개념.

#### 이 프로젝트의 구현

퀴즈 풀이 단계는 명시적 FSM으로 구현되어 있다 (`useQuizStore.ts`):

```
States: "ox" | "select" | "text"

Transitions:
  초기화 → ox (OX 문제 있으면)
         → select (객관식만 있으면)
         → text (단답형만 있으면)

  ox → ox     (다음 OX 문제)
  ox → select (OX 완료, 객관식 있으면)
  ox → text   (OX 완료, 객관식 없고 단답형 있으면)
  ox → [완료] (OX 완료, 이후 문제 없으면 completionPayload 세팅)

  select → select (다음 객관식)
  select → text   (객관식 완료, 단답형 있으면)
  select → [완료]

  text → text   (다음 단답형)
  text → [완료]
```

- 역방향 전이(`goToPreviousQuestion`)도 구현: 스택 기반으로 이전 상태 복원
- UI 컴포넌트는 현재 state만 받아 렌더링 → **상태와 뷰의 명확한 분리**

#### 학술적 맥락

- UI 개발에서 FSM 모델링은 **XState** 라이브러리로도 널리 쓰임. 이 프로젝트는 Zustand 내에 직접 FSM을 구현한 사례
- **명시적 상태(Explicit State)**는 "impossible state"를 타입 시스템으로 방지 (vs. 여러 boolean 조합)
- React의 `useReducer`도 FSM 구현 수단으로 자주 인용됨

> 관련 키워드: Finite State Machine, UI State Modeling, Explicit State, XState, Impossible States

---

### 9-4 Result 타입 패턴: 타입 안전 에러 처리

#### 문제

`try/catch` 기반 에러 처리는 함수 시그니처에서 실패 가능성이 드러나지 않는다. 호출자가 에러 처리를 잊어도 컴파일러가 감지하지 못한다.

#### 이 프로젝트의 구현 (`api-client-handler.ts`)

```ts
type Ok<T> = { ok: true;  data: T; status: number; headers: Headers }
type Err   = { ok: false; error: { message: string }; status: number }

export type ApiResult<T> = Ok<T> | Err
```

호출부에서 `ok` 여부를 확인하기 전까지 `data`에 접근 불가:

```ts
const res = await postQuizList(params);
if (!res.ok) throw new Error("퀴즈 조회 실패");
return res.data; // 여기서만 data 타입 보장
```

#### 학술적 맥락

- Rust의 `Result<T, E>` 타입, Haskell의 `Either` 모나드에서 영감
- TypeScript의 **Discriminated Union**(판별 유니온) 패턴의 실무 적용 사례
- Railway-Oriented Programming: 성공/실패 두 레일로 로직을 흘려보내는 함수형 에러 처리 기법

> 관련 키워드: Result Type, Discriminated Union, Railway-Oriented Programming, Type-Safe Error Handling

---

### 9-5 선언적 서버 상태 관리와 캐시 전략

#### 문제

전통적 방식(Redux + 수동 fetch)에서 서버 상태를 관리하면:
- 로딩/에러/성공 상태를 매번 직접 관리
- 캐시 무효화 타이밍 직접 지정
- 중복 요청 방지 로직 반복 작성

#### 이 프로젝트의 구현 (React Query)

```ts
// 선언적 쿼리 정의
export const quizQueries = {
  getQuizTopicQuery: () =>
    queryOptions({
      queryKey: ["quiz", "topic"],
      queryFn: async () => { /* fetch */ },
    }),
};

// 컴포넌트에서는 캐시/로딩/에러를 자동으로 처리
const { data, isLoading, isError } = useQuery(quizQueries.getQuizTopicQuery());
```

**캐시 키 계층 구조:**
```
["quiz"]
  └─ ["quiz", "topic"]
  └─ ["quiz", "list", { topicId, count }]
  └─ ["quiz", "grading-log", gradingLogId]
```

#### 학술적 맥락

- **Stale-While-Revalidate(SWR)**: 캐시된 데이터를 즉시 반환하면서 백그라운드에서 갱신 — HTTP RFC 5861에서 정의, React Query가 이 전략을 UI에 적용
- **서버 상태(Server State) vs 클라이언트 상태(Client State)** 분리: 서버 상태는 비동기적이고 공유됨 → 전용 라이브러리로 관리
- React Query의 캐시는 **Normalized Cache** 방식이 아닌 Key-Value 방식 (Apollo와 차이점)

> 관련 키워드: Server State Management, Stale-While-Revalidate, Cache Invalidation, Declarative Data Fetching

---

### 9-6 인증 토큰 갱신과 경쟁 조건(Race Condition) 방지

#### 문제

SPA에서 Access Token 만료 시 여러 API 요청이 동시에 401을 받으면, Refresh Token으로 토큰 갱신 요청이 N번 중복 발생할 수 있다 → Refresh Token이 단 한 번만 유효한 경우 나머지 요청 실패.

#### 이 프로젝트의 해결책 (`api-client.ts`)

```ts
// Promise를 변수에 공유 → 중복 요청 방지
let refreshAccessTokenPromise: Promise<string | null> | null = null;

async function refreshAccessToken() {
  if (!refreshAccessTokenPromise) {
    refreshAccessTokenPromise = (async () => {
      // 실제 갱신 요청 (한 번만 실행)
      const result = await apiClientHandler(baseApiClient, END_POINTS.AUTH.REISSUE, { method: "POST" });
      // ...
    })().finally(() => {
      refreshAccessTokenPromise = null; // 완료 후 초기화
    });
  }
  return refreshAccessTokenPromise; // 진행 중이면 같은 Promise 반환
}
```

동시에 5개 요청이 401을 받아도 갱신 요청은 정확히 1회만 발생하고, 나머지 4개는 같은 Promise를 `await`.

#### 학술적 맥락

- **Promise Coalescing / Request Deduplication**: 동일 비동기 작업을 하나로 합치는 패턴
- **Refresh Token Rotation**: 갱신 시마다 새 Refresh Token 발급 → 탈취된 Refresh Token 재사용 방지 (OAuth 2.0 BCP)
- **Silent Authentication**: 사용자 개입 없이 세션을 자동 복구하는 UX 패턴

> 관련 키워드: Token Refresh Race Condition, Promise Coalescing, Silent Authentication, OAuth 2.0 Token Rotation

---

### 9-7 코드 스플리팅과 지연 로딩

#### 개념

SPA(Single Page Application)의 단점인 초기 번들 크기 문제를 해결하는 기법. 라우트 단위로 JavaScript를 분리해 필요할 때만 로드.

#### 이 프로젝트의 구현

```ts
// stackflow-route.tsx: 모든 Activity가 lazy()로 선언됨
const QuizSolvePage = lazy(() => import("@/pages/quiz/QuizSolvePage"));
const RankingPage   = lazy(() => import("@/pages/ranking/RankingPage"));
// ...

// stackflow-auth-shell.tsx: lazy된 AuthInitializer를 Suspense로 감싸
<Suspense fallback={null}>
  <AuthInitializer>{children}</AuthInitializer>
</Suspense>
```

- 초기 진입 시 `LoginPage` 번들만 로드
- 퀴즈 페이지 진입 시점에 `QuizSolvePage` 번들 로드
- Vite가 각 lazy import를 별도 chunk 파일로 분리

#### 학술적 맥락

- **PRPL 패턴** (Push, Render, Pre-cache, Lazy-load): Google이 제안한 Progressive Web App 성능 전략
- **Core Web Vitals** 중 LCP(Largest Contentful Paint) 개선에 직접 기여
- **Dynamic Import (`import()`)**: ECMAScript 2020 표준. Webpack/Vite가 이를 기반으로 청크 분리

> 관련 키워드: Code Splitting, Lazy Loading, Dynamic Import, PRPL Pattern, Core Web Vitals

---

### 9-8 피처 기반 아키텍처 (Feature-Based Architecture)

#### 개념

파일을 역할 기준(`components/`, `services/`, `utils/`)이 아닌 **기능(Feature) 기준**으로 그룹화하는 구조화 방식.

#### 이 프로젝트의 적용

```
src/
├── api/
│   ├── quiz/         ← quiz 기능의 API 전부
│   │   ├── api.model.ts      (타입)
│   │   ├── api.query.ts      (React Query options)
│   │   └── postQuizList.ts   (fetch 함수)
│   └── ranking/      ← ranking 기능의 API 전부
├── model/
│   ├── quiz/         ← quiz 기능의 상태 전부
│   └── auth/
└── components/
    ├── quiz/         ← quiz 기능의 UI 전부
    └── common/       ← 공유 컴포넌트
```

한 기능을 수정할 때 관련 파일이 같은 폴더에 모여 있어 **응집도(Cohesion) 높음**, 기능 간 직접 의존성 낮아 **결합도(Coupling) 낮음**.

#### 학술적 맥락

- **고응집 저결합(High Cohesion, Low Coupling)**: 소프트웨어 공학의 모듈 설계 원칙
- **Screaming Architecture** (Robert C. Martin): 디렉토리 구조를 보면 시스템이 무엇을 하는지 바로 알 수 있어야 한다
- **Vertical Slice Architecture**: 레이어(Controller-Service-Repository) 대신 기능 단위로 코드를 수직으로 자르는 패턴

> 관련 키워드: Feature-Based Architecture, Screaming Architecture, Vertical Slice, High Cohesion Low Coupling

---

### 9-9 OpenAPI 기반 타입 자동 생성 (Contract-First API)

#### 개념

백엔드가 OpenAPI(Swagger) 스펙을 기준(Contract)으로 정의하고, 프론트엔드는 그 스펙에서 타입을 자동 생성. API 변경 시 재생성만 하면 타입 불일치를 컴파일 타임에 감지.

#### 이 프로젝트의 흐름

```
백엔드 서버
  └─ /v3/api-docs (OpenAPI JSON 스펙 노출)
       ↓ pnpm generate:api-models
web/src/api/config/api-models.ts (자동 생성)
  └─ 각 api/*.model.ts에서 타입 참조
  └─ 컴포넌트에서 타입 안전하게 사용
```

#### 학술적 맥락

- **Schema-First / Contract-First Development**: API 스펙을 코드보다 먼저 정의 → 프론트/백엔드 병렬 개발 가능
- **Code Generation**: 반복적인 보일러플레이트를 자동화 — 휴먼 에러 감소, 일관성 유지
- OpenAPI 3.0은 REST API의 사실상 표준 명세 언어로, IDL(Interface Definition Language)의 역할 수행

> 관련 키워드: Contract-First API Design, OpenAPI, Code Generation, Schema-Driven Development, IDL
