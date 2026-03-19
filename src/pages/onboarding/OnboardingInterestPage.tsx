import { useFlow } from "@/app/stackflow";
import { quizQueries } from "@/api/quiz/api.query";
import {
  BackButton,
  Button,
  Footer,
  Header,
  PageTitle,
} from "@/components/common";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import type { ActivityComponentType } from "@stackflow/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface OnboardingInterestPageProps {
  name: string;
}

const OnboardingInterestPage: ActivityComponentType<
  OnboardingInterestPageProps
> = ({ params }) => {
  const { name } = params;
  const { push } = useFlow();
  const [selectedInterest, setSelectedInterest] = useState<number | null>(null);
  const {
    data: topicResponse,
    isPending,
    isError,
  } = useQuery(quizQueries.getQuizTopicQuery());
  const interests = topicResponse?.data ?? [];

  const handleSelectInterest = (interest: number) => {
    setSelectedInterest(interest);
  };

  const handleComplete = () => {
    push("OnboardingCompletePage", { name, interest: selectedInterest });
  };

  return (
    <AppScreen className="relative">
      <Header left={<BackButton />} />
      <PageTitle>
        <span>관심 분야를</span>
        <span>선택해주세요</span>
      </PageTitle>
      <div className="px-gutter mt-20 flex w-full flex-col gap-6">
        <label className="text-gray-005 text-sm">관심 분야</label>
        {isPending && (
          <p className="text-gray-005 text-sm">관심 분야를 불러오는 중...</p>
        )}
        {isError && (
          <p className="text-red text-sm">
            관심 분야를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
          </p>
        )}
        <div className="grid w-full grid-cols-2 gap-4">
          {interests.map((interest) => (
            <Button
              key={`${interest.id}-${interest.name}`}
              size="large"
              className="h-[60px]"
              state={
                selectedInterest === interest.id
                  ? "outline"
                  : "disabled_outline"
              }
              onClick={() => handleSelectInterest(interest.id!)}
            >
              {interest.name}
            </Button>
          ))}
        </div>
      </div>
      <Footer>
        <Button
          size="large"
          state={selectedInterest ? "active" : "disabled"}
          onClick={handleComplete}
        >
          가입 완료
        </Button>
      </Footer>
    </AppScreen>
  );
};

export default OnboardingInterestPage;
