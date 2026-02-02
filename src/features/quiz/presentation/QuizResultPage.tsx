import { For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import Button from "~/shared/components/Button";
import CloseIcon from "~/shared/components/icons/CloseIcon";
import QuizResultCard from "./QuizResultCard";
import type { QuizResult } from "../domain/types";

interface QuizResultPageProps {
  result?: QuizResult;
}

export default function QuizResultPage(props: QuizResultPageProps) {
  const navigate = useNavigate();

  // TODO: 실제 API 연동 시 createResource로 변경
  const result = (): QuizResult =>
    props.result ?? {
      totalQuestions: 5,
      correctCount: 3,
      items: [
        {
          questionId: "1",
          questionNumber: 1,
          questionType: "ox",
          question: "프로세스와 스레드는 같은 개념이다.",
          isCorrect: true,
          explanation: "프로세스는 독립적인 메모리 공간을 가지지만, 스레드는 같은 프로세스 내에서 메모리를 공유합니다.",
        },
        {
          questionId: "2",
          questionNumber: 2,
          questionType: "multiple-choice",
          question: "프로세스와 스레드에 대해 올바르게 설명한 것을 고르세요.",
          isCorrect: false,
          explanation: "프로세스는 독립적인 메모리 공간을 가지지만, 스레드는 같은 프로세스 내에서 메모리를 공유합니다.",
        },
        {
          questionId: "3",
          questionNumber: 3,
          questionType: "multiple-choice",
          question: "HTTP와 HTTPS의 차이점은 무엇인가요?",
          isCorrect: false,
          explanation: "HTTP는 암호화되지 않은 프로토콜이고, HTTPS는 SSL/TLS를 통해 암호화된 프로토콜입니다.",
        },
        {
          questionId: "4",
          questionNumber: 4,
          questionType: "subjective",
          question: "프로세스와 스레드의 차이를 적어보세요.",
          isCorrect: true,
          explanation: "프로세스는 독립적인 메모리 공간을 가지지만, 스레드는 같은 프로세스 내에서 메모리를 공유합니다.",
        },
        {
          questionId: "5",
          questionNumber: 5,
          questionType: "subjective",
          question: "RESTful API의 특징을 설명하세요.",
          isCorrect: true,
          explanation: "RESTful API는 무상태(Stateless) 프로토콜이며, 리소스 기반의 아키텍처를 따릅니다.",
        },
      ],
    };

  const handleClose = () => {
    navigate("/quiz");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <main class="mx-auto flex min-h-screen max-w-[500px] flex-col bg-white">
      {/* Header */}
      <div class="px-4 pt-4">
        <button
          onClick={handleClose}
          class="flex items-center justify-center text-gray-007"
          aria-label="닫기"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Result Summary */}
      <div class="flex flex-col gap-4 px-4 py-6">
        <div class="flex items-baseline gap-1">
          <span class="text-4xl font-bold text-positive">
            {result().correctCount}
          </span>
          <span class="text-2xl font-bold text-gray-005">
            /{result().totalQuestions}
          </span>
        </div>
        <h1 class="text-2xl font-bold text-gray-008">오늘의 문제 풀이 완료!</h1>
        <p class="text-base text-gray-006">
          오늘도 끝까지 해낸 너, 정말 멋져! 내일의 너도 분명 더 강해질 거야 💪
        </p>
      </div>

      {/* Quiz Breakdown */}
      <div class="flex flex-1 flex-col gap-4 px-4 pb-24">
        <For each={result().items}>
          {(item) => (
            <QuizResultCard
              questionNumber={item.questionNumber}
              questionType={item.questionType}
              question={item.question}
              isCorrect={item.isCorrect}
              explanation={item.explanation}
            />
          )}
        </For>
      </div>

      {/* Bottom Button */}
      <div class="fixed bottom-0 left-1/2 w-full max-w-[500px] -translate-x-1/2 bg-gradient-to-t from-blue-004 to-transparent p-4 pb-8">
        <Button
          variant="default"
          size="large"
          onClick={handleGoHome}
          className="w-full"
        >
          홈으로
        </Button>
      </div>
    </main>
  );
}
