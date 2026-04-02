/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ActivityComponentType } from "@stackflow/react";

export type ActivityEntry = {
  name: string;
  component: ActivityComponentType<any>;
  path: string;
};

export function routeToActivityMap(
  entries: ActivityEntry[],
): Record<string, ActivityComponentType<any>> {
  return Object.fromEntries(
    entries.map(({ name, component }) => [name, component]),
  );
}

export const routeToPathMap = (
  entries: ActivityEntry[],
): Record<string, string> => {
  return Object.fromEntries(entries.map(({ name, path }) => [name, path]));
};
