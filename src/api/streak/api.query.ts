import { queryOptions } from "@tanstack/react-query";

import { getStreakDetail } from "./getStreakDetail";
import { getStreakSummary, type GetStreakSummaryParams } from "./getStreakSummary";

const streakQueryKey = ["streak"] as const;

export const streakKeys = {
  all: streakQueryKey,
  summary: (params: GetStreakSummaryParams) =>
    [...streakQueryKey, "summary", params] as const,
  detail: () => [...streakQueryKey, "detail"] as const,
};

export const streakQueries = {
  keys: streakKeys,

  getStreakSummaryQuery: (params: GetStreakSummaryParams) =>
    queryOptions({
      queryKey: streakKeys.summary(params),
      queryFn: async () => {
        const res = await getStreakSummary(params);
        if (!res.ok) throw new Error("스트릭 요약 조회에 실패했습니다.");
        return res.data;
      },
    }),

  getStreakDetailQuery: () =>
    queryOptions({
      queryKey: streakKeys.detail(),
      queryFn: async () => {
        const res = await getStreakDetail();
        if (!res.ok) throw new Error("스트릭 상세 조회에 실패했습니다.");
        return res.data;
      },
    }),
};
