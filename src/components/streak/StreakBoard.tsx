const WEEKS = 8;
const DAYS_PER_WEEK = 7;
const TOTAL_DAYS = WEEKS * DAYS_PER_WEEK;
const COLUMNS_PER_ROW = 14;

const levelToClass: Record<number, string> = {
  0: "bg-gray-002",
  1: "bg-blue-001",
  2: "bg-blue-002",
  3: "bg-blue-003",
  4: "bg-blue-004",
};

interface StreakBoardProps {
  currentStreakDays: number;
  longestStreakDays: number;
}

export default function StreakBoard(props: StreakBoardProps) {
  const current = Math.max(0, props.currentStreakDays ?? 0);
  const longest = Math.max(current, props.longestStreakDays ?? current);

  const latestIndex = TOTAL_DAYS - 1;

  const cells = Array.from({ length: TOTAL_DAYS }, (_, index) => {
    const offsetFromEnd = latestIndex - index;

    if (offsetFromEnd < 0) return 0;
    if (offsetFromEnd < current) return 4; // 현재 연속 스트릭 구간
    if (offsetFromEnd < longest) return 2; // 과거 최장 스트릭 구간

    return 0;
  });

  const rows = Math.ceil(TOTAL_DAYS / COLUMNS_PER_ROW);

  return (
    <div className="flex w-full flex-col gap-1">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid w-full grid-cols-14 gap-1">
          {Array.from({ length: COLUMNS_PER_ROW }).map((_, colIndex) => {
            const cellIndex = rowIndex * COLUMNS_PER_ROW + colIndex;
            const level = cells[cellIndex] ?? 0;

            return (
              <div
                key={colIndex}
                className={`aspect-square w-full rounded-sm ${levelToClass[level]}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
