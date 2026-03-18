import type { components } from "@/api/config/api-models";

export type GetStreakSummaryResponse =
  components["schemas"]["ApiResponseStreakSummaryResult"];
export type StreakSummaryResult = components["schemas"]["StreakSummaryResult"];

export type GetStreakMonthlyResponse =
  components["schemas"]["ApiResponseStreakMonthlyResult"];
export type StreakMonthlyResult = components["schemas"]["StreakMonthlyResult"];
export type DailyStreakRecordResult =
  components["schemas"]["DailyStreakRecordResult"];

export type GetStreakDetailResponse =
  components["schemas"]["ApiResponseStreakDetailResult"];
export type StreakDetailResult = components["schemas"]["StreakDetailResult"];
