import { useShallow } from "zustand/react/shallow";

import { Button, Footer } from "@/components/common";

import { getQuizSolveUiKind } from "@/model/quiz/useQuizSolve";
import {
  type QuizSolveStoreState,
  useQuizSolveStore,
} from "@/model/quiz/useQuizStore";

/**
 * QuizSolvePage의 QuizLayout footer — uiKind에 맞는 다음/완료 버튼
 */
export function QuizSolveFooter() {
  const block = useQuizSolveStore(
    useShallow((s: QuizSolveStoreState) => {
      const kind = getQuizSolveUiKind(s);

      if (kind === "ox") {
        return {
          kind: "ox" as const,
          onNext: s.handleOxNext,
          canNext: s.selectedOxAnswer !== null,
          label: "다음 문제" as const,
        };
      }

      if (kind === "select") {
        return {
          kind: "select" as const,
          onNext: s.handleSelectNext,
          canNext: s.selectedChoiceIndex !== null,
          label: "다음 문제" as const,
        };
      }

      if (kind === "text-input") {
        const q = s.shortQuizzes[s.textIndex];
        const isLastText = s.textIndex >= s.shortQuizzes.length - 1;
        const canGoNext =
          s.shortQuizzes.length === 0 ||
          Boolean(q && s.inputValue.trim() !== "");

        return {
          kind: "text-input" as const,
          onNext: s.handleTextNext,
          canNext: canGoNext,
          label: (isLastText ? "완료" : "다음 문제") as string,
        };
      }

      return { kind: "none" as const };
    }),
  );

  if (block.kind === "none") return null;

  return (
    <Footer>
      <Button
        size="large"
        state={block.canNext ? "active" : "disabled"}
        onClick={block.onNext}
      >
        {block.label}
      </Button>
    </Footer>
  );
}
