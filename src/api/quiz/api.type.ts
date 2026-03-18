import type {
  GetGradingDetailLogResponse,
  GetGradingLogResponse,
  GetQuizResponse,
  SubmitAnswersResponse,
} from "./api.model";

export type QuizResult = NonNullable<GetQuizResponse["data"]>;

export type SubmitAnswersResult = NonNullable<SubmitAnswersResponse["data"]>;

export type GradingLogResultData = NonNullable<GetGradingLogResponse["data"]>;

export type GradingDetailLogData =
  NonNullable<GetGradingDetailLogResponse["data"]>;
export type GradingDetailLogResultData = GradingDetailLogData;
