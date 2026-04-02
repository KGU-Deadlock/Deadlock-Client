import type { ApiResult } from "@/api/config/api-client-handler";
import { authApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { GetMyProfileResponse } from "./api.model";

export function getUserProfile(): Promise<ApiResult<GetMyProfileResponse>> {
  return authApi.get<GetMyProfileResponse>(END_POINTS.USER.ME);
}
