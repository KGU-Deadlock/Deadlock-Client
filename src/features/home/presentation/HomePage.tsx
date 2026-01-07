import { SubTitle, Title } from "~/shared/components";

export default function HomePage() {
  const USER = "한유진";
  return (
    <div class="absolute inset-0 mx-auto flex max-w-[500px] flex-col gap-6 bg-gray-100 pt-10">
      <section class="px-4">
        <span class="text-lg font-medium">{USER}</span>님 안녕하세요!
      </section>
      <section class="w-full px-4">
        <StrickCard />
      </section>
      <section class="flex w-full gap-4 px-4">
        <SelectButton
          title="모의 면접"
          icon="🗣️"
          subtitle="AI와 함께 대비해요"
        />
        <SelectButton
          title="데일리 퀴즈"
          icon="🧐"
          subtitle="퀴즈로 배경지식 쌓기"
        />
      </section>
      <section class="flex w-full flex-1 flex-col rounded-t-2xl bg-white p-10">
        <Title>실시간 랭킹</Title>
        <SubTitle>내 위치는 어디일까요?</SubTitle>
        <div class="mt-6 flex flex-col gap-4 divide-y divide-gray-100">
          <RankingItem rank="🥇" name="John Doe" info="백엔드" score={100} />
          <RankingItem rank="🥈" name="Jane Doe" info="프론트엔드" score={90} />
          <RankingItem rank="🥉" name="Jim Doe" info="데이터 분석" score={80} />
        </div>
      </section>
    </div>
  );
}

const StrickCard = () => {
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
            <span
              class="text-2xl font-bold"
              style="color: var(--color-positive)"
            >
              {streakDays}
            </span>
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
};

interface SelectButtonProps {
  title: string;
  icon: string;
  subtitle: string;
}

const SelectButton = ({ title, icon, subtitle }: SelectButtonProps) => (
  <button class="grid h-25 w-full cursor-pointer place-items-center rounded-2xl bg-white focus:outline-none active:opacity-40">
    <div class="flex flex-col items-start gap-1">
      <div class="flex items-center gap-2">
        <Title>{title}</Title>
        <span class="font-tossface text-xl">{icon}</span>
      </div>
      <SubTitle>{subtitle}</SubTitle>
    </div>
  </button>
);

const RankingItem = ({
  rank,
  name,
  score,
  info,
}: {
  rank: string;
  name: string;
  info: string;
  score: number;
}) => (
  <div class="box-border grid h-fit w-full grid-cols-8 rounded-2xl pb-4">
    <div class="flex flex-col items-start justify-center">
      <span class="font-tossface text-xl font-medium">{rank}</span>
    </div>
    <div class="col-span-6 flex flex-col">
      <p class="text-sm font-medium">{name}</p>
      <SubTitle>{info}</SubTitle>
    </div>
    <div class="flex flex-col items-end justify-center">
      <span class="text-sm font-medium text-nowrap">{score}점</span>
    </div>
  </div>
);
