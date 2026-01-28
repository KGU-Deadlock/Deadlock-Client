import type { RankingUser } from "../domain/types";

interface RankingListItemProps {
  user: RankingUser;
}

export default function RankingListItem(props: RankingListItemProps) {
  const isCurrentUser = () => props.user.isCurrentUser ?? false;

  return (
    <div
      class="flex items-center gap-4 px-4 py-3"
      classList={{
        "bg-blue-004 text-white": isCurrentUser(),
        "bg-white": !isCurrentUser(),
      }}
    >
      <span
        class="text-base font-medium"
        classList={{
          "text-white": isCurrentUser(),
          "text-gray-008": !isCurrentUser(),
        }}
      >
        {props.user.rank}
      </span>
      <div class="flex flex-1 flex-col gap-1">
        <p
          class="text-sm font-medium"
          classList={{
            "text-white": isCurrentUser(),
            "text-gray-008": !isCurrentUser(),
          }}
        >
          {props.user.name}
        </p>
        <p
          class="text-xs"
          classList={{
            "text-blue-100": isCurrentUser(),
            "text-gray-005": !isCurrentUser(),
          }}
        >
          {props.user.university}·{props.user.position}
        </p>
      </div>
      <span
        class="text-sm font-medium"
        classList={{
          "text-white": isCurrentUser(),
          "text-gray-008": !isCurrentUser(),
        }}
      >
        {props.user.score.toLocaleString()}점
      </span>
    </div>
  );
}
