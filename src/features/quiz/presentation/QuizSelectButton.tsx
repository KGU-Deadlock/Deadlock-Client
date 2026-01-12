import { createEffect, createSignal } from "solid-js";
import { SubTitle, Title } from "~/shared/components";

interface QuizSelectButtonProps {
  icon: string;
  title: string;
  subtitle: string | any;
  isSelected?: () => boolean;
  onClick?: () => void;
}

export default function QuizSelectButton({
  icon,
  title,
  subtitle,
  isSelected = () => false,
  onClick,
}: QuizSelectButtonProps) {
  const [active, setActive] = createSignal(isSelected());

  createEffect(() => {
    const selected = isSelected();
    setActive(selected);
  });

  const handleClick = () => {
    onClick?.();
  };

  return (
    <button
      class="grid h-[20vh] place-items-center rounded-[8px] border focus:outline-none"
      classList={{
        "border-blue-004 bg-blue-004/6 text-blue-004": active(),
        "border-gray-003": !active(),
      }}
      onClick={handleClick}
    >
      <div class="flex items-center gap-6">
        <span class="font-tossface text-[54px]">{icon}</span>
        <div class="flex flex-col items-start text-start">
          <Title>{title}</Title>
          <SubTitle>{subtitle}</SubTitle>
        </div>
      </div>
    </button>
  );
}
