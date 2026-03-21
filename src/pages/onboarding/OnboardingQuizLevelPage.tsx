import { AppScreen } from "@stackflow/plugin-basic-ui";
import type { ActivityComponentType } from "@stackflow/react";
import { useState } from "react";

import { useFlow } from "@/app/stackflow";

import {
  BackButton,
  Button,
  Footer,
  Header,
  PageTitle,
} from "@/components/common";

import type { QuizLevel } from "@/api/user/api.type";

interface OnboardingQuizLevelPageProps {
  name: string;
  interest: number;
}

const OnboardingQuizLevelPage: ActivityComponentType<
  OnboardingQuizLevelPageProps
> = ({ params }) => {
  const { name, interest } = params;
  const { push } = useFlow();

  const [selectedQuizLevel, setSelectedQuizLevel] = useState<QuizLevel | null>(
    null,
  );

  const handleSelectQuizLevel = (quizLevel: QuizLevel) => {
    setSelectedQuizLevel(quizLevel);
  };

  const handleComplete = () => {
    push("OnboardingCompletePage", {
      name,
      interest,
      quizLevel: selectedQuizLevel,
    });
  };

  const quizLevels: { id: QuizLevel; name: string }[] = [
    { id: "JUNIOR", name: "초급" },
    { id: "SEMIPRO", name: "중급" },
    { id: "PRO", name: "고급" },
  ];

  return (
    <AppScreen className="relative">
      <Header left={<BackButton />} />
      <PageTitle>
        <span>퀴즈 난이도를</span>
        <span>선택해주세요</span>
      </PageTitle>
      <div className="px-gutter mt-20 flex w-full flex-col gap-6">
        <label className="text-gray-005 text-sm">퀴즈 레벨</label>

        <div className="grid w-full grid-cols-2 gap-4">
          {quizLevels.map((quizLevel) => (
            <Button
              key={`${quizLevel.id}-${quizLevel.name}`}
              size="large"
              className="h-[60px]"
              state={
                quizLevel.id === selectedQuizLevel
                  ? "outline"
                  : "disabled_outline"
              }
              onClick={() => handleSelectQuizLevel(quizLevel.id)}
            >
              {quizLevel.name}
            </Button>
          ))}
        </div>
      </div>
      <Footer>
        <Button
          size="large"
          state={selectedQuizLevel ? "active" : "disabled"}
          onClick={handleComplete}
        >
          가입 완료
        </Button>
      </Footer>
    </AppScreen>
  );
};

export default OnboardingQuizLevelPage;
