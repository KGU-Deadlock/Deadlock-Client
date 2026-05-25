import { useStack } from "@stackflow/react";
import { useEffect, useState, type ReactNode } from "react";

import { isStackflowRoute } from "@/app/route-match";
import { useFlow } from "@/app/stackflow";

import { postReissueToken } from "@/api/auth/postReissueToken";

import { AUTH_LOGOUT_EVENT, tokenStorage } from "@/utils/token";

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
  const [isBootstrappingAuth, setIsBootstrappingAuth] = useState(true);

  const currentActivity = stack.activities[stack.activities.length - 1]?.name;
  const isAppRoute = isStackflowRoute(window.location.pathname);

  // 앱 첫 진입 시 인증 초기화 (한 번만 실행)
  useEffect(() => {
    const accessToken = tokenStorage.getToken();
    const isLoggedOut = tokenStorage.getIsLoggedOut();
    const isInitialized = tokenStorage.getIsInitialized();
    const userName = tokenStorage.getUserName();

    if (!isAppRoute || isLoggedOut) {
      setIsBootstrappingAuth(false);
      return;
    }

    // localStorage에 토큰이 이미 있으면 reissue 생략
    if (accessToken) {
      setIsBootstrappingAuth(false);
      if (currentActivity === "LoginPage") {
        if (isInitialized) {
          replace("HomePage", {}, { animate: false });
        } else {
          replace(
            "OnboardingNamePage",
            { name: userName ?? "" },
            { animate: false },
          );
        }
      }
      return;
    }

    // 토큰 없으면 refreshToken 쿠키로 세션 복원 시도
    const bootstrapAuth = async () => {
      try {
        const res = await postReissueToken();
        const tokenData = res.ok ? res.data.data : null;
        const accessToken = tokenData?.accessToken;

        if (!res.ok || !accessToken) {
          if (currentActivity && currentActivity !== "LoginPage") {
            replace("LoginPage", {}, { animate: false });
          }
          return;
        }

        tokenStorage.setLoginState({
          accessToken,
          isInitialized: Boolean(tokenData.isUser),
          userName: tokenData.userData?.nickname,
        });

        if (tokenData.isUser) {
          if (currentActivity === "LoginPage") {
            replace("HomePage", {}, { animate: false });
          }
        } else {
          if (!ONBOARDING_ACTIVITIES.has(currentActivity ?? "")) {
            replace(
              "OnboardingNamePage",
              { name: tokenData.userData?.nickname ?? "" },
              { animate: false },
            );
          }
        }
      } finally {
        setIsBootstrappingAuth(false);
      }
    };

    void bootstrapAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 토큰 소멸 감지 (만료/로그아웃) → 로그인 페이지로 이동
  useEffect(() => {
    const handler = () => replace("LoginPage", {}, { animate: false });
    window.addEventListener(AUTH_LOGOUT_EVENT, handler);
    return () => window.removeEventListener(AUTH_LOGOUT_EVENT, handler);
  }, [replace]);

  if (!isAppRoute) return <>{children}</>;
  if (isBootstrappingAuth) return null;

  return <>{children}</>;
}
