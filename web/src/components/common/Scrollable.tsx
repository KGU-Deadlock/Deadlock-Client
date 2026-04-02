import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

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
