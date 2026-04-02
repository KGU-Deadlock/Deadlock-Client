/**
 * `<highlight>텍스트</highlight>` 마크업을 구간으로 분리합니다.
 * 대소문자 무시, 중첩 태그는 지원하지 않습니다(내부에 동일 태그가 있으면 첫 닫힘까지).
 */
export type HighlightSegment =
  | { type: "text"; text: string }
  | { type: "highlight"; text: string };

const HIGHLIGHT_PATTERN = /<highlight>([\s\S]*?)<\/highlight>/gi;

export function parseHighlightMarkup(input: string): HighlightSegment[] {
  if (!input) {
    return [];
  }

  const segments: HighlightSegment[] = [];
  let lastIndex = 0;
  const re = new RegExp(HIGHLIGHT_PATTERN.source, HIGHLIGHT_PATTERN.flags);
  let match: RegExpExecArray | null;

  while ((match = re.exec(input)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: "text",
        text: input.slice(lastIndex, match.index),
      });
    }
    const inner = (match[1] ?? "").trim();
    segments.push({ type: "highlight", text: inner });
    lastIndex = re.lastIndex;
  }

  if (lastIndex < input.length) {
    segments.push({ type: "text", text: input.slice(lastIndex) });
  }

  return segments;
}
