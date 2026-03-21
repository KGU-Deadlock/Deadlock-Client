import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/utils/cn";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  panelClassName?: string;
}

/**
 * 화면 전체 오버레이 모달. `document.body`로 포털 렌더링.
 */
export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  panelClassName,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/45"
        aria-label="모달 닫기"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-10 flex max-h-[min(90dvh,720px)] w-full max-w-lg flex-col rounded-t-2xl bg-white shadow-lg sm:rounded-2xl",
          panelClassName,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {title != null && (
          <div className="border-gray-002 px-gutter shrink-0 border-b py-4">
            {typeof title === "string" ? (
              <h2 className="text-lg font-bold text-black">{title}</h2>
            ) : (
              title
            )}
          </div>
        )}
        <div className="px-gutter min-h-0 flex-1 overflow-y-auto py-4">
          {children}
        </div>
        {footer != null && (
          <div className="border-gray-002 px-gutter shrink-0 border-t py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
