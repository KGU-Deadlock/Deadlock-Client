import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";

import { Header, Scrollable, Subtitle, Title } from "@/components/common";
import { BackButton } from "@/components/common";
import { RankingItem, RankingTopSection } from "@/components/ranking";

import type {
  MyRankingResult,
  RankingEntryResult,
} from "@/api/ranking/api.model";
import { rankingQueries } from "@/api/ranking/api.query";
import { cn } from "@/utils/cn";

function isMyRankingEntry(
  item: RankingEntryResult,
  myRanking: MyRankingResult | undefined,
): boolean {
  if (!myRanking) return false;
  if (
    myRanking.kakaoId != null &&
    item.kakaoId != null &&
    myRanking.kakaoId === item.kakaoId
  ) {
    return true;
  }
  return (
    myRanking.rank != null && item.rank != null && myRanking.rank === item.rank
  );
}

export default function RankingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useQuery(
    rankingQueries.getRankingDetailQuery({ filterType: "ALL", size: 20 }),
  );

  const rankings = data?.data?.rankings ?? [];
  const myRanking = data?.data?.myRanking;
  const belowMyRankings = data?.data?.belowMyRankings ?? [];

  const isMyRankInTop4 =
    myRanking?.rank != null && myRanking.rank >= 1 && myRanking.rank <= 4;

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <AppScreen backgroundColor="var(--color-white)">
      <Scrollable>
        <Header
          left={<BackButton />}
          center={<Title>실시간 랭킹</Title>}
          sticky
        />

        <button
          type="button"
          className="right-gutter top-header border-gray-003 text-gray-005 absolute mt-4 flex items-center gap-2 border-b pb-1 text-sm font-medium"
          onClick={handleToggle}
        >
          전체 {isOpen ? <CgChevronUp /> : <CgChevronDown />}
        </button>
        {isOpen && (
          <div className="right-gutter divide-gray-003 border-gray-003 absolute top-[calc(70px+var(--spacing-gutter))] z-999 flex flex-col divide-y rounded-lg border bg-white p-4 text-sm shadow-xl">
            <span className="py-2">학교별</span>
            <span className="py-2">관심사별</span>
          </div>
        )}

        {rankings.length > 0 && (
          <RankingTopSection users={rankings.slice(0, 3)} />
        )}

        <div className="bg-gray-002 pb-footer mt-colgap w-full flex-1 rounded-t-3xl">
          <div className="px-gutter pt-4">
            <div className="divide-gray-003 mt-3 divide-y">
              {rankings
                .filter(
                  (item) =>
                    item.rank != null && item.rank >= 1 && item.rank <= 4,
                )
                .map((item) => {
                  const isMe = isMyRankingEntry(item, myRanking);
                  const row = (
                    <RankingItem
                      className={cn(!isMe && "px-4")}
                      rank={
                        isMe
                          ? (myRanking?.rank ?? item.rank ?? 0)
                          : (item.rank ?? 0)
                      }
                      nickname={
                        isMe
                          ? (myRanking?.nickname ?? "나")
                          : (item.nickname ?? "익명")
                      }
                      score={isMe ? (myRanking?.score ?? 0) : (item.score ?? 0)}
                      tone={isMe ? "inverse" : "default"}
                    />
                  );
                  return (
                    <div
                      key={`${item.kakaoId ?? "r"}-${item.rank}`}
                      className="py-1"
                    >
                      {isMe ? (
                        <div className="bg-blue-003 w-full rounded-xl px-4">
                          {row}
                        </div>
                      ) : (
                        row
                      )}
                    </div>
                  );
                })}
            </div>

            {!isMyRankInTop4 && belowMyRankings.length > 0 && (
              <div className="mt-2">
                <Subtitle className="text-gray-006 flex justify-center">
                  ...
                </Subtitle>
                {myRanking && (
                  <div className="bg-blue-003 mt-2 w-full rounded-xl">
                    <RankingItem
                      rank={myRanking.rank ?? 0}
                      nickname={myRanking.nickname ?? "나"}
                      score={myRanking.score ?? 0}
                      tone="inverse"
                    />
                  </div>
                )}
                <div className="divide-gray-003 mt-3 divide-y px-4">
                  {belowMyRankings.map((item) => (
                    <div key={item.rank} className="py-1">
                      <RankingItem
                        rank={item.rank ?? 0}
                        nickname={item.nickname ?? "익명"}
                        score={item.score ?? 0}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-4">
              <Subtitle className="text-gray-006 text-center">
                더 많은 랭킹은 준비 중이에요
              </Subtitle>
            </div>
          </div>
        </div>
      </Scrollable>
    </AppScreen>
  );
}
