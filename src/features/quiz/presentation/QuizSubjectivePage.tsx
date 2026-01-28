import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import Button from "~/shared/components/Button";
import CloseIcon from "~/shared/components/icons/CloseIcon";
import ProgressBar from "./ProgressBar";
import SubjectiveAnswerInput from "./SubjectiveAnswerInput";
import type { SubjectiveQuestion } from "../domain/types";

interface QuizSubjectivePageProps {
  questions?: SubjectiveQuestion[];
}

export default function QuizSubjectivePage(props: QuizSubjectivePageProps) {
  const navigate = useNavigate();

  // TODO: 실제 API 연동 시 createResource로 변경
  const [questions] = createSignal<SubjectiveQuestion[]>(
    props.questions ?? [
      {
        id: "1",
        question: "프로세스와 스레드의 차이를 적어보세요.",
        maxLength: 5000,
        placeholder: "답변을 입력하세요",
      },
      {
        id: "2",
        question: "HTTP와 HTTPS의 차이점을 설명하세요.",
        maxLength: 5000,
        placeholder: "답변을 입력하세요",
      },
      {
        id: "3",
        question: "RESTful API의 특징을 설명하세요.",
        maxLength: 5000,
        placeholder: "답변을 입력하세요",
      },
      {
        id: "4",
        question: "JavaScript의 이벤트 루프에 대해 설명하세요.",
        maxLength: 5000,
        placeholder: "답변을 입력하세요",
      },
      {
        id: "5",
        question: "데이터베이스 정규화의 목적과 장점을 설명하세요.",
        maxLength: 5000,
        placeholder: "답변을 입력하세요",
      },
    ]
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = createSignal(0);
  const [answers, setAnswers] = createSignal<Record<string, string>>({});

  const currentQuestion = () => questions()[currentQuestionIndex()];
  const totalQuestions = () => questions().length;
  const currentAnswer = () =>
    answers()[currentQuestion().id] ?? "";
  const hasAnswer = () => currentAnswer().trim().length > 0;

  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers(),
      [currentQuestion().id]: value,
    });
  };

  const handleContinue = () => {
    if (!hasAnswer()) return;

    const nextIndex = currentQuestionIndex() + 1;
    if (nextIndex < totalQuestions()) {
      setCurrentQuestionIndex(nextIndex);
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

        {/* Answer Input */}
        <SubjectiveAnswerInput
          value={currentAnswer()}
          maxLength={currentQuestion().maxLength}
          placeholder={currentQuestion().placeholder}
          onChange={handleAnswerChange}
        />
      </div>

      {/* Bottom Button */}
      <div class="p-4">
        <Button
          variant={hasAnswer() ? "default" : "disabled"}
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
