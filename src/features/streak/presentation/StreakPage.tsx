import { createMemo, createSignal } from "solid-js";
import Header from "~/shared/components/Header";
import Calendar from "./Calendar";
import StreakGrid from "./StreakGrid";
import SummaryCard from "./SummaryCard";
import type { ActivityLevel, StudySummary } from "../domain/types";

interface StreakPageProps {
  summary?: StudySummary;
  streakData?: ActivityLevel[];
  initialYear?: number;
  initialMonth?: number;
}

export default function StreakPage(props: StreakPageProps) {
  // TODO: 실제 API 연동 시 createResource로 변경
  const [summary] = createSignal<StudySummary>(
    props.summary ?? {
      consecutiveDays: 4,
      solvedProblems: 87,
      solvedFields: 4,
    },
  );

  const [currentYear, setCurrentYear] = createSignal(props.initialYear ?? 2025);
  const [currentMonth, setCurrentMonth] = createSignal(
    props.initialMonth ?? 12,
  );

  // 더미 스트릭 데이터 (42개 블록)
  const streakData = createMemo(() => {
    if (props.streakData) {
      return props.streakData;
    }
    // 예시 데이터: 처음 몇 개는 활동 있음, 나머지는 없음
    const data: ActivityLevel[] = [];
    for (let i = 0; i < 42; i++) {
      if (i < 5) {
        data.push(i % 3 === 0 ? "high" : i % 2 === 0 ? "medium" : "low");
      } else {
        data.push("none");
      }
    }
    return data;
  });

  // 더미 월별 데이터
  const monthlyRecords = createMemo(() => {
    const records = new Map<number, ActivityLevel>();
    const year = currentYear();
    const month = currentMonth();

    // 예시: 특정 날짜에 활동이 있음
    if (year === 2025 && month === 12) {
      records.set(1, "low");
      records.set(7, "low");
      records.set(8, "medium");
      records.set(9, "high");
      records.set(10, "low");
      records.set(11, "low");
      records.set(18, "high");
      records.set(19, "high");
      records.set(21, "low");
      records.set(22, "low");
      records.set(23, "low");
      records.set(24, "low");
      records.set(25, "low");
      records.set(26, "low");
      records.set(27, "low");
      records.set(28, "low");
      records.set(29, "low");
      records.set(30, "low");
      records.set(31, "low");
    }

    return records;
  });

  const totalStudyCount = createMemo(() => {
    let count = 0;
    monthlyRecords().forEach((level) => {
      if (level !== "none") count++;
    });
    return count;
  });

  const handlePreviousMonth = () => {
    const newMonth = currentMonth() - 1;
    if (newMonth < 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear() - 1);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  const handleNextMonth = () => {
    const newMonth = currentMonth() + 1;
    if (newMonth > 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear() + 1);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  return (
    <main class="bg-gray-001 mx-auto min-h-screen max-w-[500px]">
      <Header title="연속 스트릭" />
      <div class="flex flex-col gap-6 pb-6">
        <section class="px-4 pt-4">
          <StreakGrid data={streakData()} rows={6} cols={7} />
        </section>
        <section class="flex gap-3 px-4">
          <SummaryCard
            title="연속 학습"
            value={`${summary().consecutiveDays}일`}
          />
          <SummaryCard
            title="해결한 문제"
            value={`${summary().solvedProblems}개`}
          />
          <SummaryCard title="해결한 분야" value={summary().solvedFields} />
        </section>
        <Calendar
          year={currentYear()}
          month={currentMonth()}
          dailyRecords={monthlyRecords()}
          totalStudyCount={totalStudyCount()}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
        />
      </div>
    </main>
  );
}
