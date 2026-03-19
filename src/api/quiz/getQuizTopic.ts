import type { ApiResult } from "@/api/config/api-client-handler";
import { baseApi } from "@/api/config/api-client-method";
import { END_POINTS } from "@/api/config/api-endpoints";

import type { GetQuizTopicResponse } from "./api.model";

export function getQuizTopic(): Promise<ApiResult<GetQuizTopicResponse>> {
  return baseApi.get<GetQuizTopicResponse>(END_POINTS.TOPIC.TOPIC_LIST);
}
