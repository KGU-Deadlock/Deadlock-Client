import { lazy, Suspense, type ReactNode } from "react";

const AuthInitializer = lazy(() =>
  import("@/components/auth/AuthInitializer").then((m) => ({
    default: m.AuthInitializer,
  })),
);

export function StackflowAuthShell({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AuthInitializer>{children}</AuthInitializer>
    </Suspense>
  );
}
