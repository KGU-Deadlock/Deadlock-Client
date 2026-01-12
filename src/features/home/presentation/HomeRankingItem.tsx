import { SubTitle } from "~/shared/components";

interface HomeRankingItemProps {
  rank: string;
  name: string;
  info: string;
  score: number;
}

export default function HomeRankingItem({
  rank,
  name,
  score,
  info,
}: HomeRankingItemProps) {
  return (
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
}
