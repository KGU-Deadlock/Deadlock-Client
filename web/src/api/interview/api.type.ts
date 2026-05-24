import type {
  FeedbackResponse,
  QuestionFeedback,
  StartInterviewResponse,
} from "./api.model";

export type StartInterviewData = NonNullable<StartInterviewResponse["data"]>;
export type QuestionItem = NonNullable<StartInterviewData["questions"]>[number];

export type FeedbackData = NonNullable<FeedbackResponse["data"]>;
export type QuestionFeedbackItem = NonNullable<
  QuestionFeedback["missingKeywords"]
>[number];
