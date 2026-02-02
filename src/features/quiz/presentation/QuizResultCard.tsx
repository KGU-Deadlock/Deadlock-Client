import { createSignal, Show } from "solid-js";
import CheckIcon from "~/shared/components/icons/CheckIcon";
import XIcon from "~/shared/components/icons/XIcon";
import ChevronDownIcon from "~/shared/components/icons/ChevronDownIcon";
import type { QuestionType } from "../../domain/types";

interface QuizResultCardProps {
  questionNumber: number;
  questionType: QuestionType;
  question: string;
  isCorrect: boolean;
  explanation?: string;
}

export default function QuizResultCard(props: QuizResultCardProps) {
  const [isExplanationOpen, setIsExplanationOpen] = createSignal(false);

  const getQuestionTypeLabel = (type: QuestionType): string => {
    switch (type) {
      case "ox":
        return "OX";
      case "multiple-choice":
        return "객관식";
      case "subjective":
        return "주관식";
      default:
        return "";
    }
  };

  const handleToggleExplanation = () => {
    setIsExplanationOpen(!isExplanationOpen());
  };

  return (
    <div class="rounded-lg border border-gray-003 bg-gray-001 p-4">
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1">
          <div class="mb-2 flex items-center gap-2">
            <span class="text-sm font-medium text-gray-006">
              문제 {props.questionNumber} ({getQuestionTypeLabel(props.questionType)})
            </span>
          </div>
          <p class="mb-3 text-base font-bold text-gray-008">{props.question}</p>
          <Show when={props.explanation}>
            <button
              onClick={handleToggleExplanation}
              class="flex items-center gap-1 text-sm text-gray-005 hover:text-gray-008"
            >
              <span>설명 보기</span>
              <div
                class="transition-transform"
                classList={{
                  "rotate-180": isExplanationOpen(),
                }}
              >
                <ChevronDownIcon />
              </div>
            </button>
            <Show when={isExplanationOpen()}>
              <div class="mt-3 rounded-lg bg-white p-3 text-sm text-gray-006">
                {props.explanation}
              </div>
            </Show>
          </Show>
        </div>
        <div class="flex-shrink-0">
          {props.isCorrect ? <CheckIcon /> : <XIcon />}
        </div>
      </div>
    </div>
  );
}
