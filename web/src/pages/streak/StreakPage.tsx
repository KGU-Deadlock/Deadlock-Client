import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useQuery } from "@tanstack/react-query";

import { Card, Header, Title, Scrollable } from "@/components/common";
import { BackButton } from "@/components/common";
import { StreakBoard, StreakCalendar } from "@/components/streak";

import { useAuthStore } from "@/model/auth/useAuthStore";

import { streakQueries } from "@/api/streak/api.query";

export default function StreakPage() {
  const isLoggedOut = useAuthStore((s) => s.isLoggedOut);
  const { data: streakDetail } = useQuery({
    ...streakQueries.getStreakDetailQuery(),
    enabled: !isLoggedOut,
  });

  const currentStreakDays = streakDetail?.data?.currentStreakDays ?? 0;
  const solvedQuizCount = streakDetail?.data?.solvedQuizCount ?? 0;
  const solvedTopicCount = streakDetail?.data?.solvedTopicCount ?? 0;

  return (
    <AppScreen>
      <Scrollable>
        <Header
          left={<BackButton />}
          sticky
          center={<Title>연속 스트릭</Title>}
        />
        <section className="pt-header px-gutter gap-colgap flex flex-col">
          <StreakBoard currentStreakDays={currentStreakDays} />
          <div className="gap-colgap-small grid grid-cols-3">
            <Card className="bg-gray-002 grid place-items-center">
              <span className="text-sm">연속 학습</span>
              <span className="text-lg font-semibold">
                {currentStreakDays}일
              </span>
            </Card>
            <Card className="bg-gray-002 grid place-items-center">
              <span className="text-sm">해결한 문제</span>
              <span className="text-lg font-semibold">{solvedQuizCount}개</span>
            </Card>
            <Card className="bg-gray-002 grid place-items-center">
              <span className="text-sm">해결한 분야</span>
              <span className="text-lg font-semibold">
                {solvedTopicCount}개
              </span>
            </Card>
          </div>
        </section>
        <div className="bg-gray-002 my-colgap h-1 w-full" />
        <StreakCalendar />
      </Scrollable>
    </AppScreen>
  );
}
