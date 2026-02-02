interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar(props: ProgressBarProps) {
  const progress = () => (props.current / props.total) * 100;

  return (
    <div class="flex flex-1 flex-col gap-2">
      <span class="text-sm text-gray-005">
        {props.current}/{props.total}
      </span>
      <div class="h-2 w-full rounded-full bg-gray-002">
        <div
          class="h-full rounded-full bg-blue-004 transition-all duration-300"
          style={{ width: `${progress()}%` }}
        />
      </div>
    </div>
  );
}
