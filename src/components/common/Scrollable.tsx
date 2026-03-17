import { cn } from "@/utils/cn";
import type { HTMLAttributes, ReactNode } from "react";

interface ScrollableProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Scrollable({
  children,
  className,
  ...props
}: ScrollableProps) {
  return (
    <div
      className={cn(
        "scrollbar-hide flex h-screen w-full flex-col overflow-y-auto",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
