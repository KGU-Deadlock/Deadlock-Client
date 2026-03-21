import { AppScreen } from "@stackflow/plugin-basic-ui";
import type { ActivityComponentType } from "@stackflow/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

import { useFlow } from "@/app/stackflow";

import { Button, Footer, LoadingSpinner, Title } from "@/components/common";

import { useAuthStore } from "@/model/auth/auth-store";

import { userQueries } from "@/api/user/api.query";
import type { QuizLevel } from "@/api/user/api.type";

import { toastError } from "@/utils/toast";


interface OnboardingCompletePageProps {
  name: string;
  interest: number;
  quizLevel: QuizLevel;
}

const OnboardingCompletePage: ActivityComponentType<
  OnboardingCompletePageProps
> = ({ params }) => {
  const { name, interest, quizLevel } = params;
  const { push } = useFlow();
  const { setIsInitialized } = useAuthStore();
  const {
    mutate: postUserJoin,
    isPending,
    isError,
  } = useMutation(userQueries.postUserJoinMutation());

  useEffect(() => {
    postUserJoin(
      {
        nickname: name,
        kakaoEmail: "user@example.com",
        profileImage: "https://example.com/profile.jpg",
        quizLevel,
        interests: [interest],
      },
      {
        onSuccess: () => {
          setIsInitialized(true);
          push("HomePage", {});
        },
        onError: (error) => {
          toastError(error.message);
        },
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    if (isPending) {
      return <LoadingSpinner />;
    }

    if (isError) {
      return (
        <>
          <span className="font-tossface text-[100px]">😭</span>
          <Title className="text-2xl">가입에 실패했어요.</Title>
          <Title className="text-2xl">다시 시도해주세요.</Title>
        </>
      );
    }

    return (
      <>
        <span className="font-tossface text-[100px]">🥳</span>
        <Title className="text-2xl">가입이 완료되었어요.</Title>
        <Title className="text-2xl">공부를 시작해 볼까요?</Title>
      </>
    );
  };

  return (
    <AppScreen className="relative">
      <div className="px-gutter absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center">
        {renderContent()}
      </div>
      <Footer>
        <Button
          size="large"
          state={isPending || isError ? "disabled" : "active"}
        >
          {isError ? "다시 시도해주세요." : "시작하기"}
        </Button>
      </Footer>
    </AppScreen>
  );
};

export default OnboardingCompletePage;
