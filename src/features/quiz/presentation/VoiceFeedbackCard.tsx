import { For, JSX } from "solid-js";
import type { VoiceFeedbackItem } from "../domain/types";

interface VoiceFeedbackCardProps {
  feedback: VoiceFeedbackItem[];
}

export default function VoiceFeedbackCard(props: VoiceFeedbackCardProps) {
  const highlightKeywords = (
    text: string,
    keywords?: string[]
  ): (string | JSX.Element)[] => {
    if (!keywords || keywords.length === 0) {
      return [text];
    }

    let result: (string | JSX.Element)[] = [text];
    keywords.forEach((keyword) => {
      const newResult: (string | JSX.Element)[] = [];
      result.forEach((part) => {
        if (typeof part === "string") {
          const parts = part.split(keyword);
          parts.forEach((p, i) => {
            if (p) newResult.push(p);
            if (i < parts.length - 1) {
              newResult.push(
                <span class="font-bold text-[#FF8C00]">{keyword}</span>
              );
            }
          });
        } else {
          newResult.push(part);
        }
      });
      result = newResult;
    });

    return result;
  };

  const renderFeedbackItem = (item: VoiceFeedbackItem) => {
    if (item.type === "answer") {
      // 사용자 답변 부분
      return (
        <p class="text-base text-gray-008">
          {highlightKeywords(item.text, item.highlightedKeywords)}
        </p>
      );
    }

    if (item.type === "missing") {
      // 빠진 키워드 피드백
      return (
        <p class="flex items-start gap-2 text-base text-gray-008">
          <span class="text-blue-004">→</span>
          <span>
            핵심 단어인{" "}
            <span class="font-bold text-[#FF8C00]">{item.text}</span>가
            빠졌습니다.
          </span>
        </p>
      );
    }

    if (item.type === "correct") {
      // 올바른 답변 예시
      return (
        <p class="text-base text-blue-004">
          {highlightKeywords(item.text, item.highlightedKeywords)}, 이
          올바른 답변이에요.
        </p>
      );
    }

    return null;
  };

  return (
    <div class="rounded-lg border border-gray-003 bg-gray-001 p-6 shadow-sm">
      <div class="flex flex-col gap-3">
        <For each={props.feedback}>
          {(item) => <div>{renderFeedbackItem(item)}</div>}
        </For>
      </div>
    </div>
  );
}
