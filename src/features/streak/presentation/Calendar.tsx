import { createMemo, For } from "solid-js";
import ChevronLeftIcon from "~/shared/components/icons/ChevronLeftIcon";
import ChevronRightIconPlain from "~/shared/components/icons/ChevronRightIconPlain";
import type { ActivityLevel } from "../domain/types";

interface CalendarProps {
  year: number;
  month: number;
  dailyRecords: Map<number, ActivityLevel>;
  totalStudyCount: number;
  onPreviousMonth?: () => void;
  onNextMonth?: () => void;
}

export default function Calendar(props: CalendarProps) {
  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  const calendarDays = createMemo(() => {
    const year = props.year;
    const month = props.month;
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const days: Array<{ day: number; activityLevel: ActivityLevel } | null> =
      [];

    // 빈 칸 추가 (첫 날 이전)
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    // 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      const activityLevel = props.dailyRecords.get(day) ?? "none";
      days.push({ day, activityLevel });
    }

    return days;
  });

  const getActivityColor = (level: ActivityLevel): string => {
    switch (level) {
      case "none":
        return "bg-gray-002";
      case "low":
        return "bg-[#D4EDD4]";
      case "medium":
        return "bg-[#A5D6A7]";
      case "high":
        return "bg-[#66BB6A]";
      default:
        return "bg-gray-002";
    }
  };

  const handlePreviousMonth = () => {
    props.onPreviousMonth?.();
  };

  const handleNextMonth = () => {
    props.onNextMonth?.();
  };

  return (
    <section class="flex flex-col gap-4 px-4 py-6">
      <div class="flex items-center justify-between">
        <button
          onClick={handlePreviousMonth}
          class="flex items-center justify-center"
          aria-label="이전 달"
        >
          <ChevronLeftIcon />
        </button>
        <h2 class="text-gray-008 text-lg font-bold">
          {props.year}년 {monthNames[props.month - 1]}
        </h2>
        <button
          onClick={handleNextMonth}
          class="flex items-center justify-center"
          aria-label="다음 달"
        >
          <ChevronRightIconPlain />
        </button>
      </div>
      <p class="text-gray-006 text-sm">
        {props.year}년 {monthNames[props.month - 1]}에는 총{" "}
        {props.totalStudyCount}번 학습했어요.
      </p>
      <div class="rounded-lg bg-white p-4">
        <div class="mb-2 grid grid-cols-7 gap-1">
          <For each={weekDays}>
            {(day, index) => (
              <div
                class="flex items-center justify-center text-xs font-medium"
                classList={{
                  "text-red": index() === 0,
                  "text-gray-006": index() !== 0,
                }}
              >
                {day}
              </div>
            )}
          </For>
        </div>
        <div class="grid grid-cols-7 gap-1">
          <For each={calendarDays()}>
            {(dayData) =>
              dayData ? (
                <div
                  class={`aspect-square rounded ${getActivityColor(dayData.activityLevel)} text-gray-008 flex items-center justify-center text-sm`}
                  aria-label={`${props.year}년 ${props.month}월 ${dayData.day}일, 활동량: ${dayData.activityLevel}`}
                >
                  {dayData.day}
                </div>
              ) : (
                <div />
              )
            }
          </For>
        </div>
      </div>
    </section>
  );
}
