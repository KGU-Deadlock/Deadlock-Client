import { createMemo, JSX } from "solid-js";
import { cn } from "~/shared/utils/cn";

export interface ButtonProps {
  variant?: "default" | "disabled" | "select";
  size?: "medium" | "large";
  disabled?: boolean;
  children?: JSX.Element;
  onClick?: (e: MouseEvent) => void;
  className?: string;
  [key: string]: any;
}

export default function Button(props: ButtonProps) {
  const variant = () => props.variant ?? "default";
  const size = () => props.size ?? "medium";
  const isDisabled = () => props.disabled ?? false;

  const classList = createMemo(() => ({
    "bg-blue-004 text-white": variant() === "default",
    "bg-gray-100 text-gray-400 cursor-not-allowed": variant() === "disabled",
    "border border-gray-003": variant() === "select",
    "rounded-[8px] text-base h-[52px]": size() === "medium",
    "rounded-[12px] text-lg font-semibold h-[52px]": size() === "large",
  }));

  return (
    <button
      {...props}
      class={cn(
        "transition-colors hover:brightness-95 focus:outline-none",
        props.className,
      )}
      classList={classList()}
      disabled={isDisabled() || variant() === "disabled"}
      onClick={props.onClick as any}
    >
      {props.children || "Button"}
    </button>
  );
}
