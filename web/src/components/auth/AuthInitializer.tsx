// import { useStack } from "@stackflow/react";
import { type ReactNode } from "react";

// import { isStackflowRoute } from "@/app/route-match";
// import { useFlow } from "@/app/stackflow";

// import { useAuthStore } from "@/model/auth/useAuthStore";

// import { postReissueToken } from "@/api/auth/postReissueToken";

interface AuthInitializerProps {
  children: ReactNode;
}

// const ONBOARDING_ACTIVITIES = new Set([
//   "OnboardingNamePage",
//   "OnboardingInterestPage",
//   "OnboardingQuizLevelPage",
//   "OnboardingCompletePage",
// ]);

export function AuthInitializer({ children }: AuthInitializerProps) {
  // const { replace } = useFlow();
  // const stack = useStack();

  // const {
  //   accessToken,
  //   isInitialized,
  //   isLoggedOut,
  //   userName,
  //   setAccessToken,
  //   setIsInitialized,
  // } = useAuthStore();
  // const [isBootstrappingAuth, setIsBootstrappingAuth] = useState(true);

  // const currentActivity = stack.activities[stack.activities.length - 1]?.name;
  // const isAppRoute = isStackflowRoute(window.location.pathname);

  // // 앱 초기화 시 refresh token 쿠키로 세션 복원
  // useEffect(() => {
  //   if (!isAppRoute || isLoggedOut) {
  //     setIsBootstrappingAuth(false);
  //     return;
  //   }

  //   if (accessToken) {
  //     setIsBootstrappingAuth(false);
  //     return;
  //   }

  //   let cancelled = false;
  //   const bootstrapAuth = async () => {
  //     try {
  //       const res = await postReissueToken();
  //       if (!res.ok || !res.data.accessToken) return;
  //       if (cancelled) return;
  //       setAccessToken(res.data.accessToken);
  //       setIsInitialized(Boolean(res.data.isUser));
  //     } finally {
  //       if (!cancelled) setIsBootstrappingAuth(false);
  //     }
  //   };

  //   void bootstrapAuth();
  //   return () => {
  //     cancelled = true;
  //   };
  // }, [accessToken, isAppRoute, isLoggedOut, setAccessToken, setIsInitialized]);

  // useEffect(() => {
  //   if (!isAppRoute || isBootstrappingAuth || !currentActivity) return;

  //   if (!accessToken) {
  //     if (currentActivity !== "LoginPage") {
  //       replace("LoginPage", {}, { animate: false });
  //     }
  //     return;
  //   }

  //   if (!isInitialized) {
  //     if (!ONBOARDING_ACTIVITIES.has(currentActivity)) {
  //       replace(
  //         "OnboardingNamePage",
  //         { name: userName ?? "" },
  //         { animate: false },
  //       );
  //     }
  //     return;
  //   }

  //   if (currentActivity === "LoginPage") {
  //     replace("HomePage", {}, { animate: false });
  //   }
  // }, [
  //   accessToken,
  //   currentActivity,
  //   isAppRoute,
  //   isBootstrappingAuth,
  //   isInitialized,
  //   userName,
  //   replace,
  // ]);

  // if (!isAppRoute) return <>{children}</>;
  // if (isBootstrappingAuth) return null;

  // const hasToken = Boolean(accessToken);

  // if (!hasToken && currentActivity !== "LoginPage") return null;

  // if (
  //   hasToken &&
  //   !isInitialized &&
  //   currentActivity !== "LoginPage" &&
  //   !ONBOARDING_ACTIVITIES.has(currentActivity ?? "")
  // ) {
  //   return null;
  // }

  return <>{children}</>;
}
