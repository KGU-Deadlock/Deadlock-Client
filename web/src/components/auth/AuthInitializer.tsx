import { useStack } from "@stackflow/react";
import { useEffect, useState, type ReactNode } from "react";

import { isStackflowRoute } from "@/app/route-match";
import { useFlow } from "@/app/stackflow";

import { useAuthStore } from "@/model/auth/useAuthStore";

import { postReissueToken } from "@/api/auth/postReissueToken";

interface AuthInitializerProps {
  children: ReactNode;
}

const ONBOARDING_ACTIVITIES = new Set([
  "OnboardingNamePage",
  "OnboardingInterestPage",
  "OnboardingQuizLevelPage",
  "OnboardingCompletePage",
]);

export function AuthInitializer({ children }: AuthInitializerProps) {
  const { replace } = useFlow();
  const stack = useStack();

  const {
    accessToken,
    isInitialized,
    isLoggedOut,
    setAccessToken,
    setIsInitialized,
  } = useAuthStore();
  const [isBootstrappingAuth, setIsBootstrappingAuth] = useState(true);

  const currentActivity = stack.activities[stack.activities.length - 1]?.name;
  const isAppRoute = isStackflowRoute(window.location.pathname);

  useEffect(() => {
    if (!isAppRoute) {
      setIsBootstrappingAuth(false);
      return;
    }

    if (isLoggedOut) {
      setIsBootstrappingAuth(false);
      return;
    }

    if (accessToken) {
      setIsBootstrappingAuth(false);
      return;
    }

    let cancelled = false;
    const bootstrapAuth = async () => {
      try {
        const res = await postReissueToken();
        if (!res.ok) return;

        const token = res.data.accessToken;
        if (!token) return;

        if (cancelled) return;
        setAccessToken(token);
        setIsInitialized(Boolean(res.data.isUser));
      } finally {
        if (!cancelled) {
          setIsBootstrappingAuth(false);
        }
      }
    };

    void bootstrapAuth();

    return () => {
      cancelled = true;
    };
  }, [accessToken, isAppRoute, isLoggedOut, setAccessToken, setIsInitialized]);

  useEffect(() => {
    if (!isAppRoute) return;
    if (isBootstrappingAuth) return;

    const { accessToken: nextToken, isInitialized: nextInitialized } =
      useAuthStore.getState();

    const hasToken = Boolean(nextToken);
    if (!currentActivity) return;

    if (!hasToken) {
      if (currentActivity !== "LoginPage") {
        replace("LoginPage", {}, { animate: false });
      }
      return;
    }

    if (!nextInitialized) {
      if (!ONBOARDING_ACTIVITIES.has(currentActivity)) {
        replace("OnboardingNamePage", {}, { animate: false });
      }
      return;
    }

    if (currentActivity === "LoginPage") {
      replace("HomePage", {}, { animate: false });
    }
  }, [
    accessToken,
    currentActivity,
    isAppRoute,
    isBootstrappingAuth,
    isInitialized,
    replace,
  ]);

  if (!isAppRoute) {
    return <>{children}</>;
  }
  if (isBootstrappingAuth) return null;

  const hasToken = Boolean(accessToken);
  const target = !hasToken
    ? "LoginPage"
    : isInitialized
      ? null
      : currentActivity === "LoginPage"
        ? null
        : ONBOARDING_ACTIVITIES.has(currentActivity ?? "")
          ? null
          : "OnboardingNamePage";

  const isRedirecting = Boolean(
    target && currentActivity && currentActivity !== target,
  );
  if (isRedirecting) return null;

  return <>{children}</>;
}
