import type {
  GetStreakDetailResponse,
  GetStreakMonthlyResponse,
  GetStreakSummaryResponse,
} from "./api.model";

export type StreakSummaryData = NonNullable<GetStreakSummaryResponse["data"]>;
export type StreakMonthlyData = NonNullable<GetStreakMonthlyResponse["data"]>;
export type StreakDetailData = NonNullable<GetStreakDetailResponse["data"]>;
