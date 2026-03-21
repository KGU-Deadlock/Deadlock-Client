/** API·스택플로우 퀴즈 모드 (GetQuizRequest.mode 등과 동일) */
export const QUIZ_MODE = {
  VOICE: "VOICE",
  STANDARD: "STANDARD",
} as const;

export type QuizMode = (typeof QUIZ_MODE)[keyof typeof QUIZ_MODE];
