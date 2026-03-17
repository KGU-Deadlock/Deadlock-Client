import { useFlow } from "@/app/stackflow";
import type { ActivityEntry } from "@/app/stackflow-util";
import { Subtitle, Title } from "@/components/common";
import { RankingItem } from "@/components/ranking";
import { StreakBoard } from "@/components/streak";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { RiUser3Fill } from "react-icons/ri";

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
          <button
            onClick={handleNavigation("UserPage")}
            className="bg-gray-001 grid h-10 w-10 cursor-pointer place-items-center rounded-full border-none"
          >
            <RiUser3Fill className="text-gray-006" />
          </button>
        </div>
        <div className="px-gutter gap-colgap-small flex w-full flex-col">
          <button
            onClick={handleNavigation("StreakPage")}
            className="p-gutter flex w-full flex-col items-start gap-1 rounded-3xl bg-white"
          >
            <Title>
              연속 스트릭 <span className="font-tossface">🔥</span>
            </Title>
            <Subtitle className="mb-3">현재 n일째 공부 중이에요 </Subtitle>
            <StreakBoard />
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
            className="pt-header flex w-full flex-col items-start gap-1 px-[calc(var(--spacing-gutter)*1.5)]"
          >
            <Title>실시간 랭킹</Title>
            <Subtitle>내 위치는 어디일까요?</Subtitle>
          </button>
          <div className="pb-footer divide-gray-002 flex flex-col gap-1 divide-y px-[calc(var(--spacing-gutter)*1.5)] pt-4">
            <RankingItem
              rank={1}
              name="전상현"
              university="경기대학교"
              interest="투수"
              score={3000}
            />
            <RankingItem
              rank={2}
              name="이준영"
              university="경기대학교"
              interest="투수"
              score={3000}
            />
            <RankingItem
              rank={3}
              name="황동하"
              university="경기대학교"
              interest="투수"
              score={3000}
            />
            <RankingItem
              rank={4}
              name="이의리"
              university="경기대학교"
              interest="투수"
              score={3000}
            />
          </div>
        </div>
      </div>
    </AppScreen>
  );
}
