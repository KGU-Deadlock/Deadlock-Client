import { AppScreen } from "@stackflow/plugin-basic-ui";
import type { ActivityComponentType } from "@stackflow/react";
import { useMemo, useState } from "react";

import { useFlow } from "@/app/stackflow";

import {
  BackButton,
  Button,
  Footer,
  Header,
  PageTitle,
} from "@/components/common";
import QuizLayout from "@/components/quiz/QuizLayout";

import type { GetQuizResult } from "@/api/quiz/api.model";


interface QuizTextPageProps {
  topic: string;
  mode: "STANDARD";
  quizData: string;
  userAnswers: string;
}

const QuizTextPage: ActivityComponentType<QuizTextPageProps> = ({ params }) => {
  const { push } = useFlow();
  const parsedQuizData: Omit<
    GetQuizResult,
    "oxQuizzes" | "multipleChoiceQuizzes"
  > | null = params.quizData
    ? (JSON.parse(params.quizData) as Omit<
        GetQuizResult,
        "oxQuizzes" | "multipleChoiceQuizzes"
      >)
    : null;
  const parsedUserAnswers: Array<{ quizId: number; answer: string }> =
    params.userAnswers
      ? (JSON.parse(params.userAnswers) as Array<{
          quizId: number;
          answer: string;
        }>)
      : [];

  const shortAnswerQuizzes = useMemo(
    () => parsedQuizData?.shortAnswerQuizzes ?? [],
    [parsedQuizData?.shortAnswerQuizzes],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [shortAnswerList, setShortAnswerList] = useState<
    Array<{ quizId: number; answer: string }>
  >([]);

  const currentQuiz = shortAnswerQuizzes[currentIndex];
  const isLastQuiz = currentIndex >= shortAnswerQuizzes.length - 1;
  const totalQuizCount = 5;
  const completedQuizCount = parsedUserAnswers.length;
  const currentQuizNumber = completedQuizCount + currentIndex + 1;

  const handleNext = () => {
    if (!currentQuiz?.id) return;

    const trimmed = inputValue.trim();
    const nextList = [
      ...shortAnswerList.filter((item) => item.quizId !== currentQuiz.id),
      { quizId: currentQuiz.id, answer: trimmed },
    ];
    setShortAnswerList(nextList);
    setInputValue("");

    if (isLastQuiz) {
      const finalAnswers = [...parsedUserAnswers, ...nextList];
      push(
        "QuizCompletePage",
        {
          userAnswers: JSON.stringify(finalAnswers),
        },
        { animate: false },
      );
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const canGoNext =
    shortAnswerQuizzes.length === 0 ||
    Boolean(currentQuiz && inputValue.trim() !== "");

  if (shortAnswerQuizzes.length === 0 && parsedUserAnswers.length > 0) {
    return (
      <AppScreen className="relative">
        <Header left={<BackButton />} />
        <PageTitle>
          <span>단답형 퀴즈가 없어요</span>
        </PageTitle>
        <div className="px-gutter mt-12 flex flex-col gap-6 text-sm">
          <p className="text-gray-005">지금까지 푼 답안을 제출할까요?</p>
          <Footer>
            <Button
              size="large"
              state="active"
              onClick={() =>
                push(
                  "QuizCompletePage",
                  { userAnswers: JSON.stringify(parsedUserAnswers) },
                  { animate: false },
                )
              }
            >
              제출하기
            </Button>
          </Footer>
        </div>
      </AppScreen>
    );
  }

  return (
    <QuizLayout
      current={currentQuizNumber}
      total={totalQuizCount}
      footer={
        <Footer>
          <Button
            size="large"
            state={canGoNext ? "active" : "disabled"}
            onClick={handleNext}
          >
            {isLastQuiz ? "완료" : "다음 문제"}
          </Button>
        </Footer>
      }
    >
      {currentQuiz && (
        <>
          <PageTitle className="m-0 flex flex-wrap !px-0 break-words whitespace-normal">
            {currentQuiz.content}
          </PageTitle>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="답을 입력하세요"
            className="border-gray-004 focus:border-blue-004 h-[200px] resize-none rounded-xl border-1 bg-white px-4 py-3 text-base outline-none"
            autoFocus
          />
        </>
      )}
    </QuizLayout>
  );
};

export default QuizTextPage;
