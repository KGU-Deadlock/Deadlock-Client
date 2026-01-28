export type AnswerType = "true" | "false";

export interface QuizQuestion {
  id: string;
  question: string;
  correctAnswer: AnswerType;
  explanation?: string;
}

export interface MultipleChoiceOption {
  id: string;
  text: string;
}

export interface MultipleChoiceQuestion {
  id: string;
  question: string;
  options: MultipleChoiceOption[];
  correctAnswerId: string;
  explanation?: string;
}

export interface SubjectiveQuestion {
  id: string;
  question: string;
  maxLength?: number;
  placeholder?: string;
  explanation?: string;
}

export interface QuizProgress {
  currentQuestionIndex: number;
  totalQuestions: number;
}
