import { AppScreen } from "@stackflow/plugin-basic-ui";
import type { ActivityComponentType } from "@stackflow/react";
import { useCallback } from "react";

import { useFlow } from "@/app/stackflow";

import { Button, Footer, Header } from "@/components/common";

import { useInterviewSolve } from "@/model/interview/useInterviewSolve";

import type { QuestionResult } from "@/api/interview/api.model";

interface InterviewSolvePageProps {
  interviewId: string;
  questions: string;
}

const PHASE_LABEL: Record<string, string> = {
  tts: "질문을 읽고 있어요...",
  recording: "답변을 말씀해 주세요",
  submitting: "제출 중...",
};

const InterviewSolvePage: ActivityComponentType<InterviewSolvePageProps> = ({
  params,
}) => {
  const { replace } = useFlow();

  const questions = JSON.parse(params.questions) as QuestionResult[];

  const onComplete = useCallback(() => {
    replace(
      "InterviewFeedbackPage",
      { interviewId: params.interviewId },
      { animate: false },
    );
  }, [replace, params.interviewId]);

  const {
    videoRef,
    phase,
    currentIndex,
    currentQuestion,
    transcript,
    totalCount,
    handleSubmitAnswer,
  } = useInterviewSolve({
    interviewId: params.interviewId,
    questions,
    onComplete,
  });

  return (
    <AppScreen>
      <Header />
      <div className="px-gutter pt-header pb-footer flex flex-col gap-4">
        {/* 진행 표시 */}
        <div className="flex items-center gap-2">
          <span className="text-gray-005 text-sm">
            {currentIndex + 1} / {totalCount}
          </span>
          <div className="bg-gray-002 h-1.5 flex-1 overflow-hidden rounded-full">
            <div
              className="bg-blue-004 h-full rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* 질문 */}
        <div className="flex flex-col gap-1">
          <p className="text-gray-005 text-xs font-medium">
            질문 {currentQuestion?.questionNumber}
          </p>
          <p className="text-base font-semibold leading-7">
            {currentQuestion?.questionText ?? ""}
          </p>
        </div>

        {/* 상태 뱃지 */}
        <div
          className={`flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
            phase === "recording"
              ? "bg-red-50 text-red-500"
              : "bg-gray-002 text-gray-005"
          }`}
        >
          {phase === "recording" && (
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-red-500" />
          )}
          {PHASE_LABEL[phase]}
        </div>

        {/* 카메라 */}
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="h-full w-full object-cover"
          />
          {phase === "tts" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/50">
              <span className="font-tossface text-5xl">🔊</span>
              <p className="text-sm font-medium text-white">
                질문을 듣고 있어요
              </p>
            </div>
          )}
        </div>

        {/* 답변 트랜스크립트 */}
        <div className="border-gray-003 bg-gray-001 min-h-[72px] rounded-xl border px-4 py-3">
          <p className="text-gray-005 mb-1 text-xs">인식된 답변</p>
          <p className="text-sm leading-6">
            {transcript ||
              (phase === "recording"
                ? "음성이 인식되면 여기에 표시돼요"
                : "")}
          </p>
        </div>
      </div>

      <Footer>
        <Button
          size="large"
          state={phase === "recording" ? "active" : "disabled"}
          disabled={phase !== "recording"}
          onClick={() => void handleSubmitAnswer()}
        >
          {phase === "submitting" ? "제출 중..." : "답변 완료"}
        </Button>
      </Footer>
    </AppScreen>
  );
};

export default InterviewSolvePage;
