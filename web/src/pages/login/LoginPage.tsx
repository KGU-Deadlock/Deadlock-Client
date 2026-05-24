import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useMutation } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";

import { useFlow } from "@/app/stackflow";

import { Button } from "@/components/common";

import { useAuthStore } from "@/model/auth/useAuthStore";

import { authQueries } from "@/api/auth/api.query";

import { toastError } from "@/utils/toast";

const TERMINAL_LINE = "hello!";

function LoginTerminalHello() {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      while (!cancelled) {
        for (let i = 0; i <= TERMINAL_LINE.length; i++) {
          if (cancelled) return;
          setDisplay(TERMINAL_LINE.slice(0, i));
          await new Promise((r) => setTimeout(r, 95));
        }
        await new Promise((r) => setTimeout(r, 1600));
        for (let i = TERMINAL_LINE.length; i >= 0; i--) {
          if (cancelled) return;
          setDisplay(TERMINAL_LINE.slice(0, i));
          await new Promise((r) => setTimeout(r, 42));
        }
        await new Promise((r) => setTimeout(r, 700));
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="h-fit w-max max-w-[min(92vw,240px)] px-3 py-1 font-mono text-sm"
      aria-hidden
    >
      <div className="text-blue-004 flex min-h-5 items-center gap-0.5 whitespace-nowrap">
        <span className="text-blue-003 mr-1 shrink-0 select-none">{"$"}</span>
        <span className="h-[1.5em] shrink-0 text-lg">{display}</span>
        <motion.span
          className="bg-blue-004 inline-block h-[1.5em] w-1 shrink-0"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{
            duration: 0.85,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}

export default function LoginPage() {
  const { replace } = useFlow();
  const { setAccessToken, setIsInitialized } = useAuthStore();

  // URL에 code가 있으면 리다이렉트 복귀 상태 → 즉시 로딩으로 표시
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

  const { mutate, isPending } = useMutation({
    ...authQueries.kakaoLoginMutation(),
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      if (data.isUser) {
        setIsInitialized(true);
        replace("HomePage", {}, { animate: false });
      } else {
        setIsInitialized(false);
        replace(
          "OnboardingNamePage",
          { name: data.userData?.nickname },
          { animate: false },
        );
      }
    },
    onError: (error) => {
      toastError(error.message);
    },
  });

  // 카카오 리다이렉트 복귀 시 URL의 code 파라미터로 로그인
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) return;
    window.history.replaceState({}, "", window.location.pathname);
    mutate(code);
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

  const isButtonDisabled = isPending || isProcessingCode || !isKakaoReady;

  return (
    <AppScreen className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 flex flex-col overflow-hidden bg-white">
        <div className="login-hero-gradient absolute inset-0 z-0" aria-hidden />
        <div className="login-hero-grid absolute inset-0 z-0" aria-hidden />
        <motion.div
          className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_62%_52%_at_50%_40%,rgba(77,143,230,0.11),transparent_68%)]"
          animate={{ opacity: [0.55, 0.92, 0.55] }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden
        />
        <div
          className="login-hero-scan pointer-events-none absolute inset-0 z-0 opacity-40"
          aria-hidden
        />

        <div className="px-gutter relative z-10 flex flex-1 flex-col items-center justify-center">
          <LoginTerminalHello />
          <img
            src="/logo.svg"
            alt=""
            className="h-20 drop-shadow-[0_2px_14px_rgba(9,49,124,0.08)]"
          />
          <p className="text-blue-004 mt-1 text-center font-medium">
            꾸준히 준비하는 CS 면접
          </p>
        </div>

        <div className="px-gutter relative z-10 pb-10 w-full">
          <Button
            size="large"
            state={isButtonDisabled ? "disabled" : "kakao"}
            className="w-full"
            onClick={handleKakaoLogin}
            disabled={isButtonDisabled}
          >
            {!isKakaoReady || isProcessingCode || isPending ? (
              <span className="flex items-center gap-2">
                <span className="border-gray-004 h-5 w-5 animate-spin rounded-full border-2 border-t-transparent" />
                로딩 중...
              </span>
            ) : (
              <>
                <RiKakaoTalkFill className="mr-2" size={24} />
                카카오로 시작하기
              </>
            )}
          </Button>
        </div>
      </div>
    </AppScreen>
  );
}
