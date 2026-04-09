import { bridge } from "@webview-bridge/react-native";
import type { Bridge } from "@webview-bridge/react-native";
import { Share } from "react-native";
import { startRecording, stopRecording } from "./audioRecorder";

interface AppBridgeType extends Bridge {
  isLoggedIn: boolean;
  logout: () => Promise<void>;
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

export const appBridge = bridge<AppBridgeType>((store) => ({
  isLoggedIn: false,

  logout: async () => {
    store.set({ isLoggedIn: false });
  },

  startRecording: async () => {
    try {
      await startRecording();
      return { status: "success" };
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다.";
      return { status: "error", errorMessage };
    }
  },

  stopRecording: async () => {
    try {
      const text = await stopRecording();
      return { status: "success", text };
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다.";
      return { status: "error", errorMessage };
    }
  },
}));

export type AppBridge = typeof appBridge;
