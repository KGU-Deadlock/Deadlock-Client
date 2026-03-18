import type { ApiResult } from "@/api/config/api-client-handler";
import { authApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { ApiResponseVoid, UserSignUpCommand } from "./api.model";

export function postUserJoin(
  body: UserSignUpCommand,
): Promise<ApiResult<ApiResponseVoid>> {
  return authApi.post<ApiResponseVoid, UserSignUpCommand>(END_POINTS.USER.JOIN, body);
}
