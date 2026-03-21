import ky, {
  type AfterResponseState,
  type KyRequest,
  type KyResponse,
  type NormalizedOptions,
} from "ky";

import { useAuthStore } from "@/model/auth/useAuthStore";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const baseApiClient = ky.extend({
  prefixUrl: baseURL,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});

const beforeRequestHandler = (request: KyRequest) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    request.headers.set("Authorization", `Bearer ${token}`);
  }
};

const afterResponseHook = async (
  _request: KyRequest,
  _options: NormalizedOptions,
  response: KyResponse,
  state: AfterResponseState,
): Promise<Response | void> => {
  if (response.status !== 401 || state.retryCount > 0) {
    return;
  }

  // 현재 프로젝트는 refreshToken/재발급 플로우가 없어서,
  // 401이면 store 기반으로 인증 상태를 초기화합니다.
  useAuthStore.getState().logout();
  return response;
};

const authApiClientInstance = baseApiClient.extend({
  hooks: {
    beforeRequest: [beforeRequestHandler],
    afterResponse: [afterResponseHook],
  },
});

export const authApiClient = authApiClientInstance;
