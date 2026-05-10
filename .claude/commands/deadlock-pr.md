# Deadlock PR 생성

현재 브랜치의 변경사항을 분석하여 GitHub Pull Request를 생성합니다.

## 진행 순서

1. `git status`, `git log main..HEAD`, `git diff main...HEAD`로 전체 변경사항 파악
2. 미커밋 변경사항이 있으면 `/deadlock-commit`으로 먼저 커밋할 것을 안내
3. PR 제목 및 본문 초안을 사용자에게 **먼저 보고**하고 확인 후 생성
4. `gh pr create`로 PR 생성 후 URL 반환

## PR 형식

**제목:** 70자 이내, 한국어 권장

**본문 템플릿:**

```markdown
## 개요
- 변경 목적을 bullet point로 요약 (1~3개)

## 주요 변경사항
- 파일/기능별 변경 내용

## 테스트 체크리스트
- [ ] 테스트 항목

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

## 주의사항

- base branch는 `main`으로 설정
- 원격 브랜치가 없으면 `git push -u origin HEAD` 먼저 실행
- force push 금지
