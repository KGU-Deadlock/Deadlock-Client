import type { RefObject } from "react";
import type { WebView } from "react-native-webview";
import * as Linking from "expo-linking";

type WebViewType = WebView;

export const createHandleShouldStartLoad =
  (webViewRef: RefObject<WebViewType | null>) =>
  (request: { url?: string | null }): boolean => {
    const url = request.url ?? "";

    if (!url) return true;

    const isHttp = url.startsWith("http://") || url.startsWith("https://");

    // Intent 스킴 처리 (가장 먼저 확인)
    if (url.startsWith("intent:")) {
      // 인텐트 문자열 안에 포함된 browser_fallback_url 수동 파싱
      const fallbackKey = "S.browser_fallback_url=";
      const keyIndex = url.indexOf(fallbackKey);

      if (keyIndex !== -1) {
        const valueStart = keyIndex + fallbackKey.length;
        const valueEnd = url.indexOf(";", valueStart);
        const encodedValue =
          valueEnd === -1 ? url.slice(valueStart) : url.slice(valueStart, valueEnd);

        try {
          const fallbackUrl = decodeURIComponent(encodedValue);

          // WebView 내에서 window.location으로 이동
          webViewRef.current?.injectJavaScript(`
            window.location.href = ${JSON.stringify(fallbackUrl)};
            true;
          `);
        } catch (error) {
          console.warn(
            "Failed to decode intent fallback url from WebView",
            error,
            encodedValue
          );
        }
      } else {
        console.warn("No browser_fallback_url found in intent url", url);
      }

      // WebView에서는 계속 진행하지 않음
      return false;
    }

    // 카카오톡 관련 앱 스킴 처리
    if (
      url.startsWith("kakaotalk://") ||
      url.startsWith("kakaokompass://") ||
      url.startsWith("kakaolink://") ||
      url.startsWith("kakaokompassauth://") ||
      url.startsWith("kakao:") ||
      url.startsWith("talk:")
    ) {
      Linking.openURL(url).catch((error) => {
        console.warn("Failed to open Kakao app url from WebView", error, url);
      });
      return false;
    }

    // 카카오 OAuth URL은 WebView 에서 그대로 진행
    if (url.includes("kauth.kakao.com")) {
      return true;
    }

    // HTTP/HTTPS는 WebView 에서 처리
    if (isHttp) {
      return true;
    }

    // 그 외 커스텀 스킴은 네이티브로 위임
    if (!isHttp) {
      Linking.openURL(url).catch((error) => {
        console.warn("Failed to open external url from WebView", error, url);
      });
      return false;
    }

    return true;
  };

