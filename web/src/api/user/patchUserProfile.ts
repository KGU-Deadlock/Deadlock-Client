import type { ApiResult } from "@/api/config/api-client-handler";
import { authApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { ApiResponseVoid, UpdateMyInfoCommand } from "./api.model";

export function patchUserProfile(
  body: UpdateMyInfoCommand,
): Promise<ApiResult<ApiResponseVoid>> {
  return authApi.patch<ApiResponseVoid, UpdateMyInfoCommand>(
    END_POINTS.USER.UPDATE,
    body,
  );
}
