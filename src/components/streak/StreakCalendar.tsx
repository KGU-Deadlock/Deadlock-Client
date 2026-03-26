import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./StreakCalendar.css";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import { streakQueries } from "@/api/streak/api.query";

import { cn } from "@/utils/cn";

import { Title } from "../common";

interface StreakCalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  isPastDateDisabled?: boolean;
}

export default function StreakCalendar({
  value,
  onChange,
  isPastDateDisabled = false,
}: StreakCalendarProps) {
  const [internalViewDate, setInternalViewDate] = useState<Date>(
    () => new Date(),
  );

  const setViewDate = (date: Date) => {
    setInternalViewDate(date);
  };

  const activeStartDate = dayjs(internalViewDate).startOf("month").toDate();

  const year = dayjs(activeStartDate).year();
  const month = dayjs(activeStartDate).month() + 1;

  const { data: monthlyData } = useQuery(
    streakQueries.getStreakSummaryQuery({ year, month }),
  );

  const solvedDates = useMemo(() => {
    const days = monthlyData?.data?.days ?? [];
    const set = new Set<string>();
    for (const d of days) {
      if (d.solved && d.date) {
        set.add(d.date);
      }
    }
    return set;
  }, [monthlyData]);

  return (
    <div className="px-gutter flex w-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <Title>{dayjs(activeStartDate).format("YYYY년 M월")}</Title>
        <div className="flex items-center gap-1">
          <button
            className="grid place-items-center rounded-md p-1"
            onClick={() =>
              setViewDate(dayjs(internalViewDate).subtract(1, "month").toDate())
            }
            type="button"
            aria-label="이전 달"
          >
            <BiChevronLeft size={24} color="black" />
          </button>
          <button
            className="grid place-items-center rounded-md p-1"
            onClick={() =>
              setViewDate(dayjs(internalViewDate).add(1, "month").toDate())
            }
            type="button"
            aria-label="다음 달"
          >
            <BiChevronRight size={24} color="black" />
          </button>
        </div>
      </div>

      <Calendar
        value={value}
        activeStartDate={activeStartDate}
        onActiveStartDateChange={({ activeStartDate: nextStart }) => {
          if (nextStart) setViewDate(nextStart);
        }}
        onChange={(nextValue) => {
          if (nextValue instanceof Date && onChange) onChange(nextValue);
        }}
        formatShortWeekday={(_, date) =>
          dayjs(date).format("ddd").toUpperCase()
        }
        formatDay={(_, date) => dayjs(date).format("D")}
        calendarType="gregory"
        tileClassName={({ date }) => {
          const dateStr = dayjs(date).format("YYYY-MM-DD");
          const isSolved = solvedDates.has(dateStr);
          const isPast =
            isPastDateDisabled &&
            dayjs(date).isBefore(dayjs().startOf("day"));

          return cn(
            isSolved && "streak-calendar-solved",
            isPast && "opacity-40",
          );
        }}
        tileDisabled={({ date }) => {
          if (!isPastDateDisabled) return false;
          return dayjs(date).isBefore(dayjs().startOf("day"));
        }}
      />
    </div>
  );
}
