import { AppScreen } from "@stackflow/plugin-basic-ui";
import type { ActivityComponentType } from "@stackflow/react";
import { useQuery } from "@tanstack/react-query";

import { useFlow } from "@/app/stackflow";

import {
  BackButton,
  Button,
  Footer,
  Header,
  LoadingSpinner,
  PageTitle,
  Scrollable,
  Subtitle,
} from "@/components/common";

import { interviewQueries } from "@/api/interview/api.query";

interface InterviewFeedbackPageProps {
  interviewId: string;
}

const InterviewFeedbackPage: ActivityComponentType<
  InterviewFeedbackPageProps
> = ({ params }) => {
  const { replace } = useFlow();
  const { data, isPending, isError } = useQuery(
    interviewQueries.getFeedbackQuery(params.interviewId),
  );

  const feedback = data?.data;

  return (
    <AppScreen>
      <Scrollable>
        <Header left={<BackButton />} />

        <PageTitle>
          <span>면접 결과</span>
        </PageTitle>

        {isPending && (
          <div className="flex justify-center py-20">
            <LoadingSpinner className="size-10" />
          </div>
        )}

        {isError && (
          <Subtitle className="px-gutter mt-4">
            피드백을 불러오지 못했어요. 잠시 후 다시 시도해주세요.
          </Subtitle>
        )}

        {feedback && (
          <div className="px-gutter mt-6 mb-[90px] flex flex-col gap-4">
            {/* 종합 점수 */}
            <div className="bg-gray-001 border-gray-002 flex flex-col items-center gap-1 rounded-2xl border py-6">
              <p className="text-gray-005 text-sm">종합 점수</p>
              <p className="text-blue-004 text-5xl font-bold">
                {feedback.overallScore ?? 0}
              </p>
              <p className="text-gray-005 text-sm">점</p>
            </div>

            {/* 문항별 피드백 */}
            {feedback.questionFeedbacks?.map((qf, idx) => (
              <div
                key={idx}
                className="border-gray-003 flex flex-col gap-3 rounded-2xl border px-4 py-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">질문 {qf.questionNumber}</p>
                  <span className="text-blue-004 text-sm font-semibold">
                    {qf.score}점
                  </span>
                </div>

                {qf.message && (
                  <section className="flex flex-col gap-1">
                    <p className="text-gray-005 text-xs">피드백</p>
                    <p className="text-sm leading-6 whitespace-pre-wrap">
                      {qf.message}
                    </p>
                  </section>
                )}

                {qf.missingKeywords && qf.missingKeywords.length > 0 && (
                  <section className="flex flex-col gap-1">
                    <p className="text-gray-005 text-xs">부족한 키워드</p>
                    <div className="flex flex-wrap gap-1.5">
                      {qf.missingKeywords.map((kw) => (
                        <span
                          key={kw}
                          className="bg-gray-002 text-gray-005 rounded-full px-2.5 py-0.5 text-xs"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {qf.improvedAnswer && (
                  <section className="flex flex-col gap-1">
                    <p className="text-gray-005 text-xs">개선 예시</p>
                    <p className="bg-gray-001 rounded-xl px-3 py-3 text-sm leading-6 whitespace-pre-wrap">
                      {qf.improvedAnswer}
                    </p>
                  </section>
                )}
              </div>
            ))}
          </div>
        )}

        <Footer>
          <Button
            size="large"
            state="active"
            onClick={() => replace("HomePage", {}, { animate: false })}
          >
            홈으로 돌아가기
          </Button>
        </Footer>
      </Scrollable>
    </AppScreen>
  );
};

export default InterviewFeedbackPage;
