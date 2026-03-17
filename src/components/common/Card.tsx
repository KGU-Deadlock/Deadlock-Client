import { cn } from "@/utils/cn";
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn("p-gutter rounded-3xl", className)} {...props}>
      {children}
    </div>
  );
}
