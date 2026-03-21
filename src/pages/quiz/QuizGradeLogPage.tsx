import { AppScreen } from "@stackflow/plugin-basic-ui";
import type { ActivityComponentType } from "@stackflow/react";
import { useQuery } from "@tanstack/react-query";

import { useFlow } from "@/app/stackflow";

import {
  BackButton,
  Button,
  Footer,
  Header,
  PageTitle,
  Scrollable,
  Subtitle,
} from "@/components/common";

import { quizQueries } from "@/api/quiz/api.query";

interface QuizGradeLogPageProps {
  gradingLogId: string;
}

const QuizGradeLogPage: ActivityComponentType<QuizGradeLogPageProps> = ({
  params,
}) => {
  const { gradingLogId } = params;
  const { push, replace } = useFlow();

  const { data, isPending, isError } = useQuery(
    quizQueries.getQuizGradeLogQuery(gradingLogId),
  );

  const log = data?.data;
  const results = log?.gradingResults ?? [];

  return (
    <AppScreen className="relative">
      <Scrollable>
        <Header left={<BackButton />} />
        <PageTitle>
          <span>채점 결과</span>
        </PageTitle>
        <Subtitle className="px-gutter mt-2">
          문항을 눌러 상세 피드백을 확인할 수 있어요.
        </Subtitle>

        <div className="px-gutter mt-6 flex flex-col gap-4">
          {isPending && (
            <p className="text-gray-005 text-sm">결과를 불러오는 중...</p>
          )}
          {isError && (
            <p className="text-red text-sm">
              결과를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
            </p>
          )}
          {!isPending && !isError && log && (
            <>
              <div className="border-gray-003 bg-gray-001 rounded-xl border px-4 py-3">
                <p className="text-base font-semibold">
                  맞힌 개수 {log.correctCount ?? 0} / {log.quizCount ?? 0}
                </p>
              </div>
              <ul className="flex flex-col gap-2">
                {results.map((item, index) => (
                  <li key={`${item.quizId}-${index}`}>
                    <button
                      type="button"
                      className="border-gray-003 hover:border-blue-004 w-full rounded-xl border bg-white px-4 py-3 text-left transition-colors"
                      onClick={() => {
                        if (item.quizId === undefined) return;
                        push("QuizGradeLogDetailPage", {
                          gradingLogId,
                          quizId: String(item.quizId),
                        });
                      }}
                    >
                      <p className="text-gray-005 text-xs">
                        문항 {index + 1}
                        {item.quizType ? ` · ${item.quizType}` : ""}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm">
                        {item.content ?? "문항 내용 없음"}
                      </p>
                      <p
                        className={
                          item.isCorrect
                            ? "mt-2 text-sm font-medium text-green-600"
                            : "mt-2 text-sm font-medium text-red-500"
                        }
                      >
                        {item.isCorrect === true
                          ? "정답"
                          : item.isCorrect === false
                            ? "오답"
                            : "채점 대기"}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
              {results.length === 0 && (
                <p className="text-gray-005 text-sm">채점 문항이 없어요.</p>
              )}
            </>
          )}
        </div>

        <Footer>
          <Button
            size="large"
            onClick={() => replace("HomePage", {}, { animate: false })}
          >
            홈으로
          </Button>
        </Footer>
      </Scrollable>
    </AppScreen>
  );
};

export default QuizGradeLogPage;
