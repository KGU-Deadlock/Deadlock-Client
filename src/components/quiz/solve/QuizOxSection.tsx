import { useShallow } from "zustand/react/shallow";

import { Button, Footer, PageTitle } from "@/components/common";
import QuizLayout from "@/components/quiz/QuizLayout";

import type { QuizSolveStoreState } from "@/model/quiz/useQuizStore";
import {
  QUIZ_SOLVE_TOTAL_COUNT,
  useQuizSolveStore,
} from "@/model/quiz/useQuizStore";

export function QuizOxSection() {
  const {
    question,
    current,
    selectedOxAnswer,
    setSelectedOxAnswer,
    handleOxNext,
    canNext,
  } = useQuizSolveStore(
    useShallow((s: QuizSolveStoreState) => {
      const q = s.oxQuizzes[s.oxIndex];
      return {
        question: q?.content ?? "",
        current: s.oxIndex + 1,
        selectedOxAnswer: s.selectedOxAnswer,
        setSelectedOxAnswer: s.setSelectedOxAnswer,
        handleOxNext: s.handleOxNext,
        canNext: s.selectedOxAnswer !== null,
      };
    }),
  );

  return (
    <QuizLayout
      current={current}
      total={QUIZ_SOLVE_TOTAL_COUNT}
      footer={
        <Footer>
          <Button
            size="large"
            state={canNext ? "active" : "disabled"}
            onClick={handleOxNext}
          >
            다음 문제
          </Button>
        </Footer>
      }
    >
      <PageTitle className="wrap-break-words m-0 flex flex-wrap px-0! whitespace-normal">
        {question}
      </PageTitle>
      <div className="grid grid-cols-2 gap-3">
        <Button
          size="large"
          state={selectedOxAnswer === true ? "outline" : "disabled_outline"}
          className="h-[100px]"
          onClick={() => setSelectedOxAnswer(true)}
        >
          <span className="font-tossface text-2xl">⭕️</span>
        </Button>
        <Button
          size="large"
          state={selectedOxAnswer === false ? "outline" : "disabled_outline"}
          className="h-[100px]"
          onClick={() => setSelectedOxAnswer(false)}
        >
          <span className="font-tossface text-2xl">❌</span>
        </Button>
      </div>
    </QuizLayout>
  );
}
