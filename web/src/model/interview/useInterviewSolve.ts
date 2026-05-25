import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  getSpeechRecognitionAPI,
  type SpeechRecognitionInstance,
} from "@/model/common/useSpeechRecognition";

import type { QuestionResult } from "@/api/interview/api.model";
import { interviewQueries } from "@/api/interview/api.query";

import { toastError } from "@/utils/toast";

export type InterviewPhase = "tts" | "recording" | "submitting";

interface UseInterviewSolveProps {
  interviewId: string;
  questions: QuestionResult[];
  onComplete: () => void;
}

export function useInterviewSolve({
  interviewId,
  questions,
  onComplete,
}: UseInterviewSolveProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<InterviewPhase>("tts");
  const [transcript, setTranscript] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const startTimeRef = useRef<number>(0);
  const transcriptRef = useRef("");
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  const currentQuestion = questions[currentIndex];
  const totalCount = questions.length;
  const isLastQuestion = currentIndex === totalCount - 1;

  const { mutateAsync: submitAnswer } = useMutation(
    interviewQueries.submitAnswerMutation(),
  );
  const { mutateAsync: completeInterview } = useMutation(
    interviewQueries.completeInterviewMutation(),
  );

  // transcript ref 동기화 (stale closure 방지)
  useEffect(() => {
    transcriptRef.current = transcript;
  }, [transcript]);

  // 카메라 초기화
  useEffect(() => {
    let stream: MediaStream | null = null;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((s) => {
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      })
      .catch(() => {
        toastError("카메라에 접근할 수 없어요.");
      });

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const startRecording = useCallback(() => {
    setTranscript("");
    startTimeRef.current = Date.now();
    setPhase("recording");

    const SpeechRecognitionAPI = getSpeechRecognitionAPI();
    if (!SpeechRecognitionAPI) return;

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "ko-KR";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        }
      }
      if (final) {
        setTranscript((prev) => prev + (prev ? " " : "") + final);
      }
    };

    recognition.onerror = () => {
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      recognitionRef.current = null;
    };

    recognition.start();
    recognitionRef.current = recognition;
  }, []);

  // 질문 변경 시 TTS 재생
  useEffect(() => {
    if (phase !== "tts" || !currentQuestion?.questionText) return;

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(currentQuestion.questionText);
    utter.lang = "ko-KR";
    utter.rate = 0.95;
    utter.onend = () => startRecording();

    window.speechSynthesis.speak(utter);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [currentIndex, phase, currentQuestion, startRecording]);

  const handleSubmitAnswer = useCallback(async () => {
    if (phase !== "recording" || !currentQuestion?.questionNumber) return;

    recognitionRef.current?.stop();
    recognitionRef.current = null;

    const durationSeconds = Math.floor(
      (Date.now() - startTimeRef.current) / 1000,
    );
    const answerText = transcriptRef.current.trim() || "(답변 없음)";

    setPhase("submitting");

    try {
      await submitAnswer({
        interviewId,
        questionNumber: currentQuestion.questionNumber,
        answerText,
        durationSeconds,
      });

      if (isLastQuestion) {
        await completeInterview(interviewId);
        onCompleteRef.current();
      } else {
        setCurrentIndex((prev) => prev + 1);
        setPhase("tts");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "제출에 실패했어요.";
      toastError(message);
      setPhase("recording");
    }
  }, [
    phase,
    currentQuestion,
    interviewId,
    isLastQuestion,
    submitAnswer,
    completeInterview,
  ]);

  return {
    videoRef,
    phase,
    currentIndex,
    currentQuestion,
    transcript,
    totalCount,
    handleSubmitAnswer,
  };
}
