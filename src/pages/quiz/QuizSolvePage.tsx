import type { ActivityComponentType } from "@stackflow/react";
import { useCallback } from "react";

import { useFlow } from "@/app/stackflow";

import QuizLayout from "@/components/quiz/QuizLayout";
import { QuizOxSection } from "@/components/quiz/solve/QuizOxSection";
import { QuizSelectSection } from "@/components/quiz/solve/QuizSelectSection";
import { QuizSolveFooter } from "@/components/quiz/solve/QuizSolveFooter";
import {
  QuizTextEmptySection,
  QuizTextInputSection,
} from "@/components/quiz/solve/QuizTextSection";

import type { UserAnswerString } from "@/model/quiz/useQuizSolve";
import {
  getQuizSolveProgressCurrent,
  useQuizSolve,
} from "@/model/quiz/useQuizSolve";
import {
  QUIZ_SOLVE_TOTAL_COUNT,
  type QuizSolveStoreState,
  useQuizSolveStore,
} from "@/model/quiz/useQuizStore";

import { QUIZ_MODE } from "@/constants/quiz/quiz";

interface QuizSolvePageProps {
  topic: string;
  mode: typeof QUIZ_MODE.STANDARD;
  quizData: string;
}

const QuizSolvePage: ActivityComponentType<QuizSolvePageProps> = ({
  params,
}) => {
  const { replace } = useFlow();

  const onComplete = useCallback(
    (answers: UserAnswerString[]) => {
      replace("QuizCompletePage", { userAnswers: JSON.stringify(answers) });
    },
    [replace],
  );

  const { uiKind, nothingToSolve } = useQuizSolve({
    quizDataJson: params.quizData,
    onComplete,
  });

  const layoutCurrent = useQuizSolveStore((s: QuizSolveStoreState) =>
    getQuizSolveProgressCurrent(s),
  );

  if (nothingToSolve) {
    return null;
  }

  if (uiKind === "text-empty") {
    return <QuizTextEmptySection />;
  }

  if (uiKind === "blank") {
    return null;
  }

  return (
    <QuizLayout
      current={layoutCurrent}
      total={QUIZ_SOLVE_TOTAL_COUNT}
      footer={<QuizSolveFooter />}
    >
      {uiKind === "ox" && <QuizOxSection />}
      {uiKind === "select" && <QuizSelectSection />}
      {uiKind === "text-input" && <QuizTextInputSection />}
    </QuizLayout>
  );
};

export default QuizSolvePage;
