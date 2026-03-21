import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";

import { useFlow } from "@/app/stackflow";

import { Button, Footer } from "@/components/common";

import { useAuthStore } from "@/model/auth/useAuthStore";

import { authQueries } from "@/api/auth/api.query";
import { END_POINTS } from "@/api/config/api-endpoints";

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
        <span className="text-gray-004 mr-1 shrink-0 select-none">{"$"}</span>
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
  const code = new URLSearchParams(window.location.search).get("code");
  const state = new URLSearchParams(window.location.search).get("state");

  const { refetch, isPending } = useQuery(
    authQueries.kakaoLoginQuery(code ?? "", state ?? ""),
  );

  const handleKakaoLogin = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    window.location.assign(`${baseUrl}${END_POINTS.AUTH.LOGIN}`);
  };

  useEffect(() => {
    if (code && state) {
      refetch()
        .then((res) => {
          if (res.data) {
            setAccessToken(res.data.accessToken);
            if (res.data.isUser) {
              setIsInitialized(true);
              replace("HomePage", {}, { animate: false });
            } else {
              setIsInitialized(false);
              replace("OnboardingNamePage", {}, { animate: false });
            }
          }
        })
        .catch((error) => {
          toastError(error.message);
          replace("LoginPage", {}, { animate: false });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, refetch]);

  return (
    <AppScreen className="relative">
      <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-center">
        <div className="relative flex flex-col items-center">
          <div className="relative z-10 flex flex-col items-center">
            <LoginTerminalHello />
            <img src="/logo.svg" alt="" className="h-20" />
            <p className="text-blue-004 mt-1 font-medium">
              꾸준히 준비하는 CS 면접
            </p>
          </div>
        </div>
      </div>
      <Footer>
        <Button
          size="large"
          state="kakao"
          className="mt-40"
          onClick={handleKakaoLogin}
          disabled={!isPending}
        >
          <RiKakaoTalkFill className="mr-2" size={24} />
          카카오로 시작하기
        </Button>
      </Footer>
    </AppScreen>
  );
}
