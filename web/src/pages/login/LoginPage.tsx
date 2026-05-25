import { AppScreen } from "@stackflow/plugin-basic-ui";
import { motion } from "motion/react";
import { RiKakaoTalkFill } from "react-icons/ri";

import { Button } from "@/components/common";

import { LoginTerminalHello } from "./LoginTerminalHello";
import { useLoginPage } from "./useLoginPage";

export default function LoginPage() {
  const { isKakaoReady, isPending, isDevPending, handleKakaoLogin } =
    useLoginPage();

  const isButtonDisabled = isPending || !isKakaoReady;

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

        <div className="px-gutter relative z-10 w-full pb-10">
          <Button
            size="large"
            state={isButtonDisabled ? "disabled" : "kakao"}
            className="w-full"
            onClick={handleKakaoLogin}
            disabled={isButtonDisabled}
          >
            {isPending && !isDevPending ? (
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
