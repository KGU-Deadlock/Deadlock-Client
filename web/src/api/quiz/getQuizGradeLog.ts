import type { ApiResult } from "@/api/config/api-client-handler";
import { authApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { GetGradingLogResponse } from "./api.model";

export function getQuizGradeLog(
  gradingLogId: string,
): Promise<ApiResult<GetGradingLogResponse>> {
  return authApi.get<GetGradingLogResponse>(
    END_POINTS.QUIZ.QUIZ_GRADING_LOG(gradingLogId),
    { timeout: 30_000 },
  );
}
