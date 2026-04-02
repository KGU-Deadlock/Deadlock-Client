import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { WebView } from "react-native-webview";
import type {
  WebView as WebViewType,
  WebViewNavigation,
} from "react-native-webview";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { BackHandler, StyleSheet } from "react-native";
import * as Linking from "expo-linking";
import { LinearGradient } from "expo-linear-gradient";
import {
  getShellGradientTopColor,
  SHELL_GRADIENT_BOTTOM,
} from "@/constants/shell-background";
import { WEBVIEW_URL } from "@/constants/url";
import CustomAnimatedSplash from "./splash-screen";
import { router } from "expo-router";
import { createHandleShouldStartLoad } from "@/webview/createHandleShouldStartLoad";
import { createHandleWebViewMessage } from "@/webview/createHandleWebViewMessage";
import { micStateBridgeScript } from "@/webview/micStateBridgeScript";
import { buildWebUrl } from "@/webview/buildWebUrl";

export default function App() {
  const webViewRef = useRef<WebViewType>(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const [initialUrl, setInitialUrl] = useState<string>(`${WEBVIEW_URL}`);
  const [showSplash, setShowSplash] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  // 뒤로가기 처리
  useEffect(() => {
    const backAction = () => {
      try {
        if (router.canGoBack()) {
          router.back();
          return true;
        }
      } catch {}
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [canGoBack]);

  useEffect(() => {
    const getInitialUrl = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        const parsedUrl = Linking.parse(url);
        const webUrl = buildWebUrl(WEBVIEW_URL, parsedUrl);
        setInitialUrl(webUrl);
      }
    };

    getInitialUrl();

    const subscription = Linking.addEventListener("url", ({ url }) => {
      const parsedUrl = Linking.parse(url);
      const webUrl = buildWebUrl(WEBVIEW_URL, parsedUrl);

      if (webViewRef.current) {
        webViewRef.current.injectJavaScript(`
          window.location.href = '${webUrl}';
          true;
        `);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  if (!initialUrl) {
    throw new Error("webview url is not set");
  }

  const isLoginPath = currentUrl.includes("/login");
  const isHomePath = currentUrl === `${WEBVIEW_URL}/`;

  const shellGradientTop = getShellGradientTopColor({
    isLoginPath,
    isHomePath,
  });

  const safeAreaEdges = isLoginPath ? (["top"] as const) : undefined;

  const handleShouldStartLoad = useMemo(
    () => createHandleShouldStartLoad(webViewRef),
    [webViewRef]
  );

  const handleWebViewMessage = useMemo(
    () => createHandleWebViewMessage(webViewRef),
    [webViewRef]
  );

  return (
    <SafeAreaProvider>
      {showSplash && <CustomAnimatedSplash onFinish={handleSplashFinish} />}
      <SafeAreaView
        edges={safeAreaEdges}
        style={{
          flex: 1,
          backgroundColor: SHELL_GRADIENT_BOTTOM,
        }}
      >
        <LinearGradient
          colors={[shellGradientTop, SHELL_GRADIENT_BOTTOM]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <WebView
          ref={webViewRef}
          source={{ uri: initialUrl }}
          style={{ flex: 1, backgroundColor: "transparent" }}
          injectedJavaScriptBeforeContentLoaded={micStateBridgeScript}
          webviewDebuggingEnabled
          domStorageEnabled={true}
          sharedCookiesEnabled={true}
          thirdPartyCookiesEnabled={true}
          originWhitelist={["*"]}
          applicationNameForUserAgent={"hellocswebview"}
          onShouldStartLoadWithRequest={handleShouldStartLoad}
          onMessage={handleWebViewMessage}
          onNavigationStateChange={(navState: WebViewNavigation) => {
            setCurrentUrl(navState.url);
            setCanGoBack(navState.canGoBack);
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
