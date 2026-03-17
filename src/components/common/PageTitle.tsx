import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

export default function Title({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "px-gutter mt-10 flex flex-col items-start justify-start gap-0.5 text-xl font-semibold text-black",
        className,
      )}
    >
      {children}
    </div>
  );
}
