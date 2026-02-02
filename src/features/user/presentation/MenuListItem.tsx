import { Component, Show } from "solid-js";
import ChevronRightIcon from "~/shared/components/icons/ChevronRightIcon";

interface MenuListItemProps {
  icon?: Component;
  label: string;
  onClick?: () => void;
}

export default function MenuListItem(props: MenuListItemProps) {
  const handleClick = () => {
    props.onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      class="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-002 active:bg-gray-003"
      aria-label={props.label}
    >
      <Show when={props.icon}>
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-002">
          {props.icon && <props.icon />}
        </div>
      </Show>
      <span class="flex-1 text-base font-medium text-gray-008">
        {props.label}
      </span>
      <ChevronRightIcon />
    </button>
  );
}
