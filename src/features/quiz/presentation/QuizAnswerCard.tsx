import TrueIcon from "~/shared/components/icons/TrueIcon";
import FalseIcon from "~/shared/components/icons/FalseIcon";

interface QuizAnswerCardProps {
  type: "true" | "false";
  isSelected: boolean;
  onClick: () => void;
}

export default function QuizAnswerCard(props: QuizAnswerCardProps) {
  return (
    <button
      onClick={props.onClick}
      class="flex flex-1 flex-col items-center justify-center gap-4 rounded-lg border-2 p-8 transition-all"
      classList={{
        "border-blue-004 bg-blue-001": props.isSelected,
        "border-gray-003 bg-white": !props.isSelected,
      }}
      aria-label={props.type === "true" ? "맞음" : "틀림"}
    >
      {props.type === "true" ? (
        <TrueIcon isSelected={props.isSelected} />
      ) : (
        <FalseIcon isSelected={props.isSelected} />
      )}
      <div
        class="h-4 w-4 rounded-full border-2"
        classList={{
          "border-blue-004 bg-blue-004": props.isSelected,
          "border-gray-003": !props.isSelected,
        }}
      />
    </button>
  );
}
