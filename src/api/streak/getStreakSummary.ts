import type { ApiResult } from "@/api/config/api-client-handler";
import { authApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { GetStreakMonthlyResponse } from "./api.model";

export type GetStreakSummaryParams = {
  year: number;
  month: number; // 1-12
};

export function getStreakSummary(
  params: GetStreakSummaryParams,
): Promise<ApiResult<GetStreakMonthlyResponse>> {
  return authApi.get<GetStreakMonthlyResponse>(END_POINTS.STREAK.SUMMARY, {
    searchParams: {
      year: String(params.year),
      month: String(params.month),
    },
  });
}
