import { useEffect, useRef, useState } from "react";
import { toastError } from "@/utils/toast";

type SpeechRecognitionResultLike = {
  0: { transcript: string };
};

type SpeechRecognitionEventLike = {
  results: SpeechRecognitionResultLike[];
};

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type VoiceWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

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
  const [isListening, setIsListening] = useState(false);
  const [voiceAnswers, setVoiceAnswers] = useState<VoiceAnswer[]>([]);
  const [language, setLanguage] = useState<"ko-KR" | "en-US">("ko-KR");
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const currentQuiz = voiceQuizzes[currentIndex];
  const isLastQuiz = currentIndex >= voiceQuizzes.length - 1;
  const currentQuizNumber = currentIndex + 1;
  const hasTranscript = transcript.trim().length > 0;

  useEffect(() => {
    const voiceWindow = window as VoiceWindow;
    const SpeechRecognition =
      voiceWindow.SpeechRecognition || voiceWindow.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      let nextTranscript = "";
      for (let i = 0; i < event.results.length; i += 1) {
        nextTranscript += event.results[i][0].transcript;
      }
      setTranscript(nextTranscript.trim());
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toastError("음성 인식 중 오류가 발생했어요.");
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [language]);

  const stopListening = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleToggleListening = () => {
    if (!recognitionRef.current) {
      toastError("이 브라우저는 음성 인식을 지원하지 않아요.");
      return;
    }

    if (isListening) {
      stopListening();
      return;
    }

    recognitionRef.current.start();
    setIsListening(true);
  };

  const handleCancel = () => {
    stopListening();
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

    stopListening();

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

  const toggleLanguage = () => {
    stopListening();
    setLanguage((prev) => (prev === "ko-KR" ? "en-US" : "ko-KR"));
  };

  return {
    currentQuiz,
    currentQuizNumber,
    isListening,
    hasTranscript,
    transcript,
    isLastQuiz,
    language,
    handleToggleListening,
    handleCancel,
    handleSubmitVoice,
    toggleLanguage,
  };
}
