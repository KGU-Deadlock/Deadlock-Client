import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

const buttonVariant = cva(
  [
    "flex justify-center items-center w-full cursor-pointer border-none",
    "rounded-2xl",
  ],
  {
    variants: {
      size: {
        large: "h-[54px] text-base font-normal",
        medium: "h-11 rounded-xl text-sm font-normal",
        small: "h-8 w-fit px-3 text-sm font-normal",
      },
      state: {
        kakao: ["bg-kakao text-black text-base rounded-xl"],
        apple: ["bg-white text-black text-base rounded-xl"],
        active: ["bg-blue-003 text-white"],
        outline: ["bg-white text-blue-003 border border-blue-003"],
        disabled: ["bg-gray-002 text-gray-005 cursor-not-allowed"],
        disabled_outline: [
          "bg-white text-gray-004 border border-gray-003 cursor-not-allowed",
        ],
      },
    },
    defaultVariants: {
      size: "large",
      state: "active",
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariant>;
export type ButtonSize = ButtonVariants["size"];
export type ButtonColor = ButtonVariants["state"];

interface ButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariant> {
  width?: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function Button({
  width,
  size,
  state,
  children,
  type = "button",
  onClick,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariant({ size, state }), className)}
      style={width ? { width } : undefined}
      onClick={onClick}
      disabled={state === "disabled"}
      {...props}
    >
      {children}
    </button>
  );
}
