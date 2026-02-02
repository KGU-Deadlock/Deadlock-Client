import { SubTitle } from "~/shared/components";
import MedalIcon from "~/shared/components/icons/MedalIcon";

interface HomeRankingItemProps {
  rank: number;
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
  const isTopThree = () => rank <= 3;
  const isTopScore = () => rank === 1 || rank === 3;

  return (
    <div class="flex items-center gap-3 py-4">
      <div class="flex w-6 items-center justify-center">
        {isTopThree() ? (
          <MedalIcon rank={rank as 1 | 2 | 3} />
        ) : (
          <span class="text-base font-medium text-gray-008">{rank}</span>
        )}
      </div>
      <div class="flex flex-1 flex-col gap-1">
        <p class="text-sm font-medium text-gray-008">{name}</p>
        <SubTitle>{info}</SubTitle>
      </div>
      <div class="flex items-center">
        <span
          class="text-sm font-medium text-nowrap"
          classList={{
            "text-[#FF8C00]": isTopScore(),
            "text-gray-008": !isTopScore(),
          }}
        >
          {score.toLocaleString()}점
        </span>
      </div>
    </div>
  );
}
