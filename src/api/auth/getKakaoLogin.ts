import type { ApiResult } from "@/api/config/api-client-handler";
import { baseApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { KakaoLoginResponse } from "./api.model";

/**
 * refreshToken(HttpOnly cookie) 기반 accessToken 재발급
 */
export function getKakaoLogin(
  code: string,
): Promise<ApiResult<KakaoLoginResponse>> {
  return baseApi.get<KakaoLoginResponse>(END_POINTS.AUTH.TOKEN, {
    searchParams: {
      code,
    },
  });
}
