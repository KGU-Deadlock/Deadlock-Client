/**
 * OX 등에서 API·상태로는 `true` / `false` 문자열을 유지하고,
 * 화면에만 ⭕️ / ❌ 로 보이게 할 때 사용합니다.
 */
export function formatQuizAnswerDisplay(
  value: string | undefined | null,
): string {
  if (value === undefined || value === null) {
    return "";
  }
  const trimmed = String(value).trim();
  const lower = trimmed.toLowerCase();
  if (lower === "true") {
    return "⭕️";
  }
  if (lower === "false") {
    return "❌";
  }
  return value;
}
