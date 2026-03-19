import { Header, Scrollable, Subtitle, Title } from "@/components/common";
import { BackButton } from "@/components/common";
import { RankingItem, RankingTopSection } from "@/components/ranking";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { me, ranking } from "@/constants/ranking/ranking";
import { useState } from "react";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";

const TOP3_ORDER = [2, 1, 3] as const;

export default function RankingPage() {
  const [isOpen, setIsOpen] = useState(false);

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

        <RankingTopSection
          users={TOP3_ORDER.map((r) => ranking.find((item) => item.rank === r)!)}
        />

        <div className="bg-gray-002 pb-footer mt-colgap w-full flex-1 rounded-t-3xl">
          <div className="px-gutter pt-4">
            <div className="divide-gray-003 mt-3 divide-y px-4">
              {ranking.filter((item) => item.rank >= 4).map((item) => (
                <div key={item.rank} className="py-1">
                  <RankingItem rank={item.rank} nickname={item.name} score={item.score} university={item.university} interest={item.interest} />
                </div>
              ))}
            </div>
            <div className="bg-blue-003 mt-2 w-full rounded-xl px-4">
              <RankingItem rank={me.rank} nickname={me.name} score={me.score} university={me.university} interest={me.interest} tone="inverse" />
            </div>
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
