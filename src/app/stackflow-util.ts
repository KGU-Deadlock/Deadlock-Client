import type { ActivityComponentType } from "@stackflow/react";

export type ActivityEntry<
  Params extends Record<string, unknown> = Record<string, unknown>,
> = {
  name: string;
  component: ActivityComponentType<Params>;
  path: string;
};

export function routeToActivityMap<
  Params extends Record<string, unknown> = Record<string, unknown>,
>(
  entries: ActivityEntry<Params>[],
): Record<string, ActivityComponentType<Params>> {
  return Object.fromEntries(
    entries.map(({ name, component }) => [name, component]),
  );
}

export const routeToPathMap = <
  Params extends Record<string, unknown> = Record<string, unknown>,
>(
  entries: ActivityEntry<Params>[],
): Record<string, string> => {
  return Object.fromEntries(entries.map(({ name, path }) => [name, path]));
};
