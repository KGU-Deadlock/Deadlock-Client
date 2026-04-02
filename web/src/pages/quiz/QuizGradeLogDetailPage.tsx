import { AppScreen } from "@stackflow/plugin-basic-ui";
import type { ActivityComponentType } from "@stackflow/react";
import { useQuery } from "@tanstack/react-query";

import {
  BackButton,
  Header,
  HighlightMarkupText,
  PageTitle,
  Scrollable,
} from "@/components/common";

import { quizQueries } from "@/api/quiz/api.query";

import { formatQuizAnswerDisplay } from "@/utils/formatQuizAnswerDisplay";

interface QuizGradeLogDetailPageProps {
  gradingLogId: string;
  quizId: string;
}

const QuizGradeLogDetailPage: ActivityComponentType<
  QuizGradeLogDetailPageProps
> = ({ params }) => {
  const { gradingLogId, quizId } = params;
  const quizIdNum = Number(quizId);

  const { data, isPending, isError } = useQuery(
    quizQueries.getQuizGradeLogDetailQuery(gradingLogId, quizIdNum),
  );

  const detail = data?.data;

  return (
    <AppScreen className="relative">
      <Scrollable>
        <Header left={<BackButton />} />
        <PageTitle>
          <span>문항 상세</span>
        </PageTitle>

        <div className="px-gutter mt-6 flex flex-col gap-4 text-sm">
          {isPending && (
            <p className="text-gray-005">상세를 불러오는 중...</p>
          )}
          {isError && (
            <p className="text-red">
              상세를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
            </p>
          )}
          {!isPending && !isError && detail && (
            <>
              <div className="border-gray-003 bg-gray-001 rounded-xl border px-4 py-3">
                <p className="text-gray-005 text-xs">
                  {detail.quizType ? `유형 · ${detail.quizType}` : "유형"}
                </p>
                {detail.score !== undefined && (
                  <p className="mt-1 font-semibold">점수 {detail.score}점</p>
                )}
                <p
                  className={
                    detail.isCorrect
                      ? "mt-1 font-medium text-green-600"
                      : "mt-1 font-medium text-red-500"
                  }
                >
                  {detail.isCorrect === true
                    ? "정답"
                    : detail.isCorrect === false
                      ? "오답"
                      : ""}
                </p>
              </div>

              <section>
                <p className="text-gray-005 text-xs">문제</p>
                <p className="mt-1 leading-6">{detail.content ?? "-"}</p>
              </section>

              <section>
                <p className="text-gray-005 text-xs">내 답안</p>
                <p className="mt-1 leading-6">
                  {formatQuizAnswerDisplay(detail.userAnswer) || "-"}
                </p>
              </section>

              <section>
                <p className="text-gray-005 text-xs">정답</p>
                <p className="mt-1 leading-6">
                  {formatQuizAnswerDisplay(detail.correctAnswer) || "-"}
                </p>
              </section>

              {detail.feedback && (
                <section>
                  <p className="text-gray-005 text-xs">피드백</p>
                  <p className="mt-1 leading-6 whitespace-pre-wrap">
                    <HighlightMarkupText text={detail.feedback} />
                  </p>
                </section>
              )}

              {detail.missingKeywords &&
                detail.missingKeywords.length > 0 && (
                  <section>
                    <p className="text-gray-005 text-xs">부족한 키워드</p>
                    <p className="mt-1">
                      {detail.missingKeywords.join(", ")}
                    </p>
                  </section>
                )}

              {detail.improvedAnswer && (
                <section>
                  <p className="text-gray-005 text-xs">
                    {detail.isCorrect === true ? "상세 설명" : "개선 예시"}
                  </p>
                  <p className="mt-1 leading-6 whitespace-pre-wrap">
                    <HighlightMarkupText text={detail.improvedAnswer} />
                  </p>
                </section>
              )}
            </>
          )}
        </div>
      </Scrollable>
    </AppScreen>
  );
};

export default QuizGradeLogDetailPage;
