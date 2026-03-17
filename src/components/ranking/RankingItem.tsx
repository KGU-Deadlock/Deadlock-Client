interface RankingItemProps {
  rank: number;
  name: string;
  university: string;
  interest: string;
  score: number;
}

export default function RankingItem({
  rank,
  name,
  university,
  interest,
  score,
}: RankingItemProps) {
  const getRankTag = () => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return rank;
    }
  };

  return (
    <div className="grid w-full grid-cols-[1fr_4fr_1fr] py-2">
      <span className="font-tossface flex items-center justify-start text-[24px]">
        {getRankTag()}
      </span>
      <div className="flex h-full flex-col justify-center">
        <span className="text-[15px] font-medium">{name}</span>
        <span className="text-gray-006 text-sm">
          {university} · {interest}
        </span>
      </div>
      <span className="flex items-center justify-end text-sm font-semibold">
        {score}점
      </span>
    </div>
  );
}
