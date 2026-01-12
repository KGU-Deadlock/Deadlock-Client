import { SubTitle, Title } from "~/shared/components";

export default function HomeStreakCard() {
  const streakDays = 4;
  const daysPerRow = 7;
  const totalRows = 3;
  // const totalDays = daysPerRow * totalRows;

  return (
    <div class="box-border h-fit w-full rounded-2xl bg-white p-6">
      <div class="flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <Title>연속 스트릭</Title>
            <SubTitle>{`현재 ${streakDays}일째 공부 중이에요`}</SubTitle>
          </div>
          <div class="flex items-center gap-1">
            <span class="font-tossface text-3xl">🔥</span>
            <span class="text-positive text-2xl font-bold">{streakDays}</span>
          </div>
        </div>
        <div class="flex flex-col gap-1">
          {Array.from({ length: totalRows }).map((_, rowIndex) => (
            <div class="flex w-full gap-1">
              {Array.from({ length: daysPerRow }).map((_, dayIndex) => {
                const dayNumber = rowIndex * daysPerRow + dayIndex;
                const isActive = dayNumber < streakDays;
                return (
                  <div
                    class={`h-6 flex-1 rounded transition-colors ${
                      isActive ? "bg-positive" : "bg-gray-100"
                    }`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
