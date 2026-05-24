import type { ApiResult } from "@/api/config/api-client-handler";
import { authApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { FeedbackResponse } from "./api.model";

export function getInterviewFeedback(
  interviewId: string,
): Promise<ApiResult<FeedbackResponse>> {
  return authApi.get<FeedbackResponse>(END_POINTS.INTERVIEW.FEEDBACK(interviewId));
}
