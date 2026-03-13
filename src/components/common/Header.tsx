import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

const header = cva(
  [
    "grid w-full h-14 shrink-0 border-none",
    "py-2.5 pl-5 pr-5",
    "grid-cols-[1fr_3fr_1fr]",
  ],
  {
    variants: {
      color: {
        default: "bg-transparent",
        sub: "bg-gray-002",
      },
      sticky: {
        true: "sticky top-0 left-0 z-10",
        false: "",
      },
    },
    defaultVariants: {
      color: "default",
      sticky: false,
    },
  },
);

const headerLeft = "flex justify-start items-center flex-nowrap";
const headerCenter =
  "flex justify-center items-center flex-nowrap text-base font-normal";
const headerRight = "flex justify-end items-center flex-nowrap";

type HeaderVariants = VariantProps<typeof header>;

interface HeaderProps
  extends
    Omit<HTMLAttributes<HTMLElement>, keyof HeaderVariants>,
    HeaderVariants {
  width?: string;
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

export default function Header({
  width,
  left,
  center,
  right,
  sticky,
  className,
  color,
  ...props
}: HeaderProps) {
  return (
    <header
      className={cn(header({ sticky, color }), className)}
      style={width ? { width } : undefined}
      {...props}
    >
      <div className={headerLeft}>{left}</div>
      <div className={headerCenter}>{center}</div>
      <div className={headerRight}>{right}</div>
    </header>
  );
}
