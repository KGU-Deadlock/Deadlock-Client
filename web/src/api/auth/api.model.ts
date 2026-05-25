import type { components } from "@/api/config/api-models";

type AuthTokenResponse = components["schemas"]["AuthTokenResponse"];

type ApiResponseAuthTokenResponse = {
  isSuccess?: boolean;
  code?: string;
  message?: string;
  data?: AuthTokenResponse;
  success?: boolean;
};

/** POST /v1/auth/reissue */
export type ReissueResponse = ApiResponseAuthTokenResponse;

export type KakaoLoginResponse = ApiResponseAuthTokenResponse;

/** GET /v1/dev/admin-token */
export type DevTokenResponse =
  components["schemas"]["ApiResponseAdminTokenResponse"];
export type DevTokenResult = components["schemas"]["AdminTokenResponse"];
