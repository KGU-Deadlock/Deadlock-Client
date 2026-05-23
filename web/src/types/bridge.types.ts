import type { BridgeStore } from "@webview-bridge/web";

export interface AppBridgeState {
  isLoggedIn: boolean;
}

export interface AppBridgeMethods {
  logout: () => Promise<void>;
  kakaoLogin: () => Promise<{
    status: "success" | "error";
    code?: string;
    errorMessage?: string;
  }>;
  startRecording: () => Promise<{
    status: "success" | "error";
    errorMessage?: string;
  }>;
  stopRecording: () => Promise<{
    status: "success" | "error";
    text?: string;
    errorMessage?: string;
  }>;
}

export type AppBridgeSpec = AppBridgeState &
  AppBridgeMethods & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
export type AppBridge = BridgeStore<AppBridgeSpec>;
