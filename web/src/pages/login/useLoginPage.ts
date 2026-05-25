import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import { useFlow } from "@/app/stackflow";

import { useAuthStore } from "@/model/auth/useAuthStore";

import { authQueries } from "@/api/auth/api.query";

import { toastError, toastSuccess } from "@/utils/toast";

export function useLoginPage() {
  const { replace } = useFlow();
  const { accessToken, isInitialized, setAccessToken, setIsInitialized } =
    useAuthStore();

  const [isProcessingCode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.has("code");
  });

  const [isKakaoReady, setIsKakaoReady] = useState(() => {
    if (window.Kakao) return true;
    const script = document.querySelector('script[src*="kakao"]');
    if (!script) return true;
    return false;
  });

  // 로그인 성공 후 store가 실제로 채워지면 navigate
  const pendingNavigate = useRef(false);
  useEffect(() => {
    if (!pendingNavigate.current || !accessToken) return;
    pendingNavigate.current = false;
    if (isInitialized) {
      replace("HomePage", {}, { animate: false });
    } else {
      replace("OnboardingNamePage", {}, { animate: false });
    }
  }, [accessToken, isInitialized, replace]);

  useEffect(() => {
    if (isKakaoReady) return;
    const script = document.querySelector<HTMLScriptElement>(
      'script[src*="kakao"]',
    );
    if (!script) return;
    const onLoad = () => setIsKakaoReady(true);
    script.addEventListener("load", onLoad);
    return () => script.removeEventListener("load", onLoad);
  }, [isKakaoReady]);

  const handleLoginSuccess = (token: string, isUser?: boolean) => {
    toastSuccess("로그인에 성공했어요");
    setAccessToken(token);
    setIsInitialized(Boolean(isUser));
    pendingNavigate.current = true;
  };

  const { mutateAsync: loginWithKakao, isPending: isKakaoPending } =
    useMutation(authQueries.kakaoLoginMutation());

  const { refetch: fetchDevToken, isFetching: isDevPending } = useQuery({
    ...authQueries.getDevTokenQuery(),
  });

  // 카카오 리다이렉트 복귀 시 URL의 code 파라미터로 로그인
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) return;
    window.history.replaceState({}, "", window.location.pathname);
    loginWithKakao(code)
      .then((data) => handleLoginSuccess(data.accessToken!, data.isUser))
      .catch((error: Error) => toastError(error.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKakaoLogin = () => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JS_APP_KEY);
    }
    window.Kakao.Auth.authorize({
      redirectUri: `${window.location.origin}/login`,
    });
  };

  const handleDevLogin = async () => {
    const { data, error } = await fetchDevToken();
    if (error) {
      toastError(error.message);
      return;
    }
    handleLoginSuccess(data!.data!.accessToken!, data!.data!.isUser);
  };

  const isPending = isKakaoPending || isDevPending || isProcessingCode;

  return {
    isKakaoReady,
    isPending,
    isDevPending,
    handleKakaoLogin,
    handleDevLogin,
  };
}
