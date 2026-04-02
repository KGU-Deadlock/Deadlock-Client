import type { ApiResult } from "@/api/config/api-client-handler";
import { authApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { GetQuizRequest, GetQuizResponse } from "./api.model";

export function postQuizList(
  body: GetQuizRequest,
): Promise<ApiResult<GetQuizResponse>> {
  return authApi.post<GetQuizResponse, GetQuizRequest>(
    END_POINTS.QUIZ.QUIZ_LIST,
    body,
  );
}
