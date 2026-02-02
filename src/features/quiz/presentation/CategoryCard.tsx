import type { Category } from "../domain/types";

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}

export default function CategoryCard(props: CategoryCardProps) {
  return (
    <button
      onClick={props.onClick}
      class="flex items-center justify-center rounded-lg border-2 p-4 text-center transition-all"
      classList={{
        "border-blue-004 bg-blue-001 text-blue-004": props.isSelected,
        "border-gray-003 bg-white text-gray-008": !props.isSelected,
      }}
      aria-label={`${props.category.name} 선택`}
      aria-pressed={props.isSelected}
    >
      <span class="text-base font-medium">{props.category.name}</span>
    </button>
  );
}
