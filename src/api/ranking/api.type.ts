import type {
  GetRankingResponse,
  GetRankingSummaryResponse,
} from "./api.model";

export type RankingDetailData = NonNullable<GetRankingResponse["data"]>;
export type RankingSummaryData = NonNullable<GetRankingSummaryResponse["data"]>;
