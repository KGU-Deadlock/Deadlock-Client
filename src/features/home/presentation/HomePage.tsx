import { A } from "@solidjs/router";
import { SubTitle, Title } from "~/shared/components";
import UserIcon from "~/shared/components/icons/UserIcon";
import HomeStreakCard from "./HomeStreakCard";
import HomeSelectButton from "./HomeSelectButton";
import HomeRankingItem from "./HomeRankingItem";

export default function HomePage() {
  const USER = "한유진";
  return (
    <div class="absolute inset-0 mx-auto flex max-w-[500px] flex-col gap-6 bg-gray-001 pt-10">
      {/* Header */}
      <section class="flex items-center justify-between px-4">
        <h1 class="text-lg font-bold text-gray-008">
          {USER}님 안녕하세요!
        </h1>
        <A
          href="/my"
          class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-002"
          aria-label="마이페이지"
        >
          <UserIcon />
        </A>
      </section>

      {/* Streak Card */}
      <section class="w-full px-4">
        <HomeStreakCard />
      </section>

      {/* Action Cards */}
      <section class="flex w-full gap-4 px-4">
        <HomeSelectButton
          title="모의 면접"
          icon="🗣️"
          subtitle="AI와 함께 대비해요"
          href="/interview"
        />
        <HomeSelectButton
          title="CS 퀴즈"
          icon="🧐"
          subtitle="퀴즈로 배경지식 쌓기"
          href="/quiz"
        />
      </section>

      {/* Ranking Card */}
      <section class="flex w-full flex-1 flex-col rounded-t-2xl bg-white p-6">
        <div class="mb-4 flex items-center justify-between">
          <div class="flex flex-col gap-1">
            <Title>실시간 랭킹</Title>
            <SubTitle>내 위치는 어디일까요?</SubTitle>
          </div>
          <A
            href="/ranking"
            class="text-sm text-gray-005 hover:text-gray-008"
          >
            더보기
          </A>
        </div>
        <div class="flex flex-col divide-y divide-gray-002">
          <HomeRankingItem
            rank={1}
            name="김민재"
            info="경기대학교 · 백엔드"
            score={1404}
          />
          <HomeRankingItem
            rank={2}
            name="김민재"
            info="경기대학교 · 백엔드"
            score={1306}
          />
          <HomeRankingItem
            rank={3}
            name="김민재"
            info="경기대학교 · 백엔드"
            score={1208}
          />
          <HomeRankingItem
            rank={4}
            name="김민재"
            info="경기대학교 · 백엔드"
            score={1999}
          />
          <HomeRankingItem
            rank={5}
            name="김민재"
            info="경기대학교 · 백엔드"
            score={1145}
          />
        </div>
      </section>
    </div>
  );
}
