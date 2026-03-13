import { stackflow } from "@stackflow/react";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import { Route } from "./stackflow-route";
import { routeToActivityMap, routeToPathMap } from "./stackflow-util";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";

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
      fallbackActivity: () => "HomePage",
    }),
  ],
});
