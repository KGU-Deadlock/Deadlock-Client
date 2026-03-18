import { useFlow } from "@/app/stackflow";
import { useStack } from "@stackflow/react";
import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "@/model/auth/auth-store";

interface AuthInitializerProps {
  children: ReactNode;
}

export function AuthInitializer({ children }: AuthInitializerProps) {
  const { replace } = useFlow();
  const stack = useStack();

  const { accessToken, isInitialized } = useAuthStore();

  const currentActivity = stack.activities[stack.activities.length - 1]?.name;

  useEffect(() => {
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
      if (currentActivity !== "OnboardingNamePage") {
        replace("OnboardingNamePage", {}, { animate: false });
      }
      return;
    }

    if (currentActivity === "LoginPage") {
      replace("HomePage", {}, { animate: false });
    }
  }, [accessToken, currentActivity, isInitialized, replace]);

  const hasToken = Boolean(accessToken);
  const target = !hasToken
    ? "LoginPage"
    : isInitialized
      ? null
      : "OnboardingNamePage";

  const isRedirecting = Boolean(
    target && currentActivity && currentActivity !== target,
  );
  if (isRedirecting) return null;

  return <>{children}</>;
}
