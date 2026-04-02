import { queryOptions } from "@tanstack/react-query";

import { getRankingDetail, type GetRankingParams } from "./getRankingDetail";
import { getRankingSummary } from "./getRankingSummary";

const rankingQueryKey = ["ranking"] as const;

export const rankingKeys = {
  all: rankingQueryKey,
  summary: () => [...rankingQueryKey, "summary"] as const,
  detail: (params?: GetRankingParams) =>
    [...rankingQueryKey, "detail", params] as const,
};

export const rankingQueries = {
  keys: rankingKeys,

  getRankingSummaryQuery: () =>
    queryOptions({
      queryKey: rankingKeys.summary(),
      queryFn: async () => {
        const res = await getRankingSummary();
        if (!res.ok) throw new Error("랭킹 요약 조회에 실패했습니다.");
        return res.data;
      },
    }),

  getRankingDetailQuery: (params?: GetRankingParams) =>
    queryOptions({
      queryKey: rankingKeys.detail(params),
      queryFn: async () => {
        const res = await getRankingDetail(params);
        if (!res.ok) throw new Error("랭킹 상세 조회에 실패했습니다.");
        return res.data;
      },
    }),
};
