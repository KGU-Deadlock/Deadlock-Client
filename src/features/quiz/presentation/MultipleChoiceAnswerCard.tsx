interface MultipleChoiceAnswerCardProps {
  option: {
    id: string;
    text: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

export default function MultipleChoiceAnswerCard(
  props: MultipleChoiceAnswerCardProps
) {
  return (
    <button
      onClick={props.onClick}
      class="flex w-full items-center justify-between rounded-lg border-2 p-4 text-left transition-all"
      classList={{
        "border-blue-004 bg-blue-001": props.isSelected,
        "border-gray-003 bg-white": !props.isSelected,
      }}
      aria-label={`답변 선택: ${props.option.text}`}
    >
      <span
        class="flex-1 text-base font-medium"
        classList={{
          "text-gray-008": props.isSelected,
          "text-gray-008": !props.isSelected,
        }}
      >
        {props.option.text}
      </span>
      <div
        class="relative h-5 w-5 flex-shrink-0 rounded-full border-2"
        classList={{
          "border-blue-004 bg-blue-004": props.isSelected,
          "border-gray-003": !props.isSelected,
        }}
      >
        {props.isSelected && (
          <div class="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        )}
      </div>
    </button>
  );
}
