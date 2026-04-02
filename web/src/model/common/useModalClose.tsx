import { createContext, useContext } from "react";

export const ModalCloseContext = createContext<(() => void) | null>(null);

export function useModalClose() {
  const close = useContext(ModalCloseContext);
  if (close == null) {
    throw new Error("useModalClose는 Modal 안에서만 사용할 수 있습니다.");
  }
  return close;
}
