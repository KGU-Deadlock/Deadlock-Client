import type { ReactNode } from "react";

export default function Footer({ children }: { children: ReactNode }) {
  return (
    <div className="px-gutter bottom-footer absolute right-0 left-0 justify-end">
      {children}
    </div>
  );
}
