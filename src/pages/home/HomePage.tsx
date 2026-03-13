import { useFlow } from "@/app/stackflow";
import type { ActivityEntry } from "@/app/stackflow-util";
import { Subtitle, Title } from "@/components/common";
import { AppScreen } from "@stackflow/plugin-basic-ui";

export default function HomePage() {
  const { push } = useFlow();

  const handleNavigation = (path: ActivityEntry["name"]) => () => {
    push(path, {});
  };

  return (
    <AppScreen backgroundColor="var(--color-gray-002)">
      <div className="space-y-colgap h-full w-full overflow-hidden">
        <div className="px-gutter pt-header flex items-center justify-between">
          <div>
            <span className="text-xl leading-6 font-bold text-black">
              한유진
            </span>
            <span className="text-lg leading-5 font-medium text-black">
              님 안녕하세요!
            </span>
          </div>
          <div className="bg-gray-001 grid h-10 w-10 place-items-center rounded-full"></div>
        </div>
        <div className="px-gutter gap-colgap-small flex w-full flex-col">
          <button
            onClick={handleNavigation("StreakPage")}
            className="p-gutter flex w-full flex-col items-start gap-1 rounded-3xl bg-white"
          >
            <Title>
              연속 스트릭 <span className="font-tossface">🔥</span>
            </Title>
            <Subtitle>현재 n일째 공부 중이에요 </Subtitle>
          </button>
          <div className="gap-colgap-small flex w-full">
            <button
              onClick={handleNavigation("InterviewPage")}
              className="p-gutter flex flex-1 cursor-pointer flex-col items-start gap-1 rounded-3xl bg-white"
            >
              <Title>
                모의 면접 <span className="font-tossface">🤖</span>
              </Title>
              <Subtitle>AI와 함께 준비해요</Subtitle>
            </button>
            <button
              onClick={handleNavigation("QuizHomePage")}
              className="p-gutter flex flex-1 cursor-pointer flex-col items-start gap-1 rounded-3xl bg-white"
            >
              <Title>
                CS 퀴즈 <span className="font-tossface">💡</span>
              </Title>
              <Subtitle>퀴즈로 배경지식 쌓기</Subtitle>
            </button>
          </div>
        </div>
        <div className="h-full w-full rounded-t-3xl bg-white">
          <button
            onClick={handleNavigation("RankingPage")}
            className="pt-header flex w-full flex-col items-start gap-1 p-[calc(var(--spacing-gutter)*2)]"
          >
            <Title>실시간 랭킹</Title>
            <Subtitle>내 위치는 어디일까요?</Subtitle>
          </button>
        </div>
      </div>
    </AppScreen>
  );
}
