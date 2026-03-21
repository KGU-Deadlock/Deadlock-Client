import { useEffect, useRef } from "react";

import {
  type QuizSolveStoreState,
  type UserAnswerString,
  useQuizSolveStore,
} from "@/model/quiz/useQuizStore";

export type { UserAnswerString } from "@/model/quiz/useQuizStore";
export type { QuizSolvePhase } from "@/model/quiz/useQuizStore";

export { QUIZ_SOLVE_TOTAL_COUNT } from "@/model/quiz/useQuizStore";

export type QuizSolveUiKind = "ox" | "select" | "text";

export function getQuizSolveUiKind(s: QuizSolveStoreState): QuizSolveUiKind {
  const nothingToSolve =
    Boolean(s.quizData) &&
    s.oxQuizzes.length === 0 &&
    s.mcQuizzes.length === 0 &&
    s.shortQuizzes.length === 0;

  if (nothingToSolve) {
    return "text";
  }

  const currentOxQuiz = s.oxQuizzes[s.oxIndex];
  const currentMcQuiz = s.mcQuizzes[s.selectIndex];

  const { phase } = s;

  if (phase === "ox" && s.oxQuizzes.length > 0 && currentOxQuiz) {
    return "ox";
  }

  if (phase === "select" && s.mcQuizzes.length > 0 && currentMcQuiz) {
    return "select";
  }

  if (phase === "text") {
    return "text";
  }

  if (s.phase === "ox") return "ox";
  if (s.phase === "select") return "select";
  return "text";
}

export function getQuizSolveProgressCurrent(s: QuizSolveStoreState): number {
  const kind = getQuizSolveUiKind(s);
  if (kind === "ox") return s.oxIndex + 1;
  if (kind === "select") return s.oxQuizzes.length + s.selectIndex + 1;
  if (kind === "text") {
    if (s.shortQuizzes.length === 0 && s.priorUserAnswersBase.length > 0) {
      return 1;
    }
    if (s.shortQuizzes.length > 0) {
      return s.priorUserAnswersBase.length + s.textIndex + 1;
    }
  }
  return 1;
}

type UseQuizSolveParams = {
  quizDataJson: string | undefined;
  onComplete: (answers: UserAnswerString[]) => void;
};

export function useQuizSolve({ quizDataJson, onComplete }: UseQuizSolveParams) {
  const onCompleteRef = useRef(onComplete);

  const init = useQuizSolveStore((st: QuizSolveStoreState) => st.init);
  const reset = useQuizSolveStore((st: QuizSolveStoreState) => st.reset);
  const completionPayload = useQuizSolveStore(
    (st: QuizSolveStoreState) => st.completionPayload,
  );

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    init(quizDataJson);
  }, [quizDataJson, init]);

  useEffect(() => {
    if (completionPayload === null) return;
    onCompleteRef.current(completionPayload);
    reset();
  }, [completionPayload, reset]);

  const uiKind = useQuizSolveStore((st: QuizSolveStoreState) =>
    getQuizSolveUiKind(st),
  );

  const nothingToSolve = useQuizSolveStore(
    (st: QuizSolveStoreState) =>
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
