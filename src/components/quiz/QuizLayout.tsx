import { AppScreen } from "@stackflow/plugin-basic-ui";
import type { ReactNode } from "react";

import { BackButton, Header } from "@/components/common";

import QuizProgressBar from "./QuizProgressBar";

interface QuizLayoutProps {
  current: number;
  total: number;
  children: ReactNode;
  footer?: ReactNode;
}

export default function QuizLayout({
  current,
  total,
  children,
  footer,
}: QuizLayoutProps) {
  return (
    <AppScreen className="relative">
      <Header left={<BackButton />} />
      <div className="px-gutter mt-header">
        <QuizProgressBar current={current} total={total} />
      </div>
      <div className="px-gutter mt-12 flex flex-col gap-6 text-sm">
        {children}
      </div>
      {footer}
    </AppScreen>
  );
}
