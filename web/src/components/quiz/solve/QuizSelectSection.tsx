import { useShallow } from "zustand/react/shallow";

import { Button, PageTitle } from "@/components/common";

import type { QuizSolveStoreState } from "@/model/quiz/useQuizStore";
import { useQuizSolveStore } from "@/model/quiz/useQuizStore";

export function QuizSelectSection() {
  const { question, rawChoices, selectedChoiceIndex, setSelectedChoiceIndex } =
    useQuizSolveStore(
      useShallow((s: QuizSolveStoreState) => {
        const q = s.mcQuizzes[s.selectIndex];
        return {
          question: q?.content ?? "",
          rawChoices: q?.choices ?? [],
          selectedChoiceIndex: s.selectedChoiceIndex,
          setSelectedChoiceIndex: s.setSelectedChoiceIndex,
        };
      }),
    );

  const choices = rawChoices;

  return (
    <>
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
    </>
  );
}
