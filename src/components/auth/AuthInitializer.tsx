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

  const { isInitialized } = useAuthStore();

  const currentActivity = stack.activities[stack.activities.length - 1]?.name;

  useEffect(() => {
    const target = isInitialized ? "HomePage" : "OnboardingNamePage";
    if (currentActivity && currentActivity !== target) {
      replace(target, {}, { animate: false });
    }
  }, [currentActivity, isInitialized, replace]);

  const target = isInitialized ? "HomePage" : "OnboardingNamePage";
  const isRedirecting = currentActivity && currentActivity !== target;
  if (isRedirecting) return null;

  return <>{children}</>;
}
