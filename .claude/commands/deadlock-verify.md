# Deadlock Verify

Web과 Mobile 코드를 린트 및 빌드하여 문제가 없는지 검증합니다.

## 진행 순서

다음 명령어를 순서대로 실행하고 각 결과를 보고합니다.

### 1. Web 린트
```bash
cd web && pnpm lint
```

### 2. Web 빌드 (TypeScript 타입 체크 포함)
```bash
cd web && pnpm build
```

### 3. Mobile 린트
```bash
cd mobile && npm run lint
```

## 결과 보고 형식

| 항목 | 결과 |
|------|------|
| Web 린트 | ✅ 통과 / ❌ 실패 |
| Web 빌드 | ✅ 통과 / ❌ 실패 |
| Mobile 린트 | ✅ 통과 / ❌ 실패 |

## 실패 시

- 에러 메시지를 그대로 출력
- 자동으로 원인을 파악하고 수정 가능한 경우 수정 후 재실행
- 수정이 필요한 경우 사용자에게 구체적인 내용 보고
