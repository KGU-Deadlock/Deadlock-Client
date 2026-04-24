import { useShallow } from "zustand/react/shallow";

import { Button, PageTitle } from "@/components/common";

import type { QuizSolveStoreState } from "@/model/quiz/useQuizStore";
import { useQuizSolveStore } from "@/model/quiz/useQuizStore";

export function QuizSelectSection() {
  const { question, choices, selectedChoiceIndex, setSelectedChoiceIndex } =
    useQuizSolveStore(
      useShallow((s: QuizSolveStoreState) => {
        const q = s.mcQuizzes[s.selectIndex];
        return {
          question: q?.content ?? "",
          choices: q?.choices?.[0]?.split("<;;;>") ?? [],
          selectedChoiceIndex: s.selectedChoiceIndex,
          setSelectedChoiceIndex: s.setSelectedChoiceIndex,
        };
      }),
    );

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
