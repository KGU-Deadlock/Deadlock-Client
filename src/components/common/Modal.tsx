import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { ModalCloseContext } from "@/model/common";

import { cn } from "@/utils/cn";

const MODAL_TRANSITION_MS = 300;

export interface ModalProps {
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  panelClassName?: string;
}

export default function Modal({
  onClose,
  title,
  children,
  footer,
  panelClassName,
}: ModalProps) {
  const [visible, setVisible] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const requestClose = useCallback(() => {
    if (closeTimeoutRef.current != null) return;
    setVisible(false);
    closeTimeoutRef.current = setTimeout(() => {
      closeTimeoutRef.current = null;
      onClose();
    }, MODAL_TRANSITION_MS);
  }, [onClose]);

  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => {
      setVisible(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current != null) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible, requestClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <ModalCloseContext.Provider value={requestClose}>
      <div
        className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
        role="presentation"
      >
        <button
          type="button"
          className={cn(
            "absolute inset-0 bg-black/45 transition-opacity duration-300 ease-out",
            visible ? "opacity-100" : "opacity-0",
            visible ? "cursor-pointer" : "pointer-events-none",
          )}
          aria-label="모달 닫기"
          onClick={requestClose}
        />
        <div
          role="dialog"
          aria-modal="true"
          className={cn(
            "relative z-10 flex max-h-[min(90dvh,720px)] w-full max-w-lg flex-col rounded-t-2xl bg-white shadow-lg will-change-[transform,opacity] sm:rounded-2xl",
            "transform transition-opacity transition-transform duration-300 ease-out",
            visible
              ? "translate-y-0 opacity-100 sm:translate-y-0 sm:scale-100"
              : "translate-y-full opacity-0 sm:translate-y-10 sm:scale-[0.96]",
            !visible && "pointer-events-none",
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
      </div>
    </ModalCloseContext.Provider>,
    document.body,
  );
}
