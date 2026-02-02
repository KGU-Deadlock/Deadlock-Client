import { For } from "solid-js";
import type { ActivityLevel } from "../domain/types";

interface StreakGridProps {
  data: ActivityLevel[];
  rows?: number;
  cols?: number;
}

export default function StreakGrid(props: StreakGridProps) {
  const rows = () => props.rows ?? 6;
  const cols = () => props.cols ?? 7;
  const data = () => props.data;

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

  return (
    <div class="rounded-lg bg-white p-4">
      <div
        class="grid gap-1"
        style={{
          "grid-template-columns": `repeat(${cols()}, minmax(0, 1fr))`,
        }}
      >
        <For each={data()}>
          {(level) => (
            <div
              class={`aspect-square rounded ${getActivityColor(level)}`}
              aria-label={`Activity level: ${level}`}
            />
          )}
        </For>
      </div>
    </div>
  );
}
