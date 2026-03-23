type WindowWithBridge = Window & {
  ReactNativeWebView?: { postMessage: (data: string) => void };
  webkit?: {
    messageHandlers?: Record<string, { postMessage: (data: unknown) => void }>;
  };
};

export type BridgeMicPermissionType =
  | "MIC_PERMISSION_GRANTED"
  | "MIC_PERMISSION_DENIED";

export function isMobileEnvironmentByUA(): boolean {
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  return /Android|iPhone|iPad|iPod/i.test(ua);
}

export function requestMicPermissionViaBridge(
  timeoutMs = 7000,
): Promise<boolean> {
  const win = window as WindowWithBridge;

  return new Promise<boolean>((resolve, reject) => {
    const payload = JSON.stringify({ type: "REQUEST_MIC_PERMISSION" });

    const timeoutId = window.setTimeout(() => {
      reject(new Error("마이크 권한 요청이 시간 초과했어요."));
    }, timeoutMs);

    const cleanup = () => {
      clearTimeout(timeoutId);
      window.removeEventListener("message", handleMessage);
    };

    const handleMessage = (event: MessageEvent) => {
      const raw = event.data;
      let data: unknown = raw;

      if (typeof raw === "string") {
        try {
          data = JSON.parse(raw) as unknown;
        } catch {
          data = { type: raw } as { type: string };
        }
      }

      const type =
        (typeof data === "object" && data !== null
          ? (data as { type?: unknown; action?: unknown }).type ??
            (data as { type?: unknown; action?: unknown }).action
          : undefined) ?? "";

      if (type === "MIC_PERMISSION_GRANTED") {
        cleanup();
        resolve(true);
      } else if (type === "MIC_PERMISSION_DENIED") {
        cleanup();
        resolve(false);
      }
    };

    window.addEventListener("message", handleMessage);

    if (win.ReactNativeWebView?.postMessage) {
      win.ReactNativeWebView.postMessage(payload);
      return;
    }

    const handler =
      win.webkit?.messageHandlers?.bridge ??
      win.webkit?.messageHandlers?.Bridge ??
      win.webkit?.messageHandlers?.deadlockBridge ??
      win.webkit?.messageHandlers?.DeadlockBridge;

    if (handler?.postMessage) {
      handler.postMessage(payload);
      return;
    }

    cleanup();
    reject(new Error("브릿지가 감지되지 않았어요."));
  });
}
