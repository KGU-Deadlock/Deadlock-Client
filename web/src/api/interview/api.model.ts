import type { components } from "@/api/config/api-models";

/** POST /v1/interview/start */
export type StartInterviewRequest =
  components["schemas"]["StartInterviewRequest"];
export type StartInterviewResponse =
  components["schemas"]["ApiResponseStartInterviewResult"];
export type StartInterviewResult =
  components["schemas"]["StartInterviewResult"];
export type QuestionResult = components["schemas"]["QuestionResult"];

/** POST /v1/interview/{interviewId}/answer */
export type SubmitAnswerRequest = components["schemas"]["SubmitAnswerRequest"];
export type SubmitAnswerResponse =
  components["schemas"]["ApiResponseSubmitAnswerResponse"];

/** POST /v1/interview/{interviewId}/complete */
/** GET  /v1/interview/{interviewId}/feedback */
export type FeedbackResponse =
  components["schemas"]["ApiResponseFeedbackResult"];
export type FeedbackResult = components["schemas"]["FeedbackResult"];
export type QuestionFeedback = components["schemas"]["QuestionFeedback"];
