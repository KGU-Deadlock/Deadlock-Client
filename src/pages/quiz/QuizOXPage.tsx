import {
  Button,
  Footer,
  PageTitle,
} from "@/components/common";
import QuizLayout from "@/components/quiz/QuizLayout";
import { useFlow } from "@/app/stackflow";
import type { ActivityComponentType } from "@stackflow/react";
import type { GetQuizResult } from "@/api/quiz/api.model";
import { useMemo, useState } from "react";

interface QuizOXPageProps {
  topic: string;
  mode: "STANDARD";
  quizData: string;
}

const QuizOXPage: ActivityComponentType<QuizOXPageProps> = ({ params }) => {
  const { push } = useFlow();
  const quizData: GetQuizResult | null = params.quizData
    ? (JSON.parse(params.quizData) as GetQuizResult)
    : null;
  const oxQuizzes = useMemo(
    () => quizData?.oxQuizzes ?? [],
    [quizData?.oxQuizzes],
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [oxAnswers, setOxAnswers] = useState<
    Array<{ quizId: number; answer: boolean }>
  >([]);

  const currentQuiz = oxQuizzes[currentIndex];
  const isLastQuiz = currentIndex >= oxQuizzes.length - 1;
  const totalQuizCount = 5;
  const currentQuizNumber = currentIndex + 1;

  const handleSelectAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    if (currentQuiz?.id !== undefined) {
      setOxAnswers((prev) => {
        const next = prev.filter((item) => item.quizId !== currentQuiz.id);
        next.push({ quizId: currentQuiz.id!, answer: selectedAnswer });
        return next;
      });
    }

    if (isLastQuiz) {
      const restQuizData = Object.fromEntries(
        Object.entries(quizData ?? {}).filter(([key]) => key !== "oxQuizzes"),
      );
      const finalOxAnswers =
        currentQuiz?.id !== undefined
          ? [
              ...oxAnswers.filter((item) => item.quizId !== currentQuiz.id),
              { quizId: currentQuiz.id, answer: selectedAnswer },
            ]
          : oxAnswers;

      push(
        "QuizSelectPage",
        {
          topic: params.topic,
          mode: params.mode,
          quizData: JSON.stringify(restQuizData),
          oxAnswers: JSON.stringify(finalOxAnswers),
        },
        { animate: false },
      );
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
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
              selectedAnswer !== null && oxQuizzes.length > 0
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
            <div className="grid grid-cols-2 gap-3">
              <Button
                size="large"
                state={selectedAnswer === true ? "outline" : "disabled_outline"}
                className="h-[100px]"
                onClick={() => handleSelectAnswer(true)}
              >
                <span className="font-tossface text-2xl">⭕️</span>
              </Button>
              <Button
                size="large"
                state={
                  selectedAnswer === false ? "outline" : "disabled_outline"
                }
                className="h-[100px]"
                onClick={() => handleSelectAnswer(false)}
              >
                <span className="font-tossface text-2xl">❌</span>
              </Button>
            </div>
          </>
        )}
    </QuizLayout>
  );
};

export default QuizOXPage;
