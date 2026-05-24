import type { ApiResult } from "@/api/config/api-client-handler";
import { authApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { StartInterviewRequest, StartInterviewResponse } from "./api.model";

export function postStartInterview(
  body: StartInterviewRequest,
): Promise<ApiResult<StartInterviewResponse>> {
  return authApi.post<StartInterviewResponse, StartInterviewRequest>(
    END_POINTS.INTERVIEW.START,
    body,
  );
}
