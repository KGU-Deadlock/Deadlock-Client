import { createSignal, For } from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import Button from "~/shared/components/Button";
import Header from "~/shared/components/Header";
import CategoryCard from "./CategoryCard";
import type { Category, QuizMode } from "../domain/types";

interface CategorySelectionPageProps {
  categories?: Category[];
}

export default function CategorySelectionPage(
  props: CategorySelectionPageProps,
) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams<{ mode?: QuizMode }>();
  const mode = (): QuizMode => searchParams.mode ?? "normal";

  // TODO: 실제 API 연동 시 createResource로 변경
  const [categories] = createSignal<Category[]>(
    props.categories ?? [
      { id: "frontend", name: "프론트엔드" },
      { id: "backend", name: "백엔드" },
      { id: "infra", name: "인프라" },
      { id: "algorithm", name: "알고리즘" },
      { id: "data-structure", name: "자료구조" },
      { id: "ai", name: "AI" },
      { id: "database", name: "데이터베이스" },
      { id: "network", name: "네트워크" },
    ],
  );

  const [selectedCategoryIds, setSelectedCategoryIds] = createSignal<
    Set<string>
  >(new Set());

  const handleCategoryToggle = (categoryId: string) => {
    const current = selectedCategoryIds();
    const newSet = new Set(current);
    if (newSet.has(categoryId)) {
      newSet.delete(categoryId);
    } else {
      newSet.add(categoryId);
    }
    setSelectedCategoryIds(newSet);
  };

  const handleContinue = () => {
    const selected = Array.from(selectedCategoryIds());
    if (selected.length === 0) return;

    const currentMode = mode();
    if (currentMode === "normal") {
      navigate(`/quiz/normal?categories=${selected.join(",")}`);
    } else {
      navigate(`/quiz/voice?categories=${selected.join(",")}`);
    }
  };

  const hasSelectedCategories = () => selectedCategoryIds().size > 0;

  return (
    <main class="mx-auto flex min-h-screen max-w-[500px] flex-col bg-white">
      <Header />
      <div class="flex flex-1 flex-col px-4 py-6">
        <div class="mb-6">
          <h1 class="mb-2 text-2xl font-bold">
            <span class="text-blue-004">오늘 공부할 분야를</span>
            <br />
            선택해주세요
          </h1>
          <p class="text-gray-005 text-sm">관심 분야</p>
        </div>

        {/* Category Grid */}
        <div class="mb-6 grid grid-cols-2 gap-3">
          <For each={categories()}>
            {(category) => (
              <CategoryCard
                category={category}
                isSelected={selectedCategoryIds().has(category.id)}
                onClick={() => handleCategoryToggle(category.id)}
              />
            )}
          </For>
        </div>
      </div>

      {/* Bottom Button */}
      <div class="p-4">
        <Button
          variant={hasSelectedCategories() ? "default" : "disabled"}
          size="large"
          onClick={handleContinue}
          className="w-full"
        >
          계속
        </Button>
      </div>
    </main>
  );
}
