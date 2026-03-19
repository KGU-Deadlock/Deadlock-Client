import { useFlow } from "@/app/stackflow";
import { quizQueries } from "@/api/quiz/api.query";
import {
  BackButton,
  Button,
  Footer,
  Header,
  PageTitle,
  Scrollable,
  Subtitle,
} from "@/components/common";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import type { ActivityComponentType } from "@stackflow/react";
import { useMutation } from "@tanstack/react-query";
import { toastError } from "@/utils/toast";

interface QuizCompletePageProps {
  userAnswers: string;
}

const QuizCompletePage: ActivityComponentType<QuizCompletePageProps> = ({
  params,
}) => {
  const { replace } = useFlow();
  const parsedUserAnswers: Array<{ quizId: number; answer: string }> =
    params.userAnswers
      ? (JSON.parse(params.userAnswers) as Array<{
          quizId: number;
          answer: string;
        }>)
      : [];

  const { mutateAsync: submitGrading, isPending: isSubmitting } = useMutation(
    quizQueries.postQuizGradeMutation(),
  );

  const handleSubmit = async () => {
    if (parsedUserAnswers.length === 0) {
      toastError("제출할 답안이 없어요.");
      return;
    }

    try {
      await submitGrading(parsedUserAnswers);
      replace("HomePage", {}, { animate: false });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "제출에 실패했어요. 잠시 후 다시 시도해주세요.";
      toastError(message);
    }
  };

  return (
    <AppScreen className="relative">
      <Scrollable>
        <Header left={<BackButton />} />
        <PageTitle>
          <span>퀴즈를 다 풀었어요!</span>
        </PageTitle>
        <Subtitle className="px-gutter mt-2">
          답안을 제출하고 AI 채점 결과를 확인해보세요.
        </Subtitle>
        <div className="px-gutter mt-8 mb-[90px] flex flex-col gap-2 overflow-y-auto">
          {parsedUserAnswers.map((item, index) => (
            <div
              key={`${item.quizId}-${index}`}
              className="border-gray-003 bg-gray-001 rounded-xl border px-4 py-3"
            >
              <p className="text-gray-005 text-xs">문항 {index + 1}</p>
              <p className="mt-1 text-sm">{item.answer}</p>
            </div>
          ))}
        </div>
        <Footer>
          <Button
            size="large"
            state={isSubmitting ? "disabled" : "active"}
            onClick={handleSubmit}
          >
            {isSubmitting ? "제출 중..." : "제출하기"}
          </Button>
        </Footer>
      </Scrollable>
    </AppScreen>
  );
};

export default QuizCompletePage;
