import type { ApiResult } from "@/api/config/api-client-handler";
import { authApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { SubmitAnswersResponse, UserGradingCommand } from "./api.model";

export function postQuizGrade(
  body: UserGradingCommand[],
): Promise<ApiResult<SubmitAnswersResponse>> {
  return authApi.post<SubmitAnswersResponse, UserGradingCommand[]>(
    END_POINTS.QUIZ.QUIZ_GRADING,
    body,
  );
}
