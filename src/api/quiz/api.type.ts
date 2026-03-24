import type {
  GetGradingDetailLogResponse,
  GetGradingLogListResponse,
  GetGradingLogResponse,
  GetQuizResponse,
  GetQuizTopicResponse,
  SubmitAnswersResponse,
} from "./api.model";

export type QuizResult = NonNullable<GetQuizResponse["data"]>;

export type SubmitAnswersResult = NonNullable<SubmitAnswersResponse["data"]>;

export type GradingLogResultData = NonNullable<GetGradingLogResponse["data"]>;

export type GradingDetailLogData = NonNullable<
  GetGradingDetailLogResponse["data"]
>;
export type GradingDetailLogResultData = GradingDetailLogData;

export type GradingLogList = NonNullable<GetGradingLogListResponse["data"]>;

export type QuizTopicList = NonNullable<
  NonNullable<GetQuizTopicResponse["data"]>
>;
