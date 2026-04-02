import type { RefObject } from "react";
import type { WebView } from "react-native-webview";

type WebViewType = WebView;

export const createHandleWebViewMessage =
  (webViewRef: RefObject<WebViewType | null>) =>
  (event: { nativeEvent: { data: string } }) => {
    const raw = event.nativeEvent.data;
    let data: unknown = raw;

    if (typeof raw === "string") {
      try {
        data = JSON.parse(raw);
      } catch {
        data = { type: raw } as { type: string };
      }
    }

    const type =
      (typeof data === "object" && data !== null
        ? (data as { type?: unknown; action?: unknown }).type ??
          (data as { type?: unknown; action?: unknown }).action
        : undefined) ?? "";

    if (type === "REQUEST_MIC_STATE") {
      webViewRef.current?.injectJavaScript(`
        (function () {
          var isOn = (window).__RN_MIC_ACTIVE_COUNT__ > 0;
          window.postMessage(
            { type: isOn ? "MIC_STATE_ON" : "MIC_STATE_OFF", isMicOn: isOn },
            "*"
          );
          true;
        })();
      `);
      return;
    }

    if (type !== "REQUEST_MIC_PERMISSION") return;

    // Web이 브릿지로 요청하면, WebView 내부에서 마이크 권한 팝업(getUserMedia)을 트리거한 뒤
    // 결과를 다시 web으로 window.postMessage로 전달합니다.
    webViewRef.current?.injectJavaScript(`
      (async () => {
        try {
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            window.postMessage({ type: "MIC_PERMISSION_DENIED" }, "*");
            return;
          }

          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach((track) => track.stop());

          window.postMessage({ type: "MIC_PERMISSION_GRANTED" }, "*");
        } catch (e) {
          window.postMessage({ type: "MIC_PERMISSION_DENIED" }, "*");
        }
      })();
      true;
    `);
  };

