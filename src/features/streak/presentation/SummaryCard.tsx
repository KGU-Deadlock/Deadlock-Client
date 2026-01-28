interface SummaryCardProps {
  title: string;
  value: string | number;
}

export default function SummaryCard(props: SummaryCardProps) {
  return (
    <div class="flex flex-1 flex-col gap-2 rounded-lg bg-gray-002 p-4">
      <p class="text-sm text-gray-006">{props.title}</p>
      <p class="text-xl font-bold text-gray-008">{props.value}</p>
    </div>
  );
}
