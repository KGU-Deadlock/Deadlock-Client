import { AppScreen } from "@stackflow/plugin-basic-ui";
import type { ActivityComponentType } from "@stackflow/react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { RiArrowRightSLine } from "react-icons/ri";

import { useFlow } from "@/app/stackflow";

import {
  BackButton,
  Header,
  Scrollable,
  Subtitle,
  Title,
} from "@/components/common";

import type { GradingLogListResult } from "@/api/quiz/api.model";
import { quizQueries } from "@/api/quiz/api.query";

type UserGradeLogListItemProps = {
  item: GradingLogListResult;
  onSelect: (gradingLogId: string) => void;
};

function UserGradeLogListItem({ item, onSelect }: UserGradeLogListItemProps) {
  const id = item.id;
  const solvedLabel = item.solvedAt
    ? dayjs(item.solvedAt).format("YYYY.MM.DD HH:mm")
    : "날짜 없음";
  const scoreLabel =
    item.correctCount != null && item.totalCount != null
      ? `${item.correctCount}/${item.totalCount}`
      : "점수 정보 없음";
  const modeLabel = item.quizMode?.trim() ? item.quizMode : "정보 없음";
  const topicsLabel =
    item.topicNames && item.topicNames.length > 0
      ? item.topicNames.join(", ")
      : "정보 없음";
  const hasScore = item.correctCount != null && item.totalCount != null;

  return (
    <button
      type="button"
      disabled={!id}
      className="group border-gray-003 flex w-full items-center gap-3 rounded-2xl border bg-white p-4 text-left"
      onClick={() => {
        if (!id) return;
        onSelect(id);
      }}
    >
      <div className="min-w-0 flex-1">
        <p className="text-gray-005 text-xs tabular-nums">{solvedLabel}</p>
        <p className="mt-2.5 text-base leading-snug font-semibold text-black">
          {hasScore ? (
            <>
              <span className="text-blue-004">{item.correctCount}</span>
              <span className="text-gray-004 font-medium"> / </span>
              <span>{item.totalCount}</span>
            </>
          ) : (
            scoreLabel
          )}
        </p>
        <div className="border-gray-002 mt-3 space-y-1.5 border-t border-dashed pt-3">
          <p className="text-gray-005 text-xs leading-relaxed">
            <span className="text-gray-004 font-medium">모드</span>
            <span className="text-gray-003 mx-1.5">·</span>
            {modeLabel}
          </p>
          <p className="text-gray-005 line-clamp-2 text-xs leading-relaxed">
            <span className="text-gray-004 font-medium">주제</span>
            <span className="text-gray-003 mx-1.5">·</span>
            {topicsLabel}
          </p>
        </div>
      </div>
      <RiArrowRightSLine
        className="text-gray-004 group-hover:text-blue-004 group-disabled:text-gray-004 size-[22px] shrink-0 transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-disabled:translate-x-0"
        aria-hidden
      />
    </button>
  );
}

const UserGradeLogPage: ActivityComponentType<Record<string, never>> = () => {
  const { push } = useFlow();

  const { data, isPending, isError } = useQuery(
    quizQueries.getQuizGradeLogListQuery(),
  );

  const items = data?.data ?? [];

  return (
    <AppScreen className="relative">
      <Scrollable>
        <Header left={<BackButton />} center={<Title>내 공부</Title>} />
        <Subtitle className="px-gutter mt-2">
          기록을 누르면 해당 세션의 채점 결과를 볼 수 있어요.
        </Subtitle>

        <div className="px-gutter mt-6 flex flex-col gap-4 pb-8">
          {isPending && (
            <p className="text-gray-005 text-sm">기록을 불러오는 중...</p>
          )}
          {isError && (
            <p className="text-red text-sm">
              기록을 불러오지 못했어요. 잠시 후 다시 시도해주세요.
            </p>
          )}
          {!isPending && !isError && items.length === 0 && (
            <p className="text-gray-005 text-sm">아직 채점 기록이 없어요.</p>
          )}
          {!isPending &&
            !isError &&
            items.map((item, index) => (
              <UserGradeLogListItem
                key={item.id ?? `grading-log-${index}`}
                item={item}
                onSelect={(gradingLogId) =>
                  push("QuizGradeLogPage", { gradingLogId })
                }
              />
            ))}
        </div>
      </Scrollable>
    </AppScreen>
  );
};

export default UserGradeLogPage;
