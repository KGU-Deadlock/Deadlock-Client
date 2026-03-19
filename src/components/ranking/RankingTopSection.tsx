import type { RankingEntryResult } from "@/api/ranking/api.model";

export default function RankingTopSection({
  users,
}: {
  users: readonly RankingEntryResult[];
}) {
  return (
    <section className="px-gutter pt-header">
      <div className="flex items-end justify-between">
        {users.map((user) => {
          const rank = user.rank ?? 0;
          const isFirst = rank === 1;
          const size = isFirst ? "size-[100px]" : "size-[80px]";
          const ring = isFirst
            ? "ring-[3px] ring-yellow-400"
            : "ring-2 ring-blue-002";

          return (
            <div key={rank} className="flex w-[105px] flex-col items-center">
              <div className={`relative ${size} rounded-full bg-white ${ring}`}>
                <div className="bg-gray-002 absolute inset-[6px] rounded-full" />
                <div
                  className={`absolute bottom-[-10px] left-1/2 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full text-[11px] font-semibold ${
                    isFirst
                      ? "bg-yellow-400 text-white"
                      : "bg-blue-003 text-white"
                  }`}
                >
                  {rank}
                </div>
              </div>
              <div className="mt-3 flex flex-col items-center">
                <span className="text-sm font-medium text-black">
                  {user.nickname ?? "익명"}
                </span>
                <span className="text-gray-005 text-[11px] font-medium">-</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
