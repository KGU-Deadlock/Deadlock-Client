import { cn } from "@/utils/cn";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export default function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "border-gray-003 border-t-blue-004 size-10 animate-spin rounded-full border-4",
          className,
        )}
      />
    </div>
  );
}
