export type AnswerType = "true" | "false";

export interface QuizQuestion {
  id: string;
  question: string;
  correctAnswer: AnswerType;
  explanation?: string;
}

export interface QuizProgress {
  currentQuestionIndex: number;
  totalQuestions: number;
}
