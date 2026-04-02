import { AppScreen } from "@stackflow/plugin-basic-ui";
import type { ActivityComponentType } from "@stackflow/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { useFlow } from "@/app/stackflow";

import {
  BackButton,
  Button,
  Footer,
  Header,
  PageTitle,
} from "@/components/common";

import { quizQueries } from "@/api/quiz/api.query";

import type { QuizMode } from "@/constants/quiz/quiz";

interface QuizSubjectPageProps {
  mode: QuizMode;
}

const QuizSubjectPage: ActivityComponentType<QuizSubjectPageProps> = ({
  params,
}) => {
  const { mode } = params;
  const { replace } = useFlow();
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const {
    data: topicResponse,
    isPending,
    isError,
  } = useQuery(quizQueries.getQuizTopicQuery());
  const topics = topicResponse?.data ?? [];

  const handleSelectTopic = (topic: number) => {
    setSelectedTopic(topic);
  };

  const handleComplete = () => {
    if (!selectedTopic) return;

    replace("QuizLoadingPage", {
      topic: selectedTopic,
      mode,
    });
  };

  return (
    <AppScreen className="relative">
      <Header left={<BackButton />} />
      <PageTitle>
        <span>오늘 공부할 분야를</span>
        <span>선택해주세요</span>
      </PageTitle>
      <div className="px-gutter mt-20 flex w-full flex-col gap-6">
        <label className="text-gray-005 text-sm">오늘 공부할 분야</label>
        {isPending && (
          <p className="text-gray-005 text-sm">분야를 불러오는 중...</p>
        )}
        {isError && (
          <p className="text-red text-sm">
            분야를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
          </p>
        )}
        <div className="grid w-full grid-cols-2 gap-4">
          {topics.map((topic) => (
            <Button
              key={`${topic.id}-${topic.name}`}
              size="large"
              className="h-[60px]"
              state={
                selectedTopic === topic.id ? "outline" : "disabled_outline"
              }
              onClick={() => handleSelectTopic(topic.id!)}
            >
              {topic.name}
            </Button>
          ))}
        </div>
      </div>
      <Footer>
        <Button
          size="large"
          state={selectedTopic ? "active" : "disabled"}
          onClick={handleComplete}
        >
          시작하기
        </Button>
      </Footer>
    </AppScreen>
  );
};

export default QuizSubjectPage;
