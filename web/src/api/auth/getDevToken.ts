import type { ApiResult } from "@/api/config/api-client-handler";
import { baseApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { DevTokenResponse } from "./api.model";

export function getDevToken(): Promise<ApiResult<DevTokenResponse>> {
  return baseApi.get<DevTokenResponse>(END_POINTS.AUTH.DEV);
}
