import type { ApiResult } from "@/api/config/api-client-handler";
import { authApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { GetRankingResponse } from "./api.model";

export type GetRankingParams = {
  filterType?: "ALL" | "INTEREST";
  size?: number;
};

export function getRankingDetail(
  params?: GetRankingParams,
): Promise<ApiResult<GetRankingResponse>> {
  const searchParams: Record<string, string> = {};
  if (params?.filterType) searchParams.filterType = params.filterType;
  if (typeof params?.size === "number") searchParams.size = String(params.size);

  return authApi.get<GetRankingResponse>(END_POINTS.RANKING.DETAIL, {
    ...(Object.keys(searchParams).length > 0 ? { searchParams } : {}),
  });
}
