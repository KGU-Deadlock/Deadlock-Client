import ky, {
  type AfterResponseState,
  type KyRequest,
  type KyResponse,
  type NormalizedOptions,
} from "ky";

import { useAuthStore } from "@/model/auth/useAuthStore";

import type { ReissueResponse } from "@/api/auth/api.model";

import { apiClientHandler } from "./api-client-handler";
import { END_POINTS } from "./api-endpoints";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const AUTH_RETRY_HEADER = "x-deadlock-auth-retry";

export const baseApiClient = ky.extend({
  prefixUrl: baseURL,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshAccessTokenPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (useAuthStore.getState().isLoggedOut) {
    return null;
  }

  if (!refreshAccessTokenPromise) {
    refreshAccessTokenPromise = (async () => {
      try {
        const result = await apiClientHandler<ReissueResponse>(
          baseApiClient,
          END_POINTS.AUTH.REISSUE,
          { method: "POST" },
        );
        if (!result.ok) {
          return null;
        }
        const token = result.data.accessToken;
        if (!token) {
          return null;
        }
        useAuthStore.getState().setAccessToken(token);
        return token;
      } finally {
        refreshAccessTokenPromise = null;
      }
    })();
  }
  return refreshAccessTokenPromise;
}

const beforeRequestHandler = (request: KyRequest) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    request.headers.set("Authorization", `Bearer ${token}`);
  }
};

const afterResponseHook = async (
  request: KyRequest,
  _options: NormalizedOptions,
  response: KyResponse,
  state: AfterResponseState,
): Promise<Response | void> => {
  if (response.status !== 401) {
    return;
  }

  if (state.retryCount > 0) {
    return;
  }

  if (request.headers.get(AUTH_RETRY_HEADER) === "1") {
    useAuthStore.getState().logout();
    return response;
  }

  const token = await refreshAccessToken();
  if (!token) {
    useAuthStore.getState().logout();
    return response;
  }

  request.headers.set("Authorization", `Bearer ${token}`);
  request.headers.set(AUTH_RETRY_HEADER, "1");

  return authApiClientInstance(request);
};

const authApiClientInstance = baseApiClient.extend({
  hooks: {
    beforeRequest: [beforeRequestHandler],
    afterResponse: [afterResponseHook],
  },
});

export const authApiClient = authApiClientInstance;
