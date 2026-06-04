import type { ApiResult } from "@/api/config/api-client-handler";
import { authApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { FeedbackResponse } from "./api.model";

export function postCompleteInterview(
  interviewId: string,
): Promise<ApiResult<FeedbackResponse>> {
  return authApi.post<FeedbackResponse, undefined>(
    END_POINTS.INTERVIEW.COMPLETE(interviewId),
    undefined,
    { timeout: 60_000 },
  );
}
