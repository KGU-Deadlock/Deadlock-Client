/** 네이티브 셸(WebView 뒤) 그라데이션 하단 — 항상 흰색 */
export const SHELL_GRADIENT_BOTTOM = "#FFFFFF";

export type ShellPathFlags = {
  isLoginPath: boolean;
  isHomePath: boolean;
};

/**
 * 그라데이션 상단 색. 하단은 {@link SHELL_GRADIENT_BOTTOM} 고정.
 */
export function getShellGradientTopColor(flags: ShellPathFlags): string {
  if (flags.isLoginPath) {
    return "#F0F7FF";
  }
  if (flags.isHomePath) {
    return "#f0f0f0";
  }
  return "#FFFFFF";
}
