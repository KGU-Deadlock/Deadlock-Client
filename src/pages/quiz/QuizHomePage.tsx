import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useState } from "react";

import { useFlow } from "@/app/stackflow";

import {
  Button,
  Footer,
  Header,
  PageTitle,
  Subtitle,
  Title,
} from "@/components/common";
import { BackButton } from "@/components/common";

import { QUIZ_MODE } from "@/constants/quiz/quiz";

const quizMethod = {
  VOICE: "voice",
  STANDARD: "standard",
} as const;

type QuizMethod = (typeof quizMethod)[keyof typeof quizMethod];

export default function QuizHomePage() {
  const { replace } = useFlow();
  const [selectedMethod, setSelectedMethod] = useState<QuizMethod | null>(null);

  const handleSelectMethod = (method: QuizMethod) => {
    setSelectedMethod(method);
  };

  const handleStartQuiz = () => {
    if (selectedMethod === quizMethod.VOICE) {
      replace("QuizSubjectPage", { mode: QUIZ_MODE.VOICE });
    } else {
      replace("QuizSubjectPage", { mode: QUIZ_MODE.STANDARD });
    }
  };

  return (
    <AppScreen className="relative">
      <Header left={<BackButton />} />
      <PageTitle>
        <p>공부 방법을</p>
        <p>선택해 주세요</p>
      </PageTitle>

      <div className="px-gutter mt-20 flex w-full flex-col gap-4">
        <Button
          size="large"
          onClick={() => handleSelectMethod(quizMethod.STANDARD)}
          className="py-gutter flex h-fit flex-col items-center justify-center gap-1"
          state={
            selectedMethod === quizMethod.STANDARD
              ? "outline"
              : "disabled_outline"
          }
        >
          <div className="gap-gutter flex items-center">
            <span className="font-tossface text-5xl">📑</span>
            <div className="flex flex-col gap-1">
              <Title>일반 문제 풀이</Title>
              <Subtitle className="leading-5">
                객관식, 주관식, 단답식, OX
                <br />
                퀴즈 5문항이 출제돼요.
                <br />
                가볍게 지식을 쌓아보세요!
              </Subtitle>
            </div>
          </div>
        </Button>

        <Button
          size="large"
          className="py-gutter flex h-fit flex-col items-center justify-center gap-1"
          state={
            selectedMethod === quizMethod.VOICE ? "outline" : "disabled_outline"
          }
          onClick={() => handleSelectMethod(quizMethod.VOICE)}
        >
          <div className="gap-gutter flex items-center">
            <span className="font-tossface text-5xl">🗣️</span>
            <div className="flex flex-col gap-1">
              <Title>음성 문제 풀이</Title>
              <Subtitle className="leading-5">
                음성으로 응답하는
                <br />
                퀴즈 3문항이 출제돼요.
                <br />
                자신 있게 질문에 답해보세요!
              </Subtitle>
            </div>
          </div>
        </Button>
      </div>

      <Footer>
        <Button
          size="large"
          state={selectedMethod ? "active" : "disabled"}
          onClick={handleStartQuiz}
        >
          시작하기
        </Button>
      </Footer>
    </AppScreen>
  );
}
