import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { RiUser3Fill } from "react-icons/ri";

import { useFlow } from "@/app/stackflow";
import type { ActivityEntry } from "@/app/stackflow-util";

import { Card, Subtitle, Title, Scrollable } from "@/components/common";
import { RankingItem } from "@/components/ranking";
import { StreakBoard } from "@/components/streak";

import { useAuthStore } from "@/model/auth/useAuthStore";
import { useUserStore } from "@/model/user/useUserStore";

import { rankingQueries } from "@/api/ranking/api.query";
import { streakQueries } from "@/api/streak/api.query";
import { userQueries } from "@/api/user/api.query";

export default function HomePage() {
  const { push } = useFlow();
  const { setProfile, setName } = useUserStore();
  const isLoggedOut = useAuthStore((s) => s.isLoggedOut);
  const { data } = useQuery({
    ...userQueries.getUserProfileQuery(),
    enabled: !isLoggedOut,
  });
  const { data: streakDetail } = useQuery({
    ...streakQueries.getStreakDetailQuery(),
    enabled: !isLoggedOut,
  });
  const { data: rankingSummary } = useQuery({
    ...rankingQueries.getRankingSummaryQuery(),
    enabled: !isLoggedOut,
  });

  useEffect(() => {
    const profile = data?.data ?? null;
    if (!profile) return;
    setProfile(profile);
    setName(profile.nickname ?? "");
  }, [data, setName, setProfile]);

  const handleNavigation = (path: ActivityEntry["name"]) => () => {
    push(path, {});
  };

  return (
    <AppScreen backgroundColor="var(--color-white)">
      <Scrollable className="space-y-colgap bg-[linear-gradient(to_bottom,var(--color-gray-002),var(--color-white))]">
        <div className="px-gutter pt-header flex items-center justify-between">
          <div>
            <span className="text-xl leading-6 font-bold text-black">
              {data?.data?.nickname ?? ""}
            </span>
            <span className="text-lg leading-5 font-medium text-black">
              님 안녕하세요!
            </span>
          </div>
          <button
            onClick={handleNavigation("UserPage")}
            className="bg-gray-001 grid h-10 w-10 cursor-pointer place-items-center rounded-full border-none"
          >
            <RiUser3Fill className="text-gray-004" />
          </button>
        </div>
        <div className="px-gutter gap-colgap-small flex w-full flex-col">
          <button onClick={handleNavigation("StreakPage")}>
            <Card className="flex w-full flex-col items-start gap-1 bg-white shadow-[0_-4px_10px_0_rgba(0,0,0,0.02)]">
              <Title>
                연속 스트릭 <span className="font-tossface">🔥</span>
              </Title>
              <Subtitle className="mb-3">
                현재{" "}
                {streakDetail?.data?.currentStreakDays != null
                  ? streakDetail.data.currentStreakDays
                  : 0}
                일째 공부 중이에요
              </Subtitle>
              <StreakBoard
                currentStreakDays={streakDetail?.data?.currentStreakDays ?? 0}
              />
            </Card>
          </button>
          <div className="gap-colgap-small flex w-full">
            <button
              onClick={handleNavigation("InterviewPage")}
              className="w-full"
            >
              <Card className="flex w-full flex-col items-start gap-1 bg-white shadow-[0_-4px_10px_0_rgba(0,0,0,0.02)]">
                <Title>
                  모의 면접 <span className="font-tossface">🤖</span>
                </Title>
                <Subtitle>AI와 함께 준비해요</Subtitle>
              </Card>
            </button>
            <button
              onClick={handleNavigation("QuizHomePage")}
              className="w-full"
            >
              <Card className="flex w-full flex-col items-start gap-1 bg-white shadow-[0_-4px_10px_0_rgba(0,0,0,0.02)]">
                <Title>
                  CS 퀴즈 <span className="font-tossface">💡</span>
                </Title>
                <Subtitle>퀴즈로 배경지식 쌓기</Subtitle>
              </Card>
            </button>
          </div>
        </div>
        <div className="w-full flex-1 rounded-t-3xl bg-white shadow-[0_-4px_10px_0_rgba(0,0,0,0.02)]">
          <button
            onClick={handleNavigation("RankingPage")}
            className="pt-header flex w-full flex-col items-start gap-1 px-[calc(var(--spacing-gutter)*1.5)]"
          >
            <Title>실시간 랭킹</Title>
            <Subtitle>내 위치는 어디일까요?</Subtitle>
          </button>
          {rankingSummary?.data?.top5 && (
            <div className="pb-footer divide-gray-002 flex flex-col gap-1 divide-y px-[calc(var(--spacing-gutter)*1.5)] pt-4">
              {rankingSummary.data.top5.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-2 py-8">
                  <span className="font-tossface text-5xl">🤔</span>
                  <span className="text-gray-005 font-regular text-center text-sm">
                    랭킹 데이터가 없어요!
                  </span>
                </div>
              )}
              {rankingSummary.data.top5.map((item, index) => (
                <RankingItem
                  className="last:mb-8 last:pb-8"
                  key={item.rank ?? index}
                  rank={item.rank ?? index + 1}
                  nickname={item.nickname ?? "익명"}
                  score={item.score ?? 0}
                />
              ))}
            </div>
          )}
        </div>
      </Scrollable>
    </AppScreen>
  );
}
