import type { ApiResult } from "@/api/config/api-client-handler";
import { baseApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { KakaoLoginResponse } from "./api.model";

export function postKakaoLogin(
  code: string,
): Promise<ApiResult<KakaoLoginResponse>> {
  return baseApi.post<KakaoLoginResponse, { code: string }>(
    END_POINTS.AUTH.TOKEN,
    { code },
  );
}
