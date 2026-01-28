import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import Button from "~/shared/components/Button";
import CloseIcon from "~/shared/components/icons/CloseIcon";
import ProgressBar from "./ProgressBar";
import QuizAnswerCard from "./QuizAnswerCard";
import type { AnswerType, QuizQuestion } from "../domain/types";

interface QuizNormalPageProps {
  questions?: QuizQuestion[];
}

export default function QuizNormalPage(props: QuizNormalPageProps) {
  const navigate = useNavigate();

  // TODO: 실제 API 연동 시 createResource로 변경
  const [questions] = createSignal<QuizQuestion[]>(
    props.questions ?? [
      {
        id: "1",
        question: "프로세스와 스레드는 같은 개념이다.",
        correctAnswer: "false",
      },
      {
        id: "2",
        question: "HTTP는 상태를 유지하는 프로토콜이다.",
        correctAnswer: "false",
      },
      {
        id: "3",
        question: "RESTful API는 REST 원칙을 따르는 API이다.",
        correctAnswer: "true",
      },
      {
        id: "4",
        question: "JavaScript는 싱글 스레드 언어이다.",
        correctAnswer: "true",
      },
      {
        id: "5",
        question: "CSS는 프로그래밍 언어이다.",
        correctAnswer: "false",
      },
    ]
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = createSignal(0);
  const [selectedAnswer, setSelectedAnswer] = createSignal<AnswerType | null>(
    null
  );

  const currentQuestion = () => questions()[currentQuestionIndex()];
  const totalQuestions = () => questions().length;
  const hasSelectedAnswer = () => selectedAnswer() !== null;

  const handleAnswerSelect = (answer: AnswerType) => {
    setSelectedAnswer(answer);
  };

  const handleContinue = () => {
    if (!hasSelectedAnswer()) return;

    const nextIndex = currentQuestionIndex() + 1;
    if (nextIndex < totalQuestions()) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
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
      <div class="flex flex-1 flex-col items-center justify-center gap-12 px-4 py-8">
        <h2 class="text-center text-xl font-medium text-gray-008">
          {currentQuestion().question}
        </h2>

        {/* Answer Options */}
        <div class="flex w-full gap-4">
          <QuizAnswerCard
            type="true"
            isSelected={selectedAnswer() === "true"}
            onClick={() => handleAnswerSelect("true")}
          />
          <QuizAnswerCard
            type="false"
            isSelected={selectedAnswer() === "false"}
            onClick={() => handleAnswerSelect("false")}
          />
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
