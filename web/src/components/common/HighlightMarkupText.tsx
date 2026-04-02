import { Fragment } from "react";

import { parseHighlightMarkup } from "@/utils/parseHighlightMarkup";

interface HighlightMarkupTextProps {
  text: string;
  className?: string;
}

/**
 * `<highlight>…</highlight>` 구간을 시각적 하이라이트로 렌더링합니다.
 */
export default function HighlightMarkupText({
  text,
  className,
}: HighlightMarkupTextProps) {
  const segments = parseHighlightMarkup(text);

  if (segments.length === 0) {
    return null;
  }

  return (
    <span className={className}>
      {segments.map((seg, i) => {
        if (seg.type === "highlight") {
          return (
            <mark
              key={`h-${i}`}
              className="bg-blue-002/50 text-inherit rounded px-0.5 font-medium"
            >
              {seg.text}
            </mark>
          );
        }
        return <Fragment key={`t-${i}`}>{seg.text}</Fragment>;
      })}
    </span>
  );
}
