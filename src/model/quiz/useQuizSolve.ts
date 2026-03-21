import { useEffect, useRef } from "react";

import {
  type QuizSolveStoreState,
  type UserAnswerString,
  useQuizSolveStore,
} from "@/model/quiz/quiz-solve-store";

export type { UserAnswerString } from "@/model/quiz/quiz-solve-store";
export type { QuizSolvePhase } from "@/model/quiz/quiz-solve-store";

export { QUIZ_SOLVE_TOTAL_COUNT } from "@/model/quiz/quiz-solve-store";

/** `QuizSolvePage`에서 어떤 섹션을 그릴지 — 데이터는 전부 `useQuizSolveStore` */
export type QuizSolveUiKind =
  | "blank"
  | "ox"
  | "select"
  | "text-empty"
  | "text-input";

export function getQuizSolveUiKind(s: QuizSolveStoreState): QuizSolveUiKind {
  const nothingToSolve =
    Boolean(s.quizData) &&
    s.oxQuizzes.length === 0 &&
    s.mcQuizzes.length === 0 &&
    s.shortQuizzes.length === 0;

  if (nothingToSolve) {
    return "blank";
  }

  const currentOxQuiz = s.oxQuizzes[s.oxIndex];
  const currentMcQuiz = s.mcQuizzes[s.selectIndex];
  const currentShortQuiz = s.shortQuizzes[s.textIndex];

  const { phase } = s;

  if (phase === "ox" && s.oxQuizzes.length > 0 && currentOxQuiz) {
    return "ox";
  }

  if (phase === "select" && s.mcQuizzes.length > 0 && currentMcQuiz) {
    return "select";
  }

  if (phase === "text") {
    if (s.shortQuizzes.length === 0 && s.priorUserAnswersBase.length > 0) {
      return "text-empty";
    }

    if (currentShortQuiz) {
      return "text-input";
    }
  }

  return "blank";
}

type UseQuizSolveParams = {
  quizDataJson: string | undefined;
  onComplete: (answers: UserAnswerString[]) => void;
};

export function useQuizSolve({
  quizDataJson,
  onComplete,
}: UseQuizSolveParams) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const init = useQuizSolveStore((st) => st.init);
  const reset = useQuizSolveStore((st) => st.reset);
  const completionPayload = useQuizSolveStore((st) => st.completionPayload);

  useEffect(() => {
    init(quizDataJson);
  }, [quizDataJson, init]);

  useEffect(() => {
    if (completionPayload === null) return;
    onCompleteRef.current(completionPayload);
    reset();
  }, [completionPayload, reset]);

  const uiKind = useQuizSolveStore((st) => getQuizSolveUiKind(st));

  const nothingToSolve = useQuizSolveStore(
    (st) =>
      Boolean(st.quizData) &&
      st.oxQuizzes.length === 0 &&
      st.mcQuizzes.length === 0 &&
      st.shortQuizzes.length === 0,
  );

  return {
    uiKind,
    nothingToSolve,
  };
}
