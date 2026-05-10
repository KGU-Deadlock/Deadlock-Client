# Atomic Commit

변경된 파일들을 분석하여 **의미 단위(atomic)**로 나누어 각각 커밋합니다.

## 진행 순서

1. `git diff` 및 `git status`로 staged/unstaged 전체 변경사항 파악
2. 변경 파일들을 **하나의 논리적 목적**을 공유하는 그룹으로 분류
   - 예: API 변경, UI 변경, 타입 변경, 설정 변경 등
   - 서로 의존성이 있거나 같은 기능에 속하면 같은 그룹
3. 각 그룹을 순서대로 stage → commit

## 커밋 메시지 형식 (commitlint 규칙 준수)

```
{emoji} [{type}] {subject}
```

- **emoji + type 매핑:**
  - `✨ [feat]` — 새 기능
  - `🐛 [fix]` — 버그 수정
  - `♻️ [refactor]` — 리팩토링
  - `📝 [docs]` — 문서
  - `💄 [style]` — 스타일/포맷
  - `⚡ [perf]` — 성능
  - `✅ [test]` — 테스트
  - `🔧 [chore]` — 빌드/설정
  - `📛 [rename]` — 파일명 변경
  - `🗑️ [remove]` — 파일 삭제

- **subject:** 한국어 권장, 최대 100자, 마침표 없음

## 주의사항

- `.env`, 시크릿, credentials 파일은 커밋하지 말고 사용자에게 경고
- `--no-verify` 사용 금지 — pre-commit hook 실패 시 원인 파악 후 수정
- 커밋 메시지에 `Co-Authored-By` 라인 추가 금지
- 커밋 전 각 그룹과 메시지를 사용자에게 **먼저 보고**하고 진행 여부 확인
