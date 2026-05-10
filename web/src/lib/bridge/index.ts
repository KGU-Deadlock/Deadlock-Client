import { linkBridge } from "@webview-bridge/web";

import type { AppBridge } from "@/types/bridge.types";

export const bridge = linkBridge<AppBridge>({
  initialBridge: {
    isLoggedIn: false,
    // Native Bridge가 준비되기 전 호출되면 즉시 error를 반환합니다.
    kakaoLogin: async () => ({
      status: "error" as const,
      errorMessage: "Native Bridge가 연결되지 않았습니다.",
    }),
    startRecording: async () => ({
      status: "error" as const,
      errorMessage: "Native Bridge가 연결되지 않았습니다.",
    }),
    stopRecording: async () => ({
      status: "error" as const,
      errorMessage: "Native Bridge가 연결되지 않았습니다.",
    }),
  },
  timeout: 1000 * 60 * 10,
});
