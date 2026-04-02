import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export default function Title({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("text-lg leading-6 font-semibold text-black", className)}
    >
      {children}
    </span>
  );
}
