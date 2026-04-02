import type { ApiResult } from "@/api/config/api-client-handler";
import { authApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { GetGradingLogListResponse } from "./api.model";

export function getQuizGradeLogList(): Promise<
  ApiResult<GetGradingLogListResponse>
> {
  return authApi.get<GetGradingLogListResponse>(
    END_POINTS.QUIZ.QUIZ_GRADING_LIST,
  );
}
