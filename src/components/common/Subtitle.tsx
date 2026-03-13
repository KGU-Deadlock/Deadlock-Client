import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

export default function Subtitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("text-gray-005 text-sm leading-4 font-normal", className)}
    >
      {children}
    </span>
  );
}
