import { A } from "@solidjs/router";
import { SubTitle, Title } from "~/shared/components";

export default function HomeStreakCard() {
  const streakDays = 4;
  const daysPerRow = 14;
  const totalRows = 4;
  const totalDays = daysPerRow * totalRows;

  const getActivityColor = (dayIndex: number): string => {
    if (dayIndex >= streakDays) {
      return "bg-gray-002";
    }
    // 최근 날짜일수록 더 진한 초록색
    const daysFromEnd = streakDays - dayIndex;
    if (daysFromEnd === 1) {
      return "bg-[#66BB6A]"; // 진한 초록
    } else if (daysFromEnd === 2) {
      return "bg-[#A5D6A7]"; // 중간 초록
    } else {
      return "bg-[#D4EDD4]"; // 연한 초록
    }
  };

  return (
    <div class="box-border h-fit w-full rounded-2xl bg-white p-6">
      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <Title>연속 스트릭</Title>
            <SubTitle>{`현재 ${streakDays}일째 공부 중이에요`}</SubTitle>
          </div>
          <A href="/my/study" class="text-gray-005 hover:text-gray-008 text-sm">
            더보기
          </A>
        </div>
        <div class="grid grid-cols-14 gap-1">
          {Array.from({ length: totalDays }).map((_, dayIndex) => {
            const isActive = dayIndex < streakDays;
            return (
              <div
                class={`aspect-square rounded transition-colors ${getActivityColor(dayIndex)}`}
                aria-label={`${dayIndex + 1}일차`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
