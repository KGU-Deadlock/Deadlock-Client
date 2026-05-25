import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useFlow } from "@/app/stackflow";

import { useAuthStore } from "@/model/auth/useAuthStore";

import { authQueries } from "@/api/auth/api.query";

import { toastError, toastSuccess } from "@/utils/toast";

export function useLoginPage() {
  const { replace } = useFlow();
  const { setLoginState } = useAuthStore();

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

  const handleLoginSuccess = (
    accessToken: string,
    isUser?: boolean,
    nickname?: string,
  ) => {
    toastSuccess("로그인에 성공했어요");
    setLoginState({
      accessToken,
      isInitialized: Boolean(isUser),
      userName: nickname,
    });
    if (isUser) {
      replace("HomePage", {}, { animate: false });
    } else {
      replace(
        "OnboardingNamePage",
        { name: nickname ?? "" },
        { animate: false },
      );
    }
  };

  const { mutateAsync: loginWithKakao, isPending: isKakaoPending } =
    useMutation(authQueries.kakaoLoginMutation());

  const { refetch: fetchDevToken, isFetching: isDevPending } = useQuery({
    ...authQueries.getDevTokenQuery(),
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) return;
    loginWithKakao(code)
      .then((data) =>
        handleLoginSuccess(
          data.accessToken!,
          data.isUser,
          data.userData?.nickname,
        ),
      )
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
