import type { ActivityComponentType } from "@stackflow/react";
import { useCallback } from "react";

import { useFlow } from "@/app/stackflow";

import { QuizOxSection } from "@/components/quiz/solve/QuizOxSection";
import { QuizSelectSection } from "@/components/quiz/solve/QuizSelectSection";
import {
  QuizTextEmptySection,
  QuizTextInputSection,
} from "@/components/quiz/solve/QuizTextSection";

import type { UserAnswerString } from "@/model/quiz/useQuizSolve";
import { useQuizSolve } from "@/model/quiz/useQuizSolve";

import { QUIZ_MODE } from "@/constants/quiz/quiz";

interface QuizSolvePageProps {
  topic: string;
  mode: typeof QUIZ_MODE.STANDARD;
  quizData: string;
}

const QuizSolvePage: ActivityComponentType<QuizSolvePageProps> = ({
  params,
}) => {
  const { push } = useFlow();

  const onComplete = useCallback(
    (answers: UserAnswerString[]) => {
      push(
        "QuizCompletePage",
        { userAnswers: JSON.stringify(answers) },
        { animate: false },
      );
    },
    [push],
  );

  const { uiKind, nothingToSolve } = useQuizSolve({
    quizDataJson: params.quizData,
    onComplete,
  });

  if (nothingToSolve) {
    return null;
  }

  switch (uiKind) {
    case "ox":
      return <QuizOxSection />;
    case "select":
      return <QuizSelectSection />;
    case "text-empty":
      return <QuizTextEmptySection />;
    case "text-input":
      return <QuizTextInputSection />;
    case "blank":
    default:
      return null;
  }
};

export default QuizSolvePage;
