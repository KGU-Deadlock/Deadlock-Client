import { Route } from "./stackflow-route";

function normalizePath(path: string): string {
  if (!path) return "/";
  if (path === "/") return "/";
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

export function isStackflowRoute(pathname: string): boolean {
  const currentPath = normalizePath(pathname);
  return Route.some(({ path }) => normalizePath(path) === currentPath);
}
