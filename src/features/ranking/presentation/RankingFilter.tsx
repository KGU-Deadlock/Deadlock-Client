import { createSignal, onCleanup, onMount, Show } from "solid-js";
import ChevronDownIcon from "~/shared/components/icons/ChevronDownIcon";
import type { RankingFilter } from "../domain/types";

interface RankingFilterProps {
  value: RankingFilter;
  onChange?: (filter: RankingFilter) => void;
}

const filterOptions: Array<{ value: RankingFilter; label: string }> = [
  { value: "all", label: "전체" },
  { value: "backend", label: "백엔드" },
  { value: "frontend", label: "프론트엔드" },
  { value: "data", label: "데이터" },
];

export default function RankingFilterComponent(props: RankingFilterProps) {
  let containerRef: HTMLDivElement | undefined;
  const [isOpen, setIsOpen] = createSignal(false);

  const currentLabel = () => {
    return (
      filterOptions.find((opt) => opt.value === props.value)?.label ?? "전체"
    );
  };

  const handleToggle = () => {
    setIsOpen(!isOpen());
  };

  const handleSelect = (filter: RankingFilter) => {
    props.onChange?.(filter);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef && !containerRef.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  onMount(() => {
    if (typeof document !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
    }
  });

  onCleanup(() => {
    if (typeof document !== "undefined") {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  });

  return (
    <div class="relative" ref={containerRef}>
      <button
        onClick={handleToggle}
        class="text-gray-008 flex items-center gap-1 text-sm"
        aria-label="필터 선택"
        aria-expanded={isOpen()}
      >
        <span>{currentLabel()}</span>
        <ChevronDownIcon />
      </button>
      <Show when={isOpen()}>
        <div class="border-gray-003 absolute top-full right-0 z-10 mt-2 w-32 rounded-lg border bg-white shadow-lg">
          {filterOptions.map((option) => (
            <button
              onClick={() => handleSelect(option.value)}
              class="text-gray-008 hover:bg-gray-002 w-full px-4 py-2 text-left text-sm first:rounded-t-lg last:rounded-b-lg"
              classList={{
                "bg-blue-001 text-blue-004": props.value === option.value,
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </Show>
    </div>
  );
}
