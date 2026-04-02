import type { components } from "@/api/config/api-models";

/** POST /v1/auth/reissue — ApiResponseAuthTokenResponse */
export type ReissueResponse =
  components["schemas"]["ApiResponseAuthTokenResponse"];
export type ReissueResult = components["schemas"]["AuthTokenResponse"];

export type KakaoLoginResponse = components["schemas"]["AuthTokenResponse"];
