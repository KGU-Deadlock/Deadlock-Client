import type { ApiResult } from "@/api/config/api-client-handler";
import { authApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { ApiResponseVoid } from "./api.model";

export function deleteUserWithdraw(): Promise<ApiResult<ApiResponseVoid>> {
  return authApi.del<ApiResponseVoid>(END_POINTS.USER.WITHDRAW);
}
