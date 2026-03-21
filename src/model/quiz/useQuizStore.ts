import { create } from "zustand";

import type { GetQuizResult } from "@/api/quiz/api.model";

export type QuizSolvePhase = "ox" | "select" | "text";

export type UserAnswerString = { quizId: number; answer: string };

type OxAnswerBool = { quizId: number; answer: boolean };

function mergeOxAndMc(
  ox: OxAnswerBool[],
  mc: UserAnswerString[],
): UserAnswerString[] {
  return [
    ...ox.map((item) => ({
      quizId: item.quizId,
      answer: String(item.answer),
    })),
    ...mc,
  ];
}

function parseQuizPayload(quizDataJson: string | undefined) {
  const q = quizDataJson
    ? (JSON.parse(quizDataJson) as GetQuizResult)
    : null;
  const oxQuizzes = q?.oxQuizzes ?? [];
  const mcQuizzes = q?.multipleChoiceQuizzes ?? [];
  const shortQuizzes = q?.shortAnswerQuizzes ?? [];
  const phase: QuizSolvePhase =
    oxQuizzes.length > 0
      ? "ox"
      : mcQuizzes.length > 0
        ? "select"
        : "text";
  return {
    quizData: q,
    oxQuizzes,
    mcQuizzes,
    shortQuizzes,
    initialPhase: phase,
  };
}

const TOTAL_QUIZ_COUNT = 5;

export type QuizSolveStoreState = {
  quizData: GetQuizResult | null;
  oxQuizzes: NonNullable<GetQuizResult["oxQuizzes"]>;
  mcQuizzes: NonNullable<GetQuizResult["multipleChoiceQuizzes"]>;
  shortQuizzes: NonNullable<GetQuizResult["shortAnswerQuizzes"]>;

  phase: QuizSolvePhase;
  oxIndex: number;
  selectedOxAnswer: boolean | null;
  oxAnswers: OxAnswerBool[];

  selectIndex: number;
  selectedChoiceIndex: number | null;
  mcAnswers: UserAnswerString[];

  textIndex: number;
  inputValue: string;
  shortAnswerList: UserAnswerString[];

  priorUserAnswersBase: UserAnswerString[];

  /** 완료 시 한 번만 채워짐 → 훅에서 onComplete 호출 후 clear */
  completionPayload: UserAnswerString[] | null;

  init: (quizDataJson: string | undefined) => void;
  reset: () => void;
  clearCompletion: () => void;

  setSelectedOxAnswer: (value: boolean | null) => void;
  setSelectedChoiceIndex: (value: number | null) => void;
  setInputValue: (value: string) => void;

  handleOxNext: () => void;
  handleSelectNext: () => void;
  handleTextNext: () => void;
  /** 단답형 문항 없을 때 prior 만으로 제출 */
  submitTextEmpty: () => void;
  /** 이전 문항으로 이동. 첫 문항이면 false → pop 처리 */
  goToPreviousQuestion: () => boolean;
};

const emptyState = (): Omit<
  QuizSolveStoreState,
  | "init"
  | "reset"
  | "clearCompletion"
  | "setSelectedOxAnswer"
  | "setSelectedChoiceIndex"
  | "setInputValue"
  | "handleOxNext"
  | "handleSelectNext"
  | "handleTextNext"
  | "submitTextEmpty"
  | "goToPreviousQuestion"
> => ({
  quizData: null,
  oxQuizzes: [],
  mcQuizzes: [],
  shortQuizzes: [],
  phase: "text",
  oxIndex: 0,
  selectedOxAnswer: null,
  oxAnswers: [],
  selectIndex: 0,
  selectedChoiceIndex: null,
  mcAnswers: [],
  textIndex: 0,
  inputValue: "",
  shortAnswerList: [],
  priorUserAnswersBase: [],
  completionPayload: null,
});

export const useQuizSolveStore = create<QuizSolveStoreState>((set, get) => ({
  ...emptyState(),

  init: (quizDataJson) => {
    const { quizData, oxQuizzes, mcQuizzes, shortQuizzes, initialPhase } =
      parseQuizPayload(quizDataJson);

    const nothingToSolve =
      Boolean(quizData) &&
      oxQuizzes.length === 0 &&
      mcQuizzes.length === 0 &&
      shortQuizzes.length === 0;

    set({
      ...emptyState(),
      quizData,
      oxQuizzes,
      mcQuizzes,
      shortQuizzes,
      phase: initialPhase,
      completionPayload: nothingToSolve ? [] : null,
    });
  },

  reset: () => set(emptyState()),

  clearCompletion: () => set({ completionPayload: null }),

  setSelectedOxAnswer: (selectedOxAnswer) => set({ selectedOxAnswer }),
  setSelectedChoiceIndex: (selectedChoiceIndex) => set({ selectedChoiceIndex }),
  setInputValue: (inputValue) => set({ inputValue }),

  handleOxNext: () => {
    const s = get();
    if (s.selectedOxAnswer === null) return;
    const currentQuiz = s.oxQuizzes[s.oxIndex];
    if (currentQuiz?.id === undefined) return;

    const nextOxAnswers = [
      ...s.oxAnswers.filter((item) => item.quizId !== currentQuiz.id),
      { quizId: currentQuiz.id, answer: s.selectedOxAnswer },
    ];

    const isLastOx = s.oxIndex >= s.oxQuizzes.length - 1;

    if (!isLastOx) {
      set({
        oxAnswers: nextOxAnswers,
        oxIndex: s.oxIndex + 1,
        selectedOxAnswer: null,
      });
      return;
    }

    if (s.mcQuizzes.length > 0) {
      set({
        oxAnswers: nextOxAnswers,
        phase: "select",
        selectIndex: 0,
        selectedChoiceIndex: null,
        mcAnswers: [],
      });
      return;
    }

    const merged = mergeOxAndMc(nextOxAnswers, []);
    if (s.shortQuizzes.length > 0) {
      set({
        oxAnswers: nextOxAnswers,
        priorUserAnswersBase: merged,
        phase: "text",
        textIndex: 0,
        inputValue: "",
        shortAnswerList: [],
      });
      return;
    }

    set({ completionPayload: merged });
  },

  handleSelectNext: () => {
    const s = get();
    const currentMcQuiz = s.mcQuizzes[s.selectIndex];
    if (!currentMcQuiz?.id || s.selectedChoiceIndex === null) return;

    const nextMcAnswers = [
      ...s.mcAnswers.filter((item) => item.quizId !== currentMcQuiz.id),
      {
        quizId: currentMcQuiz.id,
        answer: String(s.selectedChoiceIndex),
      },
    ];

    const isLastMc = s.selectIndex >= s.mcQuizzes.length - 1;

    if (!isLastMc) {
      set({
        mcAnswers: nextMcAnswers,
        selectIndex: s.selectIndex + 1,
        selectedChoiceIndex: null,
      });
      return;
    }

    const merged = mergeOxAndMc(s.oxAnswers, nextMcAnswers);
    if (s.shortQuizzes.length > 0) {
      set({
        mcAnswers: nextMcAnswers,
        priorUserAnswersBase: merged,
        phase: "text",
        textIndex: 0,
        inputValue: "",
        shortAnswerList: [],
      });
      return;
    }

    set({ completionPayload: merged });
  },

  handleTextNext: () => {
    const s = get();
    const currentShortQuiz = s.shortQuizzes[s.textIndex];
    if (!currentShortQuiz?.id) return;

    const trimmed = s.inputValue.trim();
    const nextList = [
      ...s.shortAnswerList.filter((item) => item.quizId !== currentShortQuiz.id),
      { quizId: currentShortQuiz.id, answer: trimmed },
    ];

    const isLastText = s.textIndex >= s.shortQuizzes.length - 1;

    if (!isLastText) {
      set({
        shortAnswerList: nextList,
        inputValue: "",
        textIndex: s.textIndex + 1,
      });
      return;
    }

    set({
      completionPayload: [...s.priorUserAnswersBase, ...nextList],
    });
  },

  submitTextEmpty: () => {
    const s = get();
    set({ completionPayload: s.priorUserAnswersBase });
  },

  goToPreviousQuestion: () => {
    const s = get();

    if (s.phase === "ox") {
      if (s.oxIndex <= 0) return false;
      const prevIndex = s.oxIndex - 1;
      const prevQuiz = s.oxQuizzes[prevIndex];
      if (prevQuiz?.id === undefined) return false;
      const prevAnswer = s.oxAnswers.find((a) => a.quizId === prevQuiz.id);
      set({
        oxIndex: prevIndex,
        selectedOxAnswer: prevAnswer?.answer ?? null,
      });
      return true;
    }

    if (s.phase === "select") {
      if (s.selectIndex > 0) {
        const prevIndex = s.selectIndex - 1;
        const prevQuiz = s.mcQuizzes[prevIndex];
        if (prevQuiz?.id === undefined) return false;
        const prevAnswer = s.mcAnswers.find((a) => a.quizId === prevQuiz.id);
        set({
          selectIndex: prevIndex,
          selectedChoiceIndex:
            prevAnswer != null ? Number(prevAnswer.answer) : null,
        });
        return true;
      }
      if (s.oxQuizzes.length > 0) {
        const lastOxIdx = s.oxQuizzes.length - 1;
        const lastQuiz = s.oxQuizzes[lastOxIdx];
        if (lastQuiz?.id === undefined) return false;
        const prevAnswer = s.oxAnswers.find((a) => a.quizId === lastQuiz.id);
        set({
          phase: "ox",
          oxIndex: lastOxIdx,
          selectedOxAnswer: prevAnswer?.answer ?? null,
          mcAnswers: [],
        });
        return true;
      }
      return false;
    }

    if (s.phase === "text") {
      if (s.shortQuizzes.length === 0) return false;

      if (s.textIndex > 0) {
        const prevIndex = s.textIndex - 1;
        const prevQuiz = s.shortQuizzes[prevIndex];
        if (prevQuiz?.id === undefined) return false;
        const prevAnswer = s.shortAnswerList.find(
          (a) => a.quizId === prevQuiz.id,
        );
        set({
          textIndex: prevIndex,
          inputValue: prevAnswer?.answer ?? "",
        });
        return true;
      }

      if (s.mcQuizzes.length > 0) {
        const lastMcIdx = s.mcQuizzes.length - 1;
        const lastQuiz = s.mcQuizzes[lastMcIdx];
        if (lastQuiz?.id === undefined) return false;
        const prevAnswer = s.mcAnswers.find((a) => a.quizId === lastQuiz.id);
        set({
          phase: "select",
          selectIndex: lastMcIdx,
          selectedChoiceIndex:
            prevAnswer != null ? Number(prevAnswer.answer) : null,
          shortAnswerList: [],
          inputValue: "",
        });
        return true;
      }

      if (s.oxQuizzes.length > 0) {
        const lastOxIdx = s.oxQuizzes.length - 1;
        const lastQuiz = s.oxQuizzes[lastOxIdx];
        if (lastQuiz?.id === undefined) return false;
        const prevAnswer = s.oxAnswers.find((a) => a.quizId === lastQuiz.id);
        set({
          phase: "ox",
          oxIndex: lastOxIdx,
          selectedOxAnswer: prevAnswer?.answer ?? null,
          shortAnswerList: [],
          inputValue: "",
        });
        return true;
      }

      return false;
    }

    return false;
  },
}));

export const QUIZ_SOLVE_TOTAL_COUNT = TOTAL_QUIZ_COUNT;
