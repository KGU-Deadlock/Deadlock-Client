import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@stackflow/plugin-basic-ui/index.css";
import { Stack } from "./stackflow";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isStackflowRoute } from "./route-match";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      {isStackflowRoute(window.location.pathname) ? <Stack /> : null}
    </StrictMode>
  </QueryClientProvider>,
);
