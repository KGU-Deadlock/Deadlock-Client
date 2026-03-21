import type { ActivityComponentType } from "@stackflow/react";
import { useMemo } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoStop } from "react-icons/io5";

import { useFlow } from "@/app/stackflow";

import { Button, Footer, PageTitle } from "@/components/common";
import QuizLayout from "@/components/quiz/QuizLayout";


import { useVoiceQuiz } from "@/model/quiz/useVoiceQuiz";

import type { GetQuizResult } from "@/api/quiz/api.model";

import { QUIZ_MODE } from "@/constants/quiz/quiz";

import { cn } from "@/utils/cn";

interface QuizVoicePageProps {
  topic: string;
  mode: typeof QUIZ_MODE.VOICE;
  quizData: string;
}

const QuizVoicePage: ActivityComponentType<QuizVoicePageProps> = ({
  params,
}) => {
  const { push } = useFlow();
  const quizData: GetQuizResult | null = params.quizData
    ? (JSON.parse(params.quizData) as GetQuizResult)
    : null;
  const voiceQuizzes = useMemo(
    () => quizData?.voiceQuizzes ?? [],
    [quizData?.voiceQuizzes],
  );
  const totalQuizCount = 3;
  const {
    currentQuiz,
    currentQuizNumber,
    isListening,
    hasTranscript,
    transcript,
    handleToggleListening,
    handleCancel,
    handleSubmitVoice,
  } = useVoiceQuiz({
    voiceQuizzes,
    onComplete: (answers) => {
      push(
        "QuizCompletePage",
        {
          userAnswers: JSON.stringify(answers),
        },
        { animate: false },
      );
    },
  });

  return (
    <QuizLayout
      current={currentQuizNumber}
      total={totalQuizCount}
      footer={
        <Footer>
          <div className="grid w-full grid-cols-[1fr_3fr_1fr]">
            <div className="flex items-center justify-end">
              <Button
                size="large"
                state="ghost_background"
                className="size-fit rounded-full p-6"
                onClick={handleCancel}
              >
                <IoClose size={24} />
              </Button>
            </div>
            <div className="relative flex items-center justify-center">
              {isListening ? (
                <p className="text-gray-005 absolute -top-10 text-sm text-red-500">
                  듣고 있어요...
                </p>
              ) : (
                <p className="text-gray-005 absolute -top-10 text-sm">
                  버튼을 눌러 응답하세요
                </p>
              )}
              <Button
                size="large"
                state={isListening ? "active" : "ghost_background"}
                className="size-36 rounded-full"
                onClick={handleToggleListening}
              >
                {isListening ? (
                  <IoStop size={48} />
                ) : (
                  <FaMicrophone size={48} />
                )}
              </Button>
            </div>
            <div className="flex items-center justify-start">
              <Button
                size="large"
                state={hasTranscript ? "gradient" : "disabled"}
                className="size-fit rounded-full p-6"
                onClick={handleSubmitVoice}
              >
                <BsFillSendFill size={24} />
              </Button>
            </div>
          </div>
        </Footer>
      }
    >
      {voiceQuizzes.length === 0 && (
        <p className="text-gray-005">표시할 음성 퀴즈가 없어요.</p>
      )}

      {currentQuiz && (
        <>
          <PageTitle className="m-0 flex flex-wrap !px-0 break-words whitespace-normal">
            {currentQuiz.content}
          </PageTitle>

          <div className="border-gray-003 bg-gray-001 min-h-[200px] rounded-xl border p-4">
            <p className="text-gray-005 text-xs">
              {isListening ? "듣고 있어요..." : "인식된 답변"}
            </p>
            <p
              className={cn(
                "mt-2 text-sm break-words whitespace-pre-wrap transition-colors duration-300",
                transcript.length > 0 ? "text-black" : "text-gray-005",
              )}
            >
              {transcript || "아직 인식된 내용이 없어요."}
            </p>
          </div>
        </>
      )}
    </QuizLayout>
  );
};

export default QuizVoicePage;
