import { useStack } from "@stackflow/react";
import { useEffect, type ReactNode } from "react";

import { isStackflowRoute } from "@/app/route-match";
import { useFlow } from "@/app/stackflow";

import { useAuthStore } from "@/model/auth/auth-store";

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

  const { accessToken, isInitialized } = useAuthStore();

  const currentActivity = stack.activities[stack.activities.length - 1]?.name;
  const isAppRoute = isStackflowRoute(window.location.pathname);

  useEffect(() => {
    if (!isAppRoute) return;

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
  }, [accessToken, currentActivity, isAppRoute, isInitialized, replace]);

  if (!isAppRoute) {
    return <>{children}</>;
  }

  const hasToken = Boolean(accessToken);
  const target = !hasToken
    ? "LoginPage"
    : isInitialized
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
