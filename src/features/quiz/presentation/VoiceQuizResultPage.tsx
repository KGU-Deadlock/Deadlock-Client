import { useNavigate, useSearchParams } from "@solidjs/router";
import Button from "~/shared/components/Button";
import CloseIcon from "~/shared/components/icons/CloseIcon";
import VoiceFeedbackCard from "./VoiceFeedbackCard";
import type { VoiceQuizResult } from "../domain/types";

interface VoiceQuizResultPageProps {
  result?: VoiceQuizResult;
}

export default function VoiceQuizResultPage(props: VoiceQuizResultPageProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams<{
    questionId?: string;
    questionNumber?: string;
  }>();

  // TODO: 실제 API 연동 시 createResource로 변경
  const result = (): VoiceQuizResult =>
    props.result ?? {
      questionId: searchParams.questionId ?? "1",
      questionNumber: Number(searchParams.questionNumber) ?? 1,
      question: "프로세스와 스레드의 차이를 말해보세요.",
      userAnswer:
        "프로세스는 실행 중인 프로그램이고, 스레드는 그 프로세스 안에서 실제로 작업을 수행하는 실행 단위입니다.",
      feedback: [
        {
          type: "answer",
          text: "프로세스는 실행 중인 프로그램이고,",
          highlightedKeywords: ["실행 중인 프로그램"],
        },
        {
          type: "answer",
          text: "스레드는 그 프로세스 안에서 실제로 작업을 수행하는 실행 단위입니다.",
          highlightedKeywords: ["메모리 공간을"],
        },
        {
          type: "missing",
          text: "인스턴스",
        },
        {
          type: "missing",
          text: "독립적인",
        },
        {
          type: "correct",
          text: "프로세스는 독립적인 메모리 공간을 가지지만,",
          highlightedKeywords: ["독립적인", "메모리 공간을"],
        },
      ],
    };

  const handleReAnswer = () => {
    // 이전 문제로 돌아가기
    navigate(-1);
  };

  const handleNext = () => {
    const currentNumber = result().questionNumber;
    // TODO: 다음 문제로 이동 또는 퀴즈 완료 처리
    navigate(`/quiz/voice?question=${currentNumber + 1}`);
  };

  const handleClose = () => {
    navigate("/quiz");
  };

  return (
    <main class="mx-auto flex min-h-screen max-w-[500px] flex-col bg-white">
      {/* Header */}
      <div class="px-4 pt-4">
        <div class="flex justify-end">
          <button
            onClick={handleClose}
            class="flex items-center justify-center text-gray-007"
            aria-label="닫기"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Content */}
      <div class="flex flex-1 flex-col gap-6 px-4 py-6">
        <p class="text-sm text-gray-006">
          {result().questionNumber}번 문제에 대한 피드백이에요.
        </p>

        <h2 class="text-xl font-bold text-gray-008">
          {result().question}
        </h2>

        {/* Feedback Card */}
        <VoiceFeedbackCard feedback={result().feedback} />
      </div>

      {/* Bottom Section */}
      <div class="flex flex-col gap-4 p-4">
        <p class="text-center text-sm text-gray-006">
          답변 및 피드백 저장하기
        </p>
        <div class="flex gap-3">
          <Button
            variant="select"
            size="large"
            onClick={handleReAnswer}
            className="flex-1"
          >
            재답변
          </Button>
          <Button
            variant="default"
            size="large"
            onClick={handleNext}
            className="flex-1"
          >
            다음 문제로 이동
          </Button>
        </div>
      </div>
    </main>
  );
}
