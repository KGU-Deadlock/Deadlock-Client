import { useEffect, useState } from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { SvgXml } from "react-native-svg";

import { SPLASH_LOGO_SVG } from "./splash-logo-svg";

const BLUE_003 = "#6B9BD1";
const BLUE_004 = "#09317C";

const TERMINAL_LINE = "hello!";

const { width: SCREEN_W } = Dimensions.get("window");

type SplashProps = {
  onFinish: () => void;
};

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

  const cursorOpacity = useSharedValue(1);

  useEffect(() => {
    cursorOpacity.value = withRepeat(
      withTiming(0.2, { duration: 425, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [cursorOpacity]);

  const cursorStyle = useAnimatedStyle(() => ({
    opacity: cursorOpacity.value,
  }));

  return (
    <View style={styles.terminalWrap} accessibilityElementsHidden>
      <View style={styles.terminalRow}>
        <Text style={[styles.terminalPrompt, { color: BLUE_003 }]}>$</Text>
        <Text
          style={[styles.terminalText, { color: BLUE_004 }]}
          numberOfLines={1}
        >
          {display}
        </Text>
        <Animated.View
          style={[
            styles.terminalCursor,
            { backgroundColor: BLUE_004 },
            cursorStyle,
          ]}
        />
      </View>
    </View>
  );
}

export default function CustomAnimatedSplash({ onFinish }: SplashProps) {
  useEffect(() => {
    const t = setTimeout(() => onFinish(), 2800);
    return () => clearTimeout(t);
  }, [onFinish]);

  const logoW = Math.min(240, SCREEN_W * 0.92);
  const logoH = (logoW * 264) / 460;
  const logoHeightCap = 80;
  const logoScale = logoH > logoHeightCap ? logoHeightCap / logoH : 1;
  const finalW = logoW * logoScale;
  const finalH = logoH * logoScale;

  return (
    <View style={styles.root} pointerEvents="none">
      <View style={styles.layerFill}>
        <LinearGradient
          colors={["#EEF5FF", "#FFFFFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.content}>
          <LoginTerminalHello />
          <View style={styles.logoShadow}>
            <SvgXml xml={SPLASH_LOGO_SVG} width={finalW} height={finalH} />
          </View>
          <Text style={styles.tagline}>꾸준히 준비하는 CS 면접</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    backgroundColor: "#FFFFFF",
  },
  layerFill: {
    flex: 1,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  terminalWrap: {
    maxWidth: Math.min(SCREEN_W * 0.92, 240),
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 4,
  },
  terminalRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 22,
  },
  terminalPrompt: {
    fontFamily: Platform.select({ ios: "Menlo", default: "monospace" }),
    fontSize: 14,
    marginRight: 4,
  },
  terminalText: {
    fontFamily: Platform.select({ ios: "Menlo", default: "monospace" }),
    fontSize: 18,
    lineHeight: 22,
  },
  terminalCursor: {
    width: 3,
    height: 22,
    marginLeft: 1,
  },
  logoShadow: {
    marginTop: 4,
    shadowColor: "#09317C",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
  tagline: {
    marginTop: 6,
    textAlign: "center",
    fontWeight: "500",
    fontSize: 15,
    color: BLUE_004,
  },
});
