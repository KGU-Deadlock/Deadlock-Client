import { useShallow } from "zustand/react/shallow";

import { Button, Footer, PageTitle } from "@/components/common";
import QuizLayout from "@/components/quiz/QuizLayout";

import type { QuizSolveStoreState } from "@/model/quiz/useQuizStore";
import {
  QUIZ_SOLVE_TOTAL_COUNT,
  useQuizSolveStore,
} from "@/model/quiz/useQuizStore";

export function QuizSelectSection() {
  const {
    question,
    choices,
    current,
    selectedChoiceIndex,
    setSelectedChoiceIndex,
    handleSelectNext,
    canNext,
  } = useQuizSolveStore(
    useShallow((s: QuizSolveStoreState) => {
      const q = s.mcQuizzes[s.selectIndex];
      const completedOxCount = s.oxQuizzes.length;
      return {
        question: q?.content ?? "",
        choices: q?.choices ?? [],
        current: completedOxCount + s.selectIndex + 1,
        selectedChoiceIndex: s.selectedChoiceIndex,
        setSelectedChoiceIndex: s.setSelectedChoiceIndex,
        handleSelectNext: s.handleSelectNext,
        canNext: s.selectedChoiceIndex !== null,
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
            onClick={handleSelectNext}
          >
            다음 문제
          </Button>
        </Footer>
      }
    >
      <PageTitle className="m-0 flex flex-wrap px-0! wrap-break-word whitespace-normal">
        {question}
      </PageTitle>
      <div className="flex flex-col gap-3">
        {choices.map((choice: string, choiceIndex: number) => (
          <Button
            key={`${choiceIndex}-${choice}`}
            size="large"
            state={
              selectedChoiceIndex === choiceIndex
                ? "outline"
                : "disabled_outline"
            }
            onClick={() => setSelectedChoiceIndex(choiceIndex)}
          >
            {choice}
          </Button>
        ))}
      </div>
    </QuizLayout>
  );
}
