interface QuizProgressBarProps {
  current: number;
  total: number;
}

export default function QuizProgressBar({ current, total }: QuizProgressBarProps) {
  const safeTotal = total > 0 ? total : 1;
  const clampedCurrent = Math.min(Math.max(current, 0), safeTotal);
  const progressPercent = (clampedCurrent / safeTotal) * 100;

  return (
    <div className="flex items-center gap-3">
      <div className="bg-gray-002 h-2 flex-1 overflow-hidden rounded-full">
        <div
          className="bg-blue-004 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <span className="text-gray-005 text-xs">
        {clampedCurrent} / {safeTotal}
      </span>
    </div>
  );
}
