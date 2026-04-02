import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { stackflow } from "@stackflow/react";

import { StackflowAuthShell } from "./stackflow-auth-shell";
import { Route } from "./stackflow-route";
import { routeToActivityMap, routeToPathMap } from "./stackflow-util";

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  activities: routeToActivityMap(Route),
  initialActivity: () => "HomePage",
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: "cupertino",
      rootClassName: "stackflow-root",
    }),
    historySyncPlugin({
      routes: routeToPathMap(Route),
      fallbackActivity: () => "LoginPage",
    }),
    () => {
      return {
        key: "auth-initializer",
        wrapStack: ({ stack }) => {
          return <StackflowAuthShell>{stack.render()}</StackflowAuthShell>;
        },
      };
    },
  ],
});
