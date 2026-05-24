import { mutationOptions, queryOptions } from "@tanstack/react-query";

import { getInterviewFeedback } from "./getInterviewFeedback";
import { postCompleteInterview } from "./postCompleteInterview";
import { postStartInterview } from "./postStartInterview";
import { postSubmitAnswer } from "./postSubmitAnswer";

const interviewQueryKey = ["interview"] as const;

export const interviewKeys = {
  all: interviewQueryKey,
  feedback: (interviewId: string) =>
    [...interviewQueryKey, "feedback", interviewId] as const,
};

export const interviewQueries = {
  keys: interviewKeys,

  startInterviewMutation: () =>
    mutationOptions({
      mutationFn: async (body: Parameters<typeof postStartInterview>[0]) => {
        const res = await postStartInterview(body);
        if (!res.ok) throw new Error("면접 시작에 실패했습니다.");
        return res.data;
      },
    }),

  submitAnswerMutation: () =>
    mutationOptions({
      mutationFn: async ({
        interviewId,
        ...body
      }: { interviewId: string } & Parameters<typeof postSubmitAnswer>[1]) => {
        const res = await postSubmitAnswer(interviewId, body);
        if (!res.ok) throw new Error("답변 제출에 실패했습니다.");
        return res.data;
      },
    }),

  completeInterviewMutation: () =>
    mutationOptions({
      mutationFn: async (interviewId: string) => {
        const res = await postCompleteInterview(interviewId);
        if (!res.ok) throw new Error("면접 완료 처리에 실패했습니다.");
        return res.data;
      },
    }),

  getFeedbackQuery: (interviewId: string) =>
    queryOptions({
      queryKey: interviewKeys.feedback(interviewId),
      queryFn: async () => {
        const res = await getInterviewFeedback(interviewId);
        if (!res.ok) throw new Error("피드백 조회에 실패했습니다.");
        return res.data;
      },
    }),
};
