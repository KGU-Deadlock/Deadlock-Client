# Gemini Code Review 설정 가이드

이 문서는 GitHub Actions를 사용한 Gemini Code Assist 기반 자동 코드 리뷰 설정 방법을 설명합니다.

## 🔧 설정 방법

### 1. Gemini API 키 발급

1. [Google AI Studio](https://makersuite.google.com/app/apikey)에 접속
2. "Create API Key" 버튼 클릭
3. 생성된 API 키를 복사 (나중에 다시 볼 수 없으므로 안전하게 보관)

### 2. GitHub Secrets 설정

1. GitHub 리포지토리로 이동
2. **Settings** > **Secrets and variables** > **Actions** 메뉴 선택
3. **New repository secret** 클릭
4. 다음 정보 입력:
   - **Name**: `GEMINI_API_KEY`
   - **Secret**: 발급받은 Gemini API 키
5. **Add secret** 클릭

### 3. 워크플로우 활성화 확인

워크플로우는 Pull Request가 열리거나 업데이트될 때 자동으로 실행됩니다.

## 📝 사용 방법

### 자동 리뷰

- Pull Request를 생성하거나 업데이트하면 자동으로 코드 리뷰가 실행됩니다
- 리뷰 결과는 PR의 코멘트로 자동 추가됩니다

### 수동 실행

1. GitHub Actions 탭으로 이동
2. **Gemini Code Review** 워크플로우 선택
3. **Run workflow** 버튼 클릭

## 🎯 리뷰 내용

자동 코드 리뷰는 다음 항목을 검토합니다:

- ✅ 코드 품질 및 버그 가능성
- ⚡ 성능 이슈
- 🔒 보안 문제
- 💄 코드 스타일 및 베스트 프랙티스
- 🧪 테스트 커버리지
- 📚 문서화

## 🔍 리뷰 표시

리뷰 코멘트에서 사용되는 아이콘:

- 🔴 중요한 이슈 (수정 필요)
- 🟡 경고 (개선 권장)
- 💡 제안사항 (선택적 개선)
- ✅ 긍정적인 부분 (잘 작성됨)

## ⚙️ 커스터마이징

### 리뷰 범위 조정

`.github/workflows/code-review.yml` 파일에서 리뷰할 파일 확장자를 수정할 수 있습니다:

```yaml
files: |
  **/*.ts
  **/*.tsx
  **/*.js
  **/*.jsx
  **/*.py  # Python 파일 추가 예시
```

### 리뷰 프롬프트 수정

워크플로우 파일의 `REVIEW_PROMPT` 부분을 수정하여 리뷰 기준을 변경할 수 있습니다.

## 🔐 보안 주의사항

- ⚠️ **절대로** API 키를 코드에 직접 포함시키지 마세요
- GitHub Secrets만 사용하세요
- API 키가 노출된 경우 즉시 재발급하세요

## 🐛 문제 해결

### 리뷰가 생성되지 않는 경우

1. **API 키 확인**: GitHub Secrets에 `GEMINI_API_KEY`가 올바르게 설정되어 있는지 확인
2. **워크플로우 실행 확인**: Actions 탭에서 워크플로우가 실행되었는지 확인
3. **로그 확인**: 워크플로우 실행 로그에서 오류 메시지 확인

### API 할당량 초과

- Gemini API는 무료 티어에서 제한이 있을 수 있습니다
- API 사용량을 [Google Cloud Console](https://console.cloud.google.com/)에서 확인할 수 있습니다

## 📚 참고 자료

- [Gemini API 문서](https://ai.google.dev/docs)
- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [GitHub Marketplace - Gemini Code Assist](https://github.com/marketplace/gemini-code-assist)

## 💡 대안: GitHub Marketplace 앱 사용

GitHub Actions 대신 GitHub Marketplace의 Gemini Code Assist 앱을 사용할 수도 있습니다:

1. [Gemini Code Assist](https://github.com/marketplace/gemini-code-assist) 페이지로 이동
2. **Install** 버튼 클릭
3. 리포지토리 선택 및 권한 부여
4. PR에서 `/gemini review` 명령어 사용

이 방법은 설정이 더 간단하지만, 커스터마이징 옵션이 제한적일 수 있습니다.
