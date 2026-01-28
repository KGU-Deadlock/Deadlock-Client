import { createSignal, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import Button from "~/shared/components/Button";
import CloseIcon from "~/shared/components/icons/CloseIcon";
import ProgressBar from "./ProgressBar";
import MultipleChoiceAnswerCard from "./MultipleChoiceAnswerCard";
import type { MultipleChoiceQuestion } from "../domain/types";

interface QuizMultipleChoicePageProps {
  questions?: MultipleChoiceQuestion[];
}

export default function QuizMultipleChoicePage(
  props: QuizMultipleChoicePageProps
) {
  const navigate = useNavigate();

  // TODO: 실제 API 연동 시 createResource로 변경
  const [questions] = createSignal<MultipleChoiceQuestion[]>(
    props.questions ?? [
      {
        id: "1",
        question: "프로세스와 스레드에 대해 올바르게 설명한 것을 고르세요.",
        options: [
          { id: "1", text: "프로세스는 메모리 공간을 공유하지만 스레드는 독립적인 메모리 공간을 가진다." },
          { id: "2", text: "프로세스는 독립적인 메모리 공간을 가지지만 스레드는 메모리 공간을 공유한다." },
          { id: "3", text: "프로세스와 스레드는 모두 독립적인 메모리 공간을 가진다." },
          { id: "4", text: "프로세스와 스레드는 모두 메모리 공간을 공유한다." },
          { id: "5", text: "프로세스는 스레드의 집합이다." },
        ],
        correctAnswerId: "2",
      },
      {
        id: "2",
        question: "HTTP와 HTTPS의 차이점은 무엇인가요?",
        options: [
          { id: "1", text: "HTTP는 더 빠르고 HTTPS는 더 느리다." },
          { id: "2", text: "HTTP는 암호화되지 않고 HTTPS는 암호화된다." },
          { id: "3", text: "HTTP는 포트 80을 사용하고 HTTPS는 포트 443을 사용한다." },
          { id: "4", text: "HTTP는 웹에서만 사용되고 HTTPS는 모바일에서만 사용된다." },
          { id: "5", text: "차이점이 없다." },
        ],
        correctAnswerId: "2",
      },
      {
        id: "3",
        question: "RESTful API의 특징은 무엇인가요?",
        options: [
          { id: "1", text: "상태를 유지하는 프로토콜이다." },
          { id: "2", text: "무상태(Stateless) 프로토콜이다." },
          { id: "3", text: "SOAP보다 복잡하다." },
          { id: "4", text: "XML만 사용한다." },
          { id: "5", text: "웹소켓을 사용한다." },
        ],
        correctAnswerId: "2",
      },
    ]
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = createSignal(0);
  const [selectedAnswerId, setSelectedAnswerId] = createSignal<string | null>(
    null
  );

  const currentQuestion = () => questions()[currentQuestionIndex()];
  const totalQuestions = () => questions().length;
  const hasSelectedAnswer = () => selectedAnswerId() !== null;

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswerId(answerId);
  };

  const handleContinue = () => {
    if (!hasSelectedAnswer()) return;

    const nextIndex = currentQuestionIndex() + 1;
    if (nextIndex < totalQuestions()) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswerId(null);
    } else {
      // 퀴즈 완료 처리
      // TODO: 결과 페이지로 이동
      navigate("/quiz");
    }
  };

  const handleClose = () => {
    // TODO: 확인 다이얼로그 표시
    navigate("/quiz");
  };

  return (
    <main class="mx-auto flex min-h-screen max-w-[500px] flex-col bg-white">
      {/* Header */}
      <div class="relative px-4 pt-4">
        <div class="flex items-center justify-between">
          <ProgressBar
            current={currentQuestionIndex() + 1}
            total={totalQuestions()}
          />
          <button
            onClick={handleClose}
            class="flex items-center justify-center text-gray-007"
            aria-label="닫기"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Question Area */}
      <div class="flex flex-1 flex-col gap-6 px-4 py-8">
        <h2 class="text-center text-xl font-medium text-gray-008">
          {currentQuestion().question}
        </h2>

        {/* Answer Options */}
        <div class="flex w-full flex-col gap-3">
          <For each={currentQuestion().options}>
            {(option) => (
              <MultipleChoiceAnswerCard
                option={option}
                isSelected={selectedAnswerId() === option.id}
                onClick={() => handleAnswerSelect(option.id)}
              />
            )}
          </For>
        </div>
      </div>

      {/* Bottom Button */}
      <div class="p-4">
        <Button
          variant={hasSelectedAnswer() ? "default" : "disabled"}
          size="large"
          onClick={handleContinue}
          className="w-full"
        >
          계속
        </Button>
      </div>
    </main>
  );
}
