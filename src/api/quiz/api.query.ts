import { mutationOptions, queryOptions } from "@tanstack/react-query";

import { postQuizList } from "./postQuizList";
import { postQuizGrade } from "./postQuizGrade";
import { getQuizGradeLog } from "./getQuizGradeLog";
import { getQuizGradeLogDetail } from "./getQuizGradeLogDetail";
import { getQuizTopic } from "./getQuizTopic";
import type { GetQuizRequest } from "./api.model";

const quizQueryKey = ["quiz"] as const;

export const quizKeys = {
  all: quizQueryKey,
  topic: () => [...quizQueryKey, "topic"] as const,
  list: (params: GetQuizRequest) => [...quizQueryKey, "list", params] as const,
  gradingLog: (gradingLogId: string) =>
    [...quizQueryKey, "grading-log", gradingLogId] as const,
  gradingLogDetail: (gradingLogId: string, quizId: number) =>
    [...quizQueryKey, "grading-log-detail", gradingLogId, quizId] as const,
};

export const quizQueries = {
  keys: quizKeys,

  getQuizTopicQuery: () =>
    queryOptions({
      queryKey: quizKeys.topic(),
      queryFn: async () => {
        const res = await getQuizTopic();
        if (!res.ok) throw new Error("토픽 조회에 실패했습니다.");
        return res.data;
      },
    }),

  postQuizListQuery: (params: GetQuizRequest) =>
    queryOptions({
      queryKey: quizKeys.list(params),
      queryFn: async () => {
        const res = await postQuizList(params);
        if (!res.ok) throw new Error("퀴즈 조회에 실패했습니다.");
        return res.data;
      },
    }),

  postQuizGradeMutation: () =>
    mutationOptions({
      mutationFn: async (body: Parameters<typeof postQuizGrade>[0]) => {
        const res = await postQuizGrade(body);
        if (!res.ok) throw new Error("퀴즈 채점 요청에 실패했습니다.");
        return res.data;
      },
    }),

  getQuizGradeLogQuery: (gradingLogId: string) =>
    queryOptions({
      queryKey: quizKeys.gradingLog(gradingLogId),
      queryFn: async () => {
        const res = await getQuizGradeLog(gradingLogId);
        if (!res.ok) throw new Error("채점 로그 조회에 실패했습니다.");
        return res.data;
      },
      enabled: Boolean(gradingLogId),
    }),

  getQuizGradeLogDetailQuery: (gradingLogId: string, quizId: number) =>
    queryOptions({
      queryKey: quizKeys.gradingLogDetail(gradingLogId, quizId),
      queryFn: async () => {
        const res = await getQuizGradeLogDetail(gradingLogId, quizId);
        if (!res.ok) throw new Error("채점 상세 조회에 실패했습니다.");
        return res.data;
      },
      enabled: Boolean(gradingLogId) && Number.isFinite(quizId),
    }),
};
