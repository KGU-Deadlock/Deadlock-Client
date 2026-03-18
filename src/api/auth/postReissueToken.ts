import type { ApiResult } from "@/api/config/api-client-handler";
import { baseApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { ReissueResponse } from "./api.model";

/**
 * refreshToken(HttpOnly cookie) 기반 accessToken 재발급
 */
export function postReissueToken(): Promise<ApiResult<ReissueResponse>> {
  return baseApi.post<ReissueResponse, undefined>(END_POINTS.AUTH.REISSUE, undefined);
}
