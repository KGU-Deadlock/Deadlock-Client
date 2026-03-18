import type { ApiResult } from "@/api/config/api-client-handler";
import { authApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { GetGradingDetailLogResponse } from "./api.model";

export function getQuizGradeLogDetail(
  gradingLogId: string,
  quizId: number,
): Promise<ApiResult<GetGradingDetailLogResponse>> {
  return authApi.get<GetGradingDetailLogResponse>(
    END_POINTS.QUIZ.QUIZ_GRADING_LOG_DETAIL(gradingLogId, quizId),
  );
}
