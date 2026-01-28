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

export type QuestionType = "ox" | "multiple-choice" | "subjective";

export interface QuizResultItem {
  questionId: string;
  questionNumber: number;
  questionType: QuestionType;
  question: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface QuizResult {
  totalQuestions: number;
  correctCount: number;
  items: QuizResultItem[];
}

export interface Category {
  id: string;
  name: string;
}

export type QuizMode = "normal" | "voice";
