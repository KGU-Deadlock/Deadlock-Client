import type { ApiResult } from "@/api/config/api-client-handler";
import { authApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { SubmitAnswerRequest, SubmitAnswerResponse } from "./api.model";

export function postSubmitAnswer(
  interviewId: string,
  body: SubmitAnswerRequest,
): Promise<ApiResult<SubmitAnswerResponse>> {
  return authApi.post<SubmitAnswerResponse, SubmitAnswerRequest>(
    END_POINTS.INTERVIEW.ANSWER(interviewId),
    body,
    { timeout: 60_000 },
  );
}
