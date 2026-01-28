import type { RankingUser } from "../domain/types";

interface Top3RankingProps {
  users: [RankingUser, RankingUser, RankingUser];
}

export default function Top3Ranking(props: Top3RankingProps) {
  const getMedalColor = (rank: number): string => {
    switch (rank) {
      case 1:
        return "bg-[#FFD700] border-[#FFA500]";
      case 2:
        return "bg-gray-300 border-gray-400";
      case 3:
        return "bg-[#CD7F32] border-[#8B4513]";
      default:
        return "bg-gray-200 border-gray-300";
    }
  };

  const getBorderColor = (rank: number): string => {
    switch (rank) {
      case 1:
        return "border-[#FFD700]";
      case 2:
        return "border-blue-300";
      case 3:
        return "border-[#CD7F32]";
      default:
        return "border-gray-300";
    }
  };

  const getRankSize = (rank: number): string => {
    switch (rank) {
      case 1:
        return "w-24 h-24";
      case 2:
      case 3:
        return "w-20 h-20";
      default:
        return "w-20 h-20";
    }
  };

  return (
    <section class="flex items-end justify-center gap-4 px-4 py-6">
      {/* Rank 2 */}
      <div class="flex flex-col items-center gap-2">
        <div class="relative">
          <div
            class={`${getRankSize(2)} rounded-full border-4 ${getBorderColor(2)} bg-gray-002 overflow-hidden`}
          >
            {props.users[1].profileImageUrl ? (
              <img
                src={props.users[1].profileImageUrl}
                alt={`${props.users[1].name} 프로필`}
                class="h-full w-full object-cover"
              />
            ) : (
              <div class="flex h-full w-full items-center justify-center">
                <span class="text-gray-006 text-2xl font-medium">
                  {props.users[1].name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div
            class={`absolute -bottom-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 ${getMedalColor(2)}`}
          >
            <span class="text-xs font-bold text-white">2</span>
          </div>
        </div>
        <div class="flex flex-col items-center gap-1">
          <p class="text-gray-008 text-sm font-bold">{props.users[1].name}</p>
          <p class="text-gray-005 text-xs">
            {props.users[1].university}·{props.users[1].position}
          </p>
        </div>
      </div>

      {/* Rank 1 */}
      <div class="flex flex-col items-center gap-2">
        <div class="relative">
          <div
            class={`${getRankSize(1)} rounded-full border-4 ${getBorderColor(1)} bg-gray-002 overflow-hidden`}
          >
            {props.users[0].profileImageUrl ? (
              <img
                src={props.users[0].profileImageUrl}
                alt={`${props.users[0].name} 프로필`}
                class="h-full w-full object-cover"
              />
            ) : (
              <div class="flex h-full w-full items-center justify-center">
                <span class="text-gray-006 text-2xl font-medium">
                  {props.users[0].name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div
            class={`absolute -bottom-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 ${getMedalColor(1)}`}
          >
            <span class="text-xs font-bold text-white">1</span>
          </div>
        </div>
        <div class="flex flex-col items-center gap-1">
          <p class="text-gray-008 text-sm font-bold">{props.users[0].name}</p>
          <p class="text-gray-005 text-xs">
            {props.users[0].university}·{props.users[0].position}
          </p>
        </div>
      </div>

      {/* Rank 3 */}
      <div class="flex flex-col items-center gap-2">
        <div class="relative">
          <div
            class={`${getRankSize(3)} rounded-full border-4 ${getBorderColor(3)} bg-gray-002 overflow-hidden`}
          >
            {props.users[2].profileImageUrl ? (
              <img
                src={props.users[2].profileImageUrl}
                alt={`${props.users[2].name} 프로필`}
                class="h-full w-full object-cover"
              />
            ) : (
              <div class="flex h-full w-full items-center justify-center">
                <span class="text-gray-006 text-2xl font-medium">
                  {props.users[2].name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div
            class={`absolute -bottom-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 ${getMedalColor(3)}`}
          >
            <span class="text-xs font-bold text-white">3</span>
          </div>
        </div>
        <div class="flex flex-col items-center gap-1">
          <p class="text-gray-008 text-sm font-bold">{props.users[2].name}</p>
          <p class="text-gray-005 text-xs">
            {props.users[2].university}·{props.users[2].position}
          </p>
        </div>
      </div>
    </section>
  );
}
