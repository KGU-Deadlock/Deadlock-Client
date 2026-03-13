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

export default function StreakBoard() {
  const cells = Array.from({ length: TOTAL_DAYS }, (_, index) => {
    const level = index % 5;

    return level;
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
