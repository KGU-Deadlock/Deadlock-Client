import { useEffect, useState } from "react";

import { AUTH_LOGOUT_EVENT, tokenStorage } from "@/utils/token";

export function useIsLoggedOut(): boolean {
  const [isLoggedOut, setIsLoggedOut] = useState(() =>
    tokenStorage.getIsLoggedOut(),
  );

  useEffect(() => {
    const handler = () => setIsLoggedOut(tokenStorage.getIsLoggedOut());
    window.addEventListener(AUTH_LOGOUT_EVENT, handler);
    return () => window.removeEventListener(AUTH_LOGOUT_EVENT, handler);
  }, []);

  return isLoggedOut;
}
