import type { ApiResult } from "@/api/config/api-client-handler";
import { baseApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

/**
 * 카카오 OAuth2 로그인 시작 (302 redirect)
 */
export function getKakaoLogin(): Promise<ApiResult<unknown>> {
  return baseApi.get<unknown>(END_POINTS.AUTH.LOGIN, {
    redirect: "manual",
  });
}
