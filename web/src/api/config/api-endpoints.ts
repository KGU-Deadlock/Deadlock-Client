export const END_POINTS = {
  AUTH: {
    KAKAO_LOGIN: "auth/kakao/login",
    REISSUE: "auth/reissue",
  },
  TOPIC: {
    TOPIC_LIST: "topics",
  },
  QUIZ: {
    QUIZ_LIST: "quiz",
    QUIZ_GRADING: "quiz/grading",
    QUIZ_GRADING_LIST: "quiz/grading/list",
    QUIZ_GRADING_LOG: (gradingLogId: string) => `quiz/grading/${gradingLogId}`,
    QUIZ_GRADING_LOG_DETAIL: (gradingLogId: string, quizId: number) =>
      `quiz/grading/${gradingLogId}/${quizId}`,
  },
  USER: {
    JOIN: "users",
    ME: "users/me",
    WITHDRAW: "users/me",
    UPDATE: "users/me",
  },
  RANKING: {
    DETAIL: "ranking",
    SUMMARY: "ranking/summary",
  },
  STREAK: {
    DETAIL: "streak/detail",
    SUMMARY: "streak",
  },
} as const;
