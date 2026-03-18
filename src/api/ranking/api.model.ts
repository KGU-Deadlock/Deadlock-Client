import type { components } from "@/api/config/api-models";

export type GetRankingResponse =
  components["schemas"]["ApiResponseRankingDetailResult"];
export type RankingDetailResult = components["schemas"]["RankingDetailResult"];
export type RankingEntryResult = components["schemas"]["RankingEntryResult"];
export type MyRankingResult = components["schemas"]["MyRankingResult"];

export type GetRankingSummaryResponse =
  components["schemas"]["ApiResponseRankingSummaryResult"];
export type RankingSummaryResult = components["schemas"]["RankingSummaryResult"];
