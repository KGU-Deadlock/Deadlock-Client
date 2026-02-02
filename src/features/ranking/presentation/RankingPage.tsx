import { createMemo, createSignal, For } from "solid-js";
import Header from "~/shared/components/Header";
import RankingFilterComponent from "./RankingFilter";
import RankingListItem from "./RankingListItem";
import Top3Ranking from "./Top3Ranking";
import type { RankingFilter, RankingUser } from "../domain/types";

interface RankingPageProps {
  users?: RankingUser[];
  currentUserId?: string;
}

export default function RankingPage(props: RankingPageProps) {
  const [filter, setFilter] = createSignal<RankingFilter>("all");

  // TODO: 실제 API 연동 시 createResource로 변경
  const allUsers = createMemo(() => {
    if (props.users) {
      return props.users;
    }
    // 더미 데이터
    const users: RankingUser[] = [
      {
        id: "1",
        rank: 1,
        name: "김민재",
        university: "경기대학교",
        position: "백엔드",
        score: 1999,
      },
      {
        id: "2",
        rank: 2,
        name: "김민재",
        university: "경기대학교",
        position: "백엔드",
        score: 1800,
      },
      {
        id: "3",
        rank: 3,
        name: "김민재",
        university: "경기대학교",
        position: "백엔드",
        score: 1600,
      },
      {
        id: "4",
        rank: 4,
        name: "김민재",
        university: "경기대학교",
        position: "백엔드",
        score: 1404,
      },
      {
        id: "5",
        rank: 5,
        name: "김민재",
        university: "경기대학교",
        position: "백엔드",
        score: 1306,
      },
      {
        id: "6",
        rank: 6,
        name: "김민재",
        university: "경기대학교",
        position: "백엔드",
        score: 1208,
      },
      {
        id: "7",
        rank: 7,
        name: "김민재",
        university: "경기대학교",
        position: "백엔드",
        score: 1999,
      },
      {
        id: "current",
        rank: 224,
        name: "한유진",
        university: "경기대학교",
        position: "프론트엔드",
        score: 10,
        isCurrentUser: true,
      },
      {
        id: "8",
        rank: 224,
        name: "황재균",
        university: "경기대학교",
        position: "백엔드",
        score: 10,
      },
      {
        id: "9",
        rank: 226,
        name: "최형우",
        university: "경기대학교",
        position: "백엔드",
        score: 2,
      },
    ];
    return users;
  });

  const filteredUsers = createMemo(() => {
    const users = allUsers();
    const currentFilter = filter();

    if (currentFilter === "all") {
      return users;
    }

    return users.filter((user) => {
      if (currentFilter === "backend") {
        return user.position === "백엔드";
      }
      if (currentFilter === "frontend") {
        return user.position === "프론트엔드";
      }
      if (currentFilter === "data") {
        return user.position === "데이터";
      }
      return true;
    });
  });

  const top3Users = createMemo(() => {
    const users = filteredUsers()
      .filter((u) => u.rank <= 3)
      .sort((a, b) => a.rank - b.rank);
    return [
      users[0] ?? allUsers()[0],
      users[1] ?? allUsers()[1],
      users[2] ?? allUsers()[2],
    ] as [RankingUser, RankingUser, RankingUser];
  });

  const remainingUsers = createMemo(() => {
    return filteredUsers().filter((u) => u.rank > 3);
  });

  const handleFilterChange = (newFilter: RankingFilter) => {
    setFilter(newFilter);
  };

  return (
    <main class="mx-auto min-h-screen max-w-[500px] bg-gray-001">
      <div class="relative flex h-16 w-full items-center">
        <Header title="실시간 랭킹" />
        <div class="absolute right-4">
          <RankingFilterComponent value={filter()} onChange={handleFilterChange} />
        </div>
      </div>
      <div class="flex flex-col">
        <Top3Ranking users={top3Users()} />
        <section class="rounded-t-2xl bg-white px-4 py-6 shadow-lg">
          <div class="flex flex-col divide-y divide-gray-002">
            <For each={remainingUsers()}>
              {(user) => <RankingListItem user={user} />}
            </For>
          </div>
        </section>
      </div>
    </main>
  );
}
