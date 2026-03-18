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
    const hasToken = Boolean(accessToken);

    const target = hasToken
      ? isInitialized
        ? "HomePage"
        : "OnboardingNamePage"
      : "LoginPage";

    if (currentActivity && currentActivity !== target) {
      replace(target, {}, { animate: false });
    }
  }, [accessToken, currentActivity, isInitialized, replace]);

  const hasToken = Boolean(accessToken);
  const target = hasToken
    ? isInitialized
      ? "HomePage"
      : "OnboardingNamePage"
    : "LoginPage";

  const isRedirecting = currentActivity && currentActivity !== target;
  if (isRedirecting) return null;

  return <>{children}</>;
}
