import type { components } from "@/api/config/api-models";

export type GetQuizRequest = components["schemas"]["GetQuizRequest"];
export type GetQuizResponse = components["schemas"]["ApiResponseGetQuizResult"];
export type GetQuizResult = components["schemas"]["GetQuizResult"];

export type UserGradingCommand = components["schemas"]["UserGradingCommand"];
export type SubmitAnswersResponse =
  components["schemas"]["ApiResponseSubmitAnswerResponse"];
export type SubmitAnswerResult = components["schemas"]["SubmitAnswerResponse"];

export type GetGradingLogResponse =
  components["schemas"]["ApiResponseGradingLogResult"];
export type GradingLogResult = components["schemas"]["GradingLogResult"];
export type GradingItemResult = components["schemas"]["GradingItemResult"];

export type GetGradingDetailLogResponse =
  components["schemas"]["ApiResponseGradingDetailLogResult"];
export type GradingDetailLogResult =
  components["schemas"]["GradingDetailLogResult"];

export type GetQuizTopicResponse =
  components["schemas"]["ApiResponseListTopicResult"];
export type QuizTopicResult = Required<components["schemas"]["TopicResult"]>;
