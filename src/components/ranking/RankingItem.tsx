import { cn } from "@/utils/cn";

interface RankingItemProps {
  rank: number;
  nickname: string;
  score: number;
  profileImage?: string;
  university?: string;
  interest?: string;
  className?: string;
  tone?: "default" | "inverse";
}

export default function RankingItem({
  rank,
  nickname,
  score,
  university,
  interest,
  className,
  tone = "default",
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
        return (
          <span
            className={cn(
              "font-[Pretendard] text-base",
              tone === "inverse" ? "text-white" : "text-black",
            )}
          >
            {rank}
          </span>
        );
    }
  };

  return (
    <div className={cn("grid w-full grid-cols-[1fr_4fr_1fr] py-2", className)}>
      <div className="font-tossface flex items-center justify-start text-[24px]">
        {getRankTag()}
      </div>
      <div className="flex h-full flex-col justify-center">
        <span
          className={cn(
            "text-[15px] font-medium",
            tone === "inverse" ? "text-white" : "text-black",
          )}
        >
          {nickname}
        </span>
        <span
          className={cn(
            "text-sm",
            tone === "inverse" ? "text-gray-002" : "text-gray-006",
          )}
        >
          {university ?? "경기대학교"} · {interest ?? "CS"}
        </span>
      </div>
      <span
        className={cn(
          "flex items-center justify-end text-sm font-semibold",
          tone === "inverse" ? "text-gray-002" : "text-black",
        )}
      >
        {score}점
      </span>
    </div>
  );
}
