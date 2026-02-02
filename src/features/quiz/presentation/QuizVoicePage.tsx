import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import ProgressBar from "./ProgressBar";
import CloseIcon from "~/shared/components/icons/CloseIcon";
import SoundWaveVisualization from "./SoundWaveVisualization";
import VoiceInputArea from "./VoiceInputArea";
import VoiceControlButtons from "./VoiceControlButtons";
import type { VoiceQuestion } from "../domain/types";

interface QuizVoicePageProps {
  questions?: VoiceQuestion[];
}

export default function QuizVoicePage(props: QuizVoicePageProps) {
  const navigate = useNavigate();

  // TODO: 실제 API 연동 시 createResource로 변경
  const [questions] = createSignal<VoiceQuestion[]>(
    props.questions ?? [
      {
        id: "1",
        question: "프로세스와 스레드의 차이를 말해보세요.",
      },
      {
        id: "2",
        question: "HTTP와 HTTPS의 차이점을 설명하세요.",
      },
      {
        id: "3",
        question: "RESTful API의 특징을 설명하세요.",
      },
    ],
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = createSignal(0);
  const [isRecording, setIsRecording] = createSignal(false);
  const [transcribedTexts, setTranscribedTexts] = createSignal<
    Record<string, string>
  >({});

  const currentQuestion = () => questions()[currentQuestionIndex()];
  const totalQuestions = () => questions().length;
  const currentTranscribedText = () =>
    transcribedTexts()[currentQuestion().id] ?? "";
  const hasTranscribedText = () => currentTranscribedText().trim().length > 0;

  const handleRecord = () => {
    setIsRecording(true);
    // TODO: 실제 음성 녹음 시작
  };

  const handleStop = () => {
    setIsRecording(false);
    // TODO: 실제 음성 녹음 중지 및 전사 처리
    // 더미 전사 텍스트
    setTranscribedTexts({
      ...transcribedTexts(),
      [currentQuestion().id]:
        "프로세스는 독립적인 메모리 공간을 가지지만, 스레드는 같은 프로세스 내에서 메모리를 공유합니다.",
    });
  };

  const handleCancel = () => {
    setIsRecording(false);
    setTranscribedTexts({
      ...transcribedTexts(),
      [currentQuestion().id]: "",
    });
  };

  const handleSubmit = () => {
    if (!hasTranscribedText()) return;

    // 음성 퀴즈는 즉각적인 결과 페이지로 이동
    navigate(
      `/quiz/voice/result?questionId=${currentQuestion().id}&questionNumber=${currentQuestionIndex() + 1}`
    );
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
            class="text-gray-007 flex items-center justify-center"
            aria-label="닫기"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Question Area */}
      <div class="flex flex-1 flex-col gap-8 px-4 py-8">
        <h2 class="text-gray-008 text-center text-xl font-medium">
          {currentQuestion().question}
        </h2>

        {/* Sound Wave Visualization */}
        <SoundWaveVisualization isRecording={isRecording()} />

        {/* Voice Input Area */}
        <VoiceInputArea
          transcribedText={currentTranscribedText()}
          isRecording={isRecording()}
        />

        {/* Instruction */}
        <p class="text-gray-005 flex items-center gap-2 text-sm">
          <span class="bg-gray-005 h-1.5 w-1.5 rounded-full" />
          버튼을 눌러 응답하세요
        </p>
      </div>

      {/* Control Buttons */}
      <VoiceControlButtons
        isRecording={isRecording()}
        hasTranscribedText={hasTranscribedText()}
        onCancel={handleCancel}
        onRecord={handleRecord}
        onStop={handleStop}
        onSubmit={handleSubmit}
      />
    </main>
  );
}
