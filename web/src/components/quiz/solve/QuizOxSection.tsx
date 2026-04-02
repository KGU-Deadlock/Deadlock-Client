import { useShallow } from "zustand/react/shallow";

import { Button, PageTitle } from "@/components/common";

import type { QuizSolveStoreState } from "@/model/quiz/useQuizStore";
import { useQuizSolveStore } from "@/model/quiz/useQuizStore";

export function QuizOxSection() {
  const { question, selectedOxAnswer, setSelectedOxAnswer } =
    useQuizSolveStore(
      useShallow((s: QuizSolveStoreState) => {
        const q = s.oxQuizzes[s.oxIndex];
        return {
          question: q?.content ?? "",
          selectedOxAnswer: s.selectedOxAnswer,
          setSelectedOxAnswer: s.setSelectedOxAnswer,
        };
      }),
    );

  return (
    <>
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
    </>
  );
}
