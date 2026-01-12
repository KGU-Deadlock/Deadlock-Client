import { SubTitle, Title } from "~/shared/components";

import HomeStrickCard from "./HomeStrickCard";
import HomeSelectButton from "./HomeSelectButton";
import HomeRankingItem from "./HomeRankingItem";

export default function HomePage() {
  const USER = "한유진";
  return (
    <div class="absolute inset-0 mx-auto flex max-w-[500px] flex-col gap-6 bg-gray-100 pt-10">
      <section class="px-4">
        <span class="text-lg font-medium">{USER}</span>님 안녕하세요!
      </section>
      <section class="w-full px-4">
        <HomeStrickCard />
      </section>
      <section class="flex w-full gap-4 px-4">
        <HomeSelectButton
          title="모의 면접"
          icon="🗣️"
          subtitle="AI와 함께 대비해요"
          href="/interview"
        />
        <HomeSelectButton
          title="데일리 퀴즈"
          icon="🧐"
          subtitle="퀴즈로 배경지식 쌓기"
          href="/quiz"
        />
      </section>
      <section class="flex w-full flex-1 flex-col rounded-t-2xl bg-white p-10">
        <Title>실시간 랭킹</Title>
        <SubTitle>내 위치는 어디일까요?</SubTitle>
        <div class="mt-6 flex flex-col gap-4 divide-y divide-gray-100">
          <HomeRankingItem
            rank="🥇"
            name="John Doe"
            info="백엔드"
            score={100}
          />
          <HomeRankingItem
            rank="🥈"
            name="Jane Doe"
            info="프론트엔드"
            score={90}
          />
          <HomeRankingItem
            rank="🥉"
            name="Jim Doe"
            info="데이터 분석"
            score={80}
          />
        </div>
      </section>
    </div>
  );
}
