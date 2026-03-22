import type { RankingEntryResult } from "@/api/ranking/api.model";

import { cn } from "@/utils/cn";

function userByRank(
  users: readonly RankingEntryResult[],
  rank: number,
): RankingEntryResult | undefined {
  return users.find((u) => (u.rank ?? 0) === rank);
}

function PodiumSlot({
  user,
  rank,
}: {
  user: RankingEntryResult | undefined;
  rank: 1 | 2 | 3;
}) {
  const isFirst = rank === 1;
  const size = isFirst ? "size-[100px]" : "size-[80px]";
  const ring = isFirst ? "ring-[3px] ring-yellow-400" : "ring-2 ring-blue-002";

  if (!user) {
    return (
      <div className="flex w-[105px] flex-col items-center" aria-hidden>
        <div className={`${size} shrink-0`} />
        <div className="h-footer mt-3 w-full" />
      </div>
    );
  }

  return (
    <div className="flex w-[105px] flex-col items-center">
      <div className={`relative ${size} rounded-full bg-white ${ring}`}>
        <img
          className={cn(
            size,
            "bg-gray-002 absolute inset-0 shrink-0 rounded-full object-cover object-center",
          )}
          src={user.profileImage}
          alt={user.nickname}
          onError={(e) => {
            e.currentTarget.src = `/images/default-profile-${rank}.png`;
          }}
        />
        <div
          className={`absolute bottom-[-10px] left-1/2 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full text-[11px] font-semibold ${
            isFirst ? "bg-yellow-400 text-white" : "bg-blue-003 text-white"
          }`}
        >
          {rank}
        </div>
      </div>
      <div className="mt-3 flex flex-col items-center">
        <span className="text-sm font-medium text-black">
          {user.nickname ?? "익명"}
        </span>
        <span className="text-gray-005 text-[11px] font-medium">관심사</span>
      </div>
    </div>
  );
}

export default function RankingTopSection({
  users,
}: {
  users: readonly RankingEntryResult[];
}) {
  const second = userByRank(users, 2);
  const first = userByRank(users, 1);
  const third = userByRank(users, 3);

  return (
    <section className="px-gutter pt-header">
      <div className="grid grid-cols-3 items-end justify-items-center">
        <PodiumSlot user={second} rank={2} />
        <PodiumSlot user={first} rank={1} />
        <PodiumSlot user={third} rank={3} />
      </div>
    </section>
  );
}
