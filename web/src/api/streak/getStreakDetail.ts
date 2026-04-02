import type { ApiResult } from "@/api/config/api-client-handler";
import { authApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { GetStreakDetailResponse } from "./api.model";

export function getStreakDetail(): Promise<ApiResult<GetStreakDetailResponse>> {
  return authApi.get<GetStreakDetailResponse>(END_POINTS.STREAK.DETAIL);
}
