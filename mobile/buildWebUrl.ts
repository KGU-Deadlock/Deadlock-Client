import type { ParsedURL } from "expo-linking";

export const buildWebUrl = (baseUrl: string, parsedUrl: ParsedURL): string => {
  let url = `${baseUrl}`;

  if (parsedUrl.path) {
    url += `/${parsedUrl.path || ""}`;
  }

  if (parsedUrl.queryParams) {
    url += `?${new URLSearchParams(
      parsedUrl.queryParams as Record<string, string>
    ).toString()}`;
  }

  return url;
};

