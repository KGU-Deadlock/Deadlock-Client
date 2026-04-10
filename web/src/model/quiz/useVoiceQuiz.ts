import { useState } from "react";

import { toastError } from "@/utils/toast";

type VoiceQuiz = {
  id?: number;
  content?: string;
};

type VoiceAnswer = { quizId: number; answer: string };

type UseVoiceQuizParams = {
  voiceQuizzes: VoiceQuiz[];
  onComplete: (answers: VoiceAnswer[]) => void;
};

export function useVoiceQuiz({ voiceQuizzes, onComplete }: UseVoiceQuizParams) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [voiceAnswers, setVoiceAnswers] = useState<VoiceAnswer[]>([]);

  const currentQuiz = voiceQuizzes[currentIndex];
  const isLastQuiz = currentIndex >= voiceQuizzes.length - 1;
  const currentQuizNumber = currentIndex + 1;
  const hasTranscript = transcript.trim().length > 0;

  const handleCancel = () => {
    setTranscript("");
  };

  const moveToNextQuiz = () => {
    if (isLastQuiz) return;
    setCurrentIndex((prev) => prev + 1);
    setTranscript("");
  };

  const handleSubmitVoice = () => {
    if (!currentQuiz?.id || !hasTranscript) {
      toastError("먼저 음성 답변을 입력해주세요.");
      return;
    }

    const nextVoiceAnswers = [
      ...voiceAnswers.filter((item) => item.quizId !== currentQuiz.id),
      { quizId: currentQuiz.id, answer: transcript.trim() },
    ];
    setVoiceAnswers(nextVoiceAnswers);

    if (isLastQuiz) {
      onComplete(nextVoiceAnswers);
      return;
    }

    moveToNextQuiz();
  };

  return {
    currentQuiz,
    currentQuizNumber,
    hasTranscript,
    transcript,
    isLastQuiz,
    setTranscript,
    handleCancel,
    handleSubmitVoice,
  };
}
