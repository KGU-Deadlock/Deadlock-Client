import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@stackflow/plugin-basic-ui/index.css";
import { Stack } from "./stackflow";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isStackflowRoute } from "./route-match";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
const shouldMountStackflow = isStackflowRoute(window.location.pathname);

if (rootElement && shouldMountStackflow) {
  createRoot(rootElement).render(
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <Stack />
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 2500,
            className: "hcs-toast",
          }}
        />
      </StrictMode>
    </QueryClientProvider>,
  );
}
