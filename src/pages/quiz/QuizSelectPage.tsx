import type { ActivityComponentType } from "@stackflow/react";
import { useMemo, useState } from "react";

import { useFlow } from "@/app/stackflow";

import { Button, Footer, PageTitle } from "@/components/common";
import QuizLayout from "@/components/quiz/QuizLayout";

import type { GetQuizResult } from "@/api/quiz/api.model";

import { QUIZ_MODE } from "@/constants/quiz/quiz";

interface QuizSelectPageProps {
  topic: string;
  mode: typeof QUIZ_MODE.STANDARD;
  quizData: string;
  oxAnswers: string;
}

const QuizSelectPage: ActivityComponentType<QuizSelectPageProps> = ({
  params,
}) => {
  const { push } = useFlow();
  const parsedQuizData: Omit<GetQuizResult, "oxQuizzes"> | null =
    params.quizData
      ? (JSON.parse(params.quizData) as Omit<GetQuizResult, "oxQuizzes">)
      : null;
  const parsedOxAnswers: Array<{ quizId: number; answer: boolean }> =
    params.oxAnswers
      ? (JSON.parse(params.oxAnswers) as Array<{
          quizId: number;
          answer: boolean;
        }>)
      : [];
  const multipleChoiceQuizzes = useMemo(
    () => parsedQuizData?.multipleChoiceQuizzes ?? [],
    [parsedQuizData?.multipleChoiceQuizzes],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(
    null,
  );
  const [selectedAnswers, setSelectedAnswers] = useState<
    Array<{ quizId: number; answer: string }>
  >([]);

  const currentQuiz = multipleChoiceQuizzes[currentIndex];
  const isLastQuiz = currentIndex >= multipleChoiceQuizzes.length - 1;
  const totalQuizCount = 5;
  const completedQuizCount = parsedOxAnswers.length;
  const currentQuizNumber = completedQuizCount + currentIndex + 1;

  const handleSelectChoice = (choiceIndex: number) => {
    setSelectedChoiceIndex(choiceIndex);
  };

  const handleNext = () => {
    if (!currentQuiz?.id || selectedChoiceIndex === null) return;

    const nextAnswers = [
      ...selectedAnswers.filter((item) => item.quizId !== currentQuiz.id),
      { quizId: currentQuiz.id, answer: String(selectedChoiceIndex) },
    ];
    setSelectedAnswers(nextAnswers);

    if (isLastQuiz) {
      const restQuizData = Object.fromEntries(
        Object.entries(parsedQuizData ?? {}).filter(
          ([key]) => key !== "multipleChoiceQuizzes",
        ),
      );
      const mergedAnswers = [
        ...parsedOxAnswers.map((item) => ({
          quizId: item.quizId,
          answer: String(item.answer),
        })),
        ...nextAnswers,
      ];

      push(
        "QuizTextPage",
        {
          topic: params.topic,
          mode: params.mode,
          quizData: JSON.stringify(restQuizData),
          userAnswers: JSON.stringify(mergedAnswers),
        },
        { animate: false },
      );
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedChoiceIndex(null);
  };

  return (
    <QuizLayout
      current={currentQuizNumber}
      total={totalQuizCount}
      footer={
        <Footer>
          <Button
            size="large"
            state={
              selectedChoiceIndex !== null && multipleChoiceQuizzes.length > 0
                ? "active"
                : "disabled"
            }
            onClick={handleNext}
          >
            다음 문제
          </Button>
        </Footer>
      }
    >
      {currentQuiz && (
        <>
          <PageTitle className="m-0 flex flex-wrap !px-0 break-words whitespace-normal">
            {currentQuiz.content}
          </PageTitle>
          <div className="flex flex-col gap-3">
            {(currentQuiz.choices ?? []).map((choice, choiceIndex) => (
              <Button
                key={`${choiceIndex}-${choice}`}
                size="large"
                state={
                  selectedChoiceIndex === choiceIndex
                    ? "outline"
                    : "disabled_outline"
                }
                onClick={() => handleSelectChoice(choiceIndex)}
              >
                {choice}
              </Button>
            ))}
          </div>
        </>
      )}
    </QuizLayout>
  );
};

export default QuizSelectPage;
