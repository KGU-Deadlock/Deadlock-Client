import type { ApiResult } from "@/api/config/api-client-handler";
import { baseApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { GetRankingSummaryResponse } from "./api.model";

export function getRankingSummary(): Promise<ApiResult<GetRankingSummaryResponse>> {
  return baseApi.get<GetRankingSummaryResponse>(END_POINTS.RANKING.SUMMARY);
}
