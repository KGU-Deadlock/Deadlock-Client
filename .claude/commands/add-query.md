# Add Query

API 쿼리를 추가할 때 아래 계층 순서대로 진행한다. 각 단계는 다음 단계에 의존하므로 순서를 지킨다.

## 전제 조건

- 사용자가 추가할 **도메인**, **엔드포인트**, **HTTP 메서드**, **Request/Response 스키마 이름**을 제공한다.
- 정보가 부족하면 먼저 `src/api/config/api-models.ts`의 `components.schemas`와 `paths`를 읽어 후보를 파악하고 사용자에게 확인한다.

---

## Step 0 — api-models.ts에서 스키마 확인

`src/api/config/api-models.ts`의 `components["schemas"]`에서 추가할 엔드포인트에 해당하는 Request/Response 타입을 찾는다.

- **Request** 스키마: `XxxRequest`, `XxxCommand` 등
- **Response** 스키마: `ApiResponseXxx` 형태가 표준 래퍼

확인한 스키마 이름을 메모해두고 아래 단계에서 사용한다.

---

## Step 1 — `api-endpoints.ts`에 엔드포인트 추가

`src/api/config/api-endpoints.ts`를 읽고 도메인 키에 엔드포인트를 추가한다.

```typescript
// 정적 경로
QUIZ_LIST: "/quiz",

// 동적 경로 (path parameter 있는 경우)
QUIZ_GRADING_LOG: (gradingLogId: string) => `/quiz/grading/${gradingLogId}`,
```

이미 존재하는 엔드포인트면 이 단계를 건너뛴다.

---

## Step 2 — `{domain}/api.model.ts`에 타입 추가

`src/api/{domain}/api.model.ts`를 읽고, `api-models.ts`의 `components["schemas"]`에서 해당 엔드포인트에 필요한 타입만 발췌해 추가한다.

**규칙:**
- `import type { components } from "@/api/config/api-models";`를 사용한다.
- Response 전체 래퍼(`ApiResponseXxx`)와 내부 data 타입(`XxxResult`) 모두 alias한다.
- Request body/command 타입도 alias한다.
- `Required<>` wrapping은 OpenAPI 스키마에서 optional로 선언되었지만 실제로 항상 존재하는 필드에만 사용한다.

```typescript
// Request (body 또는 command)
export type XxxRequest = components["schemas"]["XxxRequest"];

// Response (전체 래퍼)
export type XxxResponse = components["schemas"]["ApiResponseXxx"];

// Response 내부 data 타입
export type XxxResult = components["schemas"]["XxxResult"];
```

---

## Step 3 — `{domain}/api.type.ts`에 UI 타입 추가

`src/api/{domain}/api.type.ts`를 읽고, UI 컴포넌트에서 사용할 편의 타입을 정의한다.

**규칙:**
- `api.model.ts`에서 import한다 (`api-models.ts`에서 직접 import 금지).
- `Response["data"]`의 null/undefined를 `NonNullable`로 unwrap한다.
- 리스트 타입은 배열 요소를 꺼낼 때 인덱스 접근(`[number]`)을 활용한다.

```typescript
import type { XxxResponse } from "./api.model";

// 기본 패턴
export type XxxData = NonNullable<XxxResponse["data"]>;

// 리스트에서 단일 아이템 추출
export type XxxItem = XxxData[number];
```

---

## Step 4 — `{httpMethod}{DomainResource}.ts` 쿼리 파일 생성

HTTP 메서드에 따라 적절한 파일명으로 새 파일을 생성한다.

| HTTP 메서드 | 파일명 패턴 | 사용 클라이언트 |
|------------|------------|----------------|
| GET | `get{ResourceName}.ts` | `authApi` or `baseApi` |
| POST | `post{ResourceName}.ts` | `authApi` or `baseApi` |
| PUT | `put{ResourceName}.ts` | `authApi` |
| PATCH | `patch{ResourceName}.ts` | `authApi` |
| DELETE | `delete{ResourceName}.ts` | `authApi` |

인증이 필요 없는 공개 API는 `baseApi`, 인증이 필요한 API는 `authApi`를 사용한다.

**GET (path parameter 없음):**
```typescript
import type { ApiResult } from "@/api/config/api-client-handler";
import { authApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";
import type { XxxResponse } from "./api.model";

export function getXxx(): Promise<ApiResult<XxxResponse>> {
  return authApi.get<XxxResponse>(END_POINTS.DOMAIN.XXX);
}
```

**GET (query parameters 있음):**
```typescript
import type { ApiResult } from "@/api/config/api-client-handler";
import { authApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";
import type { XxxResponse } from "./api.model";

export type GetXxxParams = {
  year: number;
  month: number;
  filterType?: "ALL" | "INTEREST";
};

export function getXxx(params: GetXxxParams): Promise<ApiResult<XxxResponse>> {
  const searchParams: Record<string, string> = {};
  if (params.year) searchParams.year = String(params.year);
  if (params.month) searchParams.month = String(params.month);
  if (params.filterType) searchParams.filterType = params.filterType;

  return authApi.get<XxxResponse>(END_POINTS.DOMAIN.XXX, {
    ...(Object.keys(searchParams).length > 0 ? { searchParams } : {}),
  });
}
```

**GET (path parameter 있음):**
```typescript
export function getXxx(id: string): Promise<ApiResult<XxxResponse>> {
  return authApi.get<XxxResponse>(END_POINTS.DOMAIN.XXX(id));
}
```

**POST / PUT / PATCH (request body 있음):**
```typescript
import type { ApiResult } from "@/api/config/api-client-handler";
import { authApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";
import type { XxxRequest, XxxResponse } from "./api.model";

export function postXxx(body: XxxRequest): Promise<ApiResult<XxxResponse>> {
  return authApi.post<XxxResponse, XxxRequest>(END_POINTS.DOMAIN.XXX, body);
}
```

**DELETE:**
```typescript
import type { ApiResult } from "@/api/config/api-client-handler";
import { authApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";
import type { ApiResponseVoid } from "./api.model";

export function deleteXxx(): Promise<ApiResult<ApiResponseVoid>> {
  return authApi.del<ApiResponseVoid>(END_POINTS.DOMAIN.XXX);
}
```

---

## Step 5 — `{domain}/api.query.ts`에 쿼리 키 및 팩토리 추가

`src/api/{domain}/api.query.ts`를 읽고 쿼리 키와 팩토리를 추가한다.

**쿼리 키 패턴:**
```typescript
const domainQueryKey = ["domain"] as const;

export const domainKeys = {
  all: domainQueryKey,
  // GET 쿼리는 파라미터를 키에 포함
  list: (params: XxxRequest) => [...domainQueryKey, "list", params] as const,
  detail: (id: string) => [...domainQueryKey, "detail", id] as const,
  // 파라미터 없는 쿼리
  summary: () => [...domainQueryKey, "summary"] as const,
};
```

**queryOptions (GET):**
```typescript
import { queryOptions } from "@tanstack/react-query";

getXxxQuery: (params: XxxRequest) =>
  queryOptions({
    queryKey: domainKeys.list(params),
    queryFn: async () => {
      const res = await getXxx(params);
      if (!res.ok) throw new Error("XXX 조회에 실패했습니다.");
      return res.data;
    },
  }),
```

**mutationOptions (POST / PUT / PATCH / DELETE):**
```typescript
import { mutationOptions } from "@tanstack/react-query";

postXxxMutation: () =>
  mutationOptions({
    mutationFn: async (body: Parameters<typeof postXxx>[0]) => {
      const res = await postXxx(body);
      if (!res.ok) throw new Error("XXX 요청에 실패했습니다.");
      return res.data;
    },
  }),
```

---

## 체크리스트

작업 완료 전 확인:

- [ ] `api-endpoints.ts`에 엔드포인트 상수 추가됨
- [ ] `api.model.ts`에 Request/Response 타입 alias 추가됨
- [ ] `api.type.ts`에 UI용 편의 타입 추가됨 (필요한 경우)
- [ ] `{method}{Resource}.ts` 파일 생성됨
  - [ ] 파일명이 HTTP 메서드 prefix + PascalCase 리소스명 형식
  - [ ] 인증 필요 여부에 따라 `authApi` / `baseApi` 선택됨
- [ ] `api.query.ts`에 쿼리 키 및 팩토리 추가됨
  - [ ] GET → `queryOptions` / `domainKeys.xxx()`
  - [ ] POST/PUT/PATCH/DELETE → `mutationOptions`
- [ ] 에러 메시지가 한국어로 작성됨

---

## 주의사항

- `api-models.ts`는 자동 생성 파일이므로 직접 수정하지 않는다.
- 도메인 폴더가 없으면 `api.model.ts`, `api.type.ts`, `api.query.ts` 세 파일을 모두 새로 생성한다.
- 쿼리 키는 계층 구조를 유지해 캐시 무효화가 정밀하게 동작하도록 한다.
- `searchParams` 값은 반드시 `String()`으로 변환한다 (Ky 요구사항).
